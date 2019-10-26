using ExtJSMVCTestTask.Models;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExtJSMVCTestTask.Mappings
{
    /// <summary>
    /// FluentNHibernate Mapping
    /// https://github.com/FluentNHibernate/fluent-nhibernate/wiki/Fluent-mapping
    /// </summary>
    public class DataModelMapping
    {
        public class RequisitionMap : ClassMap<Requisition>
        {
            public RequisitionMap()
            {
                Id(it => it.Id);
                Map(it => it.Subject);
                HasOne(x => x.RequisitionExt).PropertyRef(x => x.Requisition).Cascade.All() ;
            }

        }
        public class RequisitionExtMap : ClassMap<RequisitionExt>
        {
            public RequisitionExtMap()
            {
                Id(it => it.Id);
                Map(it => it.CreateDate).Not.Nullable(); 
                Map(it => it.Number).Not.Nullable();
                Map(it => it.OrganizationName).Not.Nullable();
                Map(it => it.Position).Not.Nullable();
                Map(it => it.UserName).Not.Nullable();
                Map(it => it.Email).Not.Nullable();
                References(x => x.Requisition, "RequisitionId").Unique().Cascade.All();
            }

        }
    }
}