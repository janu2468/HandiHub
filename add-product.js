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
        IMAGE UPLOAD
=========================================*/

const uploadBox = document.getElementById("uploadBox");

const fileInput = document.getElementById("productImage");

const previewImage = document.getElementById("previewImage");

const uploadContent = document.getElementById("uploadContent");

/* Open File Picker */

uploadBox.addEventListener("click",()=>{

    fileInput.click();

});

/* Preview Image */

fileInput.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload=function(event){

        previewImage.src=event.target.result;

        previewImage.style.display="block";

        uploadContent.style.display="none";

    }

    reader.readAsDataURL(file);

});

/*=========================================
        SAVE PRODUCT
=========================================*/

const form=document.getElementById("productForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const product={

        image:previewImage.src,

        name:document.getElementById("productName").value,

        price:document.getElementById("productPrice").value,

        stock:document.getElementById("productStock").value,

        category:document.getElementById("productCategory").value,

        description:document.getElementById("productDescription").value,

        impact:document.getElementById("impactStory").value

    };

    let products=JSON.parse(localStorage.getItem("products")) || [];

    products.push(product);

    localStorage.setItem("products",JSON.stringify(products));

    alert("✅ Product Saved Successfully!");

    form.reset();

    previewImage.style.display="none";

    uploadContent.style.display="flex";

    previewImage.src="";

});

/*=========================================
        LOAD PRODUCTS
=========================================*/

const table=document.querySelector(".product-table");

const products=JSON.parse(localStorage.getItem("products")) || [];

products.forEach(product=>{

    const row=document.createElement("div");

    row.className="product-row";

    row.innerHTML=`

    <div class="col-product">

        <img src="${product.image}">

        <div>

            <h3>${product.name}</h3>

            <p>${product.description}</p>

        </div>

    </div>

    <div class="col-category">

        ${product.category}

    </div>

    <div class="col-price">

        ₹${product.price}

    </div>

    <div class="col-stock">

        <span class="stock green">

            ${product.stock} In Stock

        </span>

    </div>

    <div class="col-action">

        <button class="edit-btn">

            <i class="ri-edit-line"></i>

        </button>

        <button class="delete-btn">

            <i class="ri-delete-bin-line"></i>

        </button>

    </div>

    `;

    table.appendChild(row);

});