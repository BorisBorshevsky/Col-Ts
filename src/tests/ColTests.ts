///<reference path="../../typings/tsd.d.ts" />

///<reference path="../app/Col.ts"/>
///<reference path="../app/ColHelper.ts"/>
///<reference path="../app/ColMap.ts"/>
///<reference path="../app/MapHelper.ts"/>

var should:Internal = require('should');

module ColTs.Tests {

    describe('Col', () => {
        //ColTs.Col.of
        describe('.of', () =
            it('should return an instanceof ColTs.Col', () => {
                ColTs.Col.of([1, 2, 3]).should.be.an.instanceOf(ColTs.Col);
            });

        });

        //ColTs.Col.prototype.length
        describe('#length', () => {

            it('should return 0 for an empty collection', () => {
                var col = ColTs.Col.of([]);
                col.length().should.be.equal(0);
            });

            it('should return the correct length of a non-empty collection', () => {
                ColTs.Col.of<number>([1, 2, 3]).length().should.be.equal(3);
                ColTs.Col.of(new Array(100)).length().should.be.equal(100);
            });

        });

        //ColTs.Col.prototype.getItem
        describe('#getItem', () => {

            it('should return void when called with negative index', () => {
                should(ColTs.Col.of<number>([1, 2, 3]).getItem(-1)).be.equal(void 0);
                should(ColTs.Col.of(new Array(100)).getItem(-100)).be.equal(void 0);
            });

            it('should return the correct element when called with a valid index', () => {
                ColTs.Col.of<number>([1, 2, 3]).getItem(0).should.be.equal(1);
                ColTs.Col.of(["A", "B", "C"]).getItem(1).should.be.equal("B");
            });

            it('should return void when called with an index greater of collection length', () => {
                should(ColTs.Col.of([1, 2, 3]).getItem(3)).be.equal(void 0);
                should(ColTs.Col.of(new Array(100)).getItem(100)).be.equal(void 0);
            });

        });

        //ColTs.Col.prototype.each
        describe('#each', () => {

            it('should call the iterator for each element in the collection', () => {
                var arr = [1, 2, 3];
                var called = 0;
                ColTs.Col.of(arr).each((item, index) => {
                    called++;
                });
                called.should.be.equal(arr.length);
            });

            it('should supply the correct item and its index', () => {
                var arr = [1, 2, 3];
                ColTs.Col.of(arr).each((item, index) => {
                    item.should.be.equal(arr[index]);
                });
            });

        });

        //ColTs.Col.prototype.clone
        describe('#clone', () => {

            it('should return the exact clone of the collection', () => {
                const col1 = ColTs.Col.of([1, 2, 3]), col2 = col1.clone();
                col2.each((item, index) => {
                    item.should.be.equal(col1.getItem(index));
                });
            });

        });

        //ColTs.Col.prototype.clone
        describe('#select', () => {

            it('should project each element of the collection into a new form and return a new collection of the new items', () => {
                const col1 = ColTs.Col.of([1, 2, 3]);
                const col2 = col1.select((item) => item + 1);

                col2.each((item, index) => {
                    item.should.equal(col1.getItem(index) + 1);
                });
            });

        });

        //ColTs.Col.prototype.orderBy
        describe('#orderBy', () => {

            it('should order the items based on the provided score and return a new collection', () => {

                const col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [1, 2, 3, 4, 5];

                //Order the collection
                const orderedCol = col.orderBy((item) => {
                    return item;
                });

                //Check if ordered collection is in the correct sequence
                ordered.forEach((item, index) => {
                    orderedCol.getItem(index).should.equal(item);
                });

            });

        });

        //ColTs.Col.prototype.orderByDesc
        describe('#orderByDesc', () => {

            it('should order the items in descending order based on the provided score and return a new collection', () => {

                const col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [5, 4, 3, 2, 1];

                //Order the collection
                const orderedCol = col.orderByDesc((item) => {
                    return item;
                });

                //Check if ordered collection is in the correct sequence
                ordered.forEach((item, index) => {
                    orderedCol.getItem(index).should.equal(item);
                });

            });

        });

        ////ColTs.Col.prototype.orderByStable
        //describe('#orderByStable', () => {
        //
        //    it('should order the items in ascending order bases on the provided score', () => {
        //
        //        const col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [1, 2, 3, 4, 5];
        //
        //        //Order the collection
        //        const orderedCol = col.orderByStable((item) => {
        //            return item;
        //        });
        //
        //        //Check if ordered collection is in the correct sequence
        //        ordered.forEach((item, index) => {
        //            orderedCol.getItem(index).should.equal(item);
        //        });
        //
        //    });
        //
        //    it('should preserve the order of items with the same score', () => {
        //
        //        const col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]), ordered = [4, 5, 6, 1, 2, 3, 7, 8, 9];
        //
        //        //Order the collection in the order [numbers gte 4 & lte 6, numbers gte 1 & lte 3, numbers gte 7 & lte 8 ]
        //        const orderedCol = col.orderByStable((item) => {
        //            return item > 6 ? 3 : (item > 3 ? 1 : 2);
        //        });
        //
        //        //Check if the ordered collection has the correct sequence
        //        ordered.forEach((item, index) => {
        //            orderedCol.getItem(index).should.equal(item);
        //        });
        //
        //    });
        //
        //});

        //ColTs.Col.prototype.orderByStable
        //describe('#orderByDescStable', () => {
        //
        //    it('should order the items in descending order bases on the provided score', () => {
        //
        //        const col = ColTs.Col.of([5, 3, 1, 2, 4]), ordered = [5, 4, 3, 2, 1];
        //
        //        //Order the collection
        //        const orderedCol = col.orderByDescStable((item) => {
        //            return item;
        //        });
        //
        //        //Check if ordered collection is in the correct sequence
        //        ordered.forEach((item, index) => {
        //            orderedCol.getItem(index).should.equal(item);
        //        });
        //
        //    });
        //
        //    it('should preserve the order of items with the same score', () => {
        //
        //        const col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]), ordered = [7, 8, 9, 1, 2, 3, 4, 5, 6];
        //
        //        //Order the collection in the order [numbers gte 4 & lte 6, numbers gte 1 & lte 3, numbers gte 7 & lte 8 ]
        //        const orderedCol = col.orderByDescStable((item) => {
        //            return item > 6 ? 3 : (item > 3 ? 1 : 2);
        //        });
        //
        //        //Check if the ordered collection has the correct sequence
        //        ordered.forEach((item, index) => {
        //            orderedCol.getItem(index).should.equal(item);
        //        });
        //
        //    });
        //
        //});

        //ColTs.Col.prototype.where
        describe('#where', () => {

            it('should filter the collection based on the condition and return a new collection with filtered items', () => {

                const col = ColTs.Col.of([1, 3, 2, 7, 10, 0, 12]), filtered = ColTs.Col.of([7, 10, 12]);

                col.where((n) => n > 6).each((n, i) => {
                    filtered.getItem(i).should.equal(n);
                });

            });

        });

        //ColTs.Col.prototype.skip
        describe('#skip', () => {

            it('should bypass a specific number of items in the collection and return a new collection containing the remaining items', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7]), final = ColTs.Col.of([4, 5, 6, 7]);

                col.skip(3).each((n, i) => {
                    final.getItem(i).should.equal(n);
                });

            });

            it('should return an empty collection in case the specified number of items to skip is gte the length of the collection', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5, 6]);

                col.skip(col.length()).length().should.equal(0);
                col.skip(col.length() + 1).length().should.equal(0);

            });

        });

        //ColTs.Col.prototype.take
        describe('#take', () => {

            it('should return a new collection with the specified number of contiguous items from the start of the collection', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]), final = ColTs.Col.of([1, 2, 3]);

                col.take(3).each((n, i) => {
                    final.getItem(i).should.equal(n);
                });

            });

            it('should return all existing items in case the specified number of items to take is gte the length of the collection', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                col.take(col.length()).length().should.equal(col.length());
                col.take(col.length() + 1).length().should.equal(col.length());

            });

            it('should return a new collection with the specified number of contiguoug items from the end of the collection', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]), final = [3, 4, 5];

                col.take(-3).each((n, i) => {
                    n.should.equal(final[i]);
                });

                col.take(-col.length() - 1).length().should.equal(col.length());

            });

        });

        //ColTs.Col.prototype.first
        describe('#first', () => {

            it('should return the first item in the collection that satisfies the given condition', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                col.first((n) => n > 4, null).should.equal(5);

            });

            it('should return the default value if no element satisfies the condition', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                should(col.first((n) => n > 5, null)).equal(null);

            });

        });

        //ColTs.Col.prototype.last
        describe('#last', () => {

            it('should return the last item in the collection that satisfies the given condition', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8]);

                col.last((n) => n > 4, null).should.equal(8);

            });

            it('should return the default value if no element satisfies the condition', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                should(col.first((n) => n > 5, null)).equal(null);

            });

        });

        //ColTs.Col.prototype.count
        describe('#count', () => {

            it('should return the number of times the given condition is satisfied by the items of the collection', () => {
                const col = ColTs.Col.of([1, 4, 2, 3, 5, 1, 2]);
                col.count((n) => n === 1 || n === 2).should.equal(4);
                ColTs.Col.of([]).count((n) => n > 0).should.equal(0);
            });

        });

        //ColTs.Col.prototype.contains
        describe('#contains', () => {

            it('should return a boolean indicating whether the collection contains an element that satisfies the condition', () => {
                const col = ColTs.Col.of([1, 2, 3, 4, 5]);
                should(col.contains((n) => n > 4)).equal(true);
                should(col.contains((n) => n > 5)).equal(false);
            });

        });

        //ColTs.Col.prototype.unionCol
        describe('#unionCol', () => {

            it('should combine two collections of the same type into one collection and return the new collection', () => {

                const col1 = ColTs.Col.of([1, 2, 3, 4, 5]), col2 = ColTs.Col.of([5, 6, 7, 8, 9, 10]);
                const final = ColTs.Col.of([1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10]);

                col1.unionCol(col2).each((n, i) => {
                    final.getItem(i).should.equal(n);
                });

            });

        });

        //ColTs.Col.prototype.union
        describe('#union', () => {

            it('should combine a collection and an array of the same type into one collection and return the new collection', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]), arr = [6, 7, 8, 9, 10];
                const final = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

                col.union(arr).each((n, i) => final.getItem(i).should.equal(n));

            });

        });

        //ColTs.Col.prototype.distinct
        describe('#distinct', () => {

            it('should return a collection containing the unique elements of the collection identified by the specified key selector', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5, 6, 7]);
                const final = ColTs.Col.of([1, 2]);

                //Select the first odd and the first even number
                col.distinct((n) => (n % 2) == 0 ? "even" : "odd").each((n, i) => {
                    final.getItem(i).should.equal(n);
                });

            });

        });

        //ColTs.Col.prototype.sum
        describe('#sum', () => {

            it('should return the sum of specific selector variable from the collection', () => {

                const col = ColTs.Col.of<string>(['A', 'B', 'C']);

                //Get the sum of ASCII values of the characters in the collection
                col.sum((char) => char.charCodeAt(0)).should.equal(198);

            });

        });

        //ColTs.Col.prototype.average
        describe('#average', () => {

            it('should return the average of specific selector variable from the collection', () => {

                const col = ColTs.Col.of<string>(['A', 'B', 'C']);

                //Get the average of ASCII values of the characters in the collection
                col.average((char) => char.charCodeAt(0)).should.equal(66);

            });

        });

        //ColTs.Col.prototype.maxBy
        describe('#maxBy', () => {

            it('should return an element for the collection with the maximum return value of the selector', () => {

                const col = ColTs.Col.of<string>(['A', 'B', 'C']);

                //Get the maximum out of ASCII values of the characters in the collection
                col.maxBy((char) => char.charCodeAt(0)).should.equal('C');

            });

            it('should return null when the collection is empty', () => {
                should(ColTs.Col.of<number>([]).maxBy((n) => n)).equal(null);
            })

        });

        //ColTs.Col.prototype.minBy
        describe('#minBy', () => {

            it('should return an element for the collection with the minimum return value of the selector', () => {

                const col = ColTs.Col.of<string>(['A', 'B', 'C']);

                //Get the minimum out of ASCII values of the characters in the collection
                col.minBy((char) => char.charCodeAt(0)).should.equal('A');

            });

            it('should return null when the collection is empty', () => {
                should(ColTs.Col.of<number>([]).minBy((n) => n)).equal(null);
            });

        });

        //ColTs.Col.prototype.groupBy
        describe('#groupBy', () => {

            it('should group the elements of the collection into a ColMap by specific selector, where the selector will be the key, and the values will be an array of the items matched to the specific selector, and return the new ColMap', () => {

                const col = ColTs.Col.of(['Abc', 'Abd', 'Bcd', 'Efg', 'Ekh']);
                const map = col.groupBy((str) => {
                    return str.substr(0, 1);
                });

                map.keys().toArray().should.containDeep(['A', 'B', 'E']);
                map.get('A').should.containDeep(['Abc', 'Abd']);
                map.get('B').should.containDeep(['Bcd']);
                map.get('E').should.containDeep(['Efg', 'Ekh']);

            });

        });

        //ColTs.Col.prototype.selectMany
        describe('#selectMany', () => {

            it('should project each element of the collection to a new Col and then flatten the resulting collection into one collection and then return the result collection', () => {

                const col = ColTs.Col.of([1, 2, 3]), final = ColTs.Col.of([1, 2, 3, 2, 3, 4, 3, 4, 5]);

                col.selectMany((n) => [n, n + 1, n + 2]).each((n, i) => {
                    final.getItem(i).should.equal(n);
                });

            });

        });

        //ColTs.Col.prototype.selectFirst
        describe('#selectFirst', () => {

            it('should project the first element by a selector that matches the condition and return the projected item', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                col.selectFirst((n) => {
                    return n + 1;
                }, (n) => {
                    return n > 4
                }).should.equal(5);

            });

        });

        //ColTs.Col.prototype.toMap
        describe('#toMap', () => {

            it('should convert the collection to a ColMap by specifying a key and a value for each element', () => {

                const col = ColTs.Col.of([65, 66, 67]);
                const map = col.toMap((n) => {
                    return String.fromCharCode(n);
                }, (n) => {
                    return n;
                });

                map.keys().toArray().should.containDeep(['A', 'B', 'C']);
                map.values().toArray().should.containDeep([65, 66, 67]);
            });

        });

        //ColTs.Col.prototype.randomize
        describe('#randomize', () => {

            it('should return a new collection with a shuffled order of the same items', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 5]);

                //To check if the order is random, compare it with the order of the original collection
                //If it is not the same (even a single element is misplaced), then it is random
                //EDGE CASE : The random elements get the exact same order. But its unlikely. Don't freak out if this test fails one.

                const randomized = col.randomize();

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

        //ColTs.Col.prototype.all
        describe('#all', () => {

            it('should return whether all elements of a collection satisfy a given condition', () => {
                const col = ColTs.Col.of([1, 2, 3, 4, 5]);
                should(col.all((n) => n > 0)).equal(true);
            });

        });

        //ColTs.Col.prototype.unique
        describe('#unique', () => {

            it('should return a Collection of the unique elements from the original Collection by reference', () => {

                const col = ColTs.Col.of([1, 2, 3, 4, 4, 5, 6, 6]), final = [1, 2, 3, 4, 5, 6];

                col.unique().each((n, i) => {
                    n.should.equal(final[i]);
                });

            });

        });

    });

//ColTs.ColMap
    describe('ColMap', () => {

        //ColTs.ColMap.ofHash
        describe('.ofHash', () => {

            it('should return an instance of ColTs.ColMap', () => {
                ColTs.Map.ofHash({hello: "testing"}).should.be.instanceOf(ColTs.Map);
            });

        });

        //ColTs.ColMap.prototype.get
        describe('#get', () => {

            it('should return the value object for a given key', () => {
                ColTs.Map.ofHash({testing: "value"}).get('testing').should.equal("value");
            });

            it('should return null if the key does not exist', () => {
                should(ColTs.Map.ofHash({testing: "value"}).get('testing2')).equal(null);
            });

        });

        //ColTs.ColMap.prototype.containsKey
        describe('#containsKey', () => {

            it('should return true if the key exists', () => {
                ColTs.Map.ofHash({testing: "value"}).containsKey("testing").should.equal(true);
            });

            it('should return false if the key exists', () => {
                ColTs.Map.ofHash({testing: "value"}).containsKey("testing2").should.equal(false);
            });

        });

        //ColTs.ColMap.prototype.keys
        describe('#keys', () => {

            it('should return a collection of keys in the hash', () => {
                const keys = ["a", "b", "c", "d"];
                ColTs.Map.ofHash({a: 1, b: 2, c: 3, d: 4}).keys().each((c, i) => {
                    c.should.equal(keys[i]);
                });
            });

        });

        //ColTs.ColMap.prototype.values
        describe('#values', () => {

            it('should return a collection of values in the hash', () => {
                const values = [1, 2, 3, 4];
                ColTs.Map.ofHash({a: 1, b: 2, c: 3, d: 4}).values().each((n, i) => {
                    n.should.equal(values[i]);
                });
            });

        });

        //ColTs.ColMap.prototype.selectValues
        describe('#selectValues', () => {

            it('should project each key-value pair of the collection into a new form and return the new ColMap', () => {
                ColTs.Map.ofHash({a: 1}).selectValues((item) => {
                    return item.value + 1;
                }).get('a').should.equal(2);
            });

        });

    });
}