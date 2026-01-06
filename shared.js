// shared.js - Shared functions for all pages

// User Authentication/State
function isUserLoggedIn() {
    const userData = localStorage.getItem('userProfile');
    return !!userData;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('userProfile') || '{}');
}

function getUserFavorites() {
    return JSON.parse(localStorage.getItem('userFavorites') || '[]');
}

function getUserAddresses() {
    return JSON.parse(localStorage.getItem('userAddresses') || '[]');
}

function getUserPaymentMethods() {
    return JSON.parse(localStorage.getItem('userPaymentMethods') || '[]');
}

function getUserOrderHistory() {
    return JSON.parse(localStorage.getItem('orderHistory') || '[]');
}

// Cart Management
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function addToCart(item) {
    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += item.quantity || 1;
    } else {
        cart.push({
            ...item,
            quantity: item.quantity || 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateHeaderCartCount();
    return cart;
}

function removeFromCart(itemId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    updateHeaderCartCount();
    return filteredCart;
}

function updateCartQuantity(itemId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        if (quantity <= 0) {
            return removeFromCart(itemId);
        }
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateHeaderCartCount();
    }
    
    return cart;
}

function clearCart() {
    localStorage.removeItem('cart');
    updateHeaderCartCount();
}

// UI Updates
function updateHeaderCartCount() {
    const count = getCartItemCount();
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = count;
    });
}

function updateUserGreeting() {
    const user = getCurrentUser();
    const greetingElements = document.querySelectorAll('.user-greeting');
    
    greetingElements.forEach(element => {
        if (user.name) {
            element.textContent = `Welcome, ${user.name.split(' ')[0]}!`;
            element.style.display = 'inline';
        } else {
            element.style.display = 'none';
        }
    });
}

// Favorites Management
function toggleFavorite(item) {
    const favorites = getUserFavorites();
    const existingIndex = favorites.findIndex(fav => fav.id === item.id);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        return false; // Removed
    } else {
        favorites.push(item);
        return true; // Added
    }
}

function saveFavorites(favorites) {
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    document.querySelectorAll('.global-notification').forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `global-notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .global-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 300px;
            max-width: 500px;
        }
        .notification-success { background: #4caf50; }
        .notification-error { background: #ff4757; }
        .notification-info { background: #667eea; }
        .notification-warning { background: #ff9800; }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, duration);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Order Management
function createOrder(orderData) {
    const orderHistory = getUserOrderHistory();
    const order = {
        id: 'ORD' + Date.now().toString(36).toUpperCase(),
        ...orderData,
        date: new Date().toLocaleString('en-IN'),
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Update user's total spent
    const user = getCurrentUser();
    user.totalSpent = (user.totalSpent || 0) + (orderData.total || 0);
    localStorage.setItem('userProfile', JSON.stringify(user));
    
    return order;
}

function updateOrderStatus(orderId, status) {
    const orders = getUserOrderHistory();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        localStorage.setItem('orderHistory', JSON.stringify(orders));
        return true;
    }
    
    return false;
}

// Initialize shared features on page load
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderCartCount();
    updateUserGreeting();
    
    // Add logout functionality to all pages
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'homepage.html';
            }, 1500);
        });
    });
});

// Export for module usage (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isUserLoggedIn,
        getCurrentUser,
        getCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartItemCount,
        toggleFavorite,
        showNotification,
        createOrder,
        updateOrderStatus
    };
}