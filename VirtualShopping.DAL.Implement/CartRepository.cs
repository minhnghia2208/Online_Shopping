using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VirtualShopping.DAL.Implement.Data;
using VirtualShopping.DAL.Interface;
using VirtualShopping.Domain.Entities;
using VirtualShopping.Domain.Requests;
using VirtualShopping.Domain.Responses.Order;
using Microsoft.EntityFrameworkCore;
using VirtualShopping.Domain.Responses.Cart;
using VirtualShopping.Domain.Utilities;
using System;
using VirtualShopping.Domain.Responses.CartItem;
using VirtualShopping.Domain.Requests.CartItem;

namespace VirtualShopping.DAL.Implement
{
    public class CartRepository : ICartRepository
    {
        private readonly DataContext _context;

        public CartRepository(DataContext context) {
            _context = context;
        }

        public async Task<GetCartResModel> GetCartForClientById(string cartId) {
            var result = await _context.Carts.Where(c => c.CartId == cartId
                                                        && !c.OrderTime.HasValue
                                                        && String.IsNullOrEmpty(c.DeliveryInformation))
                .Select(c => new GetCartResModel
                {
                    CartId = c.CartId,
                    ItemsInCart = c.ItemsInCart.Where(i => !i.IsDeleted).Select(i => new ItemInCartViewModel
                                                                {
                                                                    Amount = i.Amount,
                                                                    CartId = i.CartId,
                                                                    CustomerId = i.CustomerId,
                                                                    IsDeleted = i.IsDeleted,
                                                                    ItemId = i.ItemId,
                                                                    Price = i.Price,
                                                                    ReadyToOrder = i.ReadyToOrder,
                                                                    CustomerName = i.Customer.Name,
                                                                    ItemName = i.Item.Name,
                                                                    ItemIsActive = i.Item.IsActive
                                                                }),
                }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<Cart> GetCartEntityById(string cartId)
        {

            return await _context.Carts.Where(c => c.CartId == cartId)
                    .Include(c => c.Customer)
                    .Include(c => c.ItemsInCart)
                    .FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<GetOrderResModel>> GetAllOrdersByCustomerId(string customerId) {

            return await _context.Carts
                .Where(o => o.CustomerId == customerId 
                        && o.OrderTime.HasValue 
                        && !string.IsNullOrEmpty(o.DeliveryInformation))
                .Select(o => new GetOrderResModel
                {
                    Status = o.Status,
                    OrderTime = o.OrderTime,
                    DeliveryInformation = o.DeliveryInformation,
                    DeliveryTime = o.DeliveryTime,
                    ShopId = o.ShopId,
                    ItemsInCart = o.ItemsInCart
                })
                .ToListAsync();
        }

        public async Task<GetOrderResModel> GetOrderForClientById(string orderId) {

            return await _context.Carts.Where(o => o.OrderTime.HasValue
                                                && !String.IsNullOrEmpty(o.DeliveryInformation)
                                                && o.CartId == orderId)
                                        .Select(o => new GetOrderResModel
                                        {
                                            Status = o.Status,
                                            OrderTime = o.OrderTime,
                                            DeliveryInformation = o.DeliveryInformation,
                                            DeliveryTime = o.DeliveryTime,
                                            ShopId = o.ShopId,
                                            ItemsInCart = o.ItemsInCart
                                        })
                                        .FirstOrDefaultAsync();
        }

        public async Task<bool> CreateCart(Cart newCart) {

            await _context.AddAsync<Cart>(newCart);
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<bool> PlacedNewOrder(PlacedNewOrderReq request, Cart existCart) {

            existCart.OrderTime = Helper.ConvertUTCToTimeZone(DateTime.UtcNow, Helper.idTimeZoneUtc7);
            existCart.DeliveryInformation = request.DeliveryInformation;

            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<bool> UpdateOrderStatus(Cart order, string newStatus)
        {
            order.Status = newStatus;
            if (newStatus == OrderStatusConstants.Delivered)
            {
                order.DeliveryTime = Helper.ConvertUTCToTimeZone(DateTime.UtcNow, Helper.idTimeZoneUtc7);
            }
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Cart> GetOrderEntityById(string orderId)
        {
            return await _context.Carts
                .Where(o => !string.IsNullOrEmpty(o.DeliveryInformation)
                    && o.OrderTime.HasValue && o.CartId == orderId)
                    .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<GetOrderResModel>> GetAllOrdersByShopId(string shopId)
        {
            return await _context.Carts
                .Where(o => o.ShopId == shopId 
                        && o.OrderTime.HasValue
                        && !string.IsNullOrEmpty(o.DeliveryInformation))
                .Select(o => new GetOrderResModel
                {
                    Status = o.Status,
                    OrderTime = o.OrderTime,
                    DeliveryInformation = o.DeliveryInformation,
                    DeliveryTime = o.DeliveryTime,
                    ShopId = o.ShopId,
                    ItemsInCart = o.ItemsInCart
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<CartItem>> GetCustomerAllItems(GetCustomerAllItemReq request) {

            return await _context.CartsItems
                .Where(i => i.CustomerId == request.CustomerId 
                    && i.CartId == request.CartId
                    && i.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<GetCartResModel> GetExistCartByShopIdAndCustomerId(string shopId, string customerId)
        {
            return await _context.Carts.Where(c => c.ShopId == shopId
                                                    && c.CustomerId == customerId
                                                    && String.IsNullOrEmpty(c.DeliveryInformation)
                                                    && !c.OrderTime.HasValue)
                                        .Select(c => new GetCartResModel
                                        {
                                            CartId = c.CartId,
                                            ItemsInCart = c.ItemsInCart.Where(i => !i.IsDeleted).Select(i => new ItemInCartViewModel
                                            {
                                                Amount = i.Amount,
                                                CartId = i.CartId,
                                                CustomerId = i.CustomerId,
                                                IsDeleted = i.IsDeleted,
                                                ItemId = i.ItemId,
                                                Price = i.Price,
                                                ReadyToOrder = i.ReadyToOrder,
                                                CustomerName = i.Customer.Name,
                                                ItemName = i.Item.Name,
                                                ItemIsActive = i.Item.IsActive
                                            }),
                                        }).FirstOrDefaultAsync();
        }
    }
}