const menuItems = document.querySelectorAll(".menu li");
const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {

    item.classList.remove("active");

    const link = item.querySelector("a");

    if (link && link.getAttribute("href") === currentPage) {

        item.classList.add("active");

    }

});
