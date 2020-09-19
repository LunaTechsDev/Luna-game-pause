import rm.windows.Window_Base;
import rm.core.Rectangle;

@:keep
@:native('LunaPauseWindow')
class LunaPauseWindow extends Window_Base {
  public var _pauseText: String;

  public function new(x: Int, y: Int, width: Int, height: Int) {
    #if compileMV
    super(x, y, width, height);
    #else
    var rect = new Rectangle(x, y, width, height);
    super(rect);
    #end
  }

  public function refresh() {
    if (this.contents != null) {
      this.contents.clear();
      this.paintPause();
    }
  }

  public function paintPause() {
    var difference = this.textWidth(this._pauseText) - this.width;
    if (difference > 0) {
      this.move(this.x, this.y, this.width + difference, this.height);
    }
    this.drawText(this._pauseText, 0, 0, this.contentsWidth(), 'center');
  }

  public function setPauseText(text: String) {
    this._pauseText = text;
  }
}
