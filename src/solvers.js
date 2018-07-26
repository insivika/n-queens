/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting
window.count = 0;
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// for (var rowPos = 0; rowPos < n; rowPos++) {
//   for (var colPos = 0; colPos < n; colPos++) {
//     solutionList[window.findNRooksSolution(n, rowPos, colPos)] = window.findNRooksSolution(n, rowPos, colPos);
//   }
// }
// // create for loop that increases rowPos by 1 and
// //call findrookssolution on n , rowPos(which is now increasing) and colPos(which is now increasing)
// //store JSON.stringify result as key: value in solution object
// var solutionCount = Object.keys(solutionList).length; //fixme

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, board, row) {
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
  board = board || new Board({n: n});
  row = row || 0;
  //count = count || 0;
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    window.count++;
    return [[1]];
  }
  if (row === n) {
    window.count++;
    matrix = JSON.parse(JSON.stringify(board.rows()));
    //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
    return true;
  }
  for (var col = 0; col < n; col++) {
    board.togglePiece(row, col);
    if (!board.hasAnyQueensConflicts()) {
      var result = window.findNQueensSolution(n, board, row + 1);
    }
    if (result === true) {
      board.togglePiece(row, col);
      return;
    }
    board.togglePiece(row, col);
  }
  return matrix ? matrix : board.rows();
  //return callback();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
