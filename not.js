/*=========================================
        HANDIHUB NOTIFICATIONS
=========================================*/

const notificationList =
document.getElementById("notificationList");

const emptyState =
document.getElementById("emptyState");

const clearBtn =
document.getElementById("clearAllBtn");


/*=========================================
        SAVE TO LOCAL STORAGE
=========================================*/

function saveNotifications(){

    localStorage.setItem(
        "notifications",
        notificationList.innerHTML
    );

}


/*=========================================
        LOAD NOTIFICATIONS
=========================================*/

function loadNotifications(){

    const saved =
    localStorage.getItem("notifications");

    if(saved){

        notificationList.innerHTML = saved;

    }

    attachEvents();

    checkEmpty();

}

window.onload = loadNotifications;


/*=========================================
        ATTACH EVENTS
=========================================*/

function attachEvents(){

    const readBtns =
    document.querySelectorAll(".read-btn");

    const deleteBtns =
    document.querySelectorAll(".delete-btn");
     /*==============================
            Make as read
    ==============================*/

    const readButtons = document.querySelectorAll(".read-btn");

readButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".notification-card");

        // Remove unread state
        card.classList.remove("unread");

        // Change icon
        this.innerHTML = '<i class="bi bi-check2"></i>';

        // Reset button style
        this.style.background = "#F6F6F6";
        this.style.color = "#2F5D39";
        this.style.transform = "scale(1)";

    });

});


    /*==============================
            DELETE
    ==============================*/

    deleteBtns.forEach(btn=>{

        btn.onclick=function(){

            const card =
            this.closest(".notification-card");

            card.style.opacity="0";

            card.style.transform="translateX(80px)";

            setTimeout(()=>{

                card.remove();

                checkEmpty();

                saveNotifications();

            },300);

        };

    });

}


/*=========================================
        CLEAR ALL
=========================================*/

clearBtn.addEventListener("click",()=>{

    if(confirm("Delete all notifications?")){

        notificationList.innerHTML="";

        checkEmpty();

        saveNotifications();

    }

});


/*=========================================
        EMPTY STATE
=========================================*/

function checkEmpty(){

    if(notificationList.children.length===0){

        notificationList.style.display="none";

        emptyState.style.display="flex";

    }

    else{

        notificationList.style.display="flex";

        emptyState.style.display="none";

    }

}


/*=========================================
        ADD NEW NOTIFICATION
=========================================*/

function addNotification(title,message,icon){

    const card=document.createElement("div");

    card.className="notification-card unread";

    card.innerHTML=`

    <div class="left">

        <div class="icon success">

            <i class="${icon}"></i>

        </div>

        <div class="content">

            <h3>${title}</h3>

            <p>${message}</p>

            <span>Just now</span>

        </div>

    </div>

    <div class="actions">

        <button class="read-btn">

            <i class="ri-check-line"></i>

        </button>

        <button class="delete-btn">

            <i class="ri-close-line"></i>

        </button>

    </div>

    `;

    notificationList.prepend(card);

    attachEvents();

    checkEmpty();

    saveNotifications();

}


/*=========================================
        EXAMPLES
=========================================*/

// Call these whenever needed:

// addNotification(
// "Order Confirmed",
// "Your order has been placed successfully.",
// "ri-shopping-bag-3-line"
// );

// addNotification(
// "Payment Successful",
// "₹1299 payment completed.",
// "ri-wallet-3-line"
// );

// addNotification(
// "Product Added",
// "New handmade vase added successfully.",
// "ri-box-3-line"
// );

// addNotification(
// "Wishlist Updated",
// "Product added to your wishlist.",
// "ri-heart-line"
// );

// addNotification(
// "AI Photo Ready",
// "Your image enhancement is complete.",
// "ri-magic-line"
// );

