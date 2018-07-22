// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var count = 0;
      this.get(rowIndex).forEach(function(col){
        if(col === 1){
          count++;
        }
      });

     return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var conflict = false;
      var self = this;

      for (var row in self.attributes){
        if(row !== 'n' && self.hasRowConflictAt(row)){
          conflict = true;
        }
      }
      return conflict;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //return !this.get(colIndex).indexOf(1); // fixme
      var count = 0;
      for (var row in this.attributes) {
        if (row !== 'n' && this.attributes[row][colIndex] === 1) {
          count++;
        }
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var conflict = false;
      var self = this;

      for (var col in self.attributes){
        if(col !== 'n' && self.hasColConflictAt(col)){
          conflict = true;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create counter
      var count = 0;
      //check if majorDiagonalColumnIndexAtFirstRow is either greater or less than 0
      if (majorDiagonalColumnIndexAtFirstRow > 0) {
      // if greater than 0 we know the rowIndex = 0 colIndex = value
        rowIndex = 0;
        colIndex = majorDiagonalColumnIndexAtFirstRow;
      } else {
      // if less than 0 we know rowIndex = Absulte Value(majorDiagonalColumnIndexAtFirstRow) and colIndex = 0
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        colIndex = 0;
      }
      // Take coordinates and while is in bound
      while (this._isInBounds(rowIndex, colIndex)) {
        // check coordinates, if this.get(rowIndex)[colIndex] is 1, increment count
        if (this.get(rowIndex)[colIndex] === 1) {
          count++;
        }
        // increase rowIndex by 1 and colIndex by 1
        rowIndex++;
        colIndex++;
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // starting at row 0, column 0 check diiagonal to row n
      for (var rowIndex = 0; rowIndex < this.get('n'); rowIndex++) {
        var diagonalFound = this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, 0));
        if (diagonalFound === true) {
        //if conflict found (true)
          return true;
        }
      }

      // starting at column 1, row 0 check diagonals to column n
      for (var colIndex = 1; colIndex < this.get('n'); colIndex++) {
        var diagonalFound = this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0, colIndex));
        //if conflict found (true)
        if (diagonalFound === true) {
          return true;
        }
      }
      // return false;
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var colIndex, rowIndex;
      if (minorDiagonalColumnIndexAtFirstRow > this.get('n') - 1) {
        colIndex = minorDiagonalColumnIndexAtFirstRow - (minorDiagonalColumnIndexAtFirstRow - (this.get('n') - 1));
        rowIndex = minorDiagonalColumnIndexAtFirstRow - (this.get('n') - 1);
      } else {
        colIndex = minorDiagonalColumnIndexAtFirstRow;
        rowIndex = 0;
      }
      while (this._isInBounds(rowIndex, colIndex)) {
        if (this.get(rowIndex)[colIndex] === 1) {
          count++;
        }
        colIndex--;
        rowIndex++;
      }
      return count > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

    for(var rowIndex = 0; rowIndex < this.get('n'); rowIndex++){
      var diagonalFound = this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex,0));
      if(diagonalFound === true){
        return true;
      }
    }

    for(var colIndex = 1; colIndex < this.get('n'); colIndex++){
      var diagonalFound = this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(this.get('n') - 1, colIndex));
      if(diagonalFound === true){
        return true;
      }
    }
    return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

