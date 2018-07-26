/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var count = 0;

window.findNRooksSolution = function(n, board) {
  // Create empty matrix (makeEmptyMatrix(n))

  // need to reset count when new n is passed;
  count = 0;
  board = board || new Board({n: n});
  // Recursion function
  var checkSolutions = function(row) {

    row = row || 0;

    if (n === 0) {
      return;
    }
    // Base case
    if (row === n) {
      count++;
      return true;
    }
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!(board.hasRowConflictAt(row) || board.hasColConflictAt(col))) {
        var result = checkSolutions(row + 1);
        if (result) {
          board.togglePiece(row, col);
          return result;
        }
      }
      board.togglePiece(row, col);
    }
    return false;
    // may have to return here;
  };
  checkSolutions();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  window.findNRooksSolution(n, board);

  // create solution object;
  // var solutionList = {};
  // // create for loop that increases rowPos by 1 and
  // for (var rowPos = 0; rowPos < n; rowPos++) {
  //   for (var colPos = 0; colPos < n; colPos++) {
  //     solutionList[window.findNRooksSolution(n, rowPos, colPos)] = window.findNRooksSolution(n, rowPos, colPos);
  //   }
  // }
  // // create for loop that increases rowPos by 1 and
  // //call findrookssolution on n , rowPos(which is now increasing) and colPos(which is now increasing)
  // //store JSON.stringify result as key: value in solution object
  // var solutionCount = Object.keys(solutionList).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
