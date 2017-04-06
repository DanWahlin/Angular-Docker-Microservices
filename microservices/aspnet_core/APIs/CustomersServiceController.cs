using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspNetCorePostgreSQLDockerApp.Models;
using AspNetCorePostgreSQLDockerApp.Repository;
using Microsoft.AspNetCore.Http;

namespace AspNetCorePostgreSQLDockerApp.Apis
{
    [Route("api")]
    public class CustomersServiceController : Controller
    {
        ICustomersRepository _repo;

        public CustomersServiceController(ICustomersRepository repo) {
          _repo = repo;
        }

        [HttpGet("states")]
        [ProducesResponseType(typeof(List<State>), 200)]
        [ProducesResponseType(typeof(List<State>), 404)]
        public async Task<ActionResult> States() {
          var states = await _repo.GetStatesAsync();
          if (states == null) {
            return NotFound();
          }
          return Ok(states);
        }

    }

    public static class HttpRequestExtensions
    {
        public static Uri ToUri(this HttpRequest request)
        {
            var hostComponents = request.Host.ToUriComponent().Split(':');

            var builder = new UriBuilder
            {
                Scheme = request.Scheme,
                Host = hostComponents[0],
                Path = request.Path,
                Query = request.QueryString.ToUriComponent()
            };

            if (hostComponents.Length == 2)
            {
                builder.Port = Convert.ToInt32(hostComponents[1]);
            }

            return builder.Uri;
        }
    }
}
