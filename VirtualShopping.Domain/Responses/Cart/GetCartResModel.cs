using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VirtualShopping.Domain.Entities;
using VirtualShopping.Domain.Responses.CartItem;

namespace VirtualShopping.Domain.Responses.Cart
{
    public class GetCartResModel
    {
        public string CartId { get; set; }
        public double TotalPrice
        { get
            {
                double totalPrice = 0;
                foreach (var item in ItemsInCart)
                {
                    totalPrice += item.Price * item.Amount;
                }
                return totalPrice;
            }
        }
        public IEnumerable<ItemInCartViewModel> ItemsInCart { get; set; }
        public string ErrorMessage {get; set;}
        public bool IsSuccess => !String.IsNullOrEmpty(CartId);
    }
}