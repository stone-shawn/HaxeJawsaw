package;

import js.Lib;
import js.Browser;
import js.html.CanvasElement;
import js.html.Event;
import js.html.Image;
import js.html.EventListener;

import createjs.easeljs.Stage;
// import createjs.easeljs.Text;
import createjs.easeljs.Bitmap;
import createjs.easeljs.Container;


import core.JShape;
import core.JImage;

class App
{
    // public var stage:Stage;

    // public var img:Dynamic;

    // public var piecesNum:Int = 4;

    public function new(cavasId:String, img:String, piecesNum:Int):Void
    { 
        this.run(cavasId, img, piecesNum);
    }

    static public function main():Void
    {
        new App('game', 'images/5.jpg', 4);
    }

    public function run(cavasId:String, img:String, piecesNum:Int):Void
    {
        var stage:Stage = new Stage(Browser.document.getElementById(cavasId));
        
        // var image = new Image();
        // image.src = img;
        // image.onload = this._run(stage, image, piecesNum);

        var image = new JImage(stage, img , piecesNum);

        // image.cutInPieces();

        stage.update();
    }


    private function _run(stage:Stage, image:Dynamic, piecesNum:Int):EventListener
    {


        return null;

        // var bitMap = new Bitmap(this.img);
        // stage.addChild(bitMap);

        // this.cutInPieces();

        // stage.mouseMoveOutside = true; 
        // var container = new Container();
        // stage.addChild(container);



        // var shape = new JShape(200, stage);

        // shape.drawShape(0, 0);
        
        // stage.addChild(shape);
        // bitMap.mask = shape;

        // shape.cursor = "pointer";

        // stage.on("pressmove",function(evt) {

        //     // currentTarget will be the container that the event listener was added to:
        //     evt.currentTarget.x = evt.stageX;
        //     evt.currentTarget.y = evt.stageY;
        //     // make sure to redraw the stage to show the change:
        //     stage.update();   
        // });

        // container.addChild(bitMap);

        // shape.setEdages([1,1,-1,0]);
        // shape.drawShape(0, 200);
        // bitMap.mask = shape;

        // bitMap.x = 0;
        // bitMap.y = 0;

        // container.on("pressmove",function(evt) {
        //     // currentTarget will be the container that the event listener was added to:
        //     evt.currentTarget.x = evt.stageX;
        //     evt.currentTarget.y = evt.stageY;
        //     // make sure to redraw the stage to show the change:
        //     stage.update();   
        // });

        // trace('Add img!!!'+img);
        stage.update();
    }

}