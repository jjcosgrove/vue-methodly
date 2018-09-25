var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

// https://github.com/tc39/Array.prototype.includes
var $export$1 = require('./_export');
var $includes = require('./_array-includes')(true);

$export$1($export$1.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

// 21.1.3.7 String.prototype.includes(searchString, position = 0)
var $export$2 = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export$2($export$2.P + $export$2.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $export$3 = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export$3($export$3.P + $export$3.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var $export$4 = require('./_export');
var $filter = require('./_array-methods')(2);

$export$4($export$4.P + $export$4.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME$1 = collections[i];
  var explicit = DOMIterables[NAME$1];
  var Collection = global[NAME$1];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME$1);
    Iterators[NAME$1] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators$1 = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$1.Arguments = Iterators$1.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

var $export$5 = require('./_export');
var $map = require('./_array-methods')(1);

$export$5($export$5.P + $export$5.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export$6 = require('./_export');

$export$6($export$6.S, 'Array', { isArray: require('./_is-array') });

var VueMethodly = {
  install: function install(Vue, options) {
    // initial hooks
    var hooks = {
      'beforeCreate': [],
      'created': [],
      'beforeMount': [],
      'mounted': [],
      'update': [],
      'activated': [],
      'deactivated': [],
      'beforeDestroy': [],
      'destroyed': [] // boolean helper

    };
    var hasMethods = Array.isArray(options.methods); // bail if nothing to do

    if (!hasMethods) {
      return;
    } // add methods to hooks


    Object.keys(hooks).map(function (hook) {
      // grab methods for this hook
      var methodsForHook = options.methods.filter(function (method) {
        return method.hook === hook;
      }); // add each one, so long as name does not collide with any native hooks

      methodsForHook.forEach(function (methodForHook) {
        if (!Object.keys(hooks).includes(methodsForHook)) {
          hooks[hook].push(methodForHook);
        }
      });
    }); // reduce into only hooks which have methods

    var hooksWithMethods = Object.keys(hooks).reduce(function (acc, hook) {
      if (hooks[hook].length) {
        // first run, initialize
        if (!acc[hook]) {
          acc[hook] = [];
        } // add to hook collection


        acc[hook].push(hooks[hook]);
      }

      return acc;
    }, {}); // base mixin

    var mixin = {}; // for each method in each hook with methods, execute the method
    // when the native hook executes, maintaining order in line with
    // defintions/config provided during init

    Object.keys(hooksWithMethods).forEach(function (hookWithMethods) {
      mixin[hookWithMethods] = function () {
        var _this = this;

        hooksWithMethods[hookWithMethods].forEach(function (hookWithMethods) {
          hookWithMethods.forEach(function (hookWithMethod) {
            var hookMethod = _this.$options[hookWithMethod.name] || false;
            hookMethod && hookMethod.call(_this);
          });
        });
      };
    }); // install mixin

    Vue.mixin(mixin);
  }
};

export default VueMethodly;
