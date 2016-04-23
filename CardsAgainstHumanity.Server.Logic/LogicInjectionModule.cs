using Ninject.Extensions.Conventions;
using Ninject.Modules;

namespace CardsAgainstHumanity.Server.Logic
{
    public class LogicInjectionModule : NinjectModule
    {
        public override void Load()
        {
            Kernel.Bind(k => k.FromThisAssembly().SelectAllClasses().BindDefaultInterfaces());
        }
    }
}
