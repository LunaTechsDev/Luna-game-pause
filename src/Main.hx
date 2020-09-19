import rm.managers.PluginManager;
import rm.core.Bitmap;
import rm.managers.ImageManager;
import Types.LPEvents;
import pixi.interaction.EventEmitter;
import core.Amaryllis;
import utils.Comment;
import rm.scenes.Scene_Map;
import core.Types.JsFn;
import utils.Fn;
import rm.Globals;

using Lambda;
using core.StringExtensions;
using core.NumberExtensions;

typedef LPParams = {
  var x: Int;
  var y: Int;
  var width: Int;
  var height: Int;
}

@:native('LunaPicWindow')
@:expose('LunaPicWindow')
class Main {
  public static var LPParams: LPParams = null;
  public static var PicWindow: LunaPictureWindow = null;
  public static var listener: EventEmitter = Amaryllis.createEventEmitter();

  public static function main() {
    var plugin = Globals.Plugins.filter((plugin) -> ~/<LunaPicWindow>/ig.match(plugin.description))[0];
    var params = plugin.parameters;
    LPParams = {
      x: Fn.parseIntJs(params['x']),
      y: Fn.parseIntJs(params['y']),
      width: Fn.parseIntJs(params['width']),
      height: Fn.parseIntJs(params['height'])
    };

    Comment.title('Scene_Map');
    var _sceneMapCreateAllWindows: JsFn = Fn.proto(Scene_Map).createAllWindowsR;
    Fn.proto(Scene_Map).createAllWindowsD = () -> {
      _sceneMapCreateAllWindows.call(Fn.self);
      createPictureWindow(cast Fn.self);
    }

    Comment.title('Plugin Commands');
    PluginManager.registerCommand(plugin.name, 'showPicWindow', (argObj: Dynamic) -> {
      // Object with fileName in it
      showPic(argObj.fileName);
    });
    PluginManager.registerCommand(plugin.name, 'showWindow', (_) -> {
      showWindow();
    });

    PluginManager.registerCommand(plugin.name, 'hideWindow', (_) -> {
      hideWindow();
    });
  }

  public static function createPictureWindow(scene: Scene_Map) {
    var picWindow = new LunaPictureWindow(LPParams.x, LPParams.y, LPParams.width, LPParams.height);
    untyped scene._picWindow = picWindow; // Assign picture window to scene
    setupWinEvents(picWindow);
    scene.addWindow(picWindow);
    PicWindow = picWindow;
  }

  public static function setupWinEvents(win: LunaPictureWindow) {
    listener.on(LPEvents.SHOW, () -> {
      win.show();
      win.open();
    });

    listener.on(LPEvents.SHOWPIC, (picture: Bitmap) -> {
      win.setPicture(picture);
      win.repaint();
      win.show();
      win.open();
    });

    listener.on(LPEvents.HIDE, () -> {
      win.close();
      win.hide();
    });
  }

  public static function showPic(imageName: String) {
    var picture = ImageManager.loadPicture(imageName, 0);
    picture.addLoadListener((bitmap) -> {
      if (bitmap.isReady() && Fn.instanceof(Amaryllis.currentScene(), Scene_Map)) {
        listener.emit(LPEvents.SHOWPIC, bitmap);
      }
    });
  }

  public static function showWindow() {
    if (PicWindow != null) {
      listener.emit(LPEvents.SHOW);
    }
  }

  public static function hideWindow() {
    if (PicWindow != null) {
      listener.emit(LPEvents.HIDE);
    }
  }
}
