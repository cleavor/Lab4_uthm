// Parse the query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const selectedProductsQueryParam = urlParams.get("selectedProducts");

// Decode the query parameter and split it into an array
const selectedProducts = decodeURIComponent(selectedProductsQueryParam).split(',');

// Access the products array from order.js to get the prices
window.products = [
    { category: "books", name: "Book 1", price: 10 },
    { category: "books", name: "Book 2", price: 15 },
    { category: "books", name: "Book 3", price: 15 },
    { category: "books", name: "Book 4", price: 15 },
    { category: "books", name: "Book 5", price: 20 },
    { category: "electronics", name: "Laptop", price: 800 },
    { category: "electronics", name: "Smartphone", price: 400 },
    { category: "electronics", name: "Charger", price: 50 },
    { category: "electronics", name: "HDMI Cable", price: 20 },
    { category: "electronics", name: "Headphone", price: 30 }
    // Add more products with category, name, and price
];

const productPrices = {};

// Populate productPrices with prices from the products array
selectedProducts.forEach(productName => {
    const product = products.find(product => product.name === productName);
    if (product) {
        productPrices[productName] = product.price;
    }
});

// Calculate the total price
const totalPrice = selectedProducts.reduce((total, productName) => total + productPrices[productName], 0);

let discount = 0;
if (selectedProducts.length >= 5 && selectedProducts.length <= 10) {
    discount = 0.05; // 5% discount
} else if (selectedProducts.length > 10) {
    discount = 0.15; // 15% discount
}

const discountAmount = totalPrice * discount;
const discountedPrice = totalPrice - discountAmount;

// Calculate postage fee
let postageFee = 10;
if (discountedPrice > 100) {
    postageFee = 0; // Free postage fee
}

// Prepare the summary information
const summarySection = document.getElementById("summarySection");
summarySection.innerHTML = `<p>Selected Products: ${selectedProducts.join(', ')}</p>
                            <p>Total Price: RM ${totalPrice.toFixed(2)}</p>
                            <p>Discount: ${discount * 100}%</p>
                            <p>Discount Amount: RM ${discountAmount.toFixed(2)}</p>
                            <p>Discounted Price: RM ${discountedPrice.toFixed(2)}</p>
                            <p>Postage Fee: RM ${postageFee.toFixed(2)}</p>`;
