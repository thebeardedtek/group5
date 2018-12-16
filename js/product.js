// JavaScript source code
$(document).ready(function () {
    function getListOfGadgets() {
        var gadgets = $.get('js/products.json').then(function (response) {

            var gadgetList = response.data;
            var output = '';

            gadgetList.forEach(function (gadget) {
                output += `
                    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-2">
                        <picture>
                            <img src="${gadget.gadgetCover}">
                        </picture>
                        <div class="add-to-cart-div">
                            <button onclick="toggleAddCartClass(${gadget.productId}, '${gadget.name}', '${gadget.author}', ${gadget.onSale}, '${gadget.price}', '${gadget.excerpt}', '${gadget.gadgetCover}')" id="add-to-cart-${gadget.productId}" class="btn btn-primary add-to-cart-${gadget.productId}" >
                                Add To Cart
                            </button>
                        </div>
                        
                    </div> 
                `;

                $('#other-products-output').html(output);
            })
        });
    }
    getListOfGadgets();

    var gadgetsInCart = [];


    window.toggleAddCartClass = function (id, name, author, onSale, price, excerpt, gadgetCover) {

        $('#menu-cart').css('display', 'none');

        $('#add-to-cart-' + id).toggleClass('add-to-cart-green');

        var hasActiveClass = $('#add-to-cart-' + id).hasClass('add-to-cart-green');
        if (hasActiveClass) {

            var gadget = {};
            gadget.productId = id;
            gadget.name = name;
            gadget.author = author;
            gadget.onSale = onSale;
            gadget.price = price;
            gadget.excerpt = excerpt;
            gadget.gadgetCover = gadgetCover;
            gadgetsInCart.push(gadget);
        } else {

            for (let x of gadgetsInCart) {
                if (x.productId === id) {
                    let gadgetToRemove = gadgetsInCart.indexOf(x);
                    gadgetsInCart.splice(gadgetToRemove, 1);
                }
            }

        }

        event.preventDefault();
        event.stopPropagation();
        console.log('gadgetsInCart', gadgetsInCart);
    }

    window.removeFromCart = function (id) {

        for (let x of gadgetsInCart) {
            if (x.productId === id) {
                let gadgetToRemove = gadgetsInCart.indexOf(x);
                gadgetsInCart.splice(gadgetToRemove, 1);
            }
        }

        $('#add-to-cart-' + id).removeClass('add-to-cart-green');

        getCartDetails();
        getCartTotals();

    }

    function getCartDetails() {
        if (gadgetsInCart && gadgetsInCart.length > 0) {
            var cartOutput = '';

            gadgetsInCart.forEach(function (gadgetInCart) {

                gadgetInCart.excerpt = gadgetInCart.excerpt.slice(0, 100);
                cartOutput += `
                    <div class="cart-img">
                        <picture>
                            <img src="${gadgetInCart.gadgetCover}">
                        </picture>
                        <div class="cart-details">
                            <div class="cart-excerpt truncate">${gadgetInCart.excerpt}...</div>
                            <div class="cart-actions">
                                <span class="cart-quantity">Quantity 1</span>
                                <span class="cart-price">$${gadgetInCart.price}</span>
                                <button onclick="removeFromCart(${gadgetInCart.productId})" class="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    </div>
                    `

                $('#cart-output').html(cartOutput);
            });

        } else {
            var noDetails = `
                <div class="no-items">You Have No Items In Cart</div>
            `
            $('#cart-output').html(noDetails);
        }
    }

    function getCartTotals() {
        var prices = [];
        var totalCartPrice = null;

        gadgetsInCart.forEach(function (gadgetPrice) {
            totalCartPrice += Number(gadgetPrice.price);
        });

        var totalCartQuantity = gadgetsInCart.length;

        if (totalCartPrice && totalCartPrice !== null) {
            $('#cart-total-price').html('Total $' + totalCartPrice);
            $('#cart-total-quantity').html('You Have ' + totalCartQuantity + ' Item(s) In Your Cart');
        } else {
            $('#cart-total-price').html('Total $0');
            $('#cart-total-quantity').html('You Have 0 Item(s) In Your Cart');
        }


    }

    window.toggleShowCart = function () {
        $('#menu-cart').toggle().toggleClass('animated slideInLeft');

        getCartDetails();
        getCartTotals();

        event.preventDefault();
        event.stopPropagation();
    }

    window.toggleShowChat = function () {
        $('#chat i').toggleClass('chat-active');

        $('#chat-box').toggle().toggleClass('animated slideInUp');
    }

});b