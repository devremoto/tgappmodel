using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        WebHost.CreateDefaultBuilder(args)
             .UseStartup<Startup>()
             .Build().Run();
    }
}
