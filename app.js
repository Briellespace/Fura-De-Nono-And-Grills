const items = [
 {id:1,name:"Fura Milk",category:"fura",price:3500,desc:"Our refreshing signature fura de nono.",symbol:"🥣"},
 {id:2,name:"Fura Milk Extra",category:"fura",price:6000,desc:"A fuller serving for a bigger craving.",symbol:"🥛"},
 {id:3,name:"Fura Milk & Fruits",category:"fura",price:14200,desc:"A fruity twist on a much-loved classic.",symbol:"🥭"},
 {id:4,name:"Fura De Nono Special",category:"fura",price:30000,desc:"A special house-style fura experience.",symbol:"🍶"},
 {id:5,name:"Fura De Nono Shake",category:"fura",price:12000,desc:"A cool, creamy fura shake.",symbol:"🥤"},
 {id:6,name:"Grilled Salmon",category:"grills",price:38000,desc:"A grilled favourite from the menu.",symbol:"🐟"},
 {id:7,name:"Grilled Chicken",category:"grills",price:16600,desc:"Juicy grilled chicken, full of flavour.",symbol:"🍗"},
 {id:8,name:"Grilled Beef",category:"grills",price:7800,desc:"A satisfying grilled beef option.",symbol:"🥩"},
 {id:9,name:"Spicy Chicken",category:"grills",price:9400,desc:"A little heat with a lot of flavour.",symbol:"🍗"},
 {id:10,name:"Seafood Platter",category:"grills",price:66700,desc:"A generous seafood selection.",symbol:"🦐"},
 {id:11,name:"Sweet Cupcakes",category:"sides",price:7500,desc:"A sweet little treat.",symbol:"🧁"},
 {id:12,name:"Veggie Cupcakes",category:"sides",price:6500,desc:"A savoury option from our menu.",symbol:"🥟"},
 {id:13,name:"Smoothies",category:"sides",price:4000,desc:"A refreshing sip for any time.",symbol:"🍹"},
 {id:14,name:"Coffee (By Choice)",category:"sides",price:10000,desc:"Your coffee choice, made to order.",symbol:"☕"}
];
const naira = n => "₦" + n.toLocaleString("en-NG");
let cart = [];
const grid = document.getElementById("menuGrid");
function renderMenu(filter="all"){
 grid.innerHTML = items.filter(x=>filter==="all"||x.category===filter).map(x=>`
 <article class="menu-card"><div class="food-art ${x.category}" data-symbol="${x.symbol}"></div>
 <div class="card-content"><div class="card-top"><h3>${x.name}</h3><span class="price">${naira(x.price)}</span></div>
 <p>${x.desc}</p><button class="add-btn" data-add="${x.id}">Add to bag +</button></div></article>`).join("");
}
renderMenu();
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderMenu(b.dataset.filter);
}));
grid.addEventListener("click",e=>{const id=Number(e.target.dataset.add);if(!id)return;const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({id,qty:1});renderCart();});
const panel=document.getElementById("cartPanel"),backdrop=document.getElementById("cartBackdrop");
function openCart(){panel.classList.add("open");backdrop.classList.add("open")}
function closeCart(){panel.classList.remove("open");backdrop.classList.remove("open")}
document.getElementById("cartFab").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;backdrop.onclick=closeCart;
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+items.find(i=>i.id===x.id).price*x.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=naira(total);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(c=>{const i=items.find(x=>x.id===c.id);return `<div class="cart-row"><div><strong>${i.name}</strong>${naira(i.price)}<div class="qty"><button data-change="${i.id}" data-delta="-1">−</button><span>${c.qty}</span><button data-change="${i.id}" data-delta="1">+</button></div></div><b>${naira(i.price*c.qty)}</b></div>`}).join(""):'<p class="empty-cart">Your bag is waiting for something delicious.</p>';
}
document.getElementById("cartItems").addEventListener("click",e=>{const id=Number(e.target.dataset.change);if(!id)return;const c=cart.find(x=>x.id===id);c.qty+=Number(e.target.dataset.delta);if(c.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();});
document.getElementById("whatsappOrder").onclick=()=>{
 if(!cart.length){alert("Add something to your bag first.");return;}
 const total=cart.reduce((s,x)=>s+items.find(i=>i.id===x.id).price*x.qty,0);
 const lines=cart.map(c=>{const i=items.find(x=>x.id===c.id);return `${c.qty} x ${i.name} — ${naira(i.price*c.qty)}`});
 const msg=`Hello Fura De Nono & Grills! I'd like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${naira(total)}\nPlease confirm availability, delivery fee and payment details.`;
 // Replace with the business WhatsApp number after confirming the correct number.
 const whatsappNumber="2348076615521";
 window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();
renderCart();