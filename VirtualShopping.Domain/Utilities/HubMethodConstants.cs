using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VirtualShopping.Domain.Utilities
{
    public static class HubMethodConstants
    {
        public const string NewOrder = "NewOrder";
        public const string CancelOrder = "CancelOrder";
        public const string ChangeOrderStatus = "ChangeOrderStatus";
        public const string SubmitItems = "SubmitItems";
        public const string UnsubmitItems = "UnsubmitItems";
    }
}
