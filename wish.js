let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistContainer = document.getElementById("wishlistContainer");
const emptyWishlist = document.getElementById("emptyWishlist");


// ===============================
// WISHLIST COUNT
// ===============================

function updateWishlistCount() {

    const count = document.getElementById("wishlistCount");

    if (count) {
        count.textContent = wishlist.length;
    }
}


// ===============================
// DISPLAY WISHLIST
// ===============================

function displayWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.style.display = "none";

        if (emptyWishlist) {
            emptyWishlist.style.display = "block";
        }

        updateWishlistCount();
        return;
    }

    wishlistContainer.style.display = "grid";

    if (emptyWishlist) {
        emptyWishlist.style.display = "none";
    }


    wishlist.forEach((product, index) => {

        wishlistContainer.innerHTML += `

        <div class="product-card"
             onclick="window.location.href='${product.page}'">

            <div class="product-image">

                <button class="wishlist active"
                        onclick="event.stopPropagation(); removeWishlist(${index})">

                    <i class="bi bi-heart-fill"></i>

                </button>

                <img src="${product.image}" alt="${product.title}">

            </div>


            <div class="product-info">

                <p class="category">HANDMADE</p>

                <h3>${product.title}</h3>

                <div class="rating">
                    ⭐ 4.8 (120)
                </div>


                <div class="price-row">

                    <div class="price">

                        <span class="new-price">
                            ${product.price}
                        </span>

                    </div>


                    <button class="cart-btn"
                            onclick="event.stopPropagation(); addToCart(${index})">

                        <i class="bi bi-bag"></i>

                    </button>

                </div>

            </div>

        </div>

        `;
    });

    updateWishlistCount();
}


// ===============================
// REMOVE FROM WISHLIST
// ===============================

function removeWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    displayWishlist();
    updateWishlistCount();
}


// ===============================
// ADD WISHLIST PRODUCT TO CART
// ===============================

function addToCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product = wishlist[index];

    const existing = cart.find(
        item => item.id === product.id
    );


    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            id: product.id || Date.now(),

            title: product.title,

            price: product.price,

            image: product.image,

            page: product.page || "",

            quantity: 1

        });
    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Update cart count on wishlist page
    updateCartCount();


    alert("Product added to cart successfully!");
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const count =
        document.getElementById("cartCount");

    if (count) {

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

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
// INITIAL LOAD
// ===============================

displayWishlist();

updateWishlistCount();

updateCartCount();