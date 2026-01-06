// restaurants.js - South Korea Locations Only

// South Korea Mom's Touch Restaurant Data
const restaurantsData = [
    {
        id: 1,
        name: "Mom's Touch Seoul Central",
        address: "11 Seoae-ro 1-gil, Jung District, Seoul, South Korea",
        city: "Seoul",
        region: "Jung District",
        latitude: 37.5665,
        longitude: 126.9780,
        phone: "+82 2-1234-5678",
        rating: 4.7,
        reviews: 1284,
        distance: 0.5,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery", "Drive-thru"],
        features: ["Parking Available", "Free WiFi", "Outdoor Seating", "Kids Play Area", "24/7 Open"],
        tags: ["Flagship Store", "24/7", "Family Friendly"],
        isOpen: true,
        deliveryFee: "Free",
        minOrder: "₩15,000",
        estimatedDelivery: "25-35 minutes",
        popularItems: ["Double Bulgogi Burger", "Honey Garlic Chicken", "Spicy Chicken Sandwich"]
    },
    {
        id: 2,
        name: "Mom's Touch Gangnam",
        address: "Teheran-ro 123, Gangnam District, Seoul",
        city: "Seoul",
        region: "Gangnam District",
        latitude: 37.4979,
        longitude: 127.0276,
        phone: "+82 2-2345-6789",
        rating: 4.5,
        reviews: 892,
        distance: 3.2,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery"],
        features: ["Parking Available", "Free WiFi", "Outdoor Seating", "Vegetarian Options"],
        tags: ["Premium", "Business Lunch"],
        isOpen: true,
        deliveryFee: "₩2,000",
        minOrder: "₩20,000",
        estimatedDelivery: "30-40 minutes",
        popularItems: ["Crispy Chicken Burger", "Shrimp Burger", "Cheese Bulgogi Burger"]
    },
    {
        id: 3,
        name: "Mom's Touch Hongdae",
        address: "Mapo-gu, Hongdae Street, Seoul",
        city: "Seoul",
        region: "Mapo-gu",
        latitude: 37.5563,
        longitude: 126.9238,
        phone: "+82 2-3456-7890",
        rating: 4.3,
        reviews: 654,
        distance: 5.7,
        image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Late Night"],
        features: ["Free WiFi", "Outdoor Seating", "Student Discount"],
        tags: ["Student Favorite", "Night Life"],
        isOpen: true,
        deliveryFee: "₩2,500",
        minOrder: "₩18,000",
        estimatedDelivery: "20-30 minutes",
        popularItems: ["Spicy Chicken Burger", "Honey Butter Fries", "Mozzarella Sticks"]
    },
    {
        id: 4,
        name: "Mom's Touch Busan Haeundae",
        address: "Haeundae Beach Road, Busan",
        city: "Busan",
        region: "Haeundae District",
        latitude: 35.1587,
        longitude: 129.1604,
        phone: "+82 51-123-4567",
        rating: 4.6,
        reviews: 432,
        distance: 325.0,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery"],
        features: ["Parking Available", "Free WiFi", "Beach View", "Family Friendly"],
        tags: ["Beach Front", "Tourist Friendly"],
        isOpen: true,
        deliveryFee: "₩3,000",
        minOrder: "₩25,000",
        estimatedDelivery: "35-45 minutes",
        popularItems: ["Shrimp Burger", "Fish Sandwich", "Seafood Platter"]
    },
    {
        id: 5,
        name: "Mom's Touch Incheon Airport",
        address: "Incheon International Airport Terminal 1",
        city: "Incheon",
        region: "Airport",
        latitude: 37.4692,
        longitude: 126.4505,
        phone: "+82 32-123-4567",
        rating: 4.4,
        reviews: 789,
        distance: 28.5,
        image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "24/7"],
        features: ["Airport Location", "Free WiFi", "Quick Service"],
        tags: ["Airport", "24/7", "Quick Bite"],
        isOpen: true,
        deliveryFee: "Not Available",
        minOrder: "₩12,000",
        estimatedDelivery: "N/A",
        popularItems: ["Quick Chicken Burger", "French Fries", "Soft Drinks"]
    },
    {
        id: 6,
        name: "Mom's Touch Daegu Central",
        address: "Dongseong-ro, Jung-gu, Daegu",
        city: "Daegu",
        region: "Jung-gu",
        latitude: 35.8714,
        longitude: 128.6014,
        phone: "+82 53-123-4567",
        rating: 4.2,
        reviews: 345,
        distance: 237.8,
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery"],
        features: ["Parking Available", "Free WiFi", "Spicy Food Special"],
        tags: ["Local Favorite", "Spicy Options"],
        isOpen: true,
        deliveryFee: "₩2,000",
        minOrder: "₩15,000",
        estimatedDelivery: "25-35 minutes",
        popularItems: ["Extra Spicy Chicken", "Kimchi Burger", "Spicy Fries"]
    },
    {
        id: 7,
        name: "Mom's Touch Daejeon",
        address: "Dunsan-dong, Seo-gu, Daejeon",
        city: "Daejeon",
        region: "Seo-gu",
        latitude: 36.3504,
        longitude: 127.3845,
        phone: "+82 42-123-4567",
        rating: 4.3,
        reviews: 287,
        distance: 139.6,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery", "Drive-thru"],
        features: ["Parking Available", "Free WiFi", "Kids Play Area"],
        tags: ["Family Friendly", "Drive-thru"],
        isOpen: false, // Closed for renovation
        deliveryFee: "₩2,500",
        minOrder: "₩18,000",
        estimatedDelivery: "30-40 minutes",
        popularItems: ["Family Meal Set", "Kids Burger", "Chicken Tenders"]
    },
    {
        id: 8,
        name: "Mom's Touch Gwangju",
        address: "Geumnam-ro, Dong-gu, Gwangju",
        city: "Gwangju",
        region: "Dong-gu",
        latitude: 35.1595,
        longitude: 126.8526,
        phone: "+82 62-123-4567",
        rating: 4.4,
        reviews: 312,
        distance: 267.3,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        services: ["Dine-in", "Takeaway", "Delivery"],
        features: ["Free WiFi", "Local Specialties", "Vegetarian Options"],
        tags: ["Local Special", "Healthy Options"],
        isOpen: true,
        deliveryFee: "₩2,000",
        minOrder: "₩16,000",
        estimatedDelivery: "25-35 minutes",
        popularItems: ["Tofu Burger", "Vegetarian Wrap", "Sweet Potato Fries"]
    }
];

// DOM Elements
const restaurantsGrid = document.getElementById('restaurantsGrid');
const restaurantsListView = document.getElementById('restaurantsListView');
const mapContainer = document.getElementById('mapContainer');
const restaurantsMap = document.getElementById('restaurantsMap');
const currentLocationText = document.getElementById('currentLocationText');
const changeLocationBtn = document.getElementById('changeLocationBtn');
const detectLocationBtn = document.getElementById('detectLocationBtn');
const browseAllBtn = document.getElementById('browseAllBtn');

// Filter elements
const searchRestaurants = document.getElementById('searchRestaurants');
const distanceSlider = document.getElementById('distanceSlider');
const distanceValue = document.getElementById('distanceValue');
const openNowToggle = document.getElementById('openNowToggle');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');

// View controls
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const mapViewBtn = document.getElementById('mapViewBtn');
const refreshBtn = document.getElementById('refreshBtn');

// Location modal elements
const locationModal = document.getElementById('locationModal');
const modalDetectLocation = document.getElementById('modalDetectLocation');
const cancelLocation = document.getElementById('cancelLocation');
const confirmLocation = document.getElementById('confirmLocation');

// Loading and no results
const loadingContainer = document.getElementById('loadingContainer');
const noResultsContainer = document.getElementById('noResultsContainer');
const resetSearchBtn = document.getElementById('resetSearchBtn');

// Map controls
const locateMeBtn = document.getElementById('locateMeBtn');

// Toast
const toast = document.getElementById('toast');

// State
let userLocation = {
    lat: 37.5665,
    lng: 126.9780,
    city: "Seoul",
    region: "Central",
    address: "Seoul, South Korea"
};

let filteredRestaurants = [];
let activeFilters = {
    services: ["Dine-in", "Takeaway", "Delivery"],
    features: [],
    maxDistance: 50, // Increased to 50km for South Korea
    openNow: true,
    search: "",
    sort: "distance"
};

let map = null;
let markers = [];
let userMarker = null;
let selectedLocation = null;
let currentView = "grid";

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeLocation();
    setupEventListeners();
    loadRestaurants();
    initializeMap();
});

function initializeLocation() {
    const savedLocation = localStorage.getItem('momstouch_kr_location');
    if (savedLocation) {
        try {
            userLocation = JSON.parse(savedLocation);
            updateLocationDisplay();
        } catch (e) {
            console.error('Error parsing saved location:', e);
        }
    } else {
        // Default to Seoul
        userLocation = {
            lat: 37.5665,
            lng: 126.9780,
            city: "Seoul",
            region: "Central",
            address: "Seoul, South Korea"
        };
        updateLocationDisplay();
    }
}

function setupEventListeners() {
    // Location buttons
    changeLocationBtn.addEventListener('click', () => locationModal.classList.add('show'));
    detectLocationBtn.addEventListener('click', detectUserLocation);
    browseAllBtn.addEventListener('click', () => {
        userLocation = {
            lat: 36.5,
            lng: 127.5,
            city: "All South Korea",
            region: "Nationwide",
            address: "South Korea"
        };
        activeFilters.maxDistance = 500; // Cover all South Korea
        updateLocationDisplay();
        loadRestaurants();
        showToast("Showing all restaurants in South Korea");
    });

    // Filter controls
    searchRestaurants.addEventListener('input', debounce(() => {
        activeFilters.search = searchRestaurants.value.trim();
        loadRestaurants();
    }, 300));

    distanceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        distanceValue.textContent = `${value} km`;
        activeFilters.maxDistance = value;
    });

    distanceSlider.addEventListener('change', () => {
        loadRestaurants();
    });

    openNowToggle.addEventListener('change', () => {
        activeFilters.openNow = openNowToggle.checked;
        loadRestaurants();
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('active');
            updateActiveFilters();
            loadRestaurants();
        });
    });

    // Sort options
    document.querySelectorAll('input[name="sort"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            activeFilters.sort = e.target.value;
            loadRestaurants();
        });
    });

    // Clear and apply filters
    clearFiltersBtn.addEventListener('click', clearFilters);
    applyFiltersBtn.addEventListener('click', () => {
        loadRestaurants();
        showToast("필터가 적용되었습니다");
    });

    // View controls
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));
    mapViewBtn.addEventListener('click', () => switchView('map'));
    refreshBtn.addEventListener('click', refreshRestaurants);
    resetSearchBtn.addEventListener('click', clearFilters);

    // Location modal
    modalDetectLocation.addEventListener('click', detectUserLocation);
    cancelLocation.addEventListener('click', () => locationModal.classList.remove('show'));
    confirmLocation.addEventListener('click', confirmSelectedLocation);

    // Map controls
    locateMeBtn.addEventListener('click', centerMapOnUser);

    // City selection
    document.querySelectorAll('.city-chip').forEach(city => {
        city.addEventListener('click', () => {
            const cityName = city.dataset.city;
            const cities = {
                "Seoul": { lat: 37.5665, lng: 126.9780 },
                "Busan": { lat: 35.1796, lng: 129.0756 },
                "Incheon": { lat: 37.4563, lng: 126.7052 },
                "Daegu": { lat: 35.8714, lng: 128.6014 },
                "Daejeon": { lat: 36.3504, lng: 127.3845 },
                "Gwangju": { lat: 35.1595, lng: 126.8526 }
            };
            
            if (cities[cityName]) {
                selectedLocation = {
                    ...cities[cityName],
                    city: cityName,
                    region: "South Korea",
                    address: `${cityName}, South Korea`
                };
                confirmLocation.disabled = false;
                showToast(`${cityName} 선택됨`);
            }
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === locationModal) locationModal.classList.remove('show');
        if (e.target === restaurantModal) restaurantModal.classList.remove('show');
    });
}

function updateActiveFilters() {
    activeFilters.services = [];
    activeFilters.features = [];
    
    document.querySelectorAll('.filter-chip.active').forEach(chip => {
        const filter = chip.dataset.filter;
        if (['dine-in', 'takeaway', 'delivery', 'drive-thru'].includes(filter)) {
            // Convert to display format
            const displayNames = {
                'dine-in': 'Dine-in',
                'takeaway': 'Takeaway',
                'delivery': 'Delivery',
                'drive-thru': 'Drive-thru'
            };
            activeFilters.services.push(displayNames[filter]);
        } else {
            // Convert to display format
            const displayNames = {
                'parking': 'Parking Available',
                'wifi': 'Free WiFi',
                'outdoor': 'Outdoor Seating',
                'kids': 'Kids Play Area',
                '24/7': '24/7 Open',
                'vegetarian': 'Vegetarian Options'
            };
            activeFilters.features.push(displayNames[filter] || filter);
        }
    });
}

function clearFilters() {
    // Reset all filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        if (['dine-in', 'takeaway', 'delivery'].includes(chip.dataset.filter)) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
    
    // Reset other filters
    searchRestaurants.value = '';
    distanceSlider.value = 50;
    distanceValue.textContent = '50 km';
    openNowToggle.checked = true;
    document.querySelector('input[name="sort"][value="distance"]').checked = true;
    
    // Reset active filters
    activeFilters = {
        services: ["Dine-in", "Takeaway", "Delivery"],
        features: [],
        maxDistance: 50,
        openNow: true,
        search: "",
        sort: "distance"
    };
    
    loadRestaurants();
    showToast("모든 필터가 초기화되었습니다");
}

async function detectUserLocation() {
    if (!navigator.geolocation) {
        showToast("브라우저에서 위치 서비스를 지원하지 않습니다");
        return;
    }
    
    showLoading("위치 확인 중...");
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Check if location is in South Korea
        if (!isInSouthKorea(latitude, longitude)) {
            showToast("현재 위치가 한국이 아닙니다. 서울로 기본 설정됩니다.");
            latitude = 37.5665;
            longitude = 126.9780;
        }
        
        userLocation = {
            lat: latitude,
            lng: longitude,
            city: "현재 위치",
            region: "South Korea",
            address: "현재 위치 (한국)"
        };
        
        // Save to localStorage
        localStorage.setItem('momstouch_kr_location', JSON.stringify(userLocation));
        
        // If in location modal, update selection
        if (selectedLocation === null) {
            selectedLocation = userLocation;
            confirmLocation.disabled = false;
        }
        
        updateLocationDisplay();
        loadRestaurants();
        showToast("위치가 확인되었습니다!");
        
        // Center map on user location
        if (map) {
            centerMapOnUser();
        }
        
    } catch (error) {
        console.error('Error getting location:', error);
        showToast("위치를 확인할 수 없습니다. 수동으로 입력해주세요.");
    } finally {
        hideLoading();
    }
}

function isInSouthKorea(lat, lng) {
    // Rough bounding box for South Korea
    return lat >= 33.0 && lat <= 38.5 && lng >= 125.0 && lng <= 131.0;
}

function confirmSelectedLocation() {
    if (selectedLocation) {
        userLocation = selectedLocation;
        localStorage.setItem('momstouch_kr_location', JSON.stringify(userLocation));
        updateLocationDisplay();
        loadRestaurants();
        locationModal.classList.remove('show');
        selectedLocation = null;
        confirmLocation.disabled = true;
        
        // Center map on new location
        if (map) {
            centerMapOnUser();
        }
        
        showToast(`위치가 ${userLocation.city}로 변경되었습니다`);
    }
}

function updateLocationDisplay() {
    currentLocationText.textContent = userLocation.address;
    
    // Update results title
    const resultsTitle = document.getElementById('resultsTitle');
    if (userLocation.city === "All South Korea") {
        resultsTitle.textContent = "전국 맘스터치 매장";
    } else {
        resultsTitle.textContent = `${userLocation.city} 근처 맘스터치 매장`;
    }
}

function calculateDistances() {
    restaurantsData.forEach(restaurant => {
        restaurant.distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.latitude,
            restaurant.longitude
        );
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

function filterRestaurants() {
    calculateDistances();
    
    filteredRestaurants = restaurantsData.filter(restaurant => {
        // Distance filter
        if (userLocation.city !== "All South Korea" && restaurant.distance > activeFilters.maxDistance) {
            return false;
        }
        
        // Search filter
        if (activeFilters.search) {
            const searchTerm = activeFilters.search.toLowerCase();
            const nameMatch = restaurant.name.toLowerCase().includes(searchTerm);
            const addressMatch = restaurant.address.toLowerCase().includes(searchTerm);
            const cityMatch = restaurant.city.toLowerCase().includes(searchTerm);
            
            if (!nameMatch && !addressMatch && !cityMatch) {
                return false;
            }
        }
        
        // Services filter
        if (activeFilters.services.length > 0) {
            const hasService = activeFilters.services.some(service => 
                restaurant.services.includes(service)
            );
            if (!hasService) return false;
        }
        
        // Features filter
        if (activeFilters.features.length > 0) {
            const hasAllFeatures = activeFilters.features.every(feature => 
                restaurant.features.includes(feature)
            );
            if (!hasAllFeatures) return false;
        }
        
        // Open now filter
        if (activeFilters.openNow && !restaurant.isOpen) {
            return false;
        }
        
        return true;
    });
    
    // Sort restaurants
    sortRestaurants();
}

function sortRestaurants() {
    filteredRestaurants.sort((a, b) => {
        switch (activeFilters.sort) {
            case 'distance':
                return a.distance - b.distance;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'popular':
                return b.reviews - a.reviews;
            default:
                return a.distance - b.distance;
        }
    });
}

function loadRestaurants() {
    showLoading();
    
    setTimeout(() => {
        filterRestaurants();
        renderRestaurants();
        updateMapMarkers();
        hideLoading();
        
        // Show/hide no results
        if (filteredRestaurants.length === 0) {
            noResultsContainer.style.display = 'block';
            restaurantsGrid.style.display = 'none';
            restaurantsListView.style.display = 'none';
            mapContainer.style.display = 'none';
        } else {
            noResultsContainer.style.display = 'none';
        }
        
        // Update count
        document.getElementById('restaurantsCount').textContent = filteredRestaurants.length;
    }, 500);
}

function renderRestaurants() {
    // Clear existing content
    restaurantsGrid.innerHTML = '';
    restaurantsListView.innerHTML = '';
    
    // Render grid view
    filteredRestaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        restaurantsGrid.appendChild(card);
        
        const listItem = createRestaurantListItem(restaurant);
        restaurantsListView.appendChild(listItem);
    });
}

function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.dataset.id = restaurant.id;
    
    const isOpen = restaurant.isOpen;
    const distanceText = restaurant.distance < 1 
        ? `${(restaurant.distance * 1000).toFixed(0)}m` 
        : `${restaurant.distance}km`;
    
    card.innerHTML = `
        <div class="restaurant-image-container">
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
            ${restaurant.tags.includes('24/7') ? '<span class="restaurant-badge">24/7</span>' : ''}
        </div>
        <div class="restaurant-content">
            <div class="restaurant-header">
                <div>
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <div class="restaurant-rating">
                        <span class="rating-stars">${generateStarRating(restaurant.rating)}</span>
                        <span class="rating-value">${restaurant.rating}</span>
                        <span class="rating-count">(${restaurant.reviews})</span>
                    </div>
                </div>
                <span class="tag ${isOpen ? 'open' : 'closed'}">
                    ${isOpen ? '🟢 영업 중' : '🔴 영업 종료'}
                </span>
            </div>
            
            <p class="restaurant-address">
                <i class="fas fa-map-marker-alt"></i> ${restaurant.address}
            </p>
            
            <p class="restaurant-distance">
                <i class="fas fa-location-arrow"></i> ${distanceText} 거리
            </p>
            
            <div class="restaurant-tags">
                ${restaurant.services.slice(0, 2).map(service => `<span class="tag">${service}</span>`).join('')}
                ${restaurant.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="restaurant-footer">
                <div class="restaurant-hours">
                    <i class="fas fa-phone"></i> ${restaurant.phone}
                </div>
                <div class="restaurant-actions">
                    <button class="btn-details" onclick="showRestaurantDetails(${restaurant.id})">
                        <i class="fas fa-info-circle"></i> 상세보기
                    </button>
                    <button class="btn-order" onclick="orderFromRestaurant(${restaurant.id})">
                        <i class="fas fa-utensils"></i> 주문하기
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Make entire card clickable
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            showRestaurantDetails(restaurant.id);
        }
    });
    
    return card;
}

function createRestaurantListItem(restaurant) {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.dataset.id = restaurant.id;
    
    const isOpen = restaurant.isOpen;
    const distanceText = restaurant.distance < 1 
        ? `${(restaurant.distance * 1000).toFixed(0)}m` 
        : `${restaurant.distance}km`;
    
    item.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}" class="list-item-image">
        <div class="list-item-content">
            <div class="list-item-header">
                <h3>${restaurant.name}</h3>
                <div class="list-item-meta">
                    <span class="rating">⭐ ${restaurant.rating} (${restaurant.reviews})</span>
                    <span class="distance">📍 ${distanceText}</span>
                    <span class="status ${isOpen ? 'open' : 'closed'}">${isOpen ? '🟢 영업 중' : '🔴 영업 종료'}</span>
                </div>
                <p class="list-item-address"><i class="fas fa-map-marker-alt"></i> ${restaurant.address}</p>
                <p class="list-item-phone"><i class="fas fa-phone"></i> ${restaurant.phone}</p>
                <div class="list-item-tags">
                    ${restaurant.services.slice(0, 2).map(service => `<span class="tag">${service}</span>`).join('')}
                </div>
            </div>
            <div class="list-item-actions">
                <button class="btn-details" onclick="showRestaurantDetails(${restaurant.id})">상세정보</button>
                <button class="btn-order" onclick="orderFromRestaurant(${restaurant.id})">주문하기</button>
            </div>
        </div>
    `;
    
    item.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            showRestaurantDetails(restaurant.id);
        }
    });
    
    return item;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    if (halfStar) stars += '✨';
    for (let i = 0; i < emptyStars; i++) stars += '☆';
    
    return stars;
}

function switchView(view) {
    currentView = view;
    
    // Update active button
    [gridViewBtn, listViewBtn, mapViewBtn].forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${view}ViewBtn`).classList.add('active');
    
    // Show/hide views
    restaurantsGrid.style.display = view === 'grid' ? 'grid' : 'none';
    restaurantsListView.style.display = view === 'list' ? 'flex' : 'none';
    mapContainer.style.display = view === 'map' ? 'block' : 'none';
    
    // Update map if switching to map view
    if (view === 'map' && map) {
        setTimeout(() => {
            map.invalidateSize();
            updateMapMarkers();
        }, 100);
    }
}

function refreshRestaurants() {
    loadRestaurants();
    showToast("매장 목록이 새로고침되었습니다");
}

function showRestaurantDetails(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    const modal = document.getElementById('restaurantModal');
    const modalBody = modal.querySelector('.modal-body');
    const isOpen = restaurant.isOpen;
    const distanceText = restaurant.distance < 1 
        ? `${(restaurant.distance * 1000).toFixed(0)} 미터` 
        : `${restaurant.distance} 킬로미터`;
    
    modalBody.innerHTML = `
        <div class="restaurant-details">
            <div class="details-header">
                <div class="details-image">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                    <span class="restaurant-status ${isOpen ? 'open' : 'closed'}">
                        ${isOpen ? '🟢 영업 중' : '🔴 영업 종료'}
                    </span>
                </div>
                <div class="details-title">
                    <h2>${restaurant.name}</h2>
                    <div class="details-rating">
                        ${generateStarRating(restaurant.rating)}
                        <span class="rating-text">${restaurant.rating} (${restaurant.reviews}개 리뷰)</span>
                    </div>
                </div>
            </div>
            
            <div class="details-grid">
                <div class="detail-section">
                    <h3><i class="fas fa-map-marker-alt"></i> 위치 정보</h3>
                    <div class="detail-content">
                        <p class="address"><strong>주소:</strong> ${restaurant.address}</p>
                        <p class="distance"><strong>현재 거리:</strong> ${distanceText}</p>
                        <p class="city"><strong>도시:</strong> ${restaurant.city}</p>
                        <p class="region"><strong>지역:</strong> ${restaurant.region}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-phone"></i> 연락처</h3>
                    <div class="detail-content">
                        <p class="phone"><strong>전화번호:</strong> ${restaurant.phone}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-concierge-bell"></i> 서비스</h3>
                    <div class="detail-content">
                        <div class="services-list">
                            ${restaurant.services.map(service => `
                                <span class="service-item">
                                    <i class="fas fa-check"></i> ${service}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-star"></i> 편의시설</h3>
                    <div class="detail-content">
                        <div class="features-list">
                            ${restaurant.features.map(feature => `
                                <span class="feature-item">
                                    <i class="fas fa-check-circle"></i> ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-truck"></i> 배달 정보</h3>
                    <div class="detail-content">
                        <div class="delivery-info">
                            <div class="info-row">
                                <span class="label">배달료:</span>
                                <span class="value">${restaurant.deliveryFee}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">최소주문:</span>
                                <span class="value">${restaurant.minOrder}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">예상 배달시간:</span>
                                <span class="value">${restaurant.estimatedDelivery}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-fire"></i> 인기 메뉴</h3>
                    <div class="detail-content">
                        <div class="popular-items">
                            ${restaurant.popularItems.map(item => `
                                <span class="menu-item">
                                    <i class="fas fa-utensils"></i> ${item}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-tags"></i> 태그</h3>
                    <div class="detail-content">
                        <div class="tags-list">
                            ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="details-actions">
                <button class="btn-primary" onclick="orderFromRestaurant(${restaurant.id})">
                    <i class="fas fa-utensils"></i> 이 매장에서 주문하기
                </button>
                <button class="btn-secondary" onclick="getDirections(${restaurant.latitude}, ${restaurant.longitude})">
                    <i class="fas fa-directions"></i> 길찾기
                </button>
                <button class="btn-outline" onclick="callRestaurant('${restaurant.phone}')">
                    <i class="fas fa-phone"></i> 전화하기
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('#modalRestaurantName').textContent = restaurant.name;
    modal.classList.add('show');
}

function orderFromRestaurant(restaurantId) {
    // Save selected restaurant to localStorage
    localStorage.setItem('selected_restaurant', restaurantId);
    // Redirect to menu page
    window.location.href = 'menu.html';
}

function getDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
}

function callRestaurant(phone) {
    window.location.href = `tel:${phone}`;
}

function initializeMap() {
    if (!restaurantsMap) return;
    
    map = L.map('restaurantsMap').setView([36.5, 127.5], 7); // Center on South Korea
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add user location marker
    userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
            className: 'user-location-marker',
            html: '<div style="background-color: #e74c3c; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20]
        })
    }).addTo(map).bindPopup('현재 위치').openPopup();
}

function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add restaurant markers
    filteredRestaurants.forEach(restaurant => {
        const marker = L.marker([restaurant.latitude, restaurant.longitude], {
            icon: L.divIcon({
                className: 'restaurant-marker',
                html: `<div style="background-color: ${restaurant.isOpen ? '#2ecc71' : '#e74c3c'}; 
                       width: 15px; height: 15px; border-radius: 50%; 
                       border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
                iconSize: [15, 15]
            })
        }).addTo(map).bindPopup(`
            <div class="map-popup">
                <strong>${restaurant.name}</strong><br>
                <small>${restaurant.city}</small><br>
                ⭐ ${restaurant.rating} (${restaurant.reviews})<br>
                ${restaurant.isOpen ? '🟢 영업 중' : '🔴 영업 종료'}<br>
                <button onclick="showRestaurantDetails(${restaurant.id})" 
                        style="margin-top: 5px; padding: 5px 10px; 
                               background: #e74c3c; color: white; 
                               border: none; border-radius: 3px; 
                               cursor: pointer; font-size: 12px;">
                    상세보기
                </button>
            </div>
        `);
        
        markers.push(marker);
    });
    
    // Adjust map bounds to show all markers
    if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map(m => m.getLatLng()));
        bounds.extend(userMarker.getLatLng());
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

function centerMapOnUser() {
    if (map && userMarker) {
        map.setView(userMarker.getLatLng(), 12);
        userMarker.openPopup();
    }
}

function showLoading(message = "로딩 중...") {
    loadingContainer.style.display = 'block';
    if (message) {
        loadingContainer.querySelector('p').textContent = message;
    }
}

function hideLoading() {
    loadingContainer.style.display = 'none';
}

function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions available globally
window.showRestaurantDetails = showRestaurantDetails;
window.orderFromRestaurant = orderFromRestaurant;
window.getDirections = getDirections;
window.callRestaurant = callRestaurant;