// Enhanced Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        orderItems: document.getElementById('orderItems'),
        emptyOrder: document.getElementById('emptyOrder'),
        cartCount: document.getElementById('cartCount'),
        itemCount: document.getElementById('itemCount'),
        subtotalAmount: document.getElementById('subtotalAmount'),
        deliveryAmount: document.getElementById('deliveryAmount'),
        taxAmount: document.getElementById('taxAmount'),
        totalAmount: document.getElementById('totalAmount'),
        orderTotal: document.getElementById('orderTotal'),
        finalAmount: document.getElementById('finalAmount'),
        placeOrderBtn: document.getElementById('placeOrderBtn'),
        successModal: document.getElementById('successModal'),
        orderId: document.getElementById('orderId'),
        deliveryAddressInfo: document.getElementById('deliveryAddressInfo'),
        paymentMethodInfo: document.getElementById('paymentMethodInfo'),
        orderTotalInfo: document.getElementById('orderTotalInfo'),
        cardDetails: document.getElementById('cardDetails'),
        upiScanner: document.getElementById('upiScanner'),
        qrCodePlaceholder: document.getElementById('qrCodePlaceholder'),
        upiIdText: document.getElementById('upiIdText'),
        copyUpiId: document.getElementById('copyUpiId'),
        processingOverlay: document.getElementById('processingOverlay'),
        checkoutForm: document.getElementById('deliveryForm')
    };

    // Constants
    const DELIVERY_FEE = 49;
    const TAX_RATE = 0.05; // 5%
    const MERCHANT_UPI_ID = 'order.momstouch@upi';

    // State
    let cart = [];
    let orderData = {
        subtotal: 0,
        delivery: DELIVERY_FEE,
        tax: 0,
        total: DELIVERY_FEE,
        itemsCount: 0
    };
    let isProcessing = false;

    // Initialize
    initCheckout();

    function initCheckout() {
        loadCartFromStorage();
        setupEventListeners();
        setupPaymentToggle();
        updateUI();
    }

    function loadCartFromStorage() {
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
        calculateOrderTotal();
        updateCartCount();
    }

    function calculateOrderTotal() {
        if (cart.length === 0) {
            orderData = {
                subtotal: 0,
                delivery: 0,
                tax: 0,
                total: 0,
                itemsCount: 0
            };
            return;
        }

        // Calculate subtotal
        const subtotal = cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        // Calculate tax (5%)
        const tax = subtotal * TAX_RATE;

        // Calculate total
        const total = subtotal + DELIVERY_FEE + tax;

        // Update order data
        orderData = {
            subtotal: subtotal,
            delivery: DELIVERY_FEE,
            tax: tax,
            total: total,
            itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0)
        };
    }

    function updateCartCount() {
        const totalItems = orderData.itemsCount;
        elements.cartCount.textContent = totalItems;
        elements.itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }

    function updateUI() {
        // Show/hide empty cart message
        if (cart.length === 0) {
            elements.emptyOrder.style.display = 'block';
            updatePlaceOrderButton(false);
        } else {
            elements.emptyOrder.style.display = 'none';
            renderOrderItems();
        }

        // Update prices
        elements.subtotalAmount.textContent = `₹${orderData.subtotal.toFixed(2)}`;
        elements.deliveryAmount.textContent = cart.length > 0 ? `₹${orderData.delivery}` : '₹0';
        elements.taxAmount.textContent = `₹${orderData.tax.toFixed(2)}`;
        elements.totalAmount.textContent = `₹${orderData.total.toFixed(2)}`;
        elements.orderTotal.textContent = `₹${orderData.total.toFixed(2)}`;
        elements.finalAmount.textContent = `₹${orderData.total.toFixed(2)}`;

        // Update button if form is valid
        if (!isProcessing) {
            checkFormValidity();
        }
    }

    function renderOrderItems() {
        elements.orderItems.innerHTML = '';
        
        cart.forEach((item, index) => {
            const itemElement = createOrderItemElement(item, index);
            elements.orderItems.appendChild(itemElement);
        });
    }

    function createOrderItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'order-item-card';
        div.dataset.index = index;
        
        const itemTotal = item.price * item.quantity;
        
        div.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h4 class="item-name">${item.name}</h4>
                <div class="item-details">
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                    <span class="item-price">₹${item.price}</span>
                </div>
            </div>
            <div class="item-total">
                ₹${itemTotal.toFixed(2)}
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="removeItemFromCart(${index})" ${isProcessing ? 'disabled' : ''}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    // Global function for delete button
    window.removeItemFromCart = function(index) {
        if (isProcessing) return;
        
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            calculateOrderTotal();
            updateCartCount();
            updateUI();
            
            showNotification('Item removed from cart', 'success');
        }
    };

    function setupEventListeners() {
        // Form validation
        const formInputs = document.querySelectorAll('#deliveryForm input, #deliveryForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (!isProcessing) checkFormValidity();
            });
        });

        // Terms checkbox
        document.getElementById('agreeTerms').addEventListener('change', () => {
            if (!isProcessing) checkFormValidity();
        });

        // Place order button
        elements.placeOrderBtn.addEventListener('click', handlePlaceOrder);

        // UPI ID copy
        elements.copyUpiId.addEventListener('click', copyUpiId);

        // Modal buttons
        document.getElementById('trackOrderBtn').addEventListener('click', trackOrder);
        document.getElementById('continueShoppingBtn').addEventListener('click', continueShopping);
        document.getElementById('closeModal').addEventListener('click', closeModal);
        
        // Close modal on overlay click
        elements.successModal.addEventListener('click', function(e) {
            if (e.target === elements.successModal) {
                closeModal();
            }
        });

        // Prevent form submission
        elements.checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });

        // Update UPI links when total changes
        observeOrderTotal();
    }

    function setupPaymentToggle() {
        const paymentOptions = document.querySelectorAll('input[name="payment"]');
        
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (isProcessing) return;
                
                if (this.value === 'card') {
                    elements.cardDetails.style.display = 'block';
                    elements.upiScanner.style.display = 'none';
                } else if (this.value === 'upi') {
                    elements.cardDetails.style.display = 'none';
                    elements.upiScanner.style.display = 'block';
                    generateUPILinks();
                    updateUPIQRCode();
                } else {
                    elements.cardDetails.style.display = 'none';
                    elements.upiScanner.style.display = 'none';
                }
            });
        });
    }

    function generateUPILinks() {
        const totalAmount = orderData.total.toFixed(2);
        
        // Update UPI links with current amount
        const upiApps = document.querySelectorAll('.upi-app-btn');
        upiApps.forEach(app => {
            const baseHref = app.getAttribute('data-base') || app.getAttribute('href');
            const newHref = baseHref.replace(/\${orderData\.total\}/, totalAmount);
            app.setAttribute('href', newHref);
        });
    }

    function updateUPIQRCode() {
        const totalAmount = orderData.total.toFixed(2);
        const upiString = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=Mom's%20Touch&am=${totalAmount}&tn=Order%20Payment&cu=INR`;
        
        // Create QR code using a simple QR generator
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
        
        // Show loading
        elements.qrCodePlaceholder.innerHTML = `
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #667eea; margin-bottom: 1rem;"></i>
            <p>Generating QR Code...</p>
        `;
        
        // Load QR code
        setTimeout(() => {
            elements.qrCodePlaceholder.innerHTML = `
                <img src="${qrCodeUrl}" alt="UPI QR Code" 
                     onerror="this.onerror=null; this.src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=order.momstouch@upi&pn=Mom%27s%20Touch&am=${totalAmount}'">
            `;
        }, 500);
    }

    function copyUpiId() {
        if (isProcessing) return;
        
        navigator.clipboard.writeText(MERCHANT_UPI_ID)
            .then(() => {
                const originalText = elements.copyUpiId.innerHTML;
                elements.copyUpiId.innerHTML = '<i class="fas fa-check"></i> Copied!';
                elements.copyUpiId.style.background = '#4caf50';
                
                setTimeout(() => {
                    elements.copyUpiId.innerHTML = originalText;
                    elements.copyUpiId.style.background = '';
                }, 2000);
                
                showNotification('UPI ID copied to clipboard', 'success');
            })
            .catch(() => {
                showNotification('Failed to copy UPI ID', 'error');
            });
    }

    function observeOrderTotal() {
        const observer = new MutationObserver(() => {
            if (!isProcessing && document.querySelector('input[name="payment"]:checked')?.value === 'upi') {
                generateUPILinks();
                updateUPIQRCode();
            }
        });
        
        if (elements.orderTotal) {
            observer.observe(elements.orderTotal, { childList: true, characterData: true, subtree: true });
        }
    }

    function checkFormValidity() {
        if (isProcessing) return false;
        
        const requiredFields = ['name', 'phone', 'address', 'city', 'pincode'];
        let isValid = true;
        
        // Clear all errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.classList.remove('error');
        });
        
        // Check required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            if (!field.value.trim()) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'This field is required';
                isValid = false;
            } else if (fieldId === 'phone' && !validatePhone(field.value)) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'Enter a valid 10-digit phone number';
                isValid = false;
            } else if (fieldId === 'pincode' && !validatePincode(field.value)) {
                field.classList.add('error');
                if (errorElement) errorElement.textContent = 'Enter a valid 6-digit pincode';
                isValid = false;
            }
        });
        
        // Check email if provided
        const email = document.getElementById('email').value;
        if (email && !validateEmail(email)) {
            document.getElementById('email').classList.add('error');
            document.getElementById('emailError').textContent = 'Enter a valid email address';
            isValid = false;
        }
        
        // Check terms agreement
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Update place order button
        updatePlaceOrderButton(isValid && agreeTerms);
        
        return isValid;
    }

    function updatePlaceOrderButton(isValid) {
        if (isProcessing) {
            elements.placeOrderBtn.disabled = true;
            elements.placeOrderBtn.classList.add('processing');
            elements.placeOrderBtn.innerHTML = '';
            elements.placeOrderBtn.style.background = '#667eea';
            return;
        }
        
        if (cart.length > 0 && isValid) {
            elements.placeOrderBtn.disabled = false;
            elements.placeOrderBtn.classList.remove('processing');
            elements.placeOrderBtn.innerHTML = `
                <i class="fas fa-lock"></i>
                <span>Place Secure Order - ₹${orderData.total.toFixed(2)}</span>
            `;
            elements.placeOrderBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        } else {
            elements.placeOrderBtn.disabled = true;
            elements.placeOrderBtn.classList.remove('processing');
            
            if (cart.length === 0) {
                elements.placeOrderBtn.innerHTML = `
                    <i class="fas fa-shopping-cart"></i>
                    <span>Cart is Empty</span>
                `;
                elements.placeOrderBtn.style.background = '#ccc';
            } else {
                elements.placeOrderBtn.innerHTML = `
                    <i class="fas fa-lock"></i>
                    <span>Complete Form to Place Order</span>
                `;
                elements.placeOrderBtn.style.background = '#ccc';
            }
        }
    }

    function validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePincode(pincode) {
        return /^\d{6}$/.test(pincode.replace(/\D/g, ''));
    }

    async function handlePlaceOrder() {
        if (isProcessing) return;
        
        if (!checkFormValidity()) {
            showNotification('Please fill all required fields correctly.', 'error');
            return;
        }

        if (cart.length === 0) {
            showNotification('Your cart is empty. Please add items from the menu.', 'error');
            return;
        }

        // Start processing
        isProcessing = true;
        
        // Lock the form
        lockForm(true);
        
        // Show processing overlay
        elements.processingOverlay.style.display = 'flex';
        
        // Update button state
        updatePlaceOrderButton(false);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
            // Get form data
            const orderDetails = getOrderDetails();
            
            // Hide processing overlay
            elements.processingOverlay.style.display = 'none';
            
            // Show success modal
            showSuccessModal(orderDetails);
            
            // Clear cart
            clearCart();
            
            // Save order to history
            saveOrderToHistory(orderDetails);
            
            // Reset form (but keep it locked)
            elements.checkoutForm.reset();
            
            // Show success notification
            showNotification('Order placed successfully!', 'success');
            
        } catch (error) {
            // Hide processing overlay
            elements.processingOverlay.style.display = 'none';
            
            // Unlock form on error
            lockForm(false);
            isProcessing = false;
            updatePlaceOrderButton(true);
            
            showNotification('Order failed. Please try again.', 'error');
            console.error('Order error:', error);
        }
    }

    function lockForm(lock) {
        const formElements = document.querySelectorAll('input, textarea, select, button');
        const formSections = document.querySelectorAll('.form-section, .order-card');
        
        if (lock) {
            // Add locked class to form sections
            formSections.forEach(section => {
                section.classList.add('form-locked');
            });
            
            // Disable all interactive elements
            formElements.forEach(el => {
                if (!el.classList.contains('modal-btn')) {
                    el.disabled = true;
                }
            });
            
            // Disable delete buttons
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.disabled = true;
            });
            
            // Disable payment method selection
            document.querySelectorAll('input[name="payment"]').forEach(radio => {
                radio.disabled = true;
            });
            
            // Disable nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.6';
            });
            
        } else {
            // Remove locked class
            formSections.forEach(section => {
                section.classList.remove('form-locked');
            });
            
            // Enable all interactive elements
            formElements.forEach(el => {
                if (!el.classList.contains('modal-btn')) {
                    el.disabled = false;
                }
            });
            
            // Enable delete buttons
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.disabled = false;
            });
            
            // Enable payment method selection
            document.querySelectorAll('input[name="payment"]').forEach(radio => {
                radio.disabled = false;
            });
            
            // Enable nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.pointerEvents = '';
                link.style.opacity = '';
            });
        }
    }

    function getOrderDetails() {
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const paymentMethods = {
            'card': 'Credit/Debit Card',
            'upi': 'UPI Payment',
            'cod': 'Cash on Delivery'
        };
        
        // Generate unique order ID
        const orderId = 'MT' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
        
        return {
            orderId: orderId,
            customerName: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value,
            instructions: document.getElementById('instructions').value,
            paymentMethod: paymentMethods[paymentMethod],
            items: [...cart],
            subtotal: orderData.subtotal,
            delivery: orderData.delivery,
            tax: orderData.tax,
            total: orderData.total,
            date: new Date().toLocaleString('en-IN'),
            status: 'confirmed'
        };
    }

    function showSuccessModal(orderDetails) {
        // Update modal content
        elements.orderId.textContent = `#${orderDetails.orderId}`;
        elements.deliveryAddressInfo.textContent = 
            `${orderDetails.address}, ${orderDetails.city} - ${orderDetails.pincode}`;
        elements.paymentMethodInfo.textContent = orderDetails.paymentMethod;
        elements.orderTotalInfo.textContent = `₹${orderDetails.total.toFixed(2)}`;
        
        // Show modal
        elements.successModal.style.display = 'flex';
        
        // Add success animation
        setTimeout(() => {
            const iconCircle = document.querySelector('.icon-circle');
            iconCircle.classList.add('success');
        }, 100);
        
        // Unlock form after showing success modal
        setTimeout(() => {
            lockForm(false);
            isProcessing = false;
            updatePlaceOrderButton(true);
        }, 500);
    }

    function clearCart() {
        // Clear localStorage cart
        localStorage.removeItem('cart');
        
        // Clear local cart state
        cart = [];
        
        // Recalculate totals
        calculateOrderTotal();
        
        // Update UI
        updateUI();
    }

    function saveOrderToHistory(orderDetails) {
        // Load existing orders
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        
        // Add new order
        orderHistory.push(orderDetails);
        
        // Save back to localStorage
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(el => el.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function trackOrder() {
        showNotification('Track your order in the "My Orders" section. We\'ll send SMS updates!', 'info');
        closeModal();
    }

    function continueShopping() {
        window.location.href = 'menu.html';
    }

    function closeModal() {
        elements.successModal.style.display = 'none';
    }

    // Initialize payment method display
    setTimeout(() => {
        if (document.querySelector('input[name="payment"]:checked')?.value === 'upi') {
            elements.upiScanner.style.display = 'block';
            elements.cardDetails.style.display = 'none';
            updateUPIQRCode();
        }
        
        // Set base href for UPI apps
        document.querySelectorAll('.upi-app-btn').forEach(app => {
            const currentHref = app.getAttribute('href');
            app.setAttribute('data-base', currentHref);
        });
    }, 100);

    // Expose UPI helpers so external functions can call them safely
    try {
        window.generateUPILinks = generateUPILinks;
        window.updateUPIQRCode = updateUPIQRCode;
    } catch (e) {}
});

// Add these functions to checkout.js

function loadUserProfileData() {
    // Load user data from profile
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
    const paymentMethods = JSON.parse(localStorage.getItem('userPaymentMethods') || '[]');
    
    // Auto-fill form with user data
    if (userData.name) {
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
    }
    
    // Auto-fill with default address if available
    const defaultAddress = addresses.find(addr => addr.isDefault);
    if (defaultAddress) {
        document.getElementById('address').value = `${defaultAddress.line1}\n${defaultAddress.line2 || ''}`.trim();
        document.getElementById('city').value = defaultAddress.city || '';
        document.getElementById('pincode').value = defaultAddress.pincode || '';
    }
    
    // Select default payment method
    const defaultPayment = paymentMethods.find(pay => pay.isDefault);
    if (defaultPayment) {
        if (defaultPayment.type === 'card') {
            document.querySelector('input[value="card"]').checked = true;
            const cardDetailsEl = document.getElementById('cardDetails');
            const upiScannerEl = document.getElementById('upiScanner');
            if (cardDetailsEl) cardDetailsEl.style.display = 'block';
            if (upiScannerEl) upiScannerEl.style.display = 'none';
        } else if (defaultPayment.type === 'upi') {
            document.querySelector('input[value="upi"]').checked = true;
            const cardDetailsEl = document.getElementById('cardDetails');
            const upiScannerEl = document.getElementById('upiScanner');
            if (cardDetailsEl) cardDetailsEl.style.display = 'none';
            if (upiScannerEl) upiScannerEl.style.display = 'block';
            if (typeof window.updateUPIQRCode === 'function') window.updateUPIQRCode();
        }
    }
    
    // Check if user has saved settings for auto-save
    if (userData.settings?.autoSaveAddress) {
        setupAutoSaveAddress();
    }
}

function setupAutoSaveAddress() {
    // Auto-save new addresses to profile
    const addressFields = ['address', 'city', 'pincode'];
    let timeout;
    
    addressFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(saveAddressIfComplete, 1000);
            });
        }
    });
}

function saveAddressIfComplete() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;
    
    if (name && address && city && pincode && phone) {
        const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
        
        // Check if address already exists
        const existingAddress = addresses.find(addr => 
            addr.line1 === address.split('\n')[0] && 
            addr.city === city && 
            addr.pincode === pincode
        );
        
        if (!existingAddress) {
            const newAddress = {
                id: 'addr' + Date.now(),
                label: 'Recent Delivery',
                line1: address.split('\n')[0],
                line2: address.split('\n')[1] || '',
                city: city,
                state: '', // You might want to add a state field
                pincode: pincode,
                phone: phone,
                isDefault: addresses.length === 0
            };
            
            addresses.push(newAddress);
            localStorage.setItem('userAddresses', JSON.stringify(addresses));
            
            // Show subtle notification
            console.log('Address auto-saved to profile');
        }
    }
}

function saveOrderToUserHistory(orderDetails) {
    // Enhanced version that saves to user's order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    // Add user-specific data
    const userOrder = {
        ...orderDetails,
        userId: getUserId(),
        userName: document.getElementById('name').value,
        userPhone: document.getElementById('phone').value,
        userEmail: document.getElementById('email').value || '',
        timestamp: new Date().toISOString()
    };
    
    orderHistory.push(userOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Update user's total spent
    updateUserTotalSpent(orderDetails.total);
}

function getUserId() {
    // Generate or retrieve user ID
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

function updateUserTotalSpent(amount) {
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    userData.totalSpent = (userData.totalSpent || 0) + amount;
    localStorage.setItem('userProfile', JSON.stringify(userData));
}

// Modify the initCheckout function to include profile data loading
function initCheckout() {
    loadCartFromStorage();
    loadUserProfileData(); // Add this line
    setupEventListeners();
    setupPaymentToggle();
    updateUI();
}

// Modify handlePlaceOrder to use enhanced order saving
async function handlePlaceOrder() {
    if (isProcessing) return;
    
    if (!checkFormValidity()) {
        showNotification('Please fill all required fields correctly.', 'error');
        return;
    }

    if (cart.length === 0) {
        showNotification('Your cart is empty. Please add items from the menu.', 'error');
        return;
    }

    // Start processing
    isProcessing = true;
    lockForm(true);
    elements.processingOverlay.style.display = 'flex';
    updatePlaceOrderButton(false);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        const orderDetails = getOrderDetails();
        elements.processingOverlay.style.display = 'none';
        showSuccessModal(orderDetails);
        clearCart();
        saveOrderToUserHistory(orderDetails); // Use enhanced function
        elements.checkoutForm.reset();
        showNotification('Order placed successfully!', 'success');
        
        // Auto-save address if enabled
        const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (userData.settings?.autoSaveAddress) {
            saveAddressToProfile();
        }
        
    } catch (error) {
        elements.processingOverlay.style.display = 'none';
        lockForm(false);
        isProcessing = false;
        updatePlaceOrderButton(true);
        showNotification('Order failed. Please try again.', 'error');
        console.error('Order error:', error);
    }
}

function saveAddressToProfile() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const phone = document.getElementById('phone').value;
    
    if (name && address && city && pincode && phone) {
        const addresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
        
        // Create address object
        const newAddress = {
            id: 'addr' + Date.now(),
            label: 'Recent Delivery',
            line1: address.split('\n')[0],
            line2: address.split('\n')[1] || '',
            city: city,
            state: '', // Add state field if needed
            pincode: pincode,
            phone: phone,
            isDefault: addresses.length === 0
        };
        
        addresses.push(newAddress);
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
    }
}