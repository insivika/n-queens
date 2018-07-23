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

window.findNRooksSolution = function(n, rowPos, colPos, first) {
  // Create empty matrix (makeEmptyMatrix(n))
  var rookBoard = new Board({ n: n });
  rowPos = rowPos || 0;
  colPos = colPos || 0;
  first = first || true;
  // iterate through each row in empty matrix (forEach: row, index)
  rookBoard.togglePiece(rowPos, colPos);
  rookBoard.rows().forEach(function(row, rowIndex) {
    //iterate through each col (forEach: col, index
    row.forEach(function(col, colIndex) {
      //if not (hasRowConflictAt && hasColConflictAt)
      if (rookBoard.get(rowIndex)[colIndex]) { return; }
      rookBoard.togglePiece(rowIndex, colIndex);
      if (rookBoard.hasRowConflictAt(rowIndex) || rookBoard.hasColConflictAt(colIndex)) {
        //toggle (row, col)
        rookBoard.togglePiece(rowIndex, colIndex);
      }
    });
  });
  // for (var row = 0; row < rookBoard.rows().length; row++) {
  //   for (var col = 0; col < rookBoard.rows()[row].length; col++) {
  //     rookBoard.togglePiece(row, col);
  //     if (rookBoard.hasRowConflictAt(row) || rookBoard.hasColConflictAt(col)) {
  //     rookBoard.togglePiece(row, col);
  //     }
  //   }
  // }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rookBoard.rows()));
  //return matrix
  return rookBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create solution object;
  var solutionList = {};
  // create for loop that increases rowPos by 1 and
  for (var rowPos = 0; rowPos < n; rowPos++) {
    for (var colPos = 0; colPos < n; colPos++) {
      solutionList[window.findNRooksSolution(n, rowPos, colPos)] = window.findNRooksSolution(n, rowPos, colPos);
    }
  }
  // create for loop that increases rowPos by 1 and
  //call findrookssolution on n , rowPos(which is now increasing) and colPos(which is now increasing)
  //store JSON.stringify result as key: value in solution object
  var solutionCount = Object.keys(solutionList).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
