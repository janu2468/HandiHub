/* =========================================
   HANDIHUB ORDER TRACKING
========================================= */


/* =========================================
   GET LATEST ORDER
========================================= */

const latestOrder =
    JSON.parse(
        localStorage.getItem("latestOrder")
    );


/* =========================================
   TRACKING STATUS
========================================= */

/*
    You can change this later based on
    your real backend/order system.

    For now:

    1 = Confirmed
    2 = Preparing
    3 = Shipped
    4 = Out for Delivery
    5 = Delivered
*/

let currentStep = 2;


/* =========================================
   LOAD ORDER
========================================= */

function loadOrder() {

    if (!latestOrder) {

        return;

    }


    /* ================================
       ORDER ID
    ================================= */

    document.getElementById(
        "orderId"
    ).textContent =
        latestOrder.orderId;


    /* ================================
       ORDER DATE
    ================================= */

    const orderDate =
        new Date(
            latestOrder.date
        );


    document.getElementById(
        "orderDate"
    ).textContent =
        orderDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    /* ================================
       TOTAL
    ================================= */

    document.getElementById(
        "orderTotal"
    ).textContent =
        "₹" +
        Number(
            latestOrder.total
        ).toLocaleString("en-IN");


    /* ================================
       PRODUCT
    ================================= */

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
        "HANDMADE";


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


    /* ================================
       ADDRESS
    ================================= */

    const customer =
        latestOrder.customer;


    if (customer) {

        document.getElementById(
            "deliveryAddress"
        ).innerHTML = `

            <strong>
                ${customer.name}
            </strong>

            <br>

            ${customer.address}

            <br>

            ${customer.city},
            ${customer.state}
            -
            ${customer.pincode}

            <br>

            Phone:
            ${customer.phone}

        `;

    }


    /* ================================
       DELIVERY DATE
    ================================= */

    const deliveryDate =
        new Date(
            orderDate
        );


    deliveryDate.setDate(
        deliveryDate.getDate() + 7
    );


    document.getElementById(
        "deliveryDate"
    ).textContent =
        deliveryDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


/* =========================================
   UPDATE TRACKING
========================================= */

function updateTracking() {

    const steps =
        document.querySelectorAll(
            ".timeline-step"
        );


    steps.forEach(
        (step, index) => {

            const stepNumber =
                index + 1;


            step.classList.remove(
                "completed",
                "current"
            );


            const icon =
                step.querySelector(
                    ".step-icon"
                );


            if (
                stepNumber <
                currentStep
            ) {

                step.classList.add(
                    "completed"
                );


                icon.innerHTML =
                    '<i class="bi bi-check-lg"></i>';

            }


            else if (
                stepNumber ===
                currentStep
            ) {

                step.classList.add(
                    "completed",
                    "current"
                );


                /*
                   Current step gets
                   its own icon.
                */

                if (
                    stepNumber === 1
                ) {

                    icon.innerHTML =
                        '<i class="bi bi-check-lg"></i>';

                }

                else if (
                    stepNumber === 2
                ) {

                    icon.innerHTML =
                        '<i class="bi bi-box-seam"></i>';

                }

                else if (
                    stepNumber === 3
                ) {

                    icon.innerHTML =
                        '<i class="bi bi-truck"></i>';

                }

                else if (
                    stepNumber === 4
                ) {

                    icon.innerHTML =
                        '<i class="bi bi-geo-alt"></i>';

                }

                else {

                    icon.innerHTML =
                        '<i class="bi bi-house-heart"></i>';

                }

            }

        }
    );


    /* =================================
       PROGRESS LINE
    ================================= */

    const progress =
        document.getElementById(
            "timelineProgress"
        );


    const progressPercent =
        ((currentStep - 1) / 4)
        * 100;


    progress.style.height =
        progressPercent + "%";


    /* =================================
       CURRENT STATUS
    ================================= */

    const status =
        document.getElementById(
            "currentStatus"
        );


    const statusNames = [

        "Order Confirmed",

        "Preparing Order",

        "Shipped",

        "Out for Delivery",

        "Delivered"

    ];


    status.textContent =
        statusNames[
            currentStep - 1
        ];

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadOrder();

        updateTracking();

    }
);