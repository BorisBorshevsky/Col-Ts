module ColTs {

    export interface ColMapBase<E> {
        get(key:string):E
        containsKey(key:string):boolean
        keys():Col<string>
        values():Col<E>
        selectValues<R>(fn:(item:Keyed<E>) => R):Map<R>
    }


    export interface Keyed<V> {
        key:string;
        value:V
    }

    export class Map<E> extends Col<Keyed<E>> {

        constructor(source:Keyed<E>[]) {
            super(source);
        }


        static ofHash<E>(source:{[index:string]: E}):Map<E> {
            return new Map<E>(MapHelper.toKeyedArray(source));
        }

        static ofUrlString(source:string):Map<string> {
            return MapHelper.ofHashString(source, "&", "=", (raw:string) => decodeURIComponent(raw));
        }

        static emptyColMap<T>():Map<T> {
            return Map.ofHash<T>({});
        }

        get(key:string):E {
            var kv = this.first((kv:Keyed<E>) => kv.key == key);
            return kv ? kv.value : null;
        }

        containsKey(key:string):boolean {
            var kv = this.first((kv:Keyed<E>) => kv.key == key);
            return !!kv;
        }

        keys():Col<string> {
            return this.select((x:Keyed<E>) => x.key);
        }

        values():Col<E> {
            return this.select((x:Keyed<E>) => x.value);
        }

        selectValues<R>(fn:(item:Keyed<E>) => R):Map<R> {
            var raw:Col<Keyed<R>> = this.select((item:Keyed<E>) => {
                return {
                    key: item.key,
                    value: fn(item)
                };
            });
            return new Map<R>(raw.toArray());
        }

        toHashmap<R>(keySelector:(item:string) => string, valueSelector:(item:E) => R):{[index:string]: R} {
            return MapHelper.toHashmap(this.source, keySelector, valueSelector);
        }

    }
}

declare var exports:any;
if (typeof exports != 'undefined') {
    exports.Map = ColTs.Map;
}