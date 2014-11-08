package core;
import createjs.easeljs.Stage;
import createjs.easeljs.Shape;

class JShape extends Shape
{

    public var size:Float;

    public var edges:Array<Int>; 

    public var cx:Float;

    public var cy:Float;

    private var path:Dynamic;

    public var borderColor:String;

    public function new(size:Float):Void
    {
        super();
        this.size = size;
        // trace(size);
        // edges = [FLAT, OUTSIDE, INSIDE, FLAT];
        this.edges = [0, 1, -1, 0];
        this.borderColor = '#000';
    }

    public function setBorderColor(color:String):Void
    {
        this.borderColor = color;
    }

    public function drawShape(x:Float, y:Float):Void
    {
        this.path = this.graphics.setStrokeStyle(2).beginStroke(this.borderColor);
        cx = x;
        cy = y;

        this.path.moveTo(cx, cy);
        trace(size);

        var i:Int = 0;
        
        while(i < 4) {
            trace(i);
            drawSide(i, edges[i]);
            i++;
        }

        this.path.closePath();
    }

    private function drawSide(side:Int, sideType:Int):Void
    {
        switch (sideType) {
            case 0: flat(side); 
            case 1: outside(side); 
            case -1: inside(side); 
            default:
               trace('Invalid edge side type: ' + sideType);
        }

        trace('x:y == ' + cx + ':' + cy);
    }


    public function flat(side:Int):Void
    {
        trace('flat');
        switch (side) {
            case 0: {
                this.path = this.path.lineTo(cx + size, cy);
            }

            case 1: {
                this.path = this.path.lineTo(cx+size, cy + size);
            }

            case 2: {
                this.path = this.path.lineTo(cx, cy+size);
            }

            case 3: {
                this.path = this.path.lineTo(cx, cy);
            }

            default:
               trace('Invalid edge side: ' + side);
        }
    }

    public function outside(side:Int):Void
    {
        trace('outside');
        switch (side) {
            case 0: {
                this.path = this.path.lineTo(cx+size*0.4, cy)
                .bezierCurveTo(cx+size*0.55, cy-size*0.1, cx+size*0.24, cy-size*0.24, cx+size*0.5, cy-size*0.28)
                .bezierCurveTo(cx+size*0.76, cy-size*0.24, cx+size*0.45, cy-size*0.1, cx+size*0.6, cy)
                .lineTo(cx+size, cy);
            }

            case 1: {
                this.path = this.path.lineTo(cx+size, cy + size*0.4)
                .bezierCurveTo(cx+size+size*0.1, cy+size*0.55, cx+size+size*0.24, cy+size*0.24, cx+size+size*0.28, cy+size*0.5)
                .bezierCurveTo(cx+size+size*0.24, cy+size*0.76, cx+size+size*0.1, cy+size*0.45, cx+size, cy+size*0.6)
                .lineTo(cx+size, cy + size);
            }

            case 2: {
                this.path = this.path.lineTo(cx+size*0.6, cy+size)
                .bezierCurveTo(cx+size*0.45, cy+size+size*0.1, cx+size*0.76, cy+size+size*0.24, cx+size*0.5, cy+size+size*0.28)
                .bezierCurveTo(cx+size*0.24, cy+size+size*0.24, cx+size*0.55, cy+size+size*0.1, cx+size*0.4, cy+size)
                .lineTo(cx, cy+size);
            }

            case 3: {
                this.path = this.path.lineTo(cx, cy+size*0.6)
                .bezierCurveTo(cx-size*0.1, cy+size*0.45, cx-size*0.24, cy+size*0.76, cx-size*0.28, cy+size*0.5)
                .bezierCurveTo(cx-size*0.24, cy+size*0.24, cx-size*0.1, cy+size*0.55, cx, cy+size*0.4)
                .lineTo(cx, cy);
            }

            default:
               trace('Invalid edge side: ' + side);
        }
    }


    public function inside(side:Int):Void
    {
        trace('inside');
        switch (side) {
            case 0: {
                this.path = this.path.lineTo(cx+size*0.4, cy)
                .bezierCurveTo(cx+size*0.55, cy+size*0.1, cx+size*0.24, cy+size*0.24, cx+size*0.5, cy+size*0.28)
                .bezierCurveTo(cx+size*0.76, cy+size*0.24, cx+size*0.45, cy+size*0.1, cx+size*0.6, cy)
                .lineTo(cx+size, cy);
            }

            case 1: {
                this.path = this.path.lineTo(cx+size, cy + size*0.4)
                .bezierCurveTo(cx+size-size*0.1, cy+size*0.55, cx+size-size*0.24, cy+size*0.24, cx+size-size*0.28, cy+size*0.5)
                .bezierCurveTo(cx+size-size*0.24, cy+size*0.76, cx+size-size*0.1, cy+size*0.45, cx+size, cy+size*0.6)
                .lineTo(cx+size, cy + size);
            }

            case 2: {
                this.path = this.path.lineTo(cx+size*0.6, cy+size)
                .bezierCurveTo(cx+size*0.45, cy+size*0.9, cx+size*0.76, cy+size*0.76, cx+size*0.5, cy+size*0.72)
                .bezierCurveTo(cx+size*0.24, cy+size*0.76, cx+size*0.55, cy+size*0.9, cx+size*0.4, cy+size)
                .lineTo(cx, cy+size);
            }

            case 3: {
                this.path = this.path.lineTo(cx, cy+size*0.6)
                .bezierCurveTo(cx+size*0.1, cy+size*0.45, cx+size*0.24, cy+size*0.76, cx+size*0.28, cy+size*0.5)
                .bezierCurveTo(cx+size*0.24, cy+size*0.24, cx+size*0.1, cy+size*0.55, cx, cy+size*0.4)
                .lineTo(cx, cy);
            }

            default:
               trace('Invalid edge side: ' + side);
        }
    }




    public function setSize(s:Int):Void
    {
        size = s;
    }

    public function setEdages(edges:Array<Int>):Void
    {
        this.edges = edges;
    }
}