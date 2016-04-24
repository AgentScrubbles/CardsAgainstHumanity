using CardsAgainstHumanity.Server.Api.Hubs;
using CardsAgainstHumanity.Server.Logic.Interfaces;
using Microsoft.AspNet.SignalR;
using Ninject.Extensions.Conventions;
using Ninject.Modules;

namespace CardsAgainstHumanity.Server.Api
{
    public class ApiInjectionModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind(k => k.FromThisAssembly().SelectAllClasses().BindDefaultInterfaces());
        }
    }
}
