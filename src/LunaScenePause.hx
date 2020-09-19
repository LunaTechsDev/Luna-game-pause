import rm.core.Input;
import rm.core.TouchInput;
import rm.core.Graphics;
import rm.scenes.Scene_MenuBase;

@:keep
@:native('LunaScenePause')
class LunaScenePause extends Scene_MenuBase {
  public var _pauseWindow: LunaPauseWindow;

  public override function create() {
    super.create();
    this.createPauseWindow();
  }

  public function createPauseWindow() {
    this._pauseWindow = new LunaPauseWindow(cast Graphics.width / 2, cast Graphics.height / 2, 100, 75);
    this.addWindow(this._pauseWindow);
    var params = Main.params();
    this._pauseWindow.setPauseText(params.pauseText);
    this._pauseWindow.refresh();
  }

  public override function update() {
    super.update();
    this.processExit();
  }

  public function processExit() {
    if (Input.isPressed('cancel') || TouchInput.isCancelled()) {
      this.popScene();
    }
  }
}
