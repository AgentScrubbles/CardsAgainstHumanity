using Ninject.Modules;
using Ninject.Extensions.Conventions;

namespace CardsAgainstHumanity.Server.Data
{
    public class DataInjectionModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind(k => k.FromThisAssembly().SelectAllClasses().BindDefaultInterfaces());
        }
    }
}
