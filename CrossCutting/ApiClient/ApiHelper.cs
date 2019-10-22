using CrossCutting.Extensions;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CrossCutting.ApiClient
{
    public static class ApiHelper
    {
        public static async Task<T> Get<T>(string url, AuthenticationHeaderValue auth = null)
        {
            using (var client = new HttpClient())
            {
                Headers(client, auth);

                HttpResponseMessage response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return result.JsonDeserialize<T>();
                }
                return default(T);
            }
        }

		public static async Task<string> Get(string url, AuthenticationHeaderValue auth = null)
		{
			using (var client = new HttpClient())
			{
				Headers(client, auth);
				var result = "";
				HttpResponseMessage response = await client.GetAsync(url);
				if (response.IsSuccessStatusCode)
				{
					result = await response.Content.ReadAsStringAsync();
				}
				return result;
			}
		}

		private static void Headers(HttpClient client, AuthenticationHeaderValue auth)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            if (auth != null)
            {
                client.DefaultRequestHeaders.Authorization = auth;
            }
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public static async Task<TResult> Post<T,TResult>(string url, T obj, AuthenticationHeaderValue auth = null)
        {
            using (var client = new HttpClient())
            {
                Headers(client, auth);
                var stringContent = new StringContent(obj.JsonSerialize());
                HttpResponseMessage response = await client.PostAsync(url, stringContent);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return result.JsonDeserialize<TResult>();
                }
                return default(TResult);
            }
        }
    }
}
