const menuItems = document.querySelectorAll(".menu li");
const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {

    item.classList.remove("active");

    const link = item.querySelector("a");

    if (link && link.getAttribute("href") === currentPage) {

        item.classList.add("active");

    }

});

// ======================================
// SELLER DASHBOARD CHART
// ======================================

const ctx = document.getElementById("revenueChart");

const gradient = ctx.getContext("2d").createLinearGradient(0,0,0,350);

gradient.addColorStop(0,"rgba(47,93,57,0.35)");
gradient.addColorStop(1,"rgba(47,93,57,0)");

new Chart(ctx,{

    type:"line",

    data:{

        labels:[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        datasets:[{

            label:"Revenue",

            data:[
                8500,
                14200,
                12800,
                19500,
                22000,
                28500,
                42500
            ],

            borderColor:"#2F5D39",

            backgroundColor:gradient,

            borderWidth:4,

            fill:true,

            tension:0.45,

            pointRadius:6,

            pointHoverRadius:8,

            pointBackgroundColor:"#ffffff",

            pointBorderColor:"#2F5D39",

            pointBorderWidth:3

        }]

    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        interaction:{

            intersect:false,

            mode:"index"

        },

        plugins:{

            legend:{
                display:false
            },

            tooltip:{

                backgroundColor:"#2F5D39",

                titleColor:"#fff",

                bodyColor:"#fff",

                displayColors:false,

                padding:12,

                callbacks:{

                    label:function(context){

                        return " Revenue : ₹" +
                        context.parsed.y.toLocaleString();

                    }

                }

            }

        },

        scales:{

            x:{

                grid:{
                    display:false
                },

                ticks:{

                    color:"#666",

                    font:{

                        family:"Inter",

                        size:14,

                        weight:"500"

                    }

                }

            },

            y:{

                beginAtZero:true,

                ticks:{

                    stepSize:10000,

                    color:"#777",

                    callback:function(value){

                        return "₹" + (value/1000) + "k";

                    },

                    font:{

                        family:"Inter",

                        size:13

                    }

                },

                grid:{

                    color:"rgba(0,0,0,0.08)",

                    drawBorder:false

                }

            }

        },

        animation:{

            duration:2200,

            easing:"easeOutQuart"

        }

    }

});

// =============================
// CARD HOVER EFFECT
// =============================

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});

// =============================
// GREETING BASED ON TIME
// =============================

const greeting=document.querySelector(".greeting h1");

const hour=new Date().getHours();

let text="Good Evening,";

if(hour<12){

    text="Good Morning,";

}

else if(hour<17){

    text="Good Afternoon,";

}

greeting.innerHTML=`${text} Lakshmi <span>👋</span>`;


/*=========================================
        QUICK ACTIONS
=========================================*/

const quickCards = document.querySelectorAll(".quick-card");

quickCards.forEach((card) => {

    // Hover Animation
    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-6px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

    // Click Animation
    card.addEventListener("click", () => {

        card.style.transform = "scale(0.98)";

        setTimeout(() => {

            card.style.transform = "translateY(-6px)";

        },150);

    });

});

/*=========================================
        MANAGE PRODUCTS LINK
=========================================*/

const manageBtn = document.querySelector(".quick-header a");

manageBtn.addEventListener("mouseenter",()=>{

    manageBtn.style.gap="12px";

});

manageBtn.addEventListener("mouseleave",()=>{

    manageBtn.style.gap="6px";

});