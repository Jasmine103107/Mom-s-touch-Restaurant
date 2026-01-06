// Add this to homepage.js
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // District filtering
    document.querySelectorAll('.district-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const district = this.getAttribute('data-district');
            alert(`Showing Mom's Touch locations in ${district}`);
            // In real app, this would filter the locations
        });
    });
    
    // Location tag clicks
    document.querySelectorAll('.location-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const location = this.textContent;
            alert(`Searching for Mom's Touch in ${location}`);
        });
    });
    
    // Store card click handler
    document.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', function() {
            const storeName = this.querySelector('.card-title').textContent;
            const address = this.querySelector('.card-cuisine').textContent;
            alert(`Selected: ${storeName}\nAddress: ${address}`);
            // Could open map or directions
        });
    });
});