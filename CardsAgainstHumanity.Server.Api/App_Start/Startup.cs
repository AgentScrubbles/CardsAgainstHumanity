using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CardsAgainstHumanity.Server.Api.App_Start.Startup))]

namespace CardsAgainstHumanity.Server.Api.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR("/signalr", new HubConfiguration {EnableJSONP = true, EnableDetailedErrors = true});
        }
    }
}
