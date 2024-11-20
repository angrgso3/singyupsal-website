// Script for the Singyupsal website

// Cart storage
let cart = [];

// Function to update cart display (called after adding items)
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    // Clear previous items
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    // Loop through cart and display each item
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p>${item.name} - ${item.size} - ₱${item.price}</p>
            <button class="remove-from-cart" onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Add to the total price
        totalPrice += item.price;
    });

    // Update the total price
    totalPriceContainer.textContent = `Total: ₱${totalPrice}`;
}

// Function to add item to the cart
function addToCart(name, size, price) {
    // Check if item is already in the cart
    const itemIndex = cart.findIndex(item => item.name === name && item.size === size);

    // If item already exists, increase quantity (for simplicity, we'll just add the item again)
    if (itemIndex === -1) {
        cart.push({ name, size, price });
    } else {
        cart[itemIndex].quantity++;
    }

    // Update cart display
    updateCartDisplay();
}

// Function to remove item from the cart
function removeFromCart(name, size) {
    // Filter out the item to remove it
    cart = cart.filter(item => !(item.name === name && item.size === size));

    // Update cart display
    updateCartDisplay();
}

// Add event listeners to Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const itemContainer = this.closest('.item');
        const name = itemContainer.querySelector('h4').textContent; // Name of the item
        let size = '';
        let price = 0;

        // Check if size options exist (only for Beverages, Combos)
        const sizeOptions = itemContainer.querySelectorAll('ul li');
        if (sizeOptions.length > 0) {
            // Get selected size
            const selectedSize = itemContainer.querySelector('ul li.selected');
            if (selectedSize) {
                size = selectedSize.textContent.split(' - ')[0]; // Extract size from the text
                price = parseInt(selectedSize.textContent.split(' - ')[1].replace('₱', ''));
            }
        } else {
            // No size options, use price from the container directly
            price = parseInt(itemContainer.querySelector('p').textContent.replace('₱', ''));
        }

        // Add to cart if size and price are found
        if (name && size && price) {
            addToCart(name, size, price);
        }
    });
});

// Function to change size selection for beverages (or combos)
document.querySelectorAll('.item ul li').forEach(option => {
    option.addEventListener('click', function() {
        // Toggle selection state
        this.classList.toggle('selected');

        // Ensure only one size is selected at a time
        const siblings = Array.from(this.parentElement.children);
        siblings.forEach(sibling => {
            if (sibling !== this) sibling.classList.remove('selected');
        });
    });
});

// Function to handle checkout review (on the cart page)
document.getElementById('review-order').addEventListener('click', function() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = ''; // Clear previous reviews

    cart.forEach(item => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <p>${item.name} - ${item.size} - ₱${item.price}</p>
        `;
        reviewContainer.appendChild(reviewItem);
    });
});

// Event listener for Pay Now button
document.getElementById('pay-now').addEventListener('click', function() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (paymentMethod) {
        alert(`You selected ${paymentMethod.value} as payment method.`);
        // Proceed to payment (this part can be enhanced with payment APIs)
    } else {
        alert('Please select a payment method.');
    }
});

// Initialize cart display
updateCartDisplay();
