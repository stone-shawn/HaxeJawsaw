(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function(cavasId,img,piecesNum) {
	this.run(cavasId,img,piecesNum);
};
App.__name__ = true;
App.main = function() {
	new App("game","images/5.jpg",4);
};
App.prototype = {
	run: function(cavasId,img,piecesNum) {
		var stage = new createjs.Stage(window.document.getElementById(cavasId));
		var image = new core.JImage(stage,img,piecesNum);
		stage.update();
	}
	,_run: function(stage,image,piecesNum) {
		return null;
		stage.update();
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var core = {};
core.JImage = function(stage,img,piecesNum) {
	var _g = this;
	this.stage = stage;
	this.imgUrl = img;
	this.piecesNum = piecesNum;
	this.image = new Image();
	this.image.src = this.imgUrl;
	this.image.onload = function() {
		_g.cutInPieces();
	};
};
core.JImage.__name__ = true;
core.JImage.prototype = {
	draw: function() {
	}
	,cutInPieces: function() {
		var _g1 = this;
		var _g = this.piecesNum;
		switch(_g) {
		case 4:
			console.log("img width:" + Std.string(this.image.width));
			console.log("img height:" + Std.string(this.image.height));
			this.stage.mouseMoveOutside = true;
			var bitmap = this.cropImage();
			var bound = bitmap.getBounds();
			this.stage.canvas.width = bound.width;
			this.stage.canvas.height = bound.height;
			var container = new createjs.Container();
			var shape = new core.JShape(bound.width / 2);
			shape.drawShape(0,0);
			bitmap.mask = shape;
			container.addChild(shape);
			this.stage.addChild(container);
			this.stage.update();
			container.on("pressmove",function(evt) {
				evt.currentTarget.x = evt.stageX;
				evt.currentTarget.y = evt.stageY;
				_g1.stage.update();
			});
			break;
		case 6:
			break;
		case 9:
			break;
		default:
			console.log("Invalid piecesNum!" + this.piecesNum);
		}
	}
	,cropImage: function() {
		var bitmap = new createjs.Bitmap(this.imgUrl);
		var w = this.image.width;
		var h = this.image.height;
		var x = 0;
		var y = 0;
		var width;
		var height;
		if(w > h) {
			x = (w - h) / 2;
			width = height = h;
		} else if(w < h) {
			y = (h - w) / 2;
			width = height = w;
		} else width = height = w;
		bitmap.sourceRect = new createjs.Rectangle(x,y,width,height);
		return bitmap;
	}
	,calculateShapes: function(rows,cols) {
		var _g = this.piecesNum;
		switch(_g) {
		case 4:
			var rCount = 0;
			var cCount;
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
			break;
		default:
			console.log("Invalid piecesNum" + this.piecesNum);
		}
	}
};
core.JShape = function(size) {
	createjs.Shape.call(this);
	this.size = size;
	this.edges = [0,1,-1,0];
	this.borderColor = "#000";
};
core.JShape.__name__ = true;
core.JShape.__super__ = createjs.Shape;
core.JShape.prototype = $extend(createjs.Shape.prototype,{
	setBorderColor: function(color) {
		this.borderColor = color;
	}
	,drawShape: function(x,y) {
		this.path = this.graphics.setStrokeStyle(2).beginStroke(this.borderColor);
		this.cx = x;
		this.cy = y;
		this.path.moveTo(this.cx,this.cy);
		console.log(this.size);
		var i = 0;
		while(i < 4) {
			console.log(i);
			this.drawSide(i,this.edges[i]);
			i++;
		}
		this.path.closePath();
	}
	,drawSide: function(side,sideType) {
		switch(sideType) {
		case 0:
			this.flat(side);
			break;
		case 1:
			this.outside(side);
			break;
		case -1:
			this.inside(side);
			break;
		default:
			console.log("Invalid edge side type: " + sideType);
		}
		console.log("x:y == " + this.cx + ":" + this.cy);
	}
	,flat: function(side) {
		console.log("flat");
		switch(side) {
		case 0:
			this.path = this.path.lineTo(this.cx + this.size,this.cy);
			break;
		case 1:
			this.path = this.path.lineTo(this.cx + this.size,this.cy + this.size);
			break;
		case 2:
			this.path = this.path.lineTo(this.cx,this.cy + this.size);
			break;
		case 3:
			this.path = this.path.lineTo(this.cx,this.cy);
			break;
		default:
			console.log("Invalid edge side: " + side);
		}
	}
	,outside: function(side) {
		console.log("outside");
		switch(side) {
		case 0:
			this.path = this.path.lineTo(this.cx + this.size * 0.4,this.cy).bezierCurveTo(this.cx + this.size * 0.55,this.cy - this.size * 0.1,this.cx + this.size * 0.24,this.cy - this.size * 0.24,this.cx + this.size * 0.5,this.cy - this.size * 0.28).bezierCurveTo(this.cx + this.size * 0.76,this.cy - this.size * 0.24,this.cx + this.size * 0.45,this.cy - this.size * 0.1,this.cx + this.size * 0.6,this.cy).lineTo(this.cx + this.size,this.cy);
			break;
		case 1:
			this.path = this.path.lineTo(this.cx + this.size,this.cy + this.size * 0.4).bezierCurveTo(this.cx + this.size + this.size * 0.1,this.cy + this.size * 0.55,this.cx + this.size + this.size * 0.24,this.cy + this.size * 0.24,this.cx + this.size + this.size * 0.28,this.cy + this.size * 0.5).bezierCurveTo(this.cx + this.size + this.size * 0.24,this.cy + this.size * 0.76,this.cx + this.size + this.size * 0.1,this.cy + this.size * 0.45,this.cx + this.size,this.cy + this.size * 0.6).lineTo(this.cx + this.size,this.cy + this.size);
			break;
		case 2:
			this.path = this.path.lineTo(this.cx + this.size * 0.6,this.cy + this.size).bezierCurveTo(this.cx + this.size * 0.45,this.cy + this.size + this.size * 0.1,this.cx + this.size * 0.76,this.cy + this.size + this.size * 0.24,this.cx + this.size * 0.5,this.cy + this.size + this.size * 0.28).bezierCurveTo(this.cx + this.size * 0.24,this.cy + this.size + this.size * 0.24,this.cx + this.size * 0.55,this.cy + this.size + this.size * 0.1,this.cx + this.size * 0.4,this.cy + this.size).lineTo(this.cx,this.cy + this.size);
			break;
		case 3:
			this.path = this.path.lineTo(this.cx,this.cy + this.size * 0.6).bezierCurveTo(this.cx - this.size * 0.1,this.cy + this.size * 0.45,this.cx - this.size * 0.24,this.cy + this.size * 0.76,this.cx - this.size * 0.28,this.cy + this.size * 0.5).bezierCurveTo(this.cx - this.size * 0.24,this.cy + this.size * 0.24,this.cx - this.size * 0.1,this.cy + this.size * 0.55,this.cx,this.cy + this.size * 0.4).lineTo(this.cx,this.cy);
			break;
		default:
			console.log("Invalid edge side: " + side);
		}
	}
	,inside: function(side) {
		console.log("inside");
		switch(side) {
		case 0:
			this.path = this.path.lineTo(this.cx + this.size * 0.4,this.cy).bezierCurveTo(this.cx + this.size * 0.55,this.cy + this.size * 0.1,this.cx + this.size * 0.24,this.cy + this.size * 0.24,this.cx + this.size * 0.5,this.cy + this.size * 0.28).bezierCurveTo(this.cx + this.size * 0.76,this.cy + this.size * 0.24,this.cx + this.size * 0.45,this.cy + this.size * 0.1,this.cx + this.size * 0.6,this.cy).lineTo(this.cx + this.size,this.cy);
			break;
		case 1:
			this.path = this.path.lineTo(this.cx + this.size,this.cy + this.size * 0.4).bezierCurveTo(this.cx + this.size - this.size * 0.1,this.cy + this.size * 0.55,this.cx + this.size - this.size * 0.24,this.cy + this.size * 0.24,this.cx + this.size - this.size * 0.28,this.cy + this.size * 0.5).bezierCurveTo(this.cx + this.size - this.size * 0.24,this.cy + this.size * 0.76,this.cx + this.size - this.size * 0.1,this.cy + this.size * 0.45,this.cx + this.size,this.cy + this.size * 0.6).lineTo(this.cx + this.size,this.cy + this.size);
			break;
		case 2:
			this.path = this.path.lineTo(this.cx + this.size * 0.6,this.cy + this.size).bezierCurveTo(this.cx + this.size * 0.45,this.cy + this.size * 0.9,this.cx + this.size * 0.76,this.cy + this.size * 0.76,this.cx + this.size * 0.5,this.cy + this.size * 0.72).bezierCurveTo(this.cx + this.size * 0.24,this.cy + this.size * 0.76,this.cx + this.size * 0.55,this.cy + this.size * 0.9,this.cx + this.size * 0.4,this.cy + this.size).lineTo(this.cx,this.cy + this.size);
			break;
		case 3:
			this.path = this.path.lineTo(this.cx,this.cy + this.size * 0.6).bezierCurveTo(this.cx + this.size * 0.1,this.cy + this.size * 0.45,this.cx + this.size * 0.24,this.cy + this.size * 0.76,this.cx + this.size * 0.28,this.cy + this.size * 0.5).bezierCurveTo(this.cx + this.size * 0.24,this.cy + this.size * 0.24,this.cx + this.size * 0.1,this.cy + this.size * 0.55,this.cx,this.cy + this.size * 0.4).lineTo(this.cx,this.cy);
			break;
		default:
			console.log("Invalid edge side: " + side);
		}
	}
	,setSize: function(s) {
		this.size = s;
	}
	,setEdages: function(edges) {
		this.edges = edges;
	}
});
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
String.__name__ = true;
Array.__name__ = true;
App.main();
})();
