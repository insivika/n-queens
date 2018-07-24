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

window.findNRooksSolution = function(n, rowPos, colPos) {
  // Create empty matrix (makeEmptyMatrix(n))
  var board = new Board({n: n});
  if (rowPos && colPos) {
    board.rows()[rowPos][colPos] = 1;
  }
  // create a new bon x n board
  //add n queens to board
  //n recursive calls
  //n = n (max queens)
  //n = 0 (no queens)
  var singleBoard = function(n) {

    if (n === 0) {
      return board.rows();
    }

    for (var rows = 0; rows < n; rows++) {
      for (var col = 0; col < n; col++) {
        if (board.rows()[rows][col] === 0) {
          board.togglePiece(rows, col);
        }
        if (board.hasRowConflictAt(rows) && board.hasColConflictAt(col)) {
          board.togglePiece(rows, col);
          singleBoard(n - 1);
        }
      }
    }
  };
  singleBoard(n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
  //return false;
  //iterate rows (row 0 - row n)
  //iterate cols (col 0 - col n)
  //toggle current position
  //if current position is not already 1 and no conflicts
  //current position = 1
  // return function call recursively (n-1, board)

  //return matrix
  //return rookBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
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

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
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
