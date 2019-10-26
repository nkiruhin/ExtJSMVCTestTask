using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using ExtJSMVCTestTask.Abstract;
using ExtJSMVCTestTask.Services;
using System.Web.Http;
using System.Web.Mvc;

namespace ExtJSMVCTestTask.IoC
{
    public class CastleInstaller: IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            // регистрируем компоненты приложения
            container.Register(Component.For<IUnitOfWork>().ImplementedBy<UnitOfWork>().LifestylePerWebRequest());
            container.Register(Component.For<DataService>().ImplementedBy<DataService>().LifestylePerWebRequest());
            // регистрируем каждый тип контроллера по отдельности
            var apiControllers = Classes.FromThisAssembly()
                .BasedOn<ApiController>().Unless(type => type==typeof(ApiController));
            container.Register(apiControllers.LifestylePerWebRequest());

            var controllers = Classes.FromThisAssembly()
                .BasedOn<Controller>().Unless(type => type == typeof(Controller));
            container.Register(controllers.LifestylePerWebRequest());
        }
    }
}