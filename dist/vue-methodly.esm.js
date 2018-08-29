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

// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

// 21.1.3.7 String.prototype.includes(searchString, position = 0)
var $export$1 = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export$1($export$1.P + $export$1.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $export$2 = require('./_export');
var $filter = require('./_array-methods')(2);

$export$2($export$2.P + $export$2.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
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
Iterators.Arguments = Iterators.Array;

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

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators$1 = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators$1.Array;

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
    Iterators$1[NAME$1] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

var $export$3 = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export$3($export$3.P + $export$3.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var VueMethodly = {
  install: function install(Vue, options) {
    // initialise hook methods
    var hooks = {
      beforeCreate: [],
      created: [],
      beforeMount: [],
      mounted: [],
      update: [],
      activated: [],
      deactivated: [],
      beforeDestroy: [],
      destroyed: [] // map methods to each hook from options

    };
    Object.keys(hooks).forEach(function (hookKey) {
      var hasMethods = options && options.methods && options.methods.length;
      hooks[hookKey] = hasMethods && options.methods.filter(function (method) {
        // ignore attemps to use in-built method names
        return method.hook === hookKey && !Object.keys(hooks).includes(method.name);
      }) || [];
    }); // helper method to iterate over each
    // hook method and fire it off

    var enableHookMethods = function enableHookMethods(vm, hook) {
      hooks[hook].forEach(function (method) {
        var hookMethod = vm.$options[method.name] || false;
        hookMethod && hookMethod.call(vm);
      });
    }; // create a simple mixin and call each of the hook's methods
    // in the order they are found provided the options during init


    Vue.mixin({
      beforeCreate: function beforeCreate() {
        enableHookMethods(this, 'beforeCreate');
      },
      created: function created() {
        enableHookMethods(this, 'created');
      },
      beforeMount: function beforeMount() {
        enableHookMethods(this, 'beforeMount');
      },
      mounted: function mounted() {
        enableHookMethods(this, 'mounted');
      },
      update: function update() {
        enableHookMethods(this, 'update');
      },
      activated: function activated() {
        enableHookMethods(this, 'activated');
      },
      deactivated: function deactivated() {
        enableHookMethods(this, 'deactivated');
      },
      beforeDestroy: function beforeDestroy() {
        enableHookMethods(this, 'beforeDestroy');
      },
      destroyed: function destroyed() {
        enableHookMethods(this, 'destroyed');
      }
    });
  }
};

export default VueMethodly;
