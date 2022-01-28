using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VirtualShopping.Domain.Requests.CartItem
{
    public class AddItemsToCartReqModel
    {
        [Required]
        public IEnumerable<ItemInCartModel> Items { get; set; }
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public string CartId { get; set; }
    }
}
