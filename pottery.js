/* =====================================================
                POTTERY PRODUCTS
===================================================== */

const potteryProducts = [

    {
        id: "pottery-001",

        title: "Handmade Ceramic Vase",

        price: 899,

        image: "images/vase.jpg",

        rating: 4.9,

        reviews: 92
    },


    {
        id: "pottery-002",

        title: "Traditional Clay Pot",

        price: 699,

        image: "images/claypot.jpg",

        rating: 4.8,

        reviews: 76
    },


    {
        id: "pottery-003",

        title: "Handcrafted Ceramic Bowl",

        price: 549,

        image: "images/bowl.jpg",

        rating: 4.8,

        reviews: 64
    },


    {
        id: "pottery-004",

        title: "Terracotta Planter",

        price: 799,

        image: "images/planter.jpg",

        rating: 4.9,

        reviews: 81
    },


    {
        id: "pottery-005",

        title: "Rustic Handmade Mug",

        price: 449,

        image: "images/mug.jpg",

        rating: 4.7,

        reviews: 53
    },


    {
        id: "pottery-006",

        title: "Artisan Ceramic Plate",

        price: 599,

        image: "images/plate.jpg",

        rating: 4.8,

        reviews: 71
    },


    {
        id: "pottery-007",

        title: "Hand Painted Pottery Vase",

        price: 1099,

        image: "images/vase2.jpg",

        rating: 4.9,

        reviews: 88
    },


    {
        id: "pottery-008",

        title: "Traditional Terracotta Bowl",

        price: 499,

        image: "images/bowl2.jpg",

        rating: 4.6,

        reviews: 42
    }

];



/* =====================================================
                DISPLAY PRODUCTS
===================================================== */

const productsGrid =
    document.getElementById("productsGrid");


function displayProducts(products) {

    productsGrid.innerHTML = "";


    if(products.length === 0){

        productsGrid.innerHTML = `

            <div class="no-products">

                <h3>
                    No pottery products found
                </h3>

                <p>
                    Try searching for another product.
                </p>

            </div>

        `;

        return;

    }


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    onerror="this.src='images/vase.jpg'"
                >


                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(
                        '${product.id}',
                        event
                    )">

                    <i class="bi bi-heart"></i>

                </button>

            </div>


            <div class="product-info">

                <p class="product-category">
                    HANDMADE POTTERY
                </p>


                <h3>
                    ${product.title}
                </h3>


                <div class="rating">

                    ⭐ ${product.rating}

                    <span>
                        (${product.reviews})
                    </span>

                </div>


                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>


                    <button
                        class="cart-btn"
                        onclick="addToCart(
                            '${product.id}',
                            event
                        )">

                        <i class="bi bi-cart3"></i>

                    </button>

                </div>

            </div>

        `;


        /*
            Product card click
            product.html later connect cheyyachu
        */

        card.addEventListener(
            "click",
            function(e){

                if(
                    e.target.closest(
                        ".wishlist-btn"
                    ) ||
                    e.target.closest(
                        ".cart-btn"
                    )
                ){

                    return;

                }

                localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify(product)
                );

                window.location.href =
                    "product.html";

            }
        );


        productsGrid.appendChild(card);

    });


    updateWishlistButtons();

}



/* =====================================================
                     SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function(){

        const search =
            this.value
                .toLowerCase()
                .trim();


        const filtered =
            potteryProducts.filter(
                product =>
                    product.title
                        .toLowerCase()
                        .includes(search)
            );


        displayProducts(filtered);

    }
);



/* =====================================================
                       SORT
===================================================== */

const sortProducts =
    document.getElementById("sortProducts");


sortProducts.addEventListener(
    "change",
    function(){

        let sorted =
            [...potteryProducts];


        if(this.value === "low"){

            sorted.sort(
                (a,b) =>
                    a.price - b.price
            );

        }


        if(this.value === "high"){

            sorted.sort(
                (a,b) =>
                    b.price - a.price
            );

        }


        if(this.value === "rating"){

            sorted.sort(
                (a,b) =>
                    b.rating - a.rating
            );

        }


        displayProducts(sorted);

    }
);



/* =====================================================
                    CATEGORY NAVIGATION
===================================================== */

function openCategory(category){

    if(category === "pottery"){

        return;

    }


    /*
       Later these pages can be created.
       For now we keep the navigation ready.
    */

    window.location.href =
        category + ".html";

}



/* =====================================================
                    WISHLIST
===================================================== */

function getWishlist(){

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}


function toggleWishlist(
    productId,
    event
){

    event.stopPropagation();


    let wishlist =
        getWishlist();


    const product =
        potteryProducts.find(
            item =>
                item.id === productId
        );


    const exists =
        wishlist.some(
            item =>
                item.id === productId
        );


    if(exists){

        wishlist =
            wishlist.filter(
                item =>
                    item.id !== productId
            );

    }
    else{

        wishlist.push({

            ...product,

            category: "pottery",

            page: "product.html"

        });

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistButtons();

    updateWishlistCount();

}



/* =====================================================
              UPDATE WISHLIST BUTTONS
===================================================== */

function updateWishlistButtons(){

    const wishlist =
        getWishlist();


    document
        .querySelectorAll(
            ".wishlist-btn"
        )
        .forEach(button => {

            const card =
                button.closest(
                    ".product-card"
                );

            const title =
                card.querySelector(
                    "h3"
                ).textContent;


            const product =
                potteryProducts.find(
                    item =>
                        item.title === title
                );


            if(!product) return;


            const icon =
                button.querySelector("i");


            const active =
                wishlist.some(
                    item =>
                        item.id ===
                        product.id
                );


            if(active){

                button.classList.add(
                    "active"
                );

                icon.classList.remove(
                    "bi-heart"
                );

                icon.classList.add(
                    "bi-heart-fill"
                );

            }
            else{

                button.classList.remove(
                    "active"
                );

                icon.classList.remove(
                    "bi-heart-fill"
                );

                icon.classList.add(
                    "bi-heart"
                );

            }

        });

}



/* =====================================================
                 WISHLIST COUNT
===================================================== */

function updateWishlistCount(){

    const wishlist =
        getWishlist();


    const count =
        document.getElementById(
            "wishlistCount"
        );


    if(count){

        count.textContent =
            wishlist.length;

    }

}



/* =====================================================
                       CART
===================================================== */

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function addToCart(
    productId,
    event
){

    event.stopPropagation();


    let cart =
        getCart();


    const product =
        potteryProducts.find(
            item =>
                item.id === productId
        );


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if(existing){

        existing.quantity =
            (existing.quantity || 1) + 1;

    }
    else{

        cart.push({

            ...product,

            category: "pottery",

            quantity: 1,

            page: "product.html"

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        `${product.title} added to cart!`
    );

}



/* =====================================================
                    CART COUNT
===================================================== */

function updateCartCount(){

    const cart =
        getCart();


    const count =
        document.getElementById(
            "cartCount"
        );


    if(count){

        const total =
            cart.reduce(
                (sum,item) =>
                    sum +
                    (item.quantity || 1),
                0
            );


        count.textContent =
            total;

    }

}



/* =====================================================
                     PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        displayProducts(
            potteryProducts
        );

        updateWishlistCount();

        updateCartCount();

    }
);


/* =====================================================
                RETURN TO PAGE
===================================================== */

window.addEventListener(
    "focus",
    function(){

        updateWishlistCount();

        updateCartCount();

        updateWishlistButtons();

    }
);