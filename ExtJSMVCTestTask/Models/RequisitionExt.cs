using ExtJSMVCTestTask.Abstract;
using Newtonsoft.Json;
using System;


namespace ExtJSMVCTestTask.Models
{
    public class RequisitionExt:IBaseModel
    {
        public virtual int Id { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual int Number  { get; set; }
        public virtual string OrganizationName { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Position { get; set; }
        public virtual string Email { get; set; }
        [JsonIgnore]
        public virtual Requisition Requisition { get; set; }
    }
}