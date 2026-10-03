

/* =====================================================
                    POTTERY PAGE JS
===================================================== */


/* =====================================================
                PRODUCT INFORMATION
===================================================== */

const potteryProduct = {
    id: "vase1",
    name: "Terracotta Flower Vase",
    category: "POTTERY",
    price: 899,
    oldPrice: 1199,
    rating: 4.8,
    reviews: 218,
    image: "images/vase.jpg",
    page: "vase.html"
};


/* =====================================================
                    LOCAL STORAGE
===================================================== */

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =====================================================
                  UPDATE COUNTS
===================================================== */

function updateCounts() {

    const wishlistCount =
        document.getElementById("wishlistCount");

    const cartCount =
        document.getElementById("cartCount");


    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }


    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


/* =====================================================
                    SAVE DATA
===================================================== */

function saveData() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCounts();
}


/* =====================================================
                  WISHLIST BUTTON
===================================================== */

function toggleWishlist(product) {

    const existingProduct =
        wishlist.find(item => item.id === product.id);


    if (existingProduct) {

        wishlist =
            wishlist.filter(
                item => item.id !== product.id
            );

    } else {

        wishlist.push(product);

    }


    saveData();

    updateWishlistButton();

}


/* =====================================================
              UPDATE HEART ICON
===================================================== */

function updateWishlistButton() {

    const wishlistButton =
        document.querySelector(".wishlist");


    if (!wishlistButton) return;


    const icon =
        wishlistButton.querySelector("i");


    if (!icon) return;


    const isInWishlist =
        wishlist.some(
            item => item.id === potteryProduct.id
        );


    if (isInWishlist) {

        icon.classList.remove("bi-heart");

        icon.classList.add("bi-heart-fill");

        wishlistButton.classList.add("active");

    } else {

        icon.classList.remove("bi-heart-fill");

        icon.classList.add("bi-heart");

        wishlistButton.classList.remove("active");

    }
}


/* =====================================================
                    CART BUTTON
===================================================== */

function addToCart(product) {

    const existingProduct =
        cart.find(item => item.id === product.id);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveData();


    /* Small visual feedback */

    const cartButton =
        document.querySelector(".cart-btn");


    if (cartButton) {

        const originalHTML =
            cartButton.innerHTML;


        cartButton.innerHTML =
            '<i class="bi bi-check-lg"></i>';


        setTimeout(() => {

            cartButton.innerHTML =
                originalHTML;

        }, 1000);

    }
}


/* =====================================================
                 PRODUCT CARD BUTTONS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* Initial counts */

    updateCounts();


    /* Initial wishlist state */

    updateWishlistButton();


    /* -------------------------------------------------
                    WISHLIST
    ------------------------------------------------- */

    const wishlistButton =
        document.querySelector(".wishlist");


    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleWishlist(potteryProduct);

            }
        );

    }


    /* -------------------------------------------------
                        CART
    ------------------------------------------------- */

    const cartButton =
        document.querySelector(".cart-btn");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                addToCart(potteryProduct);

            }
        );

    }


    /* -------------------------------------------------
                    SEARCH
    ------------------------------------------------- */

    const searchInput =
        document.querySelector("#searchInput");


    /*
       Your current HTML does not have id="searchInput".

       So this also checks the normal search input.
    */

    const search =
        searchInput ||
        document.querySelector(".search-box input");


    if (search) {

        search.addEventListener(
            "input",
            function () {

                const searchText =
                    this.value
                    .toLowerCase()
                    .trim();


                const productCard =
                    document.querySelector(".product-card");


                if (!productCard) return;


                const productName =
                    potteryProduct.name
                    .toLowerCase();


                const productCategory =
                    potteryProduct.category
                    .toLowerCase();


                if (
                    productName.includes(searchText) ||
                    productCategory.includes(searchText)
                ) {

                    productCard.style.display =
                        "block";

                } else {

                    productCard.style.display =
                        "none";

                }

            }
        );

    }


});


/* =====================================================
                CATEGORY NAVIGATION
===================================================== */

function openCategory(category) {

    const categoryPages = {

        pottery: "pottery.html",

        baskets: "baskets.html",

        "home-decor": "home-decor.html",

        kitchen: "kitchen.html",

         art: "art.html",

        


        jewellery: "jewellery.html",

        textiles: "textiles.html"

    };


    if (categoryPages[category]) {

        window.location.href =
            categoryPages[category];

    }

}


/* =====================================================
                CART PAGE LINK
===================================================== */

const cartNav =
    document.querySelector(".cart-nav");


if (cartNav) {

    cartNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "cart.html";

        }
    );

}


/* =====================================================
              WISHLIST PAGE LINK
===================================================== */

const wishlistNav =
    document.querySelector(".wishlist-nav");


if (wishlistNav) {

    wishlistNav.addEventListener(
        "click",
        function () {

            window.location.href =
                "wish.html";

        }
    );

}


/* =====================================================
              DEBUG / TEST FUNCTION
===================================================== */

/*
   Open browser console and type:

   wishlist

   or

   cart

   to check saved products.
*/

console.log("HandiHub Pottery JS loaded.");

console.log("Wishlist:", wishlist);

console.log("Cart:", cart);

