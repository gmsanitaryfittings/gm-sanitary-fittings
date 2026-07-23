// ===================================
// GM SANITARY FITTINGS V2.0
// SCRIPT.JS - PART 1
// ===================================

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// WISHLIST
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// UPDATE ON LOAD
window.onload = function () {
    updateCart();
    updateWishlist();
};

// ADD TO CART
function addToCart(name, price) {

    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();

    alert(name + " added to cart");
}

// SAVE CART
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

// UPDATE CART
function updateCart() {

    let totalQty = 0;

    cart.forEach(item => {
        totalQty += item.qty;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = totalQty;
    }
}

// WISHLIST
function addToWishlist(product) {

    if (!wishlist.includes(product)) {

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlist();

        alert(product + " added to Wishlist ❤️");

    } else {

        alert("Already in Wishlist");

    }

}

// UPDATE WISHLIST
function updateWishlist() {

    const count =
        document.getElementById("wishlist-count");

    if (count) {

        count.innerText = wishlist.length;

    }

}

// SEARCH
const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {

            const name =
                product.querySelector("h3")
                .innerText
                .toLowerCase();

            product.style.display =
                name.includes(value)
                ? "block"
                : "none";

        });

    });

}
// ===================================
// SCRIPT.JS - PART 2
// ===================================

// PRODUCT DETAILS POPUP

function showDetails(name, price, image, description) {

    document.getElementById("product-details").style.display = "flex";

    document.getElementById("details-name").innerText = name;

    document.getElementById("details-price").innerText = "Rs. " + price;

    document.getElementById("details-description").innerText = description;

    document.getElementById("details-img").src = image;

    document.getElementById("details-cart").onclick = function () {
        addToCart(name, price);
    };

    document.getElementById("details-whatsapp").href =
        "https://wa.me/923482277031?text=" +
        encodeURIComponent(
            "Assalam-o-Alaikum\n\nI want to order:\n\n" +
            name +
            "\nPrice: Rs. " +
            price
        );
}

// CLOSE POPUP

function closeDetails() {

    document.getElementById("product-details").style.display = "none";

}

// DARK MODE

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

}

// LOAD THEME

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

// CATEGORY FILTER

function filterProducts(category) {

    document.querySelectorAll(".product").forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}
// ===================================
// SCRIPT.JS - PART 3
// ===================================

// IMAGE SLIDER

const slides = [
    "images/5040H.M.jpg",
    "images/6045 H.M.jpg",
    "images/6845H.M.jpg",
    "images/7843H.M.jpg",
    "images/8245H.M.jpg"
];

let currentSlide = 0;

function startSlider() {

    const slider = document.getElementById("slider");

    if (!slider) return;

    setInterval(function () {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        slider.src = slides[currentSlide];

    }, 3000);

}

startSlider();

// FLOATING WHATSAPP

function openWhatsApp() {

    window.open(
        "https://wa.me/923482277031",
        "_blank"
    );

}

// CLOSE POPUP WHEN CLICKING OUTSIDE

window.onclick = function (event) {

    const popup = document.getElementById("product-details");

    if (event.target === popup) {

        popup.style.display = "none";

    }

};

// READY

console.log("GM SANITARY FITTINGS V2.0 Loaded Successfully ✅");
// ===========================
// GM SANITARY FITTINGS V2.1 FINAL
// CART PANEL
// ===========================

function renderCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                Qty: ${item.qty} × Rs. ${item.price}
            </div>

            <button onclick="removeCartItem(${index})">
                ❌
            </button>
        </div>
        `;

    });

    cartTotal.innerText = total;

}

function removeCartItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

const oldSaveCart = saveCart;

saveCart = function(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    renderCart();

}

window.addEventListener("load", renderCart);

function checkoutWhatsApp(){

    if(cart.length===0){

        alert("Cart is Empty!");

        return;

    }

    let message = "Assalam-o-Alaikum%0A%0AGM SANITARY FITTINGS Order%0A%0A";

    let total = 0;

    cart.forEach(item=>{

        total += item.price * item.qty;

        message += `${item.name} x${item.qty} = Rs.${item.price*item.qty}%0A`;

    });

    message += `%0ATotal = Rs.${total}`;

    window.open(
        "https://wa.me/923482277031?text="+message,
        "_blank"
    );

}
// ============================
// SHARE PRODUCT
// ============================

function shareProduct(name, price){

    const text =
`🚿 GM SANITARY FITTINGS

Product: ${name}

Price: Rs. ${price}

📞 Contact: +92 348 2277031

Order on WhatsApp:
https://wa.me/923482277031`;

    if(navigator.share){

        navigator.share({
            title: name,
            text: text
        });

    }else{

        navigator.clipboard.writeText(text);

        alert("Product details copied successfully.");

    }

}
// Back To Top Button

window.onscroll = function () {

    const btn = document.getElementById("topBtn");

    if (!btn) return;

    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }

};

function topFunction() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
// ===============================
// V3.1 PROFESSIONAL CART
// ===============================

function increaseQty(index){
    cart[index].qty++;
    saveCart();
    renderCart();
}

function decreaseQty(index){
    if(cart[index].qty>1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }
    saveCart();
    renderCart();
}

function renderCart(){

    const cartItems=document.getElementById("cart-items");
    const cartTotal=document.getElementById("cart-total");

    if(!cartItems || !cartTotal) return;

    cartItems.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{

        total += item.price*item.qty;

        cartItems.innerHTML +=`

<div class="cart-item">

<div>

<b>${item.name}</b><br>

Rs.${item.price} × ${item.qty}

</div>

<div>

<button onclick="decreaseQty(${index})">➖</button>

<button onclick="increaseQty(${index})">➕</button>

<button onclick="removeCartItem(${index})">❌</button>

</div>

</div>

`;

    });

    cartTotal.innerHTML=total;

}
// ===============================
// PROFESSIONAL WHATSAPP CHECKOUT
// ===============================

function checkoutWhatsApp(){

    if(cart.length===0){

        alert("Your cart is empty.");
        return;

    }

    let message =
"🛒 GM SANITARY FITTINGS\n";
    message += "====================\n\n";

    let total = 0;

    cart.forEach((item,i)=>{

        let subTotal = item.price * item.qty;

        total += subTotal;

        message +=
`${i+1}. ${item.name}
Qty : ${item.qty}
Price : Rs. ${item.price}
Subtotal : Rs. ${subTotal}

`;

    });

    message += "====================\n";
    message += `Grand Total : Rs. ${total}\n\n`;
    message += "Thank you ❤️";

    window.open(
"https://wa.me/923482277031?text="+
encodeURIComponent(message),
"_blank"
    );

}
// ===============================
// PRINT INVOICE
// ===============================

function printInvoice(){

    if(cart.length===0){

        alert("Cart is Empty!");
        return;

    }

    let invoice = "";

    invoice += "GM SANITARY FITTINGS\n\n";

    let total = 0;

    cart.forEach((item,i)=>{

        let sub = item.price * item.qty;

        total += sub;

        invoice +=
`${i+1}. ${item.name}
Qty: ${item.qty}
Price: Rs.${item.price}
Subtotal: Rs.${sub}

`;

    });

    invoice += "------------------------\n";
    invoice += "Grand Total: Rs." + total;

    const w = window.open("", "_blank");

    w.document.write("<pre>"+invoice+"</pre>");

    w.print();

}
// ===============================
// IMAGE PREVIEW
// ===============================

function openImage(src){

    document.getElementById("imageViewer").style.display="flex";

    document.getElementById("previewImage").src=src;

}

function closeImage(){

    document.getElementById("imageViewer").style.display="none";

}