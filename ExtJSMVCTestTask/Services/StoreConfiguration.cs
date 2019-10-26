using FluentNHibernate.Automapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExtJSMVCTestTask.Services
{
    public class StoreConfiguration: DefaultAutomappingConfiguration
    {
        public override bool ShouldMap(Type type)
        {
            return type.Namespace == "ExtJSMVCTestTask.Models";
        }
    }
}