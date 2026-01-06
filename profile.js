// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        // User Info
        userName: document.getElementById('userName'),
        userEmail: document.getElementById('userEmail'),
        userPhone: document.getElementById('userPhone'),
        userAvatar: document.getElementById('userAvatar'),
        totalOrders: document.getElementById('totalOrders'),
        memberSince: document.getElementById('memberSince'),
        totalSpent: document.getElementById('totalSpent'),
        
        // Navigation
        navItems: document.querySelectorAll('.nav-item'),
        contentSections: document.querySelectorAll('.content-section'),
        
        // Personal Info
        profileName: document.getElementById('profileName'),
        profileEmail: document.getElementById('profileEmail'),
        profilePhone: document.getElementById('profilePhone'),
        profileDob: document.getElementById('profileDob'),
        profileBio: document.getElementById('profileBio'),
        editPersonalInfo: document.getElementById('editPersonalInfo'),
        savePersonalInfo: document.getElementById('savePersonalInfo'),
        cancelEdit: document.getElementById('cancelEdit'),
        personalInfoForm: document.getElementById('personalInfoForm'),
        
        // Orders
        ordersList: document.getElementById('ordersList'),
        orderFilter: document.getElementById('orderFilter'),
        ordersBadge: document.getElementById('ordersBadge'),
        
        // Addresses
        addressesList: document.getElementById('addressesList'),
        addAddressBtn: document.getElementById('addAddressBtn'),
        addAddressModal: document.getElementById('addAddressModal'),
        addressForm: document.getElementById('addressForm'),
        saveAddress: document.getElementById('saveAddress'),
        cancelAddress: document.getElementById('cancelAddress'),
        
        // Payment Methods
        paymentMethodsList: document.getElementById('paymentMethodsList'),
        addPaymentBtn: document.getElementById('addPaymentBtn'),
        addPaymentModal: document.getElementById('addPaymentModal'),
        paymentForm: document.getElementById('paymentForm'),
        savePaymentBtn: document.getElementById('savePaymentBtn'),
        cancelPayment: document.getElementById('cancelPayment'),
        
        // Favorites
        favoritesList: document.getElementById('favoritesList'),
        favoritesBadge: document.getElementById('favoritesBadge'),
        favoritesSort: document.getElementById('favoritesSort'),
        
        // Settings
        notificationsToggle: document.getElementById('notificationsToggle'),
        darkModeToggle: document.getElementById('darkModeToggle'),
        emailNotificationsToggle: document.getElementById('emailNotificationsToggle'),
        smsToggle: document.getElementById('smsToggle'),
        autoSaveAddressToggle: document.getElementById('autoSaveAddressToggle'),
        clearHistoryBtn: document.getElementById('clearHistoryBtn'),
        deactivateAccountBtn: document.getElementById('deactivateAccountBtn'),
        
        // Modals
        confirmationModal: document.getElementById('confirmationModal'),
        confirmationTitle: document.getElementById('confirmationTitle'),
        confirmationMessage: document.getElementById('confirmationMessage'),
        confirmAction: document.getElementById('confirmAction'),
        confirmCancel: document.getElementById('confirmCancel'),
        
        // Buttons
        logoutBtn: document.getElementById('logoutBtn'),
        deleteAccountBtn: document.getElementById('deleteAccountBtn'),
        changeAvatarBtn: document.getElementById('changeAvatarBtn'),
        cartCount: document.getElementById('cartCount')
    };

    // State
    let userData = {};
    let orderHistory = [];
    let addresses = [];
    let paymentMethods = [];
    let favorites = [];
    let isEditing = false;
    let currentAction = null;
    let actionData = null;

    // Initialize
    initProfile();

    function initProfile() {
        loadUserData();
        setupEventListeners();
        loadOrderHistory();
        loadAddresses();
        loadPaymentMethods();
        loadFavorites();
        updateCartCount();
        updateNavigation();
    }

    function loadUserData() {
        // Try to load from localStorage
        const savedUser = localStorage.getItem('userProfile');
        
        if (savedUser) {
            userData = JSON.parse(savedUser);
        } else {
            // Default user data
            userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+91 98765 43210',
                dob: '1990-01-01',
                bio: 'Food enthusiast who loves trying new cuisines!',
                avatar: null,
                joinDate: new Date('2024-01-15'),
                totalSpent: 0,
                settings: {
                    notifications: true,
                    darkMode: false,
                    emailNotifications: true,
                    smsUpdates: true,
                    autoSaveAddress: true
                }
            };
            saveUserData();
        }
        
        updateUserDisplay();
        loadSettings();
    }

    function updateUserDisplay() {
        elements.userName.textContent = userData.name;
        elements.userEmail.textContent = userData.email;
        elements.userPhone.textContent = userData.phone;
        
        elements.profileName.value = userData.name;
        elements.profileEmail.value = userData.email;
        elements.profilePhone.value = userData.phone;
        elements.profileDob.value = userData.dob || '';
        elements.profileBio.value = userData.bio || '';
        
        // Update avatar if exists
        if (userData.avatar) {
            elements.userAvatar.innerHTML = `<img src="${userData.avatar}" alt="${userData.name}">`;
        }
        
        // Calculate months since joining
        const joinDate = new Date(userData.joinDate);
        const today = new Date();
        const monthsDiff = (today.getFullYear() - joinDate.getFullYear()) * 12 + 
                          (today.getMonth() - joinDate.getMonth());
        elements.memberSince.textContent = Math.max(1, monthsDiff);
        
        // Update total spent from order history
        const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
        elements.totalSpent.textContent = `₹${totalSpent.toFixed(2)}`;
        userData.totalSpent = totalSpent;
    }

    function loadOrderHistory() {
        const savedOrders = localStorage.getItem('orderHistory');
        orderHistory = savedOrders ? JSON.parse(savedOrders) : [];
        
        elements.totalOrders.textContent = orderHistory.length;
        elements.ordersBadge.textContent = orderHistory.length;
        
        renderOrders();
    }

    function renderOrders(filter = 'all') {
        elements.ordersList.innerHTML = '';
        
        let filteredOrders = orderHistory;
        
        if (filter !== 'all') {
            filteredOrders = orderHistory.filter(order => 
                order.status?.toLowerCase() === filter.toLowerCase()
            );
        }
        
        if (filteredOrders.length === 0) {
            const emptyState = createEmptyState('No orders found', 'Your filtered orders will appear here');
            elements.ordersList.appendChild(emptyState);
            return;
        }
        
        // Sort by date (newest first)
        filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        filteredOrders.forEach(order => {
            const orderCard = createOrderCard(order);
            elements.ordersList.appendChild(orderCard);
        });
    }

    function createOrderCard(order) {
        const div = document.createElement('div');
        div.className = 'order-card';
        
        const statusClass = `status-${order.status?.toLowerCase() || 'pending'}`;
        const total = order.total || 0;
        
        div.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.orderId}</div>
                    <div class="order-date">${order.date}</div>
                </div>
                <span class="order-status ${statusClass}">${order.status || 'Pending'}</span>
            </div>
            
            <div class="order-items">
                ${order.items?.slice(0, 3).map(item => `
                    <div class="order-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                ${order.items?.length > 3 ? '<div class="order-item"><em>...and ' + (order.items.length - 3) + ' more items</em></div>' : ''}
            </div>
            
            <div class="order-footer">
                <div class="order-total">Total: ₹${total.toFixed(2)}</div>
                <div class="order-actions">
                    <button class="btn-secondary" onclick="viewOrderDetails('${order.orderId}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    ${order.status?.toLowerCase() === 'pending' ? `
                        <button class="btn-danger" onclick="cancelOrder('${order.orderId}')">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    ` : ''}
                    ${order.status?.toLowerCase() === 'delivered' ? `
                        <button class="btn-primary" onclick="reorder('${order.orderId}')">
                            <i class="fas fa-redo"></i> Reorder
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        return div;
    }

    function loadAddresses() {
        const savedAddresses = localStorage.getItem('userAddresses');
        addresses = savedAddresses ? JSON.parse(savedAddresses) : getDefaultAddresses();
        
        renderAddresses();
    }

    function getDefaultAddresses() {
        return [
            {
                id: 'addr1',
                label: 'Home',
                line1: '123 Main Street',
                line2: 'Near Central Park',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                phone: userData.phone,
                isDefault: true
            },
            {
                id: 'addr2',
                label: 'Office',
                line1: '456 Business Tower',
                line2: 'Floor 10, Sector 5',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400020',
                phone: userData.phone,
                isDefault: false
            }
        ];
    }

    function renderAddresses() {
        elements.addressesList.innerHTML = '';
        
        if (addresses.length === 0) {
            const emptyState = createEmptyState('No addresses saved', 'Add your delivery addresses for faster checkout');
            elements.addressesList.appendChild(emptyState);
            return;
        }
        
        addresses.forEach(address => {
            const addressCard = createAddressCard(address);
            elements.addressesList.appendChild(addressCard);
        });
    }

    function createAddressCard(address) {
        const div = document.createElement('div');
        div.className = `address-card ${address.isDefault ? 'default' : ''}`;
        div.dataset.id = address.id;
        
        div.innerHTML = `
            <div class="address-header">
                <div class="address-label">${address.label}</div>
                ${address.isDefault ? '<span class="address-type">Default</span>' : ''}
            </div>
            <div class="address-details">
                <p>${address.line1}</p>
                ${address.line2 ? `<p>${address.line2}</p>` : ''}
                <p>${address.city}, ${address.state} - ${address.pincode}</p>
                <p class="address-phone">📞 ${address.phone}</p>
            </div>
            <div class="address-actions">
                <button class="btn-icon btn-edit" onclick="editAddress('${address.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteAddress('${address.id}')">
                    <i class="fas fa-trash"></i>
                </button>
                ${!address.isDefault ? `
                    <button class="btn-secondary" onclick="setDefaultAddress('${address.id}')">
                        Set as Default
                    </button>
                ` : ''}
            </div>
        `;
        
        return div;
    }

    function loadPaymentMethods() {
        const savedPayments = localStorage.getItem('userPaymentMethods');
        paymentMethods = savedPayments ? JSON.parse(savedPayments) : getDefaultPaymentMethods();
        
        renderPaymentMethods();
    }

    function getDefaultPaymentMethods() {
        return [
            {
                id: 'pay1',
                type: 'card',
                cardNumber: '•••• •••• •••• 1234',
                cardName: userData.name,
                expiry: '12/25',
                isDefault: true
            },
            {
                id: 'pay2',
                type: 'upi',
                upiId: userData.email.split('@')[0] + '@upi',
                isDefault: false
            }
        ];
    }

    function renderPaymentMethods() {
        elements.paymentMethodsList.innerHTML = '';
        
        if (paymentMethods.length === 0) {
            const emptyState = createEmptyState('No payment methods', 'Add your payment methods for faster checkout');
            elements.paymentMethodsList.appendChild(emptyState);
            return;
        }
        
        paymentMethods.forEach(payment => {
            const paymentCard = createPaymentCard(payment);
            elements.paymentMethodsList.appendChild(paymentCard);
        });
    }

    function createPaymentCard(payment) {
        const div = document.createElement('div');
        div.className = 'payment-card';
        div.dataset.id = payment.id;
        
        let paymentContent = '';
        
        if (payment.type === 'card') {
            paymentContent = `
                <div class="payment-info">
                    <div class="payment-icon">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <div class="payment-details">
                        <h4>${payment.cardName}</h4>
                        <p>${payment.cardNumber} • Expires ${payment.expiry}</p>
                        ${payment.isDefault ? '<small><em>Default payment method</em></small>' : ''}
                    </div>
                </div>
            `;
        } else if (payment.type === 'upi') {
            paymentContent = `
                <div class="payment-info">
                    <div class="payment-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <div class="payment-details">
                        <h4>UPI Payment</h4>
                        <p>${payment.upiId}</p>
                        ${payment.isDefault ? '<small><em>Default payment method</em></small>' : ''}
                    </div>
                </div>
            `;
        }
        
        div.innerHTML = paymentContent + `
            <div class="payment-actions">
                <button class="btn-icon btn-delete" onclick="deletePaymentMethod('${payment.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    function loadFavorites() {
        const savedFavorites = localStorage.getItem('userFavorites');
        favorites = savedFavorites ? JSON.parse(savedFavorites) : getSampleFavorites();
        
        elements.favoritesBadge.textContent = favorites.length;
        renderFavorites();
    }

    function getSampleFavorites() {
        return [
            {
                id: 'fav1',
                name: 'Butter Chicken',
                category: 'Indian Main Course',
                price: 349,
                image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop'
            },
            {
                id: 'fav2',
                name: 'Margherita Pizza',
                category: 'Italian',
                price: 299,
                image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w-400&h=300&fit=crop'
            },
            {
                id: 'fav3',
                name: 'Chocolate Brownie',
                category: 'Dessert',
                price: 149,
                image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w-400&h=300&fit=crop'
            }
        ];
    }

    function renderFavorites(sortBy = 'recent') {
        elements.favoritesList.innerHTML = '';
        
        if (favorites.length === 0) {
            const emptyState = createEmptyState('No favorite items', 'Add items to favorites from the menu');
            elements.favoritesList.appendChild(emptyState);
            return;
        }
        
        let sortedFavorites = [...favorites];
        
        switch(sortBy) {
            case 'name':
                sortedFavorites.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                sortedFavorites.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedFavorites.sort((a, b) => b.price - a.price);
                break;
            case 'recent':
            default:
                // Keep original order (most recent first)
                break;
        }
        
        sortedFavorites.forEach(item => {
            const favoriteItem = createFavoriteItem(item);
            elements.favoritesList.appendChild(favoriteItem);
        });
    }

    function createFavoriteItem(item) {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        
        div.innerHTML = `
            <div class="favorite-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="favorite-content">
                <h3 class="favorite-name">${item.name}</h3>
                <p class="favorite-category">${item.category}</p>
                <div class="favorite-price">₹${item.price}</div>
                <div class="favorite-actions">
                    <button class="btn-add-to-cart" onclick="addToCartFromFavorites('${item.id}')">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn-remove-favorite" onclick="removeFromFavorites('${item.id}')">
                        <i class="fas fa-heart-broken"></i>
                    </button>
                </div>
            </div>
        `;
        
        return div;
    }

    function loadSettings() {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            userData.settings = { ...userData.settings, ...settings };
        }
        
        // Update toggle switches
        elements.notificationsToggle.checked = userData.settings.notifications;
        elements.darkModeToggle.checked = userData.settings.darkMode;
        elements.emailNotificationsToggle.checked = userData.settings.emailNotifications;
        elements.smsToggle.checked = userData.settings.smsUpdates;
        elements.autoSaveAddressToggle.checked = userData.settings.autoSaveAddress;
        
        // Apply dark mode if enabled
        if (userData.settings.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    function saveUserData() {
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('userSettings', JSON.stringify(userData.settings));
    }

    function setupEventListeners() {
        // Navigation
        elements.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                switchSection(section);
            });
        });

        // Personal Info Editing
        elements.editPersonalInfo.addEventListener('click', enablePersonalInfoEditing);
        elements.cancelEdit.addEventListener('click', disablePersonalInfoEditing);
        elements.personalInfoForm.addEventListener('submit', savePersonalInfoChanges);

        // Orders Filter
        elements.orderFilter.addEventListener('change', (e) => {
            renderOrders(e.target.value);
        });

        // Addresses
        elements.addAddressBtn.addEventListener('click', showAddAddressModal);
        elements.saveAddress.addEventListener('click', saveNewAddress);
        elements.cancelAddress.addEventListener('click', closeAddAddressModal);

        // Payment Methods
        elements.addPaymentBtn.addEventListener('click', showAddPaymentModal);
        elements.savePaymentBtn.addEventListener('click', saveNewPaymentMethod);
        elements.cancelPayment.addEventListener('click', closeAddPaymentModal);
        
        // Payment type toggle
        document.querySelectorAll('input[name="paymentType"]').forEach(radio => {
            radio.addEventListener('change', togglePaymentFields);
        });

        // Favorites Sort
        elements.favoritesSort.addEventListener('change', (e) => {
            renderFavorites(e.target.value);
        });

        // Settings Toggles
        elements.notificationsToggle.addEventListener('change', saveSetting);
        elements.darkModeToggle.addEventListener('change', toggleDarkMode);
        elements.emailNotificationsToggle.addEventListener('change', saveSetting);
        elements.smsToggle.addEventListener('change', saveSetting);
        elements.autoSaveAddressToggle.addEventListener('change', saveSetting);

        // Danger Actions
        elements.clearHistoryBtn.addEventListener('click', () => {
            showConfirmation(
                'Clear Order History',
                'This will permanently delete all your order history. This action cannot be undone.',
                clearOrderHistory
            );
        });

        elements.deactivateAccountBtn.addEventListener('click', () => {
            showConfirmation(
                'Deactivate Account',
                'Your account will be deactivated immediately. You can reactivate within 30 days.',
                deactivateAccount
            );
        });

        // Account Actions
        elements.logoutBtn.addEventListener('click', logout);
        elements.deleteAccountBtn.addEventListener('click', () => {
            showConfirmation(
                'Delete Account',
                'This will permanently delete your account and all data. This action cannot be undone.',
                deleteAccount
            );
        });

        // Avatar Change
        elements.changeAvatarBtn.addEventListener('click', changeAvatar);

        // Modal Close Buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').style.display = 'none';
            });
        });

        // Confirmation Modal
        elements.confirmCancel.addEventListener('click', () => {
            elements.confirmationModal.style.display = 'none';
        });
        elements.confirmAction.addEventListener('click', executeAction);

        // Close modals on overlay click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    function switchSection(sectionId) {
        // Update navigation
        elements.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Show corresponding section
        elements.contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${sectionId}-section`) {
                section.classList.add('active');
            }
        });
    }

    function enablePersonalInfoEditing() {
        isEditing = true;
        ['profileName', 'profileEmail', 'profilePhone', 'profileDob', 'profileBio'].forEach(id => {
            document.getElementById(id).disabled = false;
        });
        elements.editPersonalInfo.style.display = 'none';
        elements.savePersonalInfo.style.display = 'inline-flex';
        elements.cancelEdit.style.display = 'inline-flex';
    }

    function disablePersonalInfoEditing() {
        isEditing = false;
        ['profileName', 'profileEmail', 'profilePhone', 'profileDob', 'profileBio'].forEach(id => {
            document.getElementById(id).disabled = true;
        });
        // Reset values
        updateUserDisplay();
        elements.editPersonalInfo.style.display = 'inline-flex';
        elements.savePersonalInfo.style.display = 'none';
        elements.cancelEdit.style.display = 'none';
    }

    function savePersonalInfoChanges(e) {
        e.preventDefault();
        
        // Update user data
        userData.name = elements.profileName.value;
        userData.email = elements.profileEmail.value;
        userData.phone = elements.profilePhone.value;
        userData.dob = elements.profileDob.value;
        userData.bio = elements.profileBio.value;
        
        saveUserData();
        updateUserDisplay();
        disablePersonalInfoEditing();
        
        showNotification('Profile updated successfully!', 'success');
    }

    function showAddAddressModal() {
        elements.addressForm.reset();
        elements.addAddressModal.style.display = 'flex';
    }

    function closeAddAddressModal() {
        elements.addAddressModal.style.display = 'none';
    }

    function saveNewAddress() {
        const addressData = {
            id: 'addr' + Date.now(),
            label: document.getElementById('addressLabel').value,
            line1: document.getElementById('addressLine1').value,
            line2: document.getElementById('addressLine2').value,
            city: document.getElementById('addressCity').value,
            state: document.getElementById('addressState').value,
            pincode: document.getElementById('addressPincode').value,
            phone: document.getElementById('addressPhone').value,
            isDefault: document.getElementById('setAsDefault').checked
        };

        // Validate
        if (!addressData.label || !addressData.line1 || !addressData.city || 
            !addressData.state || !addressData.pincode || !addressData.phone) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        // If setting as default, remove default from others
        if (addressData.isDefault) {
            addresses.forEach(addr => addr.isDefault = false);
        } else if (addresses.length === 0) {
            addressData.isDefault = true;
        }

        addresses.push(addressData);
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
        
        renderAddresses();
        closeAddAddressModal();
        showNotification('Address saved successfully!', 'success');
    }

    function togglePaymentFields() {
        const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
        document.getElementById('cardPaymentFields').style.display = 
            paymentType === 'card' ? 'block' : 'none';
        document.getElementById('upiPaymentFields').style.display = 
            paymentType === 'upi' ? 'block' : 'none';
    }

    function showAddPaymentModal() {
        elements.paymentForm.reset();
        togglePaymentFields();
        elements.addPaymentModal.style.display = 'flex';
    }

    function closeAddPaymentModal() {
        elements.addPaymentModal.style.display = 'none';
    }

    function saveNewPaymentMethod() {
        const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
        let paymentData = {
            id: 'pay' + Date.now(),
            type: paymentType,
            isDefault: paymentMethods.length === 0
        };

        if (paymentType === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            if (!cardNumber || cardNumber.length < 16) {
                showNotification('Please enter a valid card number', 'error');
                return;
            }
            
            paymentData.cardNumber = '•••• •••• •••• ' + cardNumber.slice(-4);
            paymentData.cardName = document.getElementById('cardName').value;
            paymentData.expiry = document.getElementById('cardExpiry').value;
        } else {
            paymentData.upiId = document.getElementById('upiId').value;
            if (!paymentData.upiId.includes('@')) {
                showNotification('Please enter a valid UPI ID', 'error');
                return;
            }
        }

        paymentMethods.push(paymentData);
        localStorage.setItem('userPaymentMethods', JSON.stringify(paymentMethods));
        
        renderPaymentMethods();
        closeAddPaymentModal();
        showNotification('Payment method saved!', 'success');
    }

    function saveSetting() {
        userData.settings.notifications = elements.notificationsToggle.checked;
        userData.settings.darkMode = elements.darkModeToggle.checked;
        userData.settings.emailNotifications = elements.emailNotificationsToggle.checked;
        userData.settings.smsUpdates = elements.smsToggle.checked;
        userData.settings.autoSaveAddress = elements.autoSaveAddressToggle.checked;
        
        saveUserData();
        showNotification('Settings updated', 'success');
    }

    function toggleDarkMode() {
        if (elements.darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        saveSetting();
    }

    function showConfirmation(title, message, action, data = null) {
        elements.confirmationTitle.textContent = title;
        elements.confirmationMessage.textContent = message;
        currentAction = action;
        actionData = data;
        elements.confirmationModal.style.display = 'flex';
    }

    function executeAction() {
        if (currentAction) {
            currentAction(actionData);
        }
        elements.confirmationModal.style.display = 'none';
        currentAction = null;
        actionData = null;
    }

    function clearOrderHistory() {
        orderHistory = [];
        localStorage.removeItem('orderHistory');
        elements.totalOrders.textContent = '0';
        elements.ordersBadge.textContent = '0';
        renderOrders();
        showNotification('Order history cleared', 'success');
    }

    function deactivateAccount() {
        showNotification('Account deactivated successfully', 'success');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    }

    function logout() {
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    }

    function deleteAccount() {
        // Clear all user data
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userSettings');
        localStorage.removeItem('userAddresses');
        localStorage.removeItem('userPaymentMethods');
        localStorage.removeItem('userFavorites');
        localStorage.removeItem('orderHistory');
        
        showNotification('Account deleted successfully', 'success');
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    }

    function changeAvatar() {
    // Create a custom modal for avatar options
    const avatarModal = document.createElement('div');
    avatarModal.className = 'avatar-options-modal';
    avatarModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        backdrop-filter: blur(5px);
    `;
    
    avatarModal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 400px; width: 90%; animation: modalSlideIn 0.3s ease;">
            <h3 style="margin-bottom: 1.5rem; text-align: center; color: #333;">Update Profile Picture</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="avatar-option-btn" id="cameraOption">
                    <i class="fas fa-camera" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <span>Take Photo</span>
                </button>
                <button class="avatar-option-btn" id="galleryOption">
                    <i class="fas fa-images" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <span>Choose from Gallery</span>
                </button>
                ${userData.avatar ? `
                    <button class="avatar-option-btn" id="removeOption" style="color: #ff4757;">
                        <i class="fas fa-trash-alt" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                        <span>Remove Photo</span>
                    </button>
                ` : ''}
                <button class="cancel-btn" id="cancelAvatarOption" style="margin-top: 1rem;">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(avatarModal);
    
    // Add CSS for buttons
    const style = document.createElement('style');
    style.textContent = `
        .avatar-option-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem;
            background: #f8f9fa;
            border: 2px solid #e8e8e8;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 500;
            color: #555;
            transition: all 0.3s ease;
            width: 100%;
        }
        .avatar-option-btn:hover {
            background: #667eea;
            color: white;
            border-color: #667eea;
            transform: translateY(-2px);
        }
        .cancel-btn {
            padding: 1rem;
            background: #f1f5f9;
            color: #64748b;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            width: 100%;
        }
        .cancel-btn:hover {
            background: #e2e8f0;
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    document.getElementById('cameraOption').addEventListener('click', () => {
        avatarModal.remove();
        captureFromCamera();
    });
    
    document.getElementById('galleryOption').addEventListener('click', () => {
        avatarModal.remove();
        chooseFromGallery();
    });
    
    if (userData.avatar) {
        document.getElementById('removeOption').addEventListener('click', () => {
            avatarModal.remove();
            removeProfilePicture();
        });
    }
    
    document.getElementById('cancelAvatarOption').addEventListener('click', () => {
        avatarModal.remove();
    });
    
    // Close on overlay click
    avatarModal.addEventListener('click', (e) => {
        if (e.target === avatarModal) {
            avatarModal.remove();
        }
    });
}

function captureFromCamera() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment'; // Uses camera
    
    fileInput.onchange = function(e) {
        processImageFile(e.target.files[0]);
    };
    
    fileInput.click();
}

function chooseFromGallery() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function(e) {
        processImageFile(e.target.files[0]);
    };
    
    fileInput.click();
}

function processImageFile(file) {
    if (!file) return;
    
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('Image size should be less than 5MB', 'error');
        return;
    }
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image (JPEG, PNG, GIF, WebP)', 'error');
        return;
    }
    
    // Show loading indicator
    showNotification('Processing image...', 'info');
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = function(event) {
        // Save to user data
        userData.avatar = event.target.result;
        saveUserData();
        
        // Update display
        elements.userAvatar.innerHTML = `<img src="${userData.avatar}" alt="${userData.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        
        showNotification('Profile picture updated!', 'success');
    };
    
    reader.onerror = function() {
        showNotification('Error reading file', 'error');
    };
    
    reader.readAsDataURL(file);
}

function removeProfilePicture() {
    userData.avatar = null;
    saveUserData();
    elements.userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
    showNotification('Profile picture removed', 'success');
}

    function createEmptyState(title, message) {
        const div = document.createElement('div');
        div.className = 'empty-state';
        div.innerHTML = `
            <i class="fas fa-inbox"></i>
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        return div;
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
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
        `;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    function updateCartCount() {
        const cartData = localStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        elements.cartCount.textContent = totalItems;
    }

    function updateNavigation() {
        // Highlight current section based on URL hash
        const hash = window.location.hash.substring(1) || 'personal-info';
        switchSection(hash);
    }

    // Make functions available globally for onclick handlers
    window.viewOrderDetails = function(orderId) {
        const order = orderHistory.find(o => o.orderId === orderId);
        if (order) {
            alert(`Order Details:\n\nOrder ID: ${order.orderId}\nDate: ${order.date}\nStatus: ${order.status}\nTotal: ₹${order.total.toFixed(2)}`);
        }
    };

    window.cancelOrder = function(orderId) {
        const order = orderHistory.find(o => o.orderId === orderId);
        if (order && order.status.toLowerCase() === 'pending') {
            showConfirmation(
                'Cancel Order',
                'Are you sure you want to cancel this order?',
                function() {
                    order.status = 'cancelled';
                    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
                    renderOrders(elements.orderFilter.value);
                    showNotification('Order cancelled successfully', 'success');
                }
            );
        }
    };

    window.reorder = function(orderId) {
        const order = orderHistory.find(o => o.orderId === orderId);
        if (order && order.items) {
            // Add items to cart
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            order.items.forEach(item => {
                const existingItem = currentCart.find(ci => ci.id === item.id);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    currentCart.push({...item});
                }
            });
            localStorage.setItem('cart', JSON.stringify(currentCart));
            updateCartCount();
            showNotification('Items added to cart!', 'success');
        }
    };

    window.editAddress = function(addressId) {
        const address = addresses.find(addr => addr.id === addressId);
        if (address) {
            // Populate form with address data
            document.getElementById('addressLabel').value = address.label;
            document.getElementById('addressLine1').value = address.line1;
            document.getElementById('addressLine2').value = address.line2 || '';
            document.getElementById('addressCity').value = address.city;
            document.getElementById('addressState').value = address.state;
            document.getElementById('addressPincode').value = address.pincode;
            document.getElementById('addressPhone').value = address.phone;
            document.getElementById('setAsDefault').checked = address.isDefault;
            
            // Show modal and set up save to update instead of create
            elements.saveAddress.onclick = function() {
                address.label = document.getElementById('addressLabel').value;
                address.line1 = document.getElementById('addressLine1').value;
                address.line2 = document.getElementById('addressLine2').value;
                address.city = document.getElementById('addressCity').value;
                address.state = document.getElementById('addressState').value;
                address.pincode = document.getElementById('addressPincode').value;
                address.phone = document.getElementById('addressPhone').value;
                address.isDefault = document.getElementById('setAsDefault').checked;
                
                if (address.isDefault) {
                    addresses.forEach(addr => {
                        if (addr.id !== addressId) addr.isDefault = false;
                    });
                }
                
                localStorage.setItem('userAddresses', JSON.stringify(addresses));
                renderAddresses();
                closeAddAddressModal();
                showNotification('Address updated!', 'success');
            };
            
            elements.addAddressModal.style.display = 'flex';
        }
    };

    window.deleteAddress = function(addressId) {
        showConfirmation(
            'Delete Address',
            'Are you sure you want to delete this address?',
            function() {
                addresses = addresses.filter(addr => addr.id !== addressId);
                // If we deleted the default, set a new default
                if (addresses.length > 0 && !addresses.some(addr => addr.isDefault)) {
                    addresses[0].isDefault = true;
                }
                localStorage.setItem('userAddresses', JSON.stringify(addresses));
                renderAddresses();
                showNotification('Address deleted', 'success');
            }
        );
    };

    window.setDefaultAddress = function(addressId) {
        addresses.forEach(addr => {
            addr.isDefault = addr.id === addressId;
        });
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
        renderAddresses();
        showNotification('Default address updated', 'success');
    };

    window.deletePaymentMethod = function(paymentId) {
        showConfirmation(
            'Delete Payment Method',
            'Are you sure you want to delete this payment method?',
            function() {
                paymentMethods = paymentMethods.filter(pay => pay.id !== paymentId);
                localStorage.setItem('userPaymentMethods', JSON.stringify(paymentMethods));
                renderPaymentMethods();
                showNotification('Payment method deleted', 'success');
            }
        );
    };

    window.addToCartFromFavorites = function(itemId) {
        const item = favorites.find(fav => fav.id === itemId);
        if (item) {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = currentCart.find(ci => ci.id === itemId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                currentCart.push({
                    ...item,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(currentCart));
            updateCartCount();
            showNotification(`${item.name} added to cart!`, 'success');
        }
    };

    window.removeFromFavorites = function(itemId) {
        showConfirmation(
            'Remove from Favorites',
            'Are you sure you want to remove this item from favorites?',
            function() {
                favorites = favorites.filter(fav => fav.id !== itemId);
                localStorage.setItem('userFavorites', JSON.stringify(favorites));
                elements.favoritesBadge.textContent = favorites.length;
                renderFavorites(elements.favoritesSort.value);
                showNotification('Removed from favorites', 'success');
            }
        );
    };

    // Initialize on load
    initProfile();
});

function loadUserData() {
    // Check if user is logged in from your login system
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        // If not logged in, redirect to login page
        showNotification('Please login first', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    // Parse current user data
    const loggedInUser = JSON.parse(currentUser);
    
    // Try to load existing profile data
    const savedUser = localStorage.getItem('userProfile');
    
    if (savedUser) {
        userData = JSON.parse(savedUser);
        // Make sure we're using logged-in user's email
        if (loggedInUser.email !== userData.email) {
            // Different user logged in, create new profile
            createNewUserProfile(loggedInUser);
        }
    } else {
        // No existing profile, create one from login data
        createNewUserProfile(loggedInUser);
    }
    
    updateUserDisplay();
    loadSettings();
}

function createNewUserProfile(loggedInUser) {
    userData = {
        name: loggedInUser.name || loggedInUser.email.split('@')[0],
        email: loggedInUser.email,
        phone: loggedInUser.phone || '',
        dob: '',
        bio: 'Food enthusiast who loves trying new cuisines!',
        avatar: null,
        joinDate: new Date().toISOString(),
        totalSpent: 0,
        settings: {
            notifications: true,
            darkMode: false,
            emailNotifications: true,
            smsUpdates: true,
            autoSaveAddress: true
        }
    };
    saveUserData();
}