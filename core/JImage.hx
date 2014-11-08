package core;
import js.html.Image;
import createjs.easeljs.Stage;
import createjs.easeljs.Bitmap;
import createjs.easeljs.Rectangle;
import createjs.easeljs.Container;
import createjs.easeljs.Text;


class JImage {

    public var stage:Stage;

    public var imgUrl:String;

    public var image:Dynamic;

    public var piecesNum:Int;

    public function new(stage:Stage, img:String, piecesNum:Int):Void
    {
        this.stage = stage;
        this.imgUrl = img;
        this.piecesNum = piecesNum;
        image = new Image();
        image.src = this.imgUrl;
        image.onload = function() {
            this.cutInPieces();
        }

    }

    public function draw():Void
    {

    }

    public function cutInPieces():Void
    {
        switch (this.piecesNum) {
            case 4:  
                trace('img width:' + this.image.width);
                trace('img height:' + this.image.height);
                stage.mouseMoveOutside = true; 
                var bitmap = this.cropImage();
                var bound = bitmap.getBounds();
                stage.canvas.width = bound.width;
                stage.canvas.height = bound.height;

                var container = new Container();
                var shape = new JShape(bound.width/2);
                shape.drawShape(0, 0);
                bitmap.mask = shape;



                container.addChild(shape);



                // container.addChild(bitmap);

                stage.addChild(container);
                stage.update();
                container.on("pressmove", function(evt) {
                    // currentTarget will be the container that the event listener was added to:
                    evt.currentTarget.x = evt.stageX;
                    evt.currentTarget.y = evt.stageY;
                    // make sure to redraw the stage to show the change:
                    stage.update();   
                });

                
            case 6:

            case 9:

            default:
                trace('Invalid piecesNum!' + this.piecesNum);
        }
    }

    private function cropImage():Bitmap
    {
        var bitmap = new Bitmap(this.imgUrl);
        var w = this.image.width;
        var h = this.image.height;
        
        var x:Float = 0;
        var y:Float = 0;
        var width:Float;
        var height:Float;

        if(w > h) {
            x = (w-h)/2;
            width = height = h;
        } else if(w < h) {
            y = (h-w)/2;
            width = height = w;
        } else {
            width = height = w;
        }

        bitmap.sourceRect = new Rectangle(x, y, width, height);
        return bitmap;
    }

    private function calculateShapes(rows:Int, cols:Int)
    {
        
        switch (this.piecesNum) {
          case 4:
              var rCount:Int = 0;
              var cCount:Int;
              
              var shapes = new Array();

              var id = 0;
              while(rCount < rows) {
                  cCount = 0;
                  while(cCount < cols) {
                      if(rCount == 0) {
                      }
                      cCount++;
                      id++;
                  }
                  rCount++;
              }
          default:
            trace('Invalid piecesNum' + this.piecesNum);
        }
    }

}