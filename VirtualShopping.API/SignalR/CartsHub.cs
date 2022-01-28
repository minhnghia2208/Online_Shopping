using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VirtualShopping.API.SignalR;

namespace VirtualShopping.SignalR
{
    public class CartsHub : Hub
    {
        private readonly GroupsTracker _tracker;

        public CartsHub(GroupsTracker tracker)
        {
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var cartId = httpContext.Request.Query["cart"].ToString();
            await _tracker.UserConnectedToCart(cartId, Context.ConnectionId);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();
            var cartId = httpContext.Request.Query["cart"].ToString();
            await _tracker.UserDisconnectedToCart(cartId, Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
