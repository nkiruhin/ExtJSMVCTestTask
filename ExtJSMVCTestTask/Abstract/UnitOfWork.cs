using ExtJSMVCTestTask.Models;
using ExtJSMVCTestTask.Services;
using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;


namespace ExtJSMVCTestTask.Abstract
{ 
    public class UnitOfWork : IUnitOfWork
    {
        private static readonly ISessionFactory _sessionFactory;

        private ITransaction _transaction;

        public ISession Session { get; }

        public UnitOfWork()
        {
            Session = _sessionFactory.OpenSession();
        }

        static UnitOfWork()
        {
            var storeCfg = new StoreConfiguration();
            // Fluent configuration
            // https://github.com/FluentNHibernate/fluent-nhibernate/wiki/Fluent-configuration
            _sessionFactory = Fluently.Configure()
                .Database(
                    SQLiteConfiguration.Standard.ConnectionString(
                    c => c.FromConnectionStringWithKey("SQLliteConnectionString")))
                    //Маппинг. Используя AddFromAssemblyOf NHibernate будет пытаться маппить КАЖДЫЙ класс в этой сборке (assembly). Можно выбрать любой класс. 

                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<RequisitionExt>())
                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Requisition>())
                //Можно использовать автомаппинг только для models namespace
                //.Mappings(m =>
                //    m.AutoMappings.Add(AutoMap.AssemblyOf<RequisitionExt>(storeCfg))
                //                   .Add(AutoMap.AssemblyOf<Requisition>(storeCfg)))
                //SchemeUpdate позволяет создавать/обновлять в БД таблицы и поля (2 поле ==true) 
                .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(false, true))
                .BuildSessionFactory();
        }
        public void BeginTransaction()
        {
            _transaction = Session.BeginTransaction();
        }

        public void Commit()
        {
            try
            {
                if (_transaction != null && _transaction.IsActive)
                    _transaction.Commit();
            }
            catch
            {
                if (_transaction != null && _transaction.IsActive)
                    _transaction.Rollback();

                throw;
            }
            finally
            {
                Session.Dispose();
            }
        }

        public void Rollback()
        {
            try
            {
                if (_transaction != null && _transaction.IsActive)
                    _transaction.Rollback();
            }
            finally
            {
                Session.Dispose();
            }
        }
    }
}