using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using CardsAgainstHumanity.Shared.Exceptions;
using Newtonsoft.Json;

namespace CardsAgainstHumanity.Plug
{
    public class Portal
    {
        public static Portal Instance => _instance ?? (_instance = new Portal());
        public static string BaseUri { get; set; }
        private static Portal _instance;
        private Portal()
        {
            
        }
        

        public async Task<T> Get<T>(string uri)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // New code:
                HttpResponseMessage response = await client.GetAsync(uri);
                return await ValidateOrThrow<T>(response);
            }
        }

        public async Task<S> Post<T, S>(string uri, T model)
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
