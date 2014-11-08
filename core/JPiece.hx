package core;

import createjs.easeljs.Container;

// import core.JShape;

class JPiece extends Container {

    /**
     * number in canvas
     */
    public var id:Int;

    public var row:Int;

    public var col:Int;

    public var top:Int;

    public var right:Int;

    public var buttom:Int;

    public var left:Int;

    public function new(row:Int, col:Int):Void 
    {
        super();
    }

    public function getTopPiece(pieces:Array<JPiece>):JPiece
    {
        if(this.row > 1) {
            return pieces[(this.row - 1) * this.col];
        } else {
           return null;
        }
    }

    public function getRightPiece(pieces:Array<JPiece>):JPiece
    {
        
    }

}