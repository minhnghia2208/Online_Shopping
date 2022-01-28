import './App.css';
import React, {Component} from 'react';

class App extends Component {

    constructor() {
      super()
      this.state = {
        customerId: "",
        cartId: "",
        shopId: "",
        itemId: "",
        phoneNumber: "",
        price: 0,
        avatar: ""
      }
    }

    handleCustomerIdChange = (event) => {
      this.setState({
        customerId: event.target.value
      })
    }

    handleCartIdChange = (event) => {
      this.setState({
        cartId: event.target.value
      })
    }

    handleShopIdChange = (event) => {
      this.setState({
        shopId: event.target.value
      })
    }

    handlePhoneChange = (event) => {
      this.setState({
        phoneNumber: event.target.value
      })
    }

    handlePriceChange = (event) => {
      this.setState({
        price: event.target.value
      })
    }

    handleAvatarChange = (event) => {
      this.setState({
        avatar: event.target.value
      })
    }

    /* ==================
      Cart Functions here 
      =================== */

    getCartData = () => {
      fetch('https://localhost:5001/api/Cart/' + this.state.cartId, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        }
      })
      .then(response => {return response.json()})
      .then(responseData => console.log(responseData))
      .catch(err => console.log(err));
    }

    createCart = () => {
      fetch('https://localhost:5001/api/Cart/Create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          customerId: this.state.customerId,
          shopId: this.state.shopId
			  })
      })
      .then(response => {return response.json()})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }

    submitCart = () => {
      fetch('https://localhost:5001/api/Cart/Submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          items: [{
            amount: 2,
            itemId: this.state.itemId,
            isDeleted: false
          }],
          customerId: this.state.customerId,
          cartId: this.state.cartId
			  })
      })
      .then(response => {return response.json()})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }

    unsubmitCart = () => {
      fetch('https://localhost:5001/api/Cart/Unsubmit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          customerId: this.state.customerId,
          cartId: this.state.cartId
        })
      })
      .then(response => {return response.json()})
      .then(data => console.log(data))
      .catch(err => console.log(err));
    }

    existCartCustomerWithShop = () => {
      fetch('https://localhost:5001/api/Cart/Exist/Shop/Customer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          customerId: this.state.customerId,
          shopId: this.state.shopId
        })
      })
    }

    /* ==================
      Order Functions here 
      =================== */

    getOrderData = () => {

    }

    /* ==================
      Item Functions here 
      =================== */

    /* ==================
      Customer Functions here 
      =================== */

    /* ==================
      Shop Functions here 
      =================== */

    render() {
      return (
        <div class="container">

          <div>
            <h3>Customer Id</h3>
            <input onChange={this.handleCustomerIdChange}></input>

            <h3>Cart Id</h3>
            <input onChange={this.handleCartIdChange}></input>

            <h3>Shop Id</h3>
            <input onChange={this.handleShopIdChange}></input>

            <h3>Phone Number</h3>
            <input onChange={this.handlePhoneChange}></input>

            <h3>Price</h3>
            <input onChange={this.handlePriceChange}></input>

            <h3>Avatar</h3>
            <input onChange={this.handleAvatarChange}></input>
          </div>

          <div>
            <div>
              <h2> Cart </h2>
              <button class="btn" onClick={this.getCartData}>
                Get Cart
              </button>
              <button onClick={this.createCart}>
                Update Cart
              </button>
              <button  onClick={this.getData}>
                Submit Cart
              </button>
              <button  onClick={this.getData}>
                Unsubmit Cart
              </button>
              <button  onClick={this.getData}>
                Get Customer's Cart
              </button>
            </div>

            <div>
              <h2> Order </h2>
              <button onClick={this.getCartData}>
                Get Order
              </button>
              <button onClick={this.getData}>
                Place Order
              </button>
              <button onClick={this.getData}>
                Cancel Order
              </button>
              <button onClick={this.getData}>
                Status Order
              </button>
              <button onClick={this.getData}>
                Customer All Orders
              </button>
              <button onClick={this.getData}>
                Shop All Orders
              </button>
            </div>

            <div>
              <h2> Item </h2>
              <button onClick={this.getCartData}>
                Create Item
              </button>
              <button onClick={this.getData}>
                Update Item
              </button>
              <button onClick={this.getData}>
                Delete Item
              </button>
              <button onClick={this.getData}>
                Get Item
              </button>
              <button onClick={this.getData}>
                Active Item
              </button>
            </div>

            <div>
              <h2> Shop </h2>
              <button onClick={this.getCartData}>
                Get Shop
              </button>
              <button onClick={this.getData}>
                Update Shop
              </button>
            </div>

            <div>
              <h2> Customer </h2>
              <button onClick={this.getCartData}>
                Get Customer
              </button>
              <button onClick={this.getData}>
                Update Customer
              </button>
            </div>
          </div>

        </div>
      )
    }
}

export default App;
