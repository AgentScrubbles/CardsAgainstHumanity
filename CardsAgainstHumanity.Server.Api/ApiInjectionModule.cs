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
