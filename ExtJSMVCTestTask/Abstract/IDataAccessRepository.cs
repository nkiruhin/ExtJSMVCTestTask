using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExtJSMVCTestTask.Abstract
{
    /// <summary>
    /// Реализация патерна Repository
    /// </summary>
    /// <typeparam name="T"></typeparam>
    interface IDataAccessRepository<T> where T : IBaseModel
    {
        IQueryable<T> GetAll();

        T GetById(int id);

        void Create(T entity);

        void Update(T entity);

        void SaveOrUpdate(T entity);

        void Delete(int id);
    }
}
