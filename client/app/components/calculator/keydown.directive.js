
export default function () {

  const ESCAPE_KEY = 27;

  return function (scope, el, attrs) {
    el.bind('keydown', function (event) {
      console.log('key down');
      debugger
      if (event.keyCode === ESCAPE_KEY) {
        scope.$apply(attrs.onEscape);
      }
    });

    scope.$on('$destroy', function () {
      el.unbind('keydown');
    });
  }
}
