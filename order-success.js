/* =========================================
   ORDER SUCCESS
========================================= */


/* =========================================
   GET LATEST ORDER
========================================= */

const latestOrder =
    JSON.parse(
        localStorage.getItem("latestOrder")
    );


/* =========================================
   LOAD ORDER DETAILS
========================================= */

function loadOrderDetails() {

    if (!latestOrder) {

        return;

    }


    document.getElementById(
        "orderId"
    ).textContent =
        latestOrder.orderId;


    document.getElementById(
        "orderTotal"
    ).textContent =
        "₹" +
        Number(
            latestOrder.total
        ).toLocaleString("en-IN");


    const product =
        latestOrder.products[0];


    if (!product) return;


    document.getElementById(
        "productImage"
    ).src =
        product.image;


    document.getElementById(
        "productTitle"
    ).textContent =
        product.title;


    document.getElementById(
        "productCategory"
    ).textContent =
        product.category ||
        "Handmade Product";


    document.getElementById(
        "productQuantity"
    ).textContent =
        product.quantity;


    document.getElementById(
        "productPrice"
    ).textContent =
        "₹" +
        Number(
            String(product.price)
                .replace("₹", "")
                .replace(",", "")
        ).toLocaleString("en-IN");

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    const pieces = 130;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        /*
           Different paper-like shapes
        */

        const shapes = [
            "rectangle",
            "square",
            "thin"
        ];


        const shape =
            shapes[
                Math.floor(
                    Math.random()
                    *
                    shapes.length
                )
            ];


        if (shape === "square") {

            piece.style.width = "8px";

            piece.style.height = "8px";

        }


        if (shape === "thin") {

            piece.style.width = "5px";

            piece.style.height = "16px";

        }


        if (shape === "rectangle") {

            piece.style.width = "8px";

            piece.style.height = "13px";

        }


        /*
           Random position
        */

        piece.style.left =
            Math.random() * 100 + "%";


        /*
           Random fall duration
        */

        piece.style.setProperty(
            "--duration",
            (3 + Math.random() * 4)
            + "s"
        );


        /*
           Random horizontal movement
        */

        piece.style.setProperty(
            "--sway",
            (-100 + Math.random() * 200)
            + "px"
        );


        /*
           Random rotation
        */

        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        /*
           Random paper colors
        */

        const colors = [

            "#d98c8c",

            "#e4b76a",

            "#91a56b",

            "#8da7c7",

            "#c49bc4",

            "#e3a17c",

            "#a7b8a0",

            "#d6b4a8"

        ];


        piece.style.background =
            colors[
                Math.floor(
                    Math.random()
                    *
                    colors.length
                )
            ];


        /*
           Random delay
        */

        piece.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        container.appendChild(piece);

    }


    /*
       Remove after animation
    */

    setTimeout(
        () => {

            container.innerHTML = "";

        },
        8500
    );

}


/* =========================================
   BUTTONS
========================================= */

function continueShopping() {

    window.location.href =
        "collections.html";

}


function viewOrder() {

    /*
       Change this to your actual
       order tracking/order page
       when it is ready.
    */

    window.location.href =
        "tracking.html";

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadOrderDetails();

        createConfetti();

    }
);