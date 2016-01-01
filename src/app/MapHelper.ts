
module ColTs {

    export class MapHelper {

        static toKeyedArray<T>(source:{[index:string]: T}):Keyed<T>[] {
            var pairs:Keyed<T>[] = [];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    pairs.push({key: key, value: source[key]});
                }
            }
            return pairs;
        }

        static ofHashString<T>(source:string, pairSeparator:string, keyValSeparator:string, valueTransform:(value:string) => T):Map<T> {

            var pairsStringCol = Col.of(source.split(pairSeparator));
            var hashCol = pairsStringCol.select(pairString => {
                var pair = pairString.split(keyValSeparator);
                var key = pair[0];
                var rawVal = pair[1];
                var val = valueTransform(rawVal);

                return {key: key, value: val};
            }).toArray();

            return new Map<T>(hashCol);
        }

        static orderedGroupByString<T>(source:Array<T>, keySelector:(item:T) => string):Map<T[]> {
            var group:{[index:string]: number} = {};
            var ordered:Keyed<T[]>[] = [];

            for (var i = 0; i < source.length; i++) {
                var item = source[i];
                var key = keySelector(item);

                if (!(key in group)) {
                    ordered.push({key: key, value: []});
                    group[key] = ordered.length - 1;
                }

                var index = group[key];
                ordered[index].value.push(item);
            }

            return new Map<T[]>(ordered);
        }


        static toHashmap<T, R>(source:Keyed<T>[], keySelector:(key:string) => string, valueSelector:(value:T) => R ):{[key:string]:R}{
            var hashmap:{[index:string]: R} = {};

            for (var i = 0; i < source.length; i++) {
                var item:Keyed<T> = source[i];
                var resultItem = valueSelector(item.value);
                var key = keySelector(item.key);
                hashmap[key] = resultItem;
            }
            return hashmap;

        }

    }
}

declare var exports: any;
if(typeof exports != 'undefined') {
    exports.MapHelper = ColTs.MapHelper;
}