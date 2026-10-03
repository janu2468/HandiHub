
/* =========================================================
   HANDIHUB
   COMMON WISHLIST + CART
   Works with:
   index.html
   collections.html
   new-arrival.html
   category pages
   individual product cards
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET EXISTING DATA
    ===================================================== */

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    /* =====================================================
       SAVE DATA
    ===================================================== */

    function saveWishlist() {
        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
    }

    function saveCart() {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }


    /* =====================================================
       GET PRODUCT PAGE FROM CARD
    ===================================================== */

    function getProductPage(card) {

        /*
           Your cards already have:

           onclick="window.location.href='vase.html'"
        */

        const onclickCode = card.getAttribute("onclick");

        if (onclickCode) {

            const match = onclickCode.match(
                /window\.location\.href\s*=\s*['"]([^'"]+)['"]/
            );

            if (match) {
                return match[1];
            }
        }

        return "";
    }


    /* =====================================================
       GET PRODUCT DETAILS
    ===================================================== */

    function getProduct(card) {

        const id = card.dataset.id;

        if (!id) {
            return null;
        }


        /* Product title */

        const titleElement = card.querySelector("h3");

        const title = titleElement
            ? titleElement.innerText.trim()
            : "Product";


        /* Product image */

        const imageElement = card.querySelector("img");

        const image = imageElement
            ? imageElement.getAttribute("src")
            : "";


        /* Product price */

        const priceElement = card.querySelector(
    ".new-price, .current-price, .price"
);

        let price = "₹0";

        if (priceElement) {
            price = priceElement.innerText.trim();
        }


        /* Product page */

        const page = getProductPage(card);


        return {

            id: id,

            title: title,

            price: price,

            image: image,

            page: page,

            quantity: 1

        };

    }


    /* =====================================================
       WISHLIST BUTTONS
       
       Supports both:
       .wishlist
       .wishlist-btn
    ===================================================== */

    const wishlistButtons = document.querySelectorAll(
        ".wishlist, .wishlist-btn"
    );


    wishlistButtons.forEach(function (button) {

        const card = button.closest(
            ".product-card, .new-card"
        );

        if (!card) {
            return;
        }


        const product = getProduct(card);

        if (!product) {
            return;
        }


        /* =================================================
           CHECK IF ALREADY IN WISHLIST
        ================================================= */

        const exists = wishlist.some(function (item) {

            return item.id === product.id;

        });


        if (exists) {

            button.classList.add("active");

            const icon = button.querySelector("i");

            if (icon) {

                icon.classList.remove("bi-heart");
                icon.classList.add("bi-heart-fill");

            }

        }


        /* =================================================
           HEART CLICK
        ================================================= */

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            const index = wishlist.findIndex(function (item) {

                return item.id === product.id;

            });


            /* ---------------------------------------------
               REMOVE
            --------------------------------------------- */

            if (index !== -1) {

                wishlist.splice(index, 1);

                button.classList.remove("active");

                const icon = button.querySelector("i");

                if (icon) {

                    icon.classList.remove("bi-heart-fill");
                    icon.classList.add("bi-heart");

                }

            }


            /* ---------------------------------------------
               ADD
            --------------------------------------------- */

            else {

                wishlist.push(product);

                button.classList.add("active");

                const icon = button.querySelector("i");

                if (icon) {

                    icon.classList.remove("bi-heart");
                    icon.classList.add("bi-heart-fill");

                }

            }


            saveWishlist();

            updateWishlistCount();

        });

    });


    /* =====================================================
       CART BUTTONS
       
       Supports:
       .cart-btn
       .bag-btn
    ===================================================== */

    const cartButtons = document.querySelectorAll(
        ".cart-btn, .bag-btn"
    );


    cartButtons.forEach(function (button) {

        const card = button.closest(
            ".product-card, .new-card"
        );

        if (!card) {
            return;
        }


        const product = getProduct(card);

        if (!product) {
            return;
        }


        /* =================================================
           ADD TO CART CLICK
        ================================================= */

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            const existing = cart.find(function (item) {

                return item.id === product.id;

            });


            /* PRODUCT ALREADY EXISTS */

            if (existing) {

                existing.quantity =
                    (existing.quantity || 1) + 1;

            }


            /* NEW PRODUCT */

            else {

                cart.push({

                    id: product.id,

                    title: product.title,

                    price: product.price,

                    image: product.image,

                    page: product.page,

                    quantity: 1

                });

            }


            saveCart();

            updateCartCount();


            /* Button feedback */

            const oldHTML = button.innerHTML;

            button.innerHTML =
                '<i class="bi bi-check-lg"></i>';


            setTimeout(function () {

                button.innerHTML = oldHTML;

            }, 1000);

        });

    });


    /* =====================================================
       WISHLIST COUNT
    ===================================================== */

    function updateWishlistCount() {

        const count =
            document.getElementById("wishlistCount");

        if (count) {

            count.textContent = wishlist.length;

        }

    }


    /* =====================================================
       CART COUNT
    ===================================================== */

    function updateCartCount() {

        const count =
            document.getElementById("cartCount");

        if (count) {

            const total =
                cart.reduce(function (sum, item) {

                    return sum + (item.quantity || 1);

                }, 0);

            count.textContent = total;

        }

    }


    /* =====================================================
       INITIAL UPDATE
    ===================================================== */

    updateWishlistCount();

    updateCartCount();

});

/* =========================================
   BUY NOW
========================================= */

function buyNow() {

    const product = {
        id: "plate01",
        title: "Ceramic Dinner Plate Set",
        price: "1749",
        image: "images/plate.jpg",
        category: "Dinnerware",
        quantity: 1
    };

    /* Save Buy Now product */
    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify(product)
    );

    /* Go to checkout */
    window.location.href = "checkout.html";
}