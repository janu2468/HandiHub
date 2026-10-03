const menuItems = document.querySelectorAll(".menu li");
const currentPage = window.location.pathname.split("/").pop();

menuItems.forEach(item => {

    item.classList.remove("active");

    const link = item.querySelector("a");

    if (link && link.getAttribute("href") === currentPage) {

        item.classList.add("active");

    }

});


/*=========================================
        ELEMENTS
=========================================*/

const uploadArea = document.getElementById("uploadArea");

const imageInput = document.getElementById("imageInput");

const uploadScreen = document.getElementById("uploadScreen");

const editorSection = document.getElementById("editorSection");

const beforeImage = document.getElementById("beforeImage");

const afterImage = document.getElementById("afterImage");

const enhanceBtn = document.getElementById("enhanceBtn");

const resetBtn = document.getElementById("resetBtn");

const tools = document.querySelectorAll(".tool");


/*=========================================
        OPEN FILE
=========================================*/

uploadArea.addEventListener("click", () => {

    imageInput.click();

});


/*=========================================
        IMAGE UPLOAD
=========================================*/

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        beforeImage.src = e.target.result;

        afterImage.src = e.target.result;

        uploadScreen.style.display = "none";

        editorSection.style.display = "grid";

    };

    reader.readAsDataURL(file);

});


/*=========================================
        ENHANCE
=========================================*/

enhanceBtn.addEventListener("click", () => {

    afterImage.style.filter =

        "brightness(1.15) contrast(1.1) saturate(1.2)";

});


/*=========================================
        RESET
=========================================*/

resetBtn.addEventListener("click", () => {

    imageInput.value = "";

    beforeImage.src = "";

    afterImage.src = "";

    afterImage.style.filter = "none";

    uploadScreen.style.display = "block";

    editorSection.style.display = "none";

});


/*=========================================
        TOOL BUTTON ACTIVE
=========================================*/

tools.forEach((tool) => {

    tool.addEventListener("click", () => {

        tools.forEach(btn => btn.classList.remove("active"));

        tool.classList.add("active");

    });

});


/*=========================================
        INDIVIDUAL EFFECTS
=========================================*/

tools.forEach((tool) => {

    tool.addEventListener("click", () => {

        const effect = tool.dataset.effect;

        switch(effect){

            case "background":

                afterImage.style.filter =
                "brightness(1.05) contrast(1.05)";

            break;


            case "lighting":

                afterImage.style.filter =
                "brightness(1.25)";

            break;


            case "sharpness":

                afterImage.style.filter =
                "contrast(1.3) saturate(1.05)";

            break;


            case "crop":

                afterImage.style.objectFit = "cover";

            break;


            case "color":

                afterImage.style.filter =
                "saturate(1.5) contrast(1.1)";

            break;

        }

    });

});
/*=========================================
        DOWNLOAD IMAGE
=========================================*/

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {

    if (!afterImage.src) {

        alert("Please upload and enhance an image first!");

        return;

    }

    const link = document.createElement("a");

    link.href = afterImage.src;

    link.download = "HandiHub-Enhanced-Image.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

});