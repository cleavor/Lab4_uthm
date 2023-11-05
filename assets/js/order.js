// Sample product data as an array of objects
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

const categorySelect = document.getElementById("category");
const productListDiv = document.getElementById("productList");
const selectedProductsList = document.getElementById("selectedProducts");
const submitButton = document.getElementById("submitButton");

let selectedProducts = [];

function populateProductList(category) {
    productListDiv.innerHTML = "";
    const categoryProducts = products.filter(product => product.category === category);
    categoryProducts.forEach(product => {
        const productLabel = document.createElement("label");

        const productCheckbox = document.createElement("input");
        productCheckbox.type = "checkbox";
        productCheckbox.value = product.name;
        productCheckbox.addEventListener("change", () => updateSelectedProducts());

        productCheckbox.style.marginRight = "15px";

        // Check if the product was previously selected in a different category
        if (selectedProducts[product.name]) {
            productCheckbox.checked = true;
        }

        productLabel.appendChild(productCheckbox);
        productLabel.appendChild(document.createTextNode(`${product.name} - $${product.price}`));

        productListDiv.appendChild(productLabel);
        productListDiv.appendChild(document.createElement("br"));
    });
}

// Function to update the selected products list
function updateSelectedProducts() {
    selectedProductsList.innerHTML = "";
    const checkboxes = Array.from(productListDiv.querySelectorAll("input[type=checkbox]"));
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const productName = checkbox.value;
            selectedProducts[productName] = true;
        } else {
            delete selectedProducts[checkbox.value];
        }
    });

    const selectedProductNames = Object.keys(selectedProducts);
    selectedProductNames.forEach(productName => {
        const listItem = document.createElement("li");
        listItem.textContent = productName;
        selectedProductsList.appendChild(listItem);
    });
}

// Event listener for category selection
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    populateProductList(selectedCategory);
});

// Event listener for submit button
submitButton.addEventListener("click", () => {
    // Gather selected products from all checkboxes, regardless of category
    const selectedCheckboxes = Array.from(productListDiv.querySelectorAll("input[type=checkbox]:checked"));
    const selectedProducts = selectedCheckboxes.map(checkbox => checkbox.value);

    // Send all selected products to page3
    const selectedProductsQueryParam = encodeURIComponent(selectedProducts.join(','));

    // Create a URL with the query parameter
    const page3URL = `osummary.html?selectedProducts=${selectedProductsQueryParam}`;

    // Redirect to Page 3
    window.location.href = page3URL;
});

// Initial population of the product list based on the default category
populateProductList(categorySelect.value);
