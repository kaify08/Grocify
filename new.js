// JavaScript File: new.js

let searchForm = document.querySelector(' .search-form');
document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active');
}

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick=()=>{
    shoppingCart.classList.toggle('active');
}

let loginform = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick=()=>{
    loginform.classList.toggle('active');
}

var swiper = new Swiper(".product-slider", {
  loop:true,
  spaceBetween: 20,
  autoplay:{
      delay:7500,
      disableOnInteraction:false,
  },
  centeredSlides: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

var swiper = new Swiper(".review-slider", {
  loop:true,
  spaceBetween: 20,
  autoplay:{
      delay:7500,
      disableOnInteraction:false,
  },
  centeredSlides: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

// --- Add to Cart Functionality ---
const cartBox = document.querySelector('.shopping-cart');
const cartTotal = cartBox.querySelector('.total');
let cartItems = JSON.parse(localStorage.getItem('grocify_cart')) || [];

function updateCart() {
    const container = cartBox.querySelectorAll('.box');
    container.forEach(box => box.remove());

    let total = 0;
    cartItems.forEach(item => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <i class="fas fa-trash"></i>
            <img src="${item.image}" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">${item.price}</span>
                <span class="quantity">qty-${item.qty}</span>
            </div>`;
        box.querySelector('.fa-trash').onclick = () => {
            cartItems = cartItems.filter(i => i.name !== item.name);
            updateCart();
        };
        cartBox.insertBefore(box, cartTotal);
        total += item.qty * parseFloat(item.price.replace('$', ''));
    });
    cartTotal.innerText = `total : $${total.toFixed(2)}`;

    // Save updated cart to localStorage
    localStorage.setItem('grocify_cart', JSON.stringify(cartItems));
}

updateCart(); // Load cart from storage when page loads

document.querySelectorAll('.products .btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const box = btn.closest('.box');
        const name = box.querySelector('h3').innerText;
        const price = box.querySelector('.price').innerText.split('/')[0];
        const image = box.querySelector('img').src;
        const found = cartItems.find(i => i.name === name);
        if (found) {
            found.qty++;
        } else {
            cartItems.push({ name, price, image, qty: 1 });
        }
        updateCart();
        showToast(`${name} added to cart!`);
    });
});

// --- Search Functionality ---
const searchInput = document.querySelector('#search-box');
searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    document.querySelectorAll('.products .swiper-slide').forEach(slide => {
        const title = slide.querySelector('h3').innerText.toLowerCase();
        slide.style.display = title.includes(keyword) ? '' : 'none';
    });
});

// --- Authentication Logic (Fake Login) ---
const loginForm = document.querySelector('.login-form');
const loginBtn = document.querySelector('#login-btn');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type=email]').value;
    const password = loginForm.querySelector('input[type=password]').value;
    
    if (email === 'kaif@gmail.com' && password === 'Apple@746689') {
        alert('Login successful!');
        loginForm.classList.remove('active');
        
        loginBtn.innerHTML = `
          <span style="font-weight: bold; margin-right: 10px;">Kaif</span>
          <button id="logout-btn" style="
            background-color: #f44336; 
            border: none; 
            color: white; 
            padding: 5px 10px; 
            border-radius: 4px; 
            cursor: pointer; 
            font-size: 0.9rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: background-color 0.3s ease;
          ">Logout</button>
        `;

        const logoutBtn = document.querySelector('#logout-btn');
        logoutBtn.addEventListener('mouseenter', () => {
          logoutBtn.style.backgroundColor = '#d32f2f';
        });
        logoutBtn.addEventListener('mouseleave', () => {
          logoutBtn.style.backgroundColor = '#f44336';
        });

        logoutBtn.addEventListener('click', () => {
            alert('Logged out!');
            loginBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
            loginForm.classList.add('active');
        });
        
    } else {
        alert('Invalid credentials!');
    }
});


// Loader logic
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        font-size: 1.6rem;
        animation: fadeInOut 3s ease forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
