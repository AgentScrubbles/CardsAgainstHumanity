using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using CardsAgainstHumanity.Shared.Exceptions;
using Newtonsoft.Json;

namespace CardsAgainstHumanity.Plug
{
    public class Portal
    {
        public static Portal Instance => _instance ?? (_instance = new Portal());
        public static string BaseUri => "http://localhost:63118/api/";
        private static Portal _instance;
        private Portal()
        {
            
        }
        

        public async Task<T> Get<T>(string uri, dynamic model = null)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                
                var paramUri = model == null ? uri : GetQueryString(uri, model);

                // New code:
                var response = await client.GetAsync(paramUri);
                return await ValidateOrThrow<T>(response);
            }
        }

        private string GetQueryString(string uri, dynamic model)
        {
            var dict = (IDictionary<string, object>) model;
            if (dict == null || !dict.Any()) return uri;
            var sb = new StringBuilder(uri);
            var first = true;
            foreach (var param in dict)
            {
                if (first)
                {
                    sb.Append("?");
                    first = false;
                }
                else
                {
                    sb.Append("&");
                }
                sb.Append(param.Key + "=" + param.Value);
            }
            return sb.ToString();
        }

        public async Task<S> Post<S>(string uri, dynamic model)
        {
            using (var client = new HttpClient())
            {
                var ser = JsonConvert.SerializeObject(model);
                var response = await client.PostAsync(uri, new StringContent(ser));
                return await ValidateOrThrow<S>(response);
            }
        }

        private async Task<T> ValidateOrThrow<T>(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                var t = await response.Content.ReadAsStringAsync();
                if (typeof(T) == typeof(string))
                {
                    t = JsonConvert.SerializeObject(t);
                }
                return JsonConvert.DeserializeObject<T>(t);
            }
            throw new ApiException(response.ReasonPhrase);
        }
    }
}
