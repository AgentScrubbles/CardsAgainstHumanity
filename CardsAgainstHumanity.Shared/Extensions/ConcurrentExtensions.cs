using System;
using System.Linq;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CardsAgainstHumanity.Shared.Extensions
{
    public static class ConcurrentExtensions
    {
        public static ConcurrentDictionary<TKey, TValue> ToConcurrentDictionary<TSource, TKey, TValue>(
            this IEnumerable<TSource> source, Func<TSource, TKey> keySelector, Func<TSource, TValue> valueSelector)
        {
            var dict = new ConcurrentDictionary<TKey, TValue>();
            foreach(var k in source.Select(k => new {key = keySelector.Invoke(k), value = valueSelector.Invoke(k) }))
            {
                dict[k.key] = k.value;
            }
            return dict;
        }

        public static Task<ConcurrentDictionary<TKey, TValue>> ToConcurrentDictionaryAsync<TSource, TKey, TValue>(
            this IEnumerable<TSource> source, Func<TSource, TKey> keySelector, Func<TSource, TValue> valueSelector)
        {
            return Task.Run(() => source.ToConcurrentDictionary(keySelector, valueSelector));
        }
    }
}
