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
///<reference path="../typings/tsd.d.ts" />
///<reference path="../typings/should/should.d.ts"/>
///<reference path="../src/app/Col.ts"/>
///<reference path="../src/app/ColHelper.ts"/>
///<reference path="../src/app/ColMap.ts"/>
///<reference path="../src/app/MapHelper.ts"/>
var should = require('should');
var ColTs;
(function (ColTs) {
    var Tests;
    (function (Tests) {
        describe('Col', function () {
            describe('.of', function () {
                it('should return an instanceof ColTs.Col', function () {
                    ColTs.Col.of([1, 2, 3]).should.be.an.instanceOf(ColTs.Col);
                });
            });
            describe('#length', function () {
                it('should return 0 for an empty collection', function () {
                    var col = ColTs.Col.of([]);
                    col.length().should.be.equal(0);
                });
                it('should return the correct length of a non-empty collection', function () {
                    ColTs.Col.of([1, 2, 3]).length().should.be.equal(3);
                    ColTs.Col.of(new Array(100)).length().should.be.equal(100);
                });
            });
            describe('#getItem', function () {
                it('should return void when called with negative index', function () {
                    should(ColTs.Col.of([1, 2, 3]).getItem(-1)).be.equal(void 0);
                    should(ColTs.Col.of(new Array(100)).getItem(-100)).be.equal(void 0);
                });
                it('should return the correct element when called with a valid index', function () {
                    ColTs.Col.of([1, 2, 3]).getItem(0).should.be.equal(1);
                    ColTs.Col.of(["A", "B", "C"]).getItem(1).should.be.equal("B");
                });
                it('should return void when called with an index greater of collection length', function () {
                    should(ColTs.Col.of([1, 2, 3]).getItem(3)).be.equal(void 0);
                    should(ColTs.Col.of(new Array(100)).getItem(100)).be.equal(void 0);
                });
            });
            describe('#each', function () {
                it('should call the iterator for each element in the collection', function () {
                    var arr = [1, 2, 3];
                    var called = 0;
                    ColTs.Col.of(arr).each(function (item, index) {
                        called++;
                    });
                    called.should.be.equal(arr.length);
                });
                it('should supply the correct item and its index', function () {
                    var arr = [1, 2, 3];
                    ColTs.Col.of(arr).each(function (item, index) {
                        item.should.be.equal(arr[index]);
                    });
                });
            });
            describe('#clone', function () {
                it('should return the exact clone of the collection', function () {
                    var col1 = ColTs.Col.of([1, 2, 3]), col2 = col1.clone();
                    col2.each(function (item, index) {
                        item.should.be.equal(col1.getItem(index));
                    });
                });
            });
            describe('#select', function () {
                it('should project each element of the collection into a new form and return a new collection of the new items', function () {
                    var col1 = ColTs.Col.of([1, 2, 3]);
                    var col2 = col1.select(function (item) { return item + 1; });
                    col2.each(function (item, index) {
                        item.should.equal(col1.getItem(index) + 1);
                    });
                });
            });
            describe('#orderBy', function () {
                it('should order the items based on the provided score and return a new collection', function () {
                    var col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [1, 2, 3, 4, 5];
                    var orderedCol = col.orderBy(function (item) {
                        return item;
                    });
                    ordered.forEach(function (item, index) {
                        orderedCol.getItem(index).should.equal(item);
                    });
                });
            });
            describe('#orderByDesc', function () {
                it('should order the items in descending order based on the provided score and return a new collection', function () {
                    var col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [5, 4, 3, 2, 1];
                    var orderedCol = col.orderByDesc(function (item) {
                        return item;
                    });
                    ordered.forEach(function (item, index) {
                        orderedCol.getItem(index).should.equal(item);
                    });
                });
            });
            describe('#where', function () {
                it('should filter the collection based on the condition and return a new collection with filtered items', function () {
                    var col = ColTs.Col.of([1, 3, 2, 7, 10, 0, 12]), filtered = ColTs.Col.of([7, 10, 12]);
                    col.where(function (n) { return n > 6; }).each(function (n, i) {
                        filtered.getItem(i).should.equal(n);
                    });
                });
            });
            describe('#skip', function () {
                it('should bypass a specific number of items in the collection and return a new collection containing the remaining items', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7]), final = ColTs.Col.of([4, 5, 6, 7]);
                    col.skip(3).each(function (n, i) {
                        final.getItem(i).should.equal(n);
                    });
                });
                it('should return an empty collection in case the specified number of items to skip is gte the length of the collection', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5, 6]);
                    col.skip(col.length()).length().should.equal(0);
                    col.skip(col.length() + 1).length().should.equal(0);
                });
            });
            describe('#take', function () {
                it('should return a new collection with the specified number of contiguous items from the start of the collection', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]), final = ColTs.Col.of([1, 2, 3]);
                    col.take(3).each(function (n, i) {
                        final.getItem(i).should.equal(n);
                    });
                });
                it('should return all existing items in case the specified number of items to take is gte the length of the collection', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    col.take(col.length()).length().should.equal(col.length());
                    col.take(col.length() + 1).length().should.equal(col.length());
                });
                it('should return a new collection with the specified number of contiguoug items from the end of the collection', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]), final = [3, 4, 5];
                    col.take(-3).each(function (n, i) {
                        n.should.equal(final[i]);
                    });
                    col.take(-col.length() - 1).length().should.equal(col.length());
                });
            });
            describe('#first', function () {
                it('should return the first item in the collection that satisfies the given condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    col.first(function (n) { return n > 4; }, null).should.equal(5);
                });
                it('should return the default value if no element satisfies the condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    should(col.first(function (n) { return n > 5; }, null)).equal(null);
                });
            });
            describe('#last', function () {
                it('should return the last item in the collection that satisfies the given condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]);
                    col.last(function (n) { return n > 4; }, null).should.equal(8);
                });
                it('should return the default value if no element satisfies the condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    should(col.first(function (n) { return n > 5; }, null)).equal(null);
                });
            });
            describe('#count', function () {
                it('should return the number of times the given condition is satisfied by the items of the collection', function () {
                    var col = ColTs.Col.of([1, 4, 2, 3, 5, 1, 2]);
                    col.count(function (n) { return n === 1 || n === 2; }).should.equal(4);
                    ColTs.Col.of([]).count(function (n) { return n > 0; }).should.equal(0);
                });
            });
            describe('#contains', function () {
                it('should return a boolean indicating whether the collection contains an element that satisfies the condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    should(col.contains(function (n) { return n > 4; })).equal(true);
                    should(col.contains(function (n) { return n > 5; })).equal(false);
                });
            });
            describe('#unionCol', function () {
                it('should combine two collections of the same type into one collection and return the new collection', function () {
                    var col1 = ColTs.Col.of([1, 2, 3, 4, 5]), col2 = ColTs.Col.of([5, 6, 7, 8, 9, 10]);
                    var final = ColTs.Col.of([1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10]);
                    col1.unionCol(col2).each(function (n, i) {
                        final.getItem(i).should.equal(n);
                    });
                });
            });
            describe('#union', function () {
                it('should combine a collection and an array of the same type into one collection and return the new collection', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]), arr = [6, 7, 8, 9, 10];
                    var final = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    col.union(arr).each(function (n, i) { return final.getItem(i).should.equal(n); });
                });
            });
            describe('#distinct', function () {
                it('should return a collection containing the unique elements of the collection identified by the specified key selector', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7]);
                    var final = ColTs.Col.of([1, 2]);
                    col.distinct(function (n) { return (n % 2) == 0 ? "even" : "odd"; }).each(function (n, i) {
                        final.getItem(i).should.equal(n);
                    });
                });
            });
            describe('#sum', function () {
                it('should return the sum of specific selector variable from the collection', function () {
                    var col = ColTs.Col.of(['A', 'B', 'C']);
                    col.sum(function (char) { return char.charCodeAt(0); }).should.equal(198);
                });
            });
            describe('#average', function () {
                it('should return the average of specific selector variable from the collection', function () {
                    var col = ColTs.Col.of(['A', 'B', 'C']);
                    col.average(function (char) { return char.charCodeAt(0); }).should.equal(66);
                });
            });
            describe('#maxBy', function () {
                it('should return an element for the collection with the maximum return value of the selector', function () {
                    var col = ColTs.Col.of(['A', 'B', 'C']);
                    col.maxBy(function (char) { return char.charCodeAt(0); }).should.equal('C');
                });
                it('should return null when the collection is empty', function () {
                    should(ColTs.Col.of([]).maxBy(function (n) { return n; })).equal(null);
                });
            });
            describe('#minBy', function () {
                it('should return an element for the collection with the minimum return value of the selector', function () {
                    var col = ColTs.Col.of(['A', 'B', 'C']);
                    col.minBy(function (char) { return char.charCodeAt(0); }).should.equal('A');
                });
                it('should return null when the collection is empty', function () {
                    should(ColTs.Col.of([]).minBy(function (n) { return n; })).equal(null);
                });
            });
            describe('#groupBy', function () {
                it('should group the elements of the collection into a ColMap by specific selector, where the selector will be the key, and the values will be an array of the items matched to the specific selector, and return the new ColMap', function () {
                    var col = ColTs.Col.of(['Abc', 'Abd', 'Bcd', 'Efg', 'Ekh']);
                    var map = col.groupBy(function (str) {
                        return str.substr(0, 1);
                    });
                    map.keys().toArray().should.containDeep(['A', 'B', 'E']);
                    map.get('A').should.containDeep(['Abc', 'Abd']);
                    map.get('B').should.containDeep(['Bcd']);
                    map.get('E').should.containDeep(['Efg', 'Ekh']);
                });
            });
            describe('#selectMany', function () {
                it('should project each element of the collection to a new Col and then flatten the resulting collection into one collection and then return the result collection', function () {
                    var col = ColTs.Col.of([1, 2, 3]), final = ColTs.Col.of([1, 2, 3, 2, 3, 4, 3, 4, 5]);
                    col.selectMany(function (n) { return [n, n + 1, n + 2]; }).each(function (n, i) {
                        final.getItem(i).should.equal(n);
                    });
                });
            });
            describe('#selectFirst', function () {
                it('should project the first element by a selector that matches the condition and return the projected item', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    col.selectFirst(function (n) {
                        return n + 1;
                    }, function (n) {
                        return n > 4;
                    }).should.equal(5);
                });
            });
            describe('#toMap', function () {
                it('should convert the collection to a ColMap by specifying a key and a value for each element', function () {
                    var col = ColTs.Col.of([65, 66, 67]);
                    var map = col.toMap(function (n) {
                        return String.fromCharCode(n);
                    }, function (n) {
                        return n;
                    });
                    map.keys().toArray().should.containDeep(['A', 'B', 'C']);
                    map.values().toArray().should.containDeep([65, 66, 67]);
                });
            });
            describe('#randomize', function () {
                it('should return a new collection with a shuffled order of the same items', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    var randomized = col.randomize();
                    var indexIsDiff = false;
                    for (var i = 0; i < randomized.length(); i++) {
                        if (randomized.getItem(i) !== col.getItem(i)) {
                            indexIsDiff = true;
                            break;
                        }
                    }
                    should(indexIsDiff).equal(true);
                });
            });
            describe('#all', function () {
                it('should return whether all elements of a collection satisfy a given condition', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 5]);
                    should(col.all(function (n) { return n > 0; })).equal(true);
                });
            });
            describe('#unique', function () {
                it('should return a Collection of the unique elements from the original Collection by reference', function () {
                    var col = ColTs.Col.of([1, 2, 3, 4, 4, 5, 6, 6]), final = [1, 2, 3, 4, 5, 6];
                    col.unique().each(function (n, i) {
                        n.should.equal(final[i]);
                    });
                });
            });
        });
        describe('ColMap', function () {
            describe('.ofHash', function () {
                it('should return an instance of ColTs.ColMap', function () {
                    ColTs.Map.ofHash({ hello: "testing" }).should.be.instanceOf(ColTs.Map);
                });
            });
            describe('#get', function () {
                it('should return the value object for a given key', function () {
                    ColTs.Map.ofHash({ testing: "value" }).get('testing').should.equal("value");
                });
                it('should return null if the key does not exist', function () {
                    should(ColTs.Map.ofHash({ testing: "value" }).get('testing2')).equal(null);
                });
            });
            describe('#containsKey', function () {
                it('should return true if the key exists', function () {
                    ColTs.Map.ofHash({ testing: "value" }).containsKey("testing").should.equal(true);
                });
                it('should return false if the key exists', function () {
                    ColTs.Map.ofHash({ testing: "value" }).containsKey("testing2").should.equal(false);
                });
            });
            describe('#keys', function () {
                it('should return a collection of keys in the hash', function () {
                    var keys = ["a", "b", "c", "d"];
                    ColTs.Map.ofHash({ a: 1, b: 2, c: 3, d: 4 }).keys().each(function (c, i) {
                        c.should.equal(keys[i]);
                    });
                });
            });
            describe('#values', function () {
                it('should return a collection of values in the hash', function () {
                    var values = [1, 2, 3, 4];
                    ColTs.Map.ofHash({ a: 1, b: 2, c: 3, d: 4 }).values().each(function (n, i) {
                        n.should.equal(values[i]);
                    });
                });
            });
            describe('#selectValues', function () {
                it('should project each key-value pair of the collection into a new form and return the new ColMap', function () {
                    ColTs.Map.ofHash({ a: 1 }).selectValues(function (item) {
                        return item.value + 1;
                    }).get('a').should.equal(2);
                });
            });
        });
    })(Tests = ColTs.Tests || (ColTs.Tests = {}));
})(ColTs || (ColTs = {}));
/// <reference path="../ColTests.ts" />
