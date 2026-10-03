/* =========================================
   HANDIHUB CHECKOUT
========================================= */


/* =========================================
   GET BUY NOW PRODUCT
========================================= */

const buyNowProduct =
    JSON.parse(localStorage.getItem("buyNowProduct")) || null;


/* =========================================
   GET CART
========================================= */

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================================
   CHECKOUT PRODUCTS
========================================= */

let checkoutProducts = [];


/*
   If Buy Now product exists,
   show only that product.

   Otherwise show products from cart.
*/

if (buyNowProduct) {

    checkoutProducts = [
        {
            ...buyNowProduct,
            quantity: buyNowProduct.quantity || 1
        }
    ];

} else {

    checkoutProducts = cart.map(product => ({
        ...product,
        quantity: product.quantity || 1
    }));

}


/* =========================================
   GET PRICE
========================================= */

function getProductPrice(product) {

    return Number(
        String(product.price || "0")
            .replace(/[₹,]/g, "")
            .trim()
    ) || 0;

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return Number(price).toLocaleString("en-IN");

}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderCheckoutProducts() {

    const container =
        document.getElementById("checkoutProducts");

    const summary =
        document.getElementById("summaryProducts");


    if (!container || !summary) return;


    container.innerHTML = "";
    summary.innerHTML = "";


    /* =========================
       EMPTY CART
    ========================= */

    if (checkoutProducts.length === 0) {

        container.innerHTML = `
            <p style="padding:20px;">
                Your cart is empty.
            </p>
        `;

        updateSummary();
        return;
    }


    /* =========================
       DISPLAY PRODUCTS
    ========================= */

    checkoutProducts.forEach((product, index) => {

        const price =
            getProductPrice(product);

        const quantity =
            product.quantity || 1;

        const itemTotal =
            price * quantity;


        /* =========================
           MAIN PRODUCT
        ========================= */

        container.innerHTML += `

            <div class="checkout-product">

                <div class="checkout-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>


                <div class="checkout-product-info">

                    <h3>
                        ${product.title}
                    </h3>

                    <p>
                        ${product.category || "Handmade Product"}
                    </p>


                    <div class="quantity-control">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="checkout-product-price">

                    ₹${formatPrice(itemTotal)}

                </div>

            </div>

        `;


        /* =========================
           ORDER SUMMARY PRODUCT
        ========================= */

        summary.innerHTML += `

            <div class="summary-product">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >


                <div class="summary-product-info">

                    <h4>
                        ${product.title}
                    </h4>

                    <p>
                        Qty: ${quantity}
                    </p>

                </div>


                <strong>
                    ₹${formatPrice(itemTotal)}
                </strong>

            </div>

        `;

    });


    updateSummary();

}


/* =========================================
   INCREASE QUANTITY
========================================= */

function increaseQuantity(index) {

    checkoutProducts[index].quantity =
        (checkoutProducts[index].quantity || 1) + 1;

    renderCheckoutProducts();

}


/* =========================================
   DECREASE QUANTITY
========================================= */

function decreaseQuantity(index) {

    if (checkoutProducts[index].quantity > 1) {

        checkoutProducts[index].quantity--;

    }

    renderCheckoutProducts();

}


/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary() {

    let subtotal = 0;


    checkoutProducts.forEach(product => {

        const price =
            getProductPrice(product);

        const quantity =
            product.quantity || 1;

        subtotal += price * quantity;

    });


    const discount = 0;

    const total =
        subtotal - discount;


    const subtotalElement =
        document.getElementById("subtotal");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("grandTotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + formatPrice(subtotal);

    }


    if (discountElement) {

        discountElement.textContent =
            "₹" + formatPrice(discount);

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + formatPrice(total);

    }

}


/* =========================================
   PLACE ORDER
========================================= */

function placeOrder() {

    const name =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();


    /* =========================
       CHECK ADDRESS
    ========================= */

    if (!name) {

        document.getElementById("fullName").focus();
        return;

    }

    if (!phone) {

        document.getElementById("phone").focus();
        return;

    }

    if (!address) {

        document.getElementById("address").focus();
        return;

    }

    if (!city) {

        document.getElementById("city").focus();
        return;

    }

    if (!state) {

        document.getElementById("state").focus();
        return;

    }

    if (!pincode) {

        document.getElementById("pincode").focus();
        return;

    }


    /* =========================
       PAYMENT
    ========================= */

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const payment =
        selectedPayment
            ? selectedPayment.value
            : "cod";


    /* =========================
       TOTAL
    ========================= */

    const total =
        checkoutProducts.reduce(
            (sum, product) => {

                return sum +
                    (
                        getProductPrice(product) *
                        (product.quantity || 1)
                    );

            },
            0
        );


    /* =========================
       CREATE ORDER
    ========================= */

    const order = {

        orderId:
            "HH" + Date.now(),

        products:
            checkoutProducts,

        customer: {

            name: name,
            phone: phone,
            address: address,
            city: city,
            state: state,
            pincode: pincode

        },

        payment: payment,

        total: total,

        date:
            new Date().toISOString()

    };


    /* =========================
       SAVE ORDER
    ========================= */

    localStorage.setItem(
        "latestOrder",
        JSON.stringify(order)
    );


    /* =========================
       CLEAR CART
    ========================= */

    if (!buyNowProduct) {

        localStorage.removeItem("cart");

    }


    /* =========================
       CLEAR BUY NOW
    ========================= */

    localStorage.removeItem(
        "buyNowProduct"
    );


    /* =========================
       SUCCESS PAGE
    ========================= */

    window.location.href =
        "order-success.html";

}


/* =========================================
   LOAD CHECKOUT
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCheckoutProducts();

    }
);