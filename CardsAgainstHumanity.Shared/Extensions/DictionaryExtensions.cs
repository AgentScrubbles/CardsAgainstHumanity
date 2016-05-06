using System.Collections.Generic;

namespace CardsAgainstHumanity.Shared.Extensions
{
    public static class DictionaryExtensions
    {
        public static TValue Get<TKey, TValue>(this IDictionary<TKey, TValue> dictionary, TKey key)
        {
            if (key == null) return default(TValue);
            return dictionary.ContainsKey(key) ? dictionary[key] : default(TValue);
        }
    }
}
