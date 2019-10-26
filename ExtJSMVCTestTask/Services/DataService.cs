using ExtJSMVCTestTask.Abstract;
using ExtJSMVCTestTask.Models;
using System.Collections.Generic;
using System.Linq;


namespace ExtJSMVCTestTask.Services
{
    public class DataService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDataAccessRepository<Requisition> _requisitionRepo;
        private readonly IDataAccessRepository<RequisitionExt> _requisitionExtRepo;

        public DataService(IUnitOfWork unitOfWork)
        {
            
            _requisitionRepo = new DataAccessRepo<Requisition>(unitOfWork);
            _requisitionExtRepo = new DataAccessRepo<RequisitionExt>(unitOfWork);
            _unitOfWork = unitOfWork;
        }
        public List<Requisition> GetRequisitions()
        {
            // Костыль: убираем загрузку связанных данных
            // Query возращает полный набор при условии PropertyRef(x => x.Requisition) в мапинге 
            // без условия Fetch не подгружает связанные данные (надо разбирться)

            var woExt = _requisitionRepo.GetAll()
                .Select(n => new Requisition { Id=n.Id,Subject=n.Subject,RequisitionExt=null });
            return woExt.ToList();
        }

        internal void UpdateRequisition(Requisition requisition)
        {
            requisition.AddRequisitionEx(requisition.RequisitionExt);
            _unitOfWork.BeginTransaction();
            try
            {
                _requisitionRepo.Update(requisition);
                _unitOfWork.Commit();
            }
            catch
            {
                _unitOfWork.Rollback();
            }
        }

        internal void DeleteRequisition(int id)
        {
            _unitOfWork.BeginTransaction();

            _requisitionRepo.Delete(id);

            _unitOfWork.Commit();
        }

        public Requisition GetRequisition(int id) => _requisitionRepo.GetById(id);

        public void CreateRequisition(Requisition requisition)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                requisition.AddRequisitionEx(requisition.RequisitionExt);
                _requisitionRepo.Create(requisition);
                _unitOfWork.Commit();
            }
            catch 
            {
                _unitOfWork.Rollback();
            }
            
        }
    }
}