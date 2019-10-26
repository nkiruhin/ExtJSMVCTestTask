using ExtJSMVCTestTask.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExtJSMVCTestTask.Models
{
    public class Requisition:IBaseModel
    {
        public virtual int Id { get; set; }
        public virtual string Subject { get; set; }
        public virtual RequisitionExt RequisitionExt { get; set; }
        /// <summary>
        /// Для каскадных операций можно использовать Inverse() в мапингах, но HasOne не имеет данного метода
        /// делаем привязку вручную.
        /// </summary>
        /// <param name="reqExt"></param>
        public virtual void AddRequisitionEx(RequisitionExt reqExt)
        {
            reqExt.Requisition = this;
        }
    }
}