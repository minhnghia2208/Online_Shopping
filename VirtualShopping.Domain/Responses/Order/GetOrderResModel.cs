using System;
using System.Collections.Generic;
using VirtualShopping.Domain.Entities;

namespace VirtualShopping.Domain.Responses.Order
{
    public class GetOrderResModel
    {
        public string Status { get; set; }
        public DateTime? OrderTime { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public string DeliveryInformation { get; set; }
        public IEnumerable<VirtualShopping.Domain.Entities.CartItem> ItemsInCart { get; set; }
        public double TotalPrice
        {
            get
            {
                double totalPrice = 0;
                foreach (var item in ItemsInCart)
                {
                    totalPrice += item.Price * item.Amount;
                }
                return totalPrice;
            }
        }
        public string ShopId { get; set; }
        public string ErrorMessage { get; set; }
    }
}