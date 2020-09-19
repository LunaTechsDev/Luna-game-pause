import rm.core.Rectangle;
import rm.windows.Window_Base;
import rm.core.Bitmap;

@:keep
@:native('LunaPictureWindow')
@:expose('LunaPictureWindow')
class LunaPictureWindow extends Window_Base {
  public var _pic: Bitmap;

  public function new(x: Int, y: Int, width: Int, height: Int) {
    #if compileMV
    super(x, y, width, height);
    #else
    var rect = new Rectangle(x, y, width, height);
    super(rect);
    #end
    this.openness = 0;
    this.hide();
  }

  public function repaint() {
    if (this.contents != null) {
      this.contents.clear();
      this.paintPicture();
    }
  }

  public function paintPicture() {
    this.contents.blt(
      this._pic,
      0,
      0,
      this._pic.width,
      this._pic.height,
      0,
      0,
      this.contentsWidth(),
      this.contentsHeight()
    );
  }

  public function setPicture(pic: Bitmap) {
    this._pic = pic;
  }
}
