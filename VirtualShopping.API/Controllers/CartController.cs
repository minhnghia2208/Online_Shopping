using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using VirtualShopping.API.SignalR;
using VirtualShopping.BLL.Interface;
using VirtualShopping.Domain.Requests;
using VirtualShopping.Domain.Requests.Cart;
using VirtualShopping.Domain.Requests.CartItem;
using VirtualShopping.Domain.Responses.Cart;
using VirtualShopping.Domain.Utilities;
using VirtualShopping.SignalR;

namespace VirtualShopping.Controllers
{
    public class CartController : BaseController
    {
        private readonly ICartServices _cartServices;
        private readonly IHubContext<CartsHub> _cartHub;
        private readonly GroupsTracker _tracker;

        public CartController(ICartServices cartServices,
                                IHubContext<CartsHub> cartHub,
                                GroupsTracker tracker)
        {
            _tracker = tracker;
            _cartServices = cartServices;
            _tracker = tracker;
            _cartHub = cartHub;
        }

        /// <summary>
        /// Gets Cart By Id
        /// </summary>
        /// <param name="cartId"></param>
        /// <returns></returns>
        [HttpGet("{cartId}")]
        public async Task<ActionResult<GetCartResModel>> GetCartById(string cartId)
        {
            return await _cartServices.GetCartById(cartId);
        }

        /// <summary>
        /// Creates Cart
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public async Task<ActionResult<CreateCartResModel>> CreateCart(CreateCartReq request)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _cartServices.CreateCart(request));
            }
            return BadRequest("Could not create cart");
        }

        /// <summary>
        /// Submit items to cart. Send items of the customer for adding to the cart
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Result of submit items to the cart</returns>
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitItemsInCart(AddItemsToCartReqModel request)
        {
            if (ModelState.IsValid)
            {
                var response = await _cartServices.SubmitItemsInCartAsync(request);
                if (response.IsSuccess) {
                    var cartConnectionIds = await _tracker.GetUserConnectionsOfCart(request.CartId);
                    if (cartConnectionIds != null)
                    {
                        await _cartHub.Clients.Clients(cartConnectionIds)
                        .SendAsync(HubMethodConstants.SubmitItems, request.CartId);
                    }              
                }
                return Ok(response);
            }
            return BadRequest();
        }

        /// <summary>
        /// Unsubmit items in cart of the customer
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("unsubmit")]
        public async Task<IActionResult> UnSubmitItemsIncart(UnsubmitItemsReq request)
        {
            if (ModelState.IsValid)
            {
                var response = await _cartServices.UnsubmitItems(request);
                if (response.isSuccess) {
                    var cartConnectionIds = await _tracker.GetUserConnectionsOfCart(request.CartId);
                    if (cartConnectionIds != null)
                    {
                        await _cartHub.Clients.Clients(cartConnectionIds)
                        .SendAsync(HubMethodConstants.UnsubmitItems, request.CartId);
                    }     
                }
                return Ok(response);
            }
            return BadRequest();
        }

        /// <summary>
        /// Get exist cart that customer has created before with the shop
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("exist/shop/customer")]
        public async Task<IActionResult> GetExistCart(GetExistCartReqModel request)
        {

            if (ModelState.IsValid)
            {
                var response = await _cartServices.GetExistCartByShopIdAndCustomerId(request);
                return Ok(response);
            }
            return BadRequest();
        }
    }
}
