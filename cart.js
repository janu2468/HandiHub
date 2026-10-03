let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const cartSection = document.getElementById("cart-section");


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const count =
        document.getElementById("cartCount");

    if (count) {

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + (item.quantity || 1),
                0
            );

        count.textContent = total;
    }
}


// ===============================
// WISHLIST COUNT
// ===============================

function updateWishlistCount() {

    const count =
        document.getElementById("wishlistCount");

    if (count) {

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        count.textContent = wishlist.length;
    }
}


// ===============================
// RENDER CART
// ===============================

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "flex";
        }

        if (cartSection) {
            cartSection.style.display = "none";
        }

        updateCartCount();
        updateWishlistCount();

        return;
    }


    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartSection) {
        cartSection.style.display = "grid";
    }


    let subtotal = 0;


    cart.forEach(item => {

        const price =
            parseInt(
                String(item.price)
                    .replace(/[₹,]/g, "")
            ) || 0;


        subtotal +=
            price * (item.quantity || 1);


        const card =
            document.createElement("div");

        card.className = "cart-card";


        card.innerHTML = `

            <div class="cart-left">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    class="cart-image"
                >

                <div class="cart-info">

                    <h3>${item.title}</h3>

                    <p class="price">
                        ${item.price}
                    </p>


                    <div class="qty-controls">

                        <button
                            onclick="changeQty('${item.id}', -1)">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQty('${item.id}', 1)">
                            +
                        </button>

                    </div>

                </div>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem('${item.id}')">

                Remove

            </button>

        `;


        // Stop card click for buttons
        card.querySelectorAll(
            ".qty-controls button, .remove-btn"
        ).forEach(btn => {

            btn.addEventListener(
                "click",
                function(e) {
                    e.stopPropagation();
                }
            );

        });


        // Open product page
        card.addEventListener(
            "click",
            () => {

                if (item.page) {
                    window.location.href =
                        item.page;
                }

            }
        );


        cartItems.appendChild(card);

    });


    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + subtotal;
    }

    if (totalElement) {
        totalElement.textContent =
            "₹" + subtotal;
    }


    updateCartCount();
    updateWishlistCount();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQty(id, delta) {

    const item =
        cart.find(i => String(i.id) === String(id));

    if (!item) return;


    item.quantity =
        (item.quantity || 1) + delta;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                i => String(i.id) !== String(id)
            );
    }


    saveCart();

    renderCart();
}


// ===============================
// REMOVE ITEM
// ===============================

function removeItem(id) {

    cart =
        cart.filter(
            i => String(i.id) !== String(id)
        );

    saveCart();

    renderCart();
}


// ===============================
// INITIAL LOAD
// ===============================

renderCart();

updateCartCount();

updateWishlistCount();