/*
 * JavaScript Boilerplate for the Menu App Project
 * 
 * Your task is to complete the project with the required functionality.
 * 
 * Follow the TODO prompts and complete each section to ensure the
 * Menu App works as expected.
 */

const menuItems = []; // Store all menu items as objects with name, categories, and description
let allCategories = new Set(); // Store unique categories across all menu items

// Handle new menu item submission
document.getElementById('menuForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const itemName = document.getElementById('menuName').value;
    const itemCategories = document.getElementById('categories').value
        .split(',')
        .map(category => category.trim().toLowerCase()) // Trim whitespace and convert to lowercase
        .filter(category => category !== ""); // Remove empty entries

    const itemDes = document.getElementById('description').value;

    // TODO: Create a new menu item object and destructure properties for cleaner access
    const newItem = {
        name: itemName,
        categories: itemCategories,
        description: itemDes
    };

    const {name, categories, description} = newItem;

    menuItems.push(newItem);

    // TODO: Use the spread operator to merge new categories into the set
    allCategories.add(...categories);
    
    updateCategoryLinks(); // Update category links for filtering
    displayMenuItems(menuItems); // Display the menu items
    event.target.reset(); // Clear the form fields
});

// Display menu items
const displayMenuItems = (items) => {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = items.map(({ name, categories, description }) => `
        <div class="col-md-4">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p><strong>Categories:</strong> ${categories.join(', ')}</p>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `).join('');
};

// Update category links dynamically
const updateCategoryLinks = () => {
    const categoryLinksContainer = document.getElementById('categoryLinks');
    categoryLinksContainer.innerHTML = [...allCategories].map(category => `
        <button class="btn btn-outline-primary" onclick="filterByCategory('${category}')">${category}</button>
    `).join('');
};

// Filter menu items by category
const filterByCategory = (category) => {
    const filteredItems = menuItems.filter(item => item.categories.includes(category));
    displayMenuItems(filteredItems);
};

// Initial call to display menu items (if any exist)
displayMenuItems(menuItems);
