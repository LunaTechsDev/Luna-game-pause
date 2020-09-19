//=============================================================================
// Luna_GamePauseMV.js
//=============================================================================
//=============================================================================
// Build Date: 2020-09-19 19:40:56
//=============================================================================
//=============================================================================
// Made with LunaTea -- Haxe
//=============================================================================

// Generated by Haxe 4.1.3
/*:
@author LunaTechs - Kino
@plugindesc This plugin allows you to pause the game, stopping the clock <LunaGamePause>.

@target MV MZ

@param pauseButton
@text Pause Button
@default p

@param pauseText
@text Pause Text
@default Pause

@help
This plugin allows you to pause the game, stopping the clock. 




MIT License
Copyright (c) 2020 LunaTechsDev
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
*/





(function ($hx_exports, $global) { "use strict"
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {};
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""))
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0
		}
		this.r.m = this.r.exec(s)
		this.r.s = s
		return this.r.m != null;
	}
}
EReg.__name__ = true
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index)
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true
class LunaPauseWindow extends Window_Base {
	constructor(x,y,width,height) {
		super(x,y,width,height);
	}
	refresh() {
		if(this.contents != null) {
			this.contents.clear()
			this.paintPause()
		}
	}
	paintPause() {
		this.drawText(this._pauseText,0,0,this.contentsWidth(),"center")
	}
	setPauseText(text) {
		this._pauseText = text
	}
}
LunaPauseWindow.__name__ = true
class LunaScenePause extends Scene_MenuBase {
	constructor() {
		super();
	}
	create() {
		super.create()
		this.createPauseWindow()
	}
	createPauseWindow() {
		this._pauseWindow = new LunaPauseWindow(Graphics.width / 2,Graphics.height / 2,100,75)
		this.addWindow(this._pauseWindow)
		let params = LunaGamePause.params()
		this._pauseWindow.setPauseText(params.pauseText)
		this._pauseWindow.refresh()
	}
	update() {
		super.update()
		this.processExit()
	}
	processExit() {
		if(Input.isPressed("cancel") || TouchInput.isCancelled()) {
			this.popScene()
		}
	}
}
LunaScenePause.__name__ = true
class LunaGamePause {
	static main() {
		let _g = []
		let _g1 = 0
		let _g2 = $plugins
		while(_g1 < _g2.length) {
			let v = _g2[_g1]
			++_g1
			if(new EReg("<LunaGamePause>","ig").match(v.description)) {
				_g.push(v)
			}
		}
		let plugin = _g[0]
		let params = plugin.parameters
		LunaGamePause.LGParams = { pauseButton : params["pauseButton"], pauseText : params["pauseText"]}
		
//=============================================================================
// Graphics
//=============================================================================
      
		let _GraphicsRender = Graphics.render
		Graphics.render = function(stage) {
			_GraphicsRender.call(this,stage)
			if(((SceneManager._scene) instanceof LunaScenePause)) {
				this.frameCount--
			}
		}
		
//=============================================================================
// Event Listener
//=============================================================================
      
		window.document.addEventListener("keydown",function(event) {
			if(event.keyCode == HxOverrides.cca(LunaGamePause.LGParams.pauseButton.toUpperCase(),0)) {
				LunaGamePause.listener.emit("pause")
			}
		})
		LunaGamePause.listener.on("pause",function() {
			LunaGamePause.pauseGame()
		})
	}
	static pauseGame() {
		SceneManager.push(LunaScenePause)
	}
	static params() {
		return LunaGamePause.LGParams;
	}
}
$hx_exports["LunaGamePause"] = LunaGamePause
LunaGamePause.__name__ = true
Math.__name__ = true
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0
		this.array = array
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o)
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object"
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__]
				let n = e.__constructs__[o._hx_index]
				let con = e[n]
				if(con.__params__) {
					s = s + "\t"
					return n + "(" + ((function($this) {
						var $r
						let _g = []
						{
							let _g1 = 0
							let _g2 = con.__params__
							while(true) {
								if(!(_g1 < _g2.length)) {
									break
								}
								let p = _g2[_g1]
								_g1 = _g1 + 1
								_g.push(js_Boot.__string_rec(o[p],s))
							}
						}
						$r = _g
						return $r;
					}(this))).join(",") + ")"
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "["
				s += "\t";
				let _g = 0
				let _g1 = o.length
				while(_g < _g1) {
					let i = _g++
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr
			try {
				tostr = o.toString
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString()
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n"
			s += "\t";
			let hasp = o.hasOwnProperty != null
			let k = null
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1)
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true
class _$LTGlobals_$ {
}
_$LTGlobals_$.__name__ = true
class utils_Fn {
	static proto(obj) {
		return obj.prototype;
	}
	static updateProto(obj,fn) {
		return (fn)(obj.prototype);
	}
	static updateEntity(obj,fn) {
		return (fn)(obj);
	}
}
utils_Fn.__name__ = true
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance)
}
String.__name__ = true
Array.__name__ = true
js_Boot.__toStr = ({ }).toString
LunaGamePause.listener = new PIXI.utils.EventEmitter()
LunaGamePause.main()
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {})

//# sourceMappingURL=Luna_GamePauseMV.js.map