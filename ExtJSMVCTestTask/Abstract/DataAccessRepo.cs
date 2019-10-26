using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExtJSMVCTestTask.Abstract
{
    public class DataAccessRepo<T>:IDataAccessRepository<T> where T:IBaseModel
    {
        private readonly UnitOfWork _unitOfWork;
        public DataAccessRepo(IUnitOfWork unitOfWork)
        {
            _unitOfWork = (UnitOfWork)unitOfWork;
        }


        protected ISession Session => _unitOfWork.Session;

        public IQueryable<T> GetAll()
        {
            return Session.Query<T>();
        }


        public T GetById(int id)
        {
            return Session.Get<T>(id);

        }

        public void Create(T entity)
        {
            Session.Save(entity);
        }

        public void Update(T entity)
        {
            Session.Update(entity);
        }
        public void SaveOrUpdate(T entity)
        {
            Session.SaveOrUpdate(entity);
        }

        public void Delete(int id)
        {
            Session.Delete(Session.Load<T>(id));
        }
    }
}