/* ==========================================================================
   ESTCOM RESTO & BAR - OFFICIAL JAVASCRIPT LOGIC
   Includes: Menu Data, Cart System, WAMP DB Sync, Reviews Carousel, 
   Interactive 2D Floor Plan, QR Receipt Generator, Login System & Admin Terminal.
   ========================================================================== */

// 1. OFFICIAL ESTCOM MENU DATA (Prices in ₱)
const unifiedMenuData = {
    beverages: [
        { id: 1, name: "Choco Bliss (Hot)", desc: "Rich premium cocoa blended with creamy milk.", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400&auto=format&fit=crop", ingredients: ["Cocoa Blend", "Hot Milk"], variants: [{ label: "16 oz", price: 85 }, { label: "22 oz", price: 110 }] },
        { id: 2, name: "Matcha Latte (Hot)", desc: "Authentic Japanese green tea whisked with rich steamed milk.", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop", ingredients: ["Japanese Matcha", "Steamed Milk"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 130 }] },
        { id: 3, name: "Caramel Macchiato (Hot)", desc: "Smooth espresso layered with vanilla syrup, hot milk, and caramel drizzle.", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Vanilla Syrup", "Caramel Drizzle"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 130 }] },
        { id: 4, name: "Cappuccino (Hot)", desc: "Classic espresso with steamed milk and a thick layer of foam.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Steamed Milk", "Foam"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 130 }] },
        { id: 5, name: "Mocha (Hot)", desc: "Espresso mixed with dark chocolate and velvety steamed milk.", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Chocolate Syrup"], variants: [{ label: "16 oz", price: 100 }, { label: "22 oz", price: 120 }] },
        { id: 6, name: "Spanish Latte (Hot)", desc: "Rich espresso combined with sweetened condensed milk and fresh milk.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Condensed Milk"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 120 }] },
        { id: 7, name: "Spanish Latte (Cold)", desc: "Iced espresso combined with sweetened condensed milk and fresh milk.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Condensed Milk", "Ice"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 130 }] },
        { id: 8, name: "Matcha Latte (Cold)", desc: "Iced Japanese green tea whisked with creamy milk.", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop", ingredients: ["Matcha", "Fresh Milk", "Ice"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 130 }] },
        { id: 9, name: "Iced Mocha", desc: "Chilled espresso with rich chocolate sauce and cold milk over ice.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Chocolate", "Ice"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 130 }] },
        { id: 10, name: "Caramel Macchiato (Cold)", desc: "Iced espresso layered with vanilla, milk, and sweet caramel drizzle.", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400&auto=format&fit=crop", ingredients: ["Espresso", "Vanilla", "Caramel"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 130 }] },
        { id: 11, name: "Biscoff Crunch (Cold)", desc: "Decadent iced drink infused with Lotus Biscoff cookie spread.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop", ingredients: ["Biscoff Spread", "Milk", "Ice"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 140 }] },
        { id: 12, name: "Iced Choco", desc: "Refreshingly cold premium chocolate drink.", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400&auto=format&fit=crop", ingredients: ["Chocolate Blend", "Ice"], variants: [{ label: "16 oz", price: 100 }, { label: "22 oz", price: 120 }] },
        { id: 13, name: "Iced Nutella", desc: "Creamy iced milk blended with rich Nutella hazelnut spread.", img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400&auto=format&fit=crop", ingredients: ["Nutella", "Milk", "Ice"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 140 }] },
        { id: 14, name: "Strawberry Matcha", desc: "Layered iced strawberry puree topped with whisked Japanese matcha.", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop", ingredients: ["Strawberry Puree", "Matcha"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 145 }] },
        { id: 15, name: "Matcha Biscoff Cream Latte", desc: "Matcha latte combined with Biscoff cream and biscuit crunch.", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=400&auto=format&fit=crop", ingredients: ["Matcha", "Biscoff Cream"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 145 }] },
        { id: 16, name: "Iced Strawberry Milk", desc: "Sweet strawberry reduction mixed with cold creamy milk.", img: "https://images.unsplash.com/photo-1579954115545-aad50765025d?q=80&w=400&auto=format&fit=crop", ingredients: ["Strawberry Base", "Milk"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 130 }] },
        { id: 17, name: "Java Chip Frappe", desc: "Blended coffee frappe with chocolate chips and whipped cream.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop", ingredients: ["Coffee", "Java Chips", "Cream"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 140 }] },
        { id: 18, name: "Cookies and Cream Frappe", desc: "Creamy crushed Oreo cookie frappe topped with whipped cream.", img: "https://images.unsplash.com/photo-1579954115545-aad50765025d?q=80&w=400&auto=format&fit=crop", ingredients: ["Oreo", "Milk Base"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 140 }] },
        { id: 19, name: "Strawberries and Cream Frappe", desc: "Sweet blended strawberry cream frappe topped with whipped cream.", img: "https://images.unsplash.com/photo-1579954115545-aad50765025d?q=80&w=400&auto=format&fit=crop", ingredients: ["Strawberry Base", "Cream"], variants: [{ label: "16 oz", price: 110 }, { label: "22 oz", price: 130 }] },
        { id: 20, name: "Biscoff Cream Crunch Frappe", desc: "Blended Lotus Biscoff frappe with crunchy cookie toppings.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop", ingredients: ["Biscoff", "Cookie Crunch"], variants: [{ label: "16 oz", price: 120 }, { label: "22 oz", price: 140 }] }
    ],
    appetizers: [
        { id: 101, name: "Nachos Supreme", desc: "Crispy tortilla chips topped with cheese sauce, shredded cheese, and fresh vegetable salsa.", img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=400&auto=format&fit=crop", ingredients: ["Tortilla Chips", "Cheese Sauce"], variants: [{ label: "Regular Platter", price: 210 }] },
        { id: 102, name: "Loaded Fries (w/ Bacon & Cheese)", desc: "Crispy fries loaded with cheese sauce, savory bacon bits, and shredded cheese.", img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop", ingredients: ["Fries", "Bacon Bits"], variants: [{ label: "Regular Basket", price: 210 }] },
        { id: 103, name: "Mojos", desc: "Seasoned and golden breaded potato rounds served hot with dip.", img: "https://images.unsplash.com/photo-1518013038567-0c1598f121d5?q=80&w=400&auto=format&fit=crop", ingredients: ["Potato Rounds", "Garlic Dip"], variants: [{ label: "Regular Basket", price: 150 }] },
        { id: 104, name: "Cheese Sticks", desc: "Golden fried cheese rolls served crisp with dipping sauce.", img: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=400&auto=format&fit=crop", ingredients: ["Cheese Roll", "Dip"], variants: [{ label: "1 Serving", price: 150 }] },
        { id: 105, name: "Kamote Fries", desc: "Sweet potato fries fried to crispy perfection.", img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop", ingredients: ["Sweet Potato"], variants: [{ label: "Regular Basket", price: 135 }] },
        { id: 106, name: "Chicken Tenders w/ Fries & Mojos", desc: "Juicy chicken tenders served alongside french fries and mojos.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop", ingredients: ["Chicken Tenders", "Fries", "Mojos"], variants: [{ label: "Combo Basket", price: 240 }] },
        { id: 107, name: "Crispy Enoki Mushroom", desc: "Deep-fried enoki mushrooms with signature seasoning.", img: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=400&auto=format&fit=crop", ingredients: ["Enoki Mushroom", "Batter"], variants: [{ label: "1 Serving", price: 150 }] }
    ],
    sandwiches: [
        { id: 301, name: "Monte Cristo (Served with Fries)", desc: "Golden fried French toast filled with ham and melted cheese.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop", ingredients: ["French Toast", "Ham", "Cheese"], variants: [{ label: "Whole Sandwich", price: 225 }] },
        { id: 302, name: "Estcom Spicy Chicken Burger (Served with Fries)", desc: "Crispy spicy chicken patty topped with fresh lettuce and sauce.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop", ingredients: ["Spicy Chicken", "Fries"], variants: [{ label: "Single Burger", price: 195 }] },
        { id: 303, name: "Clubhouse Sandwich (Served with Fries)", desc: "Triple-decker sandwich packed with chicken, ham, egg, and cheese.", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop", ingredients: ["Toast", "Chicken", "Ham", "Egg"], variants: [{ label: "Full Clubhouse", price: 250 }] }
    ],
    riceBowls: [
        { id: 401, name: "Pork Adobo Rice Bowl", desc: "Classic tender pork adobo over warm steamed rice.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Adobo", "Rice"], variants: [{ label: "Bowl", price: 180 }] },
        { id: 402, name: "Oyakudon", desc: "Japanese chicken and egg simmered in savory soy broth over rice.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop", ingredients: ["Chicken", "Egg", "Rice"], variants: [{ label: "Bowl", price: 170 }] },
        { id: 403, name: "Katsudon", desc: "Crispy breaded pork cutlet cooked with egg and sweet onion soy glaze over rice.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Cutlet", "Egg", "Rice"], variants: [{ label: "Bowl", price: 180 }] },
        { id: 404, name: "Katsu Curry", desc: "Crispy katsu served with rich Japanese curry sauce over rice.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop", ingredients: ["Katsu", "Japanese Curry"], variants: [{ label: "Bowl", price: 190 }] },
        { id: 405, name: "Tonkatsu", desc: "Classic Japanese deep-fried pork cutlet served with rice.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Cutlet", "Rice"], variants: [{ label: "Bowl", price: 180 }] },
        { id: 406, name: "Chicken Katsu", desc: "Crispy breaded chicken cutlet with savory sauce over rice.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop", ingredients: ["Chicken Katsu", "Rice"], variants: [{ label: "Bowl", price: 170 }] },
        { id: 407, name: "Beef Mongolian", desc: "Savory stir-fried beef with Mongolian sauce over steamed rice.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Beef Strips", "Rice"], variants: [{ label: "Bowl", price: 200 }] },
        { id: 408, name: "Sisig Rice Bowl", desc: "Sizzling pork sisig served over rice.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Sisig", "Rice"], variants: [{ label: "Bowl", price: 160 }] }
    ],
    pasta: [
        { id: 201, name: "Penne Arrabbiata", desc: "Spicy zesty marinara penne pasta.", img: "https://images.unsplash.com/photo-1621996346565-e3d5d6281894?q=80&w=400&auto=format&fit=crop", ingredients: ["Penne", "Spicy Sauce"], variants: [{ label: "1 Serving", price: 200 }] },
        { id: 202, name: "Carbonara", desc: "Rich and creamy fettuccine with bacon and parmesan.", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop", ingredients: ["Fettuccine", "Cream", "Bacon"], variants: [{ label: "1 Serving", price: 210 }] },
        { id: 203, name: "Aglio Olio with Shrimp", desc: "Garlic and olive oil pasta tossed with juicy shrimp.", img: "https://images.unsplash.com/photo-1621996346565-e3d5d6281894?q=80&w=400&auto=format&fit=crop", ingredients: ["Shrimp", "Garlic", "Pasta"], variants: [{ label: "1 Serving", price: 190 }] },
        { id: 204, name: "Meatball Spaghetti", desc: "Classic spaghetti with savory meatballs in marinara sauce.", img: "https://images.unsplash.com/photo-1621996346565-e3d5d6281894?q=80&w=400&auto=format&fit=crop", ingredients: ["Spaghetti", "Meatballs"], variants: [{ label: "1 Serving", price: 200 }] }
    ],
    mainDishes: [
        { id: 501, name: "Beef Salpicao", desc: "Tender beef stir-fried with sautéed garlic and soy glaze.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Beef Cubes", "Garlic"], variants: [{ label: "Platter", price: 320 }] },
        { id: 502, name: "Glazed Lemon Chicken", desc: "Crispy chicken glazed in zesty lemon sauce.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop", ingredients: ["Chicken", "Lemon Glaze"], variants: [{ label: "Platter", price: 320 }] },
        { id: 503, name: "Spicy Spare Ribs", desc: "Tender pork spare ribs cooked in spicy savory glaze.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Ribs", "Spicy Glaze"], variants: [{ label: "Platter", price: 310 }] },
        { id: 504, name: "Buttered Garlic Chicken", desc: "Juicy chicken tossed in butter and rich garlic.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop", ingredients: ["Chicken", "Butter", "Garlic"], variants: [{ label: "Platter", price: 320 }] },
        { id: 505, name: "Herb Roasted Salmon", desc: "Fresh salmon roasted with aromatic herbs.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop", ingredients: ["Salmon Fillet", "Herbs"], variants: [{ label: "Serving", price: 350 }] },
        { id: 506, name: "Pork Caldereta", desc: "Rich and hearty Filipino pork stew in tomato liver sauce.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork", "Caldereta Sauce"], variants: [{ label: "Platter", price: 310 }] },
        { id: 507, name: "Liempo BBQ", desc: "Grilled marinated pork belly served with dipping sauce.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Liempo", "BBQ Sauce"], variants: [{ label: "Platter", price: 310 }] },
        { id: 508, name: "Lechon Kawali", desc: "Deep-fried crispy pork belly served with lechon sauce.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Crispy Pork", "Lechon Sauce"], variants: [{ label: "Platter", price: 310 }] },
        { id: 509, name: "Bicol Express", desc: "Pork cooked in rich coconut milk and spicy green chilies.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork", "Coconut Milk", "Chilies"], variants: [{ label: "Platter", price: 290 }] },
        { id: 510, name: "Crispy Pata", desc: "Deep-fried pork leg cooked to maximum crispiness.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Knuckle", "Vinegar Dip"], variants: [{ label: "Medium Size", price: 750 }, { label: "Large Size", price: 820 }] }
    ],
    pizza: [
        { id: 601, name: "Sisig Pizza", desc: "Crispy pizza topped with savory pork sisig and melted cheese.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Sisig", "Mozzarella"], variants: [{ label: "Whole Pizza", price: 300 }] },
        { id: 602, name: "Hawaiian Pizza", desc: "Classic pizza topped with ham, pineapple, and cheese.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop", ingredients: ["Ham", "Pineapple"], variants: [{ label: "Whole Pizza", price: 310 }] },
        { id: 603, name: "Creamy Spinach and Mushroom Pizza", desc: "Creamy white sauce pizza with fresh spinach and mushrooms.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop", ingredients: ["Spinach", "Mushrooms"], variants: [{ label: "Whole Pizza", price: 330 }] }
    ],
    breakfast: [
        { id: 701, name: "Tapsilog", desc: "Beef tapa served with garlic fried rice and egg.", img: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop", ingredients: ["Beef Tapa", "Garlic Rice", "Egg"], variants: [{ label: "Classic Meal", price: 180 }] },
        { id: 702, name: "Porksilog", desc: "Marinated pork chop served with garlic fried rice and egg.", img: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop", ingredients: ["Pork Chop", "Garlic Rice", "Egg"], variants: [{ label: "Classic Meal", price: 180 }] },
        { id: 703, name: "Chicksilog", desc: "Fried chicken served with garlic fried rice and egg.", img: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop", ingredients: ["Fried Chicken", "Garlic Rice", "Egg"], variants: [{ label: "Classic Meal", price: 175 }] },
        { id: 704, name: "Shanghai Silog", desc: "Lumpiang shanghai served with garlic fried rice and egg.", img: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop", ingredients: ["Shanghai Rolls", "Garlic Rice", "Egg"], variants: [{ label: "Classic Meal", price: 150 }] },
        { id: 705, name: "Bangusilog", desc: "Pan-fried bangus served with garlic fried rice and egg.", img: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?q=80&w=400&auto=format&fit=crop", ingredients: ["Fried Bangus", "Garlic Rice", "Egg"], variants: [{ label: "Classic Meal", price: 160 }] }
    ]
};

// 2. DATABASE DATA SIMULATION FOR ADMIN / STAFF PORTAL
let staffOrders = [
    { id: 'EST-9021', customerName: 'Marco De Silva', tableNumber: 'KTV-01', paymentMethod: 'GCash', total: 560, status: 'Preparing', items: [{ name: 'Sisig Pizza', quantity: 1 }] }
];

let staffTables = [
    { id: 'T-01', type: 'Dining Table', capacity: 4, isOccupied: false },
    { id: 'T-02', type: 'Dining Table', capacity: 4, isOccupied: true },
    { id: 'KTV-01', type: 'KTV VIP Room', capacity: 12, isOccupied: true },
    { id: 'KTV-02', type: 'KTV VIP Room', capacity: 10, isOccupied: false }
];

let activeUserRole = null; // 'customer' or 'staff'
let activeStaffTab = 'pos';
let currentSubCategory = 'all';
let cart = [];
let selectedDish = null;
let selectedVariant = null;

// PAGE INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems();
    setupCartListeners();
    setupReservationForm();
    setupReviewCarousel();
    setupMobileMenu();
    setDefaultDate();
    setupOrderFormListener();
});

// TOAST NOTIFICATIONS
function showToast(msg) {
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toast-message');
    if (toast && messageEl) {
        messageEl.innerText = msg;
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
    } else {
        alert(msg);
    }
}

/* ==========================================================================
   FEATURE: LOGIN & AUTH PORTAL SYSTEM
   ========================================================================== */
function openAuthModal() {
    const el = document.getElementById('authModal');
    if (el) el.classList.remove('hidden');
}

function closeAuthModal() {
    const el = document.getElementById('authModal');
    if (el) el.classList.add('hidden');
}

function switchAuthTab(tab) {
    const custBtn = document.getElementById('auth-tab-cust');
    const staffBtn = document.getElementById('auth-tab-staff');
    const custForm = document.getElementById('cust-login-form');
    const staffForm = document.getElementById('staff-login-form');

    if (tab === 'customer') {
        if (custBtn) custBtn.className = 'py-2 rounded-lg text-xs font-bold transition-all bg-copper text-white shadow';
        if (staffBtn) staffBtn.className = 'py-2 rounded-lg text-xs font-bold transition-all text-cream-muted hover:text-white';
        if (custForm) custForm.classList.remove('hidden');
        if (staffForm) staffForm.classList.add('hidden');
    } else {
        if (staffBtn) staffBtn.className = 'py-2 rounded-lg text-xs font-bold transition-all bg-emerald-600 text-white shadow';
        if (custBtn) custBtn.className = 'py-2 rounded-lg text-xs font-bold transition-all text-cream-muted hover:text-white';
        if (staffForm) staffForm.classList.remove('hidden');
        if (custForm) custForm.classList.add('hidden');
    }
}

function handleCustomerLogin(e) {
    e.preventDefault();
    const nameInput = document.getElementById('cust-login-name');
    const name = nameInput ? nameInput.value : 'Customer';
    activeUserRole = 'customer';
    
    const label = document.getElementById('auth-btn-label');
    if (label) label.innerText = name.split(' ')[0];
    
    showToast(`Welcome to Estcom, ${name}!`);
    closeAuthModal();
}

function handleStaffLogin(e) {
    e.preventDefault();
    const u = document.getElementById('staff-username').value.trim().toLowerCase();
    const p = document.getElementById('staff-password').value;
    const err = document.getElementById('login-error');

    const validUsers = { 'admin': 'admin123', 'chef': 'staff123', 'cashier': 'pos123' };

    if (validUsers[u] && validUsers[u] === p) {
        localStorage.setItem('estcom_user_role', 'staff');
        localStorage.setItem('estcom_username', u.toUpperCase());
        
        // DIREKTANG LILIPAT SA ADMIN PAGE (Hindi na babalik sa index.html)
        window.location.href = 'admin.html';
    } else {
        err.innerText = "Maling username o password!";
        err.classList.remove('hidden');
    }
}

function handleStaffLogout() {
    activeUserRole = null;
    const terminal = document.getElementById('staff-terminal');
    if (terminal) terminal.classList.add('hidden');
    
    const label = document.getElementById('auth-btn-label');
    if (label) label.innerText = "Login";
    showToast("Signed out from Staff Console.");
}

/* ==========================================================================
   FEATURE: ADMIN & STAFF TERMINAL CONSOLE (POS, KDS, TABLES, SALES)
   ========================================================================== */
function switchStaffTab(tab) {
    activeStaffTab = tab;
    const content = document.getElementById('staff-panel-content');
    if (!content) return;
    
    if (tab === 'pos') {
        content.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h5 class="font-bold text-emerald-400 mb-2">Select Item for Counter Quick POS:</h5>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="quickAddPOS('Sisig Pizza', 300)" class="p-2 bg-charcoal border border-charcoal-border rounded text-left hover:border-emerald-500">Sisig Pizza (₱300)</button>
                        <button onclick="quickAddPOS('Beef Salpicao', 320)" class="p-2 bg-charcoal border border-charcoal-border rounded text-left hover:border-emerald-500">Beef Salpicao (₱320)</button>
                        <button onclick="quickAddPOS('Spanish Latte', 120)" class="p-2 bg-charcoal border border-charcoal-border rounded text-left hover:border-emerald-500">Spanish Latte (₱120)</button>
                        <button onclick="quickAddPOS('Loaded Fries', 210)" class="p-2 bg-charcoal border border-charcoal-border rounded text-left hover:border-emerald-500">Loaded Fries (₱210)</button>
                    </div>
                </div>
                <div class="bg-charcoal p-3 rounded border border-charcoal-border">
                    <h5 class="font-bold text-cream mb-1">Live Counter Register</h5>
                    <p class="text-cream-muted text-[11px]">Ready to process customer orders instantly.</p>
                </div>
            </div>
        `;
    } else if (tab === 'kds') {
        content.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
                ${staffOrders.map(o => `
                    <div class="p-3 bg-charcoal rounded border border-charcoal-border">
                        <div class="flex justify-between font-bold text-copper-light">
                            <span>${o.id} - ${o.customerName}</span>
                            <span>${o.status}</span>
                        </div>
                        <p class="text-cream-muted text-[11px] mt-1">${o.tableNumber} • ${o.items[0].name}</p>
                        <button onclick="updateOrderStatus('${o.id}')" class="mt-2 w-full py-1 bg-emerald-600 text-white rounded font-bold">Advance Status</button>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (tab === 'tables') {
        content.innerHTML = `
            <div class="grid grid-cols-4 gap-2">
                ${staffTables.map(t => `
                    <button onclick="toggleTableStatus('${t.id}')" class="p-3 rounded border text-center font-bold ${t.isOccupied ? 'bg-red-950/40 border-red-600 text-red-400' : 'bg-charcoal border-charcoal-border text-emerald-400'}">
                        ${t.id}<br><span class="text-[10px]">${t.isOccupied ? 'Occupied' : 'Available'}</span>
                    </button>
                `).join('')}
            </div>
        `;
    } else if (tab === 'analytics') {
        content.innerHTML = `
            <div class="flex gap-4 text-center">
                <div class="flex-1 p-3 bg-charcoal rounded border border-charcoal-border">
                    <span class="text-cream-muted">Total Sales Revenue</span>
                    <h4 class="text-xl font-bold text-emerald-400 font-mono">₱${staffOrders.reduce((a,b)=>a+b.total,0).toFixed(2)}</h4>
                </div>
                <div class="flex-1 p-3 bg-charcoal rounded border border-charcoal-border">
                    <span class="text-cream-muted">Active Orders</span>
                    <h4 class="text-xl font-bold text-copper-light font-mono">${staffOrders.length}</h4>
                </div>
            </div>
        `;
    }
}

function quickAddPOS(name, price) {
    addToCartWithVariant({ id: Date.now(), name: name }, { label: 'Standard', price: price });
}

function updateOrderStatus(id) {
    const o = staffOrders.find(x => x.id === id);
    if (o) {
        o.status = o.status === 'Preparing' ? 'Completed' : 'Preparing';
        switchStaffTab('kds');
        showToast(`Order ${id} status updated to ${o.status}`);
    }
}

function toggleTableStatus(id) {
    const t = staffTables.find(x => x.id === id);
    if (t) {
        t.isOccupied = !t.isOccupied;
        switchStaffTab('tables');
        showToast(`Table ${id} marked as ${t.isOccupied ? 'Occupied' : 'Available'}`);
    }
}

/* ==========================================================================
   FEATURE: DIGITAL QR CODE RECEIPT GENERATOR (ORDER CHECKOUT)
   ========================================================================== */
function setupOrderFormListener() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('orderType', document.querySelector('input[name="orderType"]:checked')?.value || 'Dine-in Order');
            formData.append('paymentMethod', document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash');
            formData.append('custName', document.getElementById('custName').value);
            formData.append('custPhone', document.getElementById('custPhone').value);
            formData.append('custAddress', document.getElementById('custAddress').value);
            formData.append('custItems', document.getElementById('custItems').value);
            formData.append('custTotal', document.getElementById('custTotal').value);

            fetch('save_order.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    closeCheckoutModal();

                    const now = new Date().toLocaleString();
                    document.getElementById('receiptDate').innerText = now;
                    document.getElementById('recOrderId').innerText = data.order_id;
                    if (document.getElementById('recOrderType')) document.getElementById('recOrderType').innerText = formData.get('orderType');
                    if (document.getElementById('recPaymentMethod')) document.getElementById('recPaymentMethod').innerText = formData.get('paymentMethod');
                    document.getElementById('recName').innerText = formData.get('custName');
                    document.getElementById('recPhone').innerText = formData.get('custPhone');
                    document.getElementById('recAddress').innerText = formData.get('custAddress');
                    document.getElementById('recItemsList').innerText = formData.get('custItems');
                    document.getElementById('recTotal').innerText = "₱" + parseFloat(formData.get('custTotal')).toFixed(2);

                    /* GENERATE QR CODE */
                    const qrContainer = document.getElementById('qrcode');
                    if (qrContainer && typeof QRCode !== 'undefined') {
                        qrContainer.innerHTML = '';
                        const qrTextData = `ESTCOM RESTO & BAR RECEIPT\nOrder ID: #${data.order_id}\nCustomer: ${formData.get('custName')}\nDate: ${now}\nTotal Paid: ₱${formData.get('custTotal')}`;
                        new QRCode(qrContainer, {
                            text: qrTextData,
                            width: 110,
                            height: 110,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    }

                    document.getElementById('receiptModal').classList.remove('hidden');
                    orderForm.reset();
                    showToast("Order saved to Database!");
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(err => console.error("Error saving order:", err));
        });
    }
}

/* ==========================================================================
   MENU RENDER & MODALS
   ========================================================================== */
function filterSubCategory(subId) {
    currentSubCategory = subId;
    document.querySelectorAll('.sub-pill-btn').forEach(btn => {
        btn.className = 'sub-pill-btn px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-cream-muted hover:text-cream transition-all';
    });
    const active = document.getElementById(`pill-${subId}`);
    if (active) {
        active.className = 'sub-pill-btn px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all bg-copper text-white shadow';
    }
    renderMenuItems();
}

function renderMenuItems() {
    const grid = document.getElementById('unified-menu-grid') || document.getElementById('menuGrid');
    if (!grid) return;

    let itemsToDisplay = [];
    if (currentSubCategory === 'all') {
        Object.keys(unifiedMenuData).forEach(cat => {
            itemsToDisplay.push(...unifiedMenuData[cat]);
        });
    } else {
        itemsToDisplay = unifiedMenuData[currentSubCategory] || [];
    }

    if (itemsToDisplay.length === 0) {
        grid.innerHTML = `<div class="col-span-2 text-center py-12 text-cream-muted text-xs">No items available in this category.</div>`;
        return;
    }

    grid.innerHTML = itemsToDisplay.map(item => {
        const startingPrice = item.variants && item.variants.length > 0 ? item.variants[0].price : 0;
        const hasMultiple = item.variants && item.variants.length > 1;

        return `
        <div class="bg-charcoal-light border border-charcoal-border p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5 hover:border-copper/40 transition-all group">
            <img src="${item.img}" alt="${item.name}" class="w-full sm:w-28 h-28 rounded-xl object-cover border border-charcoal-border group-hover:scale-105 transition-transform duration-500">
            <div class="flex-1 space-y-2 text-center sm:text-left w-full">
                <div class="flex items-center justify-between gap-2">
                    <h4 onclick="openDishModal(${item.id})" class="font-serif text-lg font-bold text-cream group-hover:text-copper-light transition-colors cursor-pointer hover:underline">${item.name}</h4>
                    <span class="font-serif font-bold text-copper-light text-lg">₱${startingPrice}</span>
                </div>
                <p class="text-xs text-cream-muted font-light leading-relaxed">${item.desc}</p>
                <div class="flex items-center justify-between pt-2">
                    <button onclick="openDishModal(${item.id})" class="text-[10px] uppercase font-semibold text-cream-muted hover:text-copper-light transition-colors flex items-center gap-1">
                        <i class="fa-solid fa-circle-info text-copper-light"></i> View Ingredients
                    </button>
                    <button onclick="openDishModal(${item.id})" class="px-3.5 py-1.5 rounded-lg bg-copper/20 hover:bg-copper text-copper-light hover:text-white border border-copper/40 text-xs font-semibold transition-all flex items-center gap-1.5">
                        <i class="fa-solid fa-plus text-[10px]"></i>
                        <span>${hasMultiple ? 'Select Size' : 'Add'}</span>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

function openDishModal(id) {
    let found = null;
    Object.keys(unifiedMenuData).forEach(cat => {
        const match = unifiedMenuData[cat].find(i => i.id === id);
        if (match) found = match;
    });

    if (!found) return;
    selectedDish = found;
    selectedVariant = found.variants[0];

    document.getElementById('dish-modal-name').innerText = found.name;
    document.getElementById('dish-modal-category').innerText = "ESTCOM SELECTION";
    document.getElementById('dish-modal-desc').innerText = found.desc;

    const optionsList = document.getElementById('modal-options-list');
    optionsList.innerHTML = found.variants.map((v, index) => `
        <label onclick="selectVariantIndex(${index})" class="flex items-center justify-between p-2.5 border border-charcoal-border rounded-lg cursor-pointer bg-charcoal hover:border-copper transition-all">
            <div class="flex items-center space-x-2">
                <input type="radio" name="modalVariant" value="${index}" ${index === 0 ? 'checked' : ''} class="accent-copper">
                <span class="text-xs text-cream font-medium">${v.label}</span>
            </div>
            <span class="text-xs font-bold text-copper-light">₱${v.price}</span>
        </label>
    `).join('');

    updateModalPrice();

    const ingList = document.getElementById('dish-modal-ingredients');
    ingList.innerHTML = found.ingredients.map(ing => `
        <li class="flex items-center gap-2">
            <i class="fa-solid fa-check text-[10px] text-copper-light"></i>
            <span>${ing}</span>
        </li>
    `).join('');

    const addBtn = document.getElementById('dish-modal-add-btn');
    addBtn.onclick = () => {
        addToCartWithVariant(selectedDish, selectedVariant);
        closeDishModal();
    };

    document.getElementById('dishModal').classList.remove('hidden');
}

function selectVariantIndex(index) {
    if (selectedDish && selectedDish.variants[index]) {
        selectedVariant = selectedDish.variants[index];
        updateModalPrice();
    }
}

function updateModalPrice() {
    if (selectedVariant) {
        document.getElementById('dish-modal-price').innerText = `₱${selectedVariant.price.toFixed(2)}`;
    }
}

function closeDishModal() {
    document.getElementById('dishModal').classList.add('hidden');
}

/* ==========================================================================
   CART LOGIC
   ========================================================================== */
function addToCartWithVariant(dish, variant) {
    const cartItemId = `${dish.id}-${variant.label}`;
    const existing = cart.find(c => c.cartItemId === cartItemId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            id: dish.id,
            name: `${dish.name} (${variant.label})`,
            price: variant.price,
            quantity: 1
        });
    }
    updateCartUI();
    showToast(`Added "${dish.name} (${variant.label})" to cart.`);
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCartUI();
}

function changeQuantity(cartItemId, delta) {
    const item = cart.find(c => c.cartItemId === cartItemId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    
    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    
    if (badge) {
        if (totalCount > 0) {
            badge.innerText = totalCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (container) {
        if (cart.length === 0) {
            container.innerHTML = `<p class="text-xs text-cream-muted text-center py-10">Your cart is empty.</p>`;
        } else {
            container.innerHTML = cart.map(item => `
                <div class="flex items-center justify-between p-3 bg-charcoal border border-charcoal-border rounded-lg text-xs">
                    <div>
                        <h5 class="font-bold text-cream">${item.name}</h5>
                        <span class="text-copper-light font-mono">₱${item.price.toFixed(2)}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="changeQuantity('${item.cartItemId}', -1)" class="px-2 py-0.5 bg-charcoal-light border border-charcoal-border rounded text-cream font-bold hover:border-copper">-</button>
                        <span class="font-bold text-cream">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.cartItemId}', 1)" class="px-2 py-0.5 bg-charcoal-light border border-charcoal-border rounded text-cream font-bold hover:border-copper">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.innerText = `₱${total.toFixed(2)}`;
}

function setupCartListeners() {
    const drawer = document.getElementById('cart-drawer');
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');

    if (openBtn && drawer) openBtn.onclick = () => drawer.classList.remove('hidden');
    if (closeBtn && drawer) closeBtn.onclick = () => drawer.classList.add('hidden');
}

function openCheckoutModal() {
    if (cart.length === 0) return showToast("Cart is empty!");
    const custItems = document.getElementById('custItems');
    const custTotal = document.getElementById('custTotal');
    const drawer = document.getElementById('cart-drawer');
    const checkoutModal = document.getElementById('checkoutModal');

    if (custItems) custItems.value = cart.map(i => `${i.quantity}x ${i.name}`).join(", ");
    if (custTotal) custTotal.value = cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2);
    if (drawer) drawer.classList.add('hidden');
    if (checkoutModal) checkoutModal.classList.remove('hidden');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('hidden');
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.add('hidden');
    cart = [];
    updateCartUI();
}

// HELPER FUNCTIONS
function setupReservationForm() {
    const form = document.getElementById('reservation-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            showToast("Reservation request submitted!");
        };
    }
}

function setupReviewCarousel() {}
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('hidden');
    }
}

function setDefaultDate() {
    const d = document.getElementById('res-date');
    if (d) {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        d.value = t.toISOString().split('T')[0];
    }
}