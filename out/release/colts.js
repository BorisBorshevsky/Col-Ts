var ColTs;
(function (ColTs) {
    var ColHelper = (function () {
        function ColHelper() {
        }
        ColHelper.maxBy = function (source, selector) {
            var bestResult = null;
            var bestItem = null;
            for (var i = 0; i < source.length; i++) {
                var result = selector(source[i]);
                if (bestResult == null || result > bestResult) {
                    bestResult = result;
                    bestItem = source[i];
                }
            }
            return bestItem;
        };
        ColHelper.each = function (source, fn) {
            for (var i = 0; i < source.length; i++) {
                fn(source[i], i);
            }
        };
        ColHelper.count = function (source, fn) {
            var count = 0;
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i]))
                    count++;
            }
            return count;
        };
        ColHelper.select = function (source, fn) {
            var results = [];
            for (var i = 0; i < source.length; i++) {
                var res = fn(source[i], i);
                results[i] = res;
            }
            return results;
        };
        ColHelper.intersect = function (first, second) {
            var result = [];
            for (var f = 0; f < first.length; f++) {
                for (var s = 0; s < second.length; s++) {
                    if (first[f] == second[s]) {
                        result.push(first[f]);
                        break;
                    }
                }
            }
            return result;
        };
        ColHelper.where = function (source, fn) {
            var results = [];
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i])) {
                    results.push(source[i]);
                }
            }
            return results;
        };
        ColHelper.any = function (source, fn) {
            for (var i = 0; i < source.length; i++) {
                if (fn(source[i]))
                    return true;
            }
            return false;
        };
        ColHelper.distinct = function (source, keySelector) {
            var map = {};
            var results = [];
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);
                if (!(key in map)) {
                    map[keySelector(item)] = true;
                    results.push(item);
                }
            }
            return results;
        };
        ColHelper.aggregate = function (source, initialValue, fn) {
            var agg = initialValue;
            for (var i = 0; i < source.length; i++) {
                agg = fn(source[i], agg);
            }
            return agg;
        };
        ColHelper.sort = function (source, fn) {
            var newSource = source.slice(0);
            return newSource.sort(fn);
        };
        ColHelper.shuffle = function (source) {
            var array = source.slice(0);
            var amount = array.length;
            var LastCellTemporary;
            var pickedElement;
            while (amount) {
                pickedElement = Math.floor(Math.random() * amount--);
                LastCellTemporary = array[amount];
                array[amount] = array[pickedElement];
                array[pickedElement] = LastCellTemporary;
            }
            return array;
        };
        return ColHelper;
    })();
    ColTs.ColHelper = ColHelper;
})(ColTs || (ColTs = {}));
if (typeof exports != 'undefined') {
    exports.ColHelper = ColTs.ColHelper;
}
///<reference path="ColHelper.ts"/>
var ColTs;
(function (ColTs) {
    var Col = (function () {
        function Col(source) {
            this.source = null;
            this.source = source;
        }
        Col.prototype.all = function (condition) {
            for (var i = 0; i < this.source.length; i++) {
                if (!condition(this.source[i]))
                    return false;
            }
            return true;
        };
        Col.prototype.average = function (selector) {
            return this.sum(selector) / this.source.length;
        };
        Col.prototype.intersect = function (second) {
            return Col.of(ColTs.ColHelper.intersect(this.source, second.toArray()));
        };
        Col.prototype.randomize = function () {
            return Col.of(ColTs.ColHelper.shuffle(this.source));
        };
        Col.prototype.last = function (fn, defaultValue) {
            for (var i = this.source.length - 1; i >= 0; i--) {
                if (fn(this.source[i]))
                    return this.source[i];
            }
            return defaultValue;
        };
        Col.prototype.clone = function () {
            return Col.of(this.source.slice(0));
        };
        Col.prototype.normalize = function (selector, setter, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            if (this.length() == 0)
                return;
            var minValue = selector(this.minBy(selector));
            var maxValue = selector(this.maxBy(selector));
            this.each(function (item) {
                var rawValue = selector(item);
                var normValue = maxValue > minValue ? (rawValue - minValue) / (maxValue - minValue) : (max - min / 2);
                setter(item, normValue);
            });
        };
        Col.of = function (source) {
            return new Col(source);
        };
        Col.empty = function () {
            return new Col([]);
        };
        Col.prototype.unique = function () {
            var seen = {};
            return new Col(this.source.filter(function (item) {
                var itemKey = "" + item;
                return seen.hasOwnProperty(itemKey) ? false : (seen[itemKey] = true);
            }));
        };
        Col.prototype.length = function () {
            return this.source.length;
        };
        Col.prototype.getItem = function (index) {
            return this.source[index];
        };
        Col.prototype.each = function (fn) {
            ColTs.ColHelper.each(this.source, fn);
        };
        Col.prototype.toArray = function () {
            return this.source;
        };
        Col.prototype.count = function (fn) {
            return ColTs.ColHelper.count(this.source, fn);
        };
        Col.prototype.select = function (fn) {
            return Col.of(ColTs.ColHelper.select(this.source, fn));
        };
        Col.prototype.where = function (fn) {
            return Col.of(ColTs.ColHelper.where(this.source, fn));
        };
        Col.prototype.orderBy = function (fn) {
            return Col.of(ColTs.ColHelper.sort(this.source, function (a, b) { return fn(a) - fn(b); }));
        };
        Col.prototype.orderByDesc = function (fn) {
            return Col.of(ColTs.ColHelper.sort(this.source, function (a, b) { return fn(b) - fn(a); }));
        };
        Col.prototype.skip = function (amount) {
            if (amount >= this.source.length) {
                return Col.empty();
            }
            else {
                var newSource = this.source.slice(amount);
                return Col.of(newSource);
            }
        };
        Col.prototype.take = function (amount) {
            var newSource = amount < 0 ? this.source.slice(amount) : this.source.slice(0, amount);
            return Col.of(newSource);
        };
        Col.prototype.first = function (fn, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            for (var i = 0; i < this.source.length; i++) {
                if (fn(this.source[i]))
                    return this.source[i];
            }
            return defaultValue;
        };
        Col.prototype.contains = function (fn) {
            return ColTs.ColHelper.any(this.source, fn);
        };
        Col.prototype.unionCol = function (other) {
            var merged = this.source.concat(other.source);
            return Col.of(merged);
        };
        Col.prototype.union = function (other) {
            var merged = this.source.concat(other);
            return Col.of(merged);
        };
        Col.prototype.distinct = function (keySelector) {
            return Col.of(ColTs.ColHelper.distinct(this.source, keySelector));
        };
        Col.prototype.maxBy = function (selector) {
            return ColTs.ColHelper.maxBy(this.source, selector);
        };
        Col.prototype.minBy = function (selector) {
            return this.maxBy(function (e) { return -selector(e); });
        };
        Col.prototype.sum = function (selector) {
            return ColTs.ColHelper.aggregate(this.source, 0, function (item, prevSum) { return prevSum + selector(item); });
        };
        Col.prototype.groupBy = function (keySelector) {
            return ColTs.MapHelper.orderedGroupByString(this.source, keySelector);
        };
        Col.prototype.selectMany = function (selector) {
            var results = [];
            this.each(function (item) { return results = results.concat(selector(item)); });
            return Col.of(results);
        };
        Col.prototype.selectFirst = function (selector, validCondition) {
            for (var i = 0; i < this.source.length; i++) {
                var itemResult = selector(this.source[i]);
                if (validCondition(itemResult))
                    return itemResult;
            }
            return null;
        };
        Col.prototype.reverse = function () {
            return Col.of(this.source.reverse());
        };
        Col.prototype.toMap = function (keySelector, valueSelector) {
            var keyedCol = this.select(function (x) {
                return { key: keySelector(x), value: valueSelector(x) };
            });
            return new ColTs.Map(keyedCol.toArray());
        };
        return Col;
    })();
    ColTs.Col = Col;
})(ColTs || (ColTs = {}));
if (typeof exports != 'undefined') {
    exports.Col = ColTs.Col;
}
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColTs;
(function (ColTs) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map(source) {
            _super.call(this, source);
        }
        Map.ofHash = function (source) {
            return new Map(ColTs.MapHelper.toKeyedArray(source));
        };
        Map.ofUrlString = function (source) {
            return ColTs.MapHelper.ofHashString(source, "&", "=", function (raw) { return decodeURIComponent(raw); });
        };
        Map.emptyColMap = function () {
            return Map.ofHash({});
        };
        Map.prototype.get = function (key) {
            var kv = this.first(function (kv) { return kv.key == key; });
            return kv ? kv.value : null;
        };
        Map.prototype.containsKey = function (key) {
            var kv = this.first(function (kv) { return kv.key == key; });
            return !!kv;
        };
        Map.prototype.keys = function () {
            return this.select(function (x) { return x.key; });
        };
        Map.prototype.values = function () {
            return this.select(function (x) { return x.value; });
        };
        Map.prototype.selectValues = function (fn) {
            var raw = this.select(function (item) {
                return {
                    key: item.key,
                    value: fn(item)
                };
            });
            return new Map(raw.toArray());
        };
        return Map;
    })(ColTs.Col);
    ColTs.Map = Map;
})(ColTs || (ColTs = {}));
if (typeof exports != 'undefined') {
    exports.Map = ColTs.Map;
}
var ColTs;
(function (ColTs) {
    var MapHelper = (function () {
        function MapHelper() {
        }
        MapHelper.toKeyedArray = function (source) {
            var pairs = [];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    pairs.push({ key: key, value: source[key] });
                }
            }
            return pairs;
        };
        MapHelper.ofHashString = function (source, pairSeparator, keyValSeparator, valueTransform) {
            var pairsStringCol = ColTs.Col.of(source.split(pairSeparator));
            var hashCol = pairsStringCol.select(function (pairString) {
                var pair = pairString.split(keyValSeparator);
                var key = pair[0];
                var rawVal = pair[1];
                var val = valueTransform(rawVal);
                return { key: key, value: val };
            }).toArray();
            return new ColTs.Map(hashCol);
        };
        MapHelper.orderedGroupByString = function (source, keySelector) {
            var group = {};
            var ordered = [];
            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);
                if (!(key in group)) {
                    ordered.push({ key: key, value: [] });
                    group[key] = ordered.length - 1;
                }
                var index = group[key];
                ordered[index].value.push(item);
            }
            return new ColTs.Map(ordered);
        };
        return MapHelper;
    })();
    ColTs.MapHelper = MapHelper;
})(ColTs || (ColTs = {}));
if (typeof exports != 'undefined') {
    exports.MapHelper = ColTs.MapHelper;
}
/// <reference path="Col.ts" />
/// <reference path="ColHelper.ts" />
/// <reference path="ColMap.ts" />
/// <reference path="MapHelper.ts" />
