using ExtJSMVCTestTask.Models;
using ExtJSMVCTestTask.Services;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Mvc;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

namespace ExtJSMVCTestTask.Controllers
{
    

    public class RequisitionController : ApiController
    {
        protected DataService DataService { get; set; }
        // GET: api/Requisition

        public RequisitionController(DataService dataService)
        {
            DataService = dataService;
        }
        public List<Requisition> Get()
        {
            return DataService.GetRequisitions();
        }

        // GET: api/Requisition/5
        public Requisition Get(int id)
        {
            var req = DataService.GetRequisition(id);
            return DataService.GetRequisition(id);
        }

        // POST: api/Requisition

        public void Post([FromBody]Requisition req)
        {
            DataService.CreateRequisition(req);
        }

        // PUT: api/Requisition/5
        public void Put(int id, [FromBody]Requisition req)
        {            
            DataService.UpdateRequisition(req);
        }

        // DELETE: api/Requisition/5
        public void Delete(int id)
        {
            DataService.DeleteRequisition(id);
        }
    }
}
