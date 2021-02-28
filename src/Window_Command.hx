class Window_Command extends rm.windows.Window_Command {
  #if compileMV
  override public function initialize(x, y) {
    // Temporarily create Bitmap to prevent contents issue.
    untyped if (this._windowContentsSprite == null) {
      // Recreate initial window contents on unpause to prevent crashing on MV
      this._list = [];
      untyped Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
    }
    untyped _Window_Command_initialize.call(this, x, y);
  }
  #end
}
