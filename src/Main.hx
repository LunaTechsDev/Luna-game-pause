import Types.LGPEvents;
import js.html.KeyboardEvent;
import js.Browser;
import rm.core.Graphics;
import rm.core.Stage;
import rm.managers.SceneManager;
import pixi.interaction.EventEmitter;
import core.Amaryllis;
import utils.Comment;
import core.Types.JsFn;
import utils.Fn;
import rm.Globals;

using Lambda;
using core.StringExtensions;
using core.NumberExtensions;

typedef LGParams = {
  var pauseButton: String;
  var pauseText: String;
  var pauseWidth: Int;
  var pauseHeight: Int;
}

@:native('LunaGamePause')
@:expose('LunaGamePause')
class Main {
  public static var LGParams: LGParams = null;
  public static var listener: EventEmitter = Amaryllis.createEventEmitter();

  public static function main() {
    var plugin = Globals.Plugins.filter((plugin) -> ~/<LunaGamePause>/ig.match(plugin.description))[0];
    var params = plugin.parameters;
    LGParams = {
      pauseButton: params['pauseButton'],
      pauseText: params['pauseText'],
      pauseWidth: Fn.parseIntJs(params['pauseWidth']),
      pauseHeight: Fn.parseIntJs(params['pauseHeight'])
    };

    // Handles Frame Count
    Comment.title('Graphics');
    #if compileMV
    var _GraphicsRender: JsFn = Fn.getField(Graphics, 'render');
    Graphics.renderD = (?stage: Stage) -> {
      _GraphicsRender.call(Fn.self, stage);
      if (Fn.instanceof(Amaryllis.currentScene(), LunaScenePause)) {
        untyped Fn.self.frameCount--;
      }
    }
    #else untyped {
      var _GraphicsOnTick: JsFn = Graphics._onTick;
      Graphics._onTick = (deltaTime: Float) -> {
        _GraphicsOnTick.call(Fn.self, deltaTime);
        if (Fn.instanceof(Amaryllis.currentScene(), LunaScenePause)) {
          Fn.self.frameCount--;
        }
      }
    }
    #end

    Comment.title('Event Listener');
    Browser.document.addEventListener('keydown', (event: KeyboardEvent) -> {
      if (event.keyCode == LGParams.pauseButton.toUpperCase().charCodeAt(0)) {
        listener.emit(LGPEvents.PAUSE);
      }
    });

    listener.on(LGPEvents.PAUSE, () -> {
      pauseGame();
    });
  }

  public static function pauseGame() {
    SceneManager.push(LunaScenePause);
  }

  public static function params() {
    return LGParams;
  }
}
