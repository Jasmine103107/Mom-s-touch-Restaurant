// Countries data with flag emojis
const countries = [
    { id: "india", name: "Indian", count: 57, flag: "🇮🇳" },
    { id: "china", name: "Chinese", count: 45, flag: "🇨🇳" },
    { id: "korea", name: "Korean", count: 38, flag: "🇰🇷" },
    { id: "japan", name: "Japanese", count: 52, flag: "🇯🇵" },
    { id: "thai", name: "Thai", count: 41, flag: "🇹🇭" },
    { id: "vietnam", name: "Vietnamese", count: 36, flag: "🇻🇳" },
    { id: "philippines", name: "Filipino", count: 34, flag: "🇵🇭" },
    { id: "usa", name: "American", count: 47, flag: "🇺🇸" },
    { id: "arabic", name: "Arabic", count: 39, flag: "🇸🇦" },
    { id: "germany", name: "German", count: 32, flag: "🇩🇪" },
    { id: "italian", name: "Italian", count: 43, flag: "🇮🇹" },
    { id: "mexico", name: "Mexican", count: 35, flag: "🇲🇽" }
];

// Generate extensive menu data (300+ dishes)
const menuData = generateMenuData();

// Cart state
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let filteredData = [...menuData];
let currentPage = 1;
const itemsPerPage = 9; // 3 per row × 3 rows

// DOM Elements (will be assigned after DOM is ready)
let menuGrid, cartCountElement, itemsCountElement, searchInput, sortSelect,
    minPriceInput, maxPriceInput, priceMinDisplay, priceMaxDisplay,
    rangeMin, rangeMax, countriesFilter, vegOnlyCheckbox, nonVegOnlyCheckbox,
    spicyOnlyCheckbox, popularOnlyCheckbox, applyFiltersBtn, clearAllFiltersBtn,
    cartBtn, closeCartBtn, cartSidebar, cartItems, toast, loadingSkeleton;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Assign DOM elements now that DOM is ready
    menuGrid = document.getElementById('menuGrid');
    cartCountElement = document.getElementById('cartCount');
    itemsCountElement = document.getElementById('itemsCount');
    searchInput = document.getElementById('searchInput');
    sortSelect = document.getElementById('sortSelect');
    minPriceInput = document.getElementById('minPrice');
    maxPriceInput = document.getElementById('maxPrice');
    priceMinDisplay = document.getElementById('priceMinDisplay');
    priceMaxDisplay = document.getElementById('priceMaxDisplay');
    rangeMin = document.getElementById('rangeMin');
    rangeMax = document.getElementById('rangeMax');
    countriesFilter = document.getElementById('countriesFilter');
    vegOnlyCheckbox = document.getElementById('vegOnly');
    nonVegOnlyCheckbox = document.getElementById('nonVegOnly');
    spicyOnlyCheckbox = document.getElementById('spicyOnly');
    popularOnlyCheckbox = document.getElementById('popularOnly');
    applyFiltersBtn = document.getElementById('applyFilters');
    clearAllFiltersBtn = document.getElementById('clearAllFilters');
    cartBtn = document.getElementById('cartBtn');
    closeCartBtn = document.getElementById('closeCart');
    cartSidebar = document.getElementById('cartSidebar');
    cartItems = document.getElementById('cartItems');
    toast = document.getElementById('toast');
    loadingSkeleton = document.getElementById('loadingSkeleton');

    initCountriesFilter();
    initPriceRange();
    setupEventListeners();
    showLoadingSkeleton();
    
    // Simulate loading delay
    setTimeout(() => {
        renderMenuGrid();
        hideLoadingSkeleton();
        updateCartCount();
    }, 800);
});

// Generate menu data function
function generateMenuData() {
    const data = [];
    let id = 1;

    // Korean dishes (38)
    const koreanDishes = [
        { name: "Kimchi Jjigae", price: 329, description: "Spicy kimchi stew with pork and tofu", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://gastroplant.com/wp-content/uploads/2019/11/1910_Vegan-Kimchi-Jjigae_550.jpg" },
        { name: "Bibimbap", price: 379, description: "Mixed rice bowl with vegetables and meat", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://iheartumami.com/wp-content/uploads/2025/09/Bulgogi-bibimbap.jpg" },
        { name: "Bulgogi", price: 429, description: "Marinated grilled beef", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://static01.nyt.com/images/2023/11/14/multimedia/JM-Bulgogi-qmfj/JM-Bulgogi-qmfj-mediumSquareAt3X.jpg" },
        { name: "Tteokbokki", price: 279, description: "Spicy rice cakes", rating: 4.5, veg: true, spicy: true, popular: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWwTI3vWJf54E8S_Cbr-nkKj3VAu6kja1rQ&s" },
        { name: "Korean BBQ Set", price: 4599, description: "Assorted grilled meats", rating: 4.9, veg: false, spicy: false, popular: true, image: "https://images.squarespace-cdn.com/content/5a66bab790bccef0ed81cc64/1584844830813-8RRA2QI8O63MB29SNZ2Z/IMG_2660.jpg" },
        { name: "Dakgangjeong", price: 499, description: "Glazed fried chicken", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://aaronandclaire.com/wp-content/uploads/2024/11/Korean-Fried-Chicken-Dakgangjeong-3-1-1024x576.jpg" },
        { name: "Hotteok", price: 349, description: "Sweet Korean pancake", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://nombeah.com/wp-content/uploads/2025/05/Hottoek-korean-pancake-06.jpg" },
        { name: "Bungeoppang", price: 390, description: "Fish-shaped pastry with red bean", rating: 4.4, veg: true, spicy: false, popular: true, image: "https://kimchimari.com/wp-content/uploads/2019/03/quick-bungeoppang-10-min.jpg" },
        { name: "Odeng/Eomuk", price: 4568, description: "Fish cake soup", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://futuredish.com/wp-content/uploads/2022/03/Eomuk-Tang.jpg" },
        { name: "Japchae", price: 550, description: "Stir-fried glass noodles", rating: 4.9, veg: true, spicy: true, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSphARhGTCd7ic8CPZbvI-TZrTsReFOIRGAdg&s" },
        { name: "Korean Corn Dogs", price: 929, description: "Sweet and savory corn dogs", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://c.ndtvimg.com/2024-07/1o2shaio_korean-corndogs-_625x300_18_July_24.jpeg" },
        { name: "Mandu", price: 629, description: "Korean dumplings", rating: 4.5, veg: true, spicy: true, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvH0UnPe78ElePh6ZW6DpOHlbM0iI7pa2Vew&s" },
        { name: "Sundubu Jjigae", price: 759, description: "Soft tofu stew", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://omnivorescookbook.com/wp-content/uploads/2020/09/200806_Soondubu-Jjigae_800.jpg" },
        { name: "Samgyeopsal", price: 3599, description: "Korean pork belly BBQ", rating: 4.9, veg: false, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMQqTb_f4cewEnKwufDw8Gjc_90jcHas68eA&s" }
    ];
    
    koreanDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "korea"
        });
    });
    
    
    // Chinese dishes (45)
    const chineseDishes = [
        { name: "Kung Pao Chicken", price: 367, description: "Spicy stir-fried chicken with peanuts", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-1200x1480.jpg" },
        { name: "Dim Sum Platter", price: 599, description: "Assorted steamed dumplings", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzphsvSOyjjeqR0HmyZK8_JZS7LefC1f08Bw&s" },
        { name: "Spring Rolls", price: 279, description: "Crispy vegetable rolls", rating: 4.1, veg: true, spicy: false, popular: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHHWz3s3JAZD3kJbuKjHYR7GJzahghajsLA&s" },
        { name: "Fried Rice", price: 359, description: "Chinese style fried rice", rating: 4.2, veg: true, spicy: false, popular: true, image: "https://lifemadesweeter.com/wp-content/uploads/The-Best-Easy-Egg-Fried-Rice-Recipe-Gluten-Free.jpg" },
        { name: "Hot Pot", price: 4999, description: "Cook raw ingredients in boiling broth", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://omnivorescookbook.com/wp-content/uploads/2018/12/230102_Hot-Pot-Guide_550.jpg" },
        { name: "Peking duck", price: 1699, description: "Crispy roasted duck", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://anislandchef.com/wp-content/uploads/2022/02/Roast-Cantonese-Duck-2022.jpg" },
        { name: "Mapo tofu", price: 529, description: "Spicy Sichuan tofu dish", rating: 4.0, veg: false, spicy: true, popular: true, image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2F2023-05-mapo-tofu%2Fmapo-tofu-017" },
        { name: "Char siu", price: 609, description: "Cantonese BBQ Pork", rating: 4.3, veg: false, spicy: true, popular: true, image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/char_siu_pork_belly_56622_16x9.jpg" },
        { name: "Chow mein", price: 379, description: "Stir-fried noodles with vegetables", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://www.thebewitchinkitchen.com/wp-content/uploads/2023/03/beef-chow-mein-scaled.jpg" },
        { name: "Sweet and sour pork", price: 399, description: "Crispy pork in tangy sauce", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAbyFsXaHjStF0m6w1QTnXemtZgij04FxFkA&s" },
        { name: "Dumplings", price: 299, description: "Steamed stuffed parcels", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/pork_prawn_dumplings_19100_16x9.jpg" },
        { name: "Wonton Soup", price: 289, description: "Dumplings in clear broth", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://iamhomesteader.com/wp-content/uploads/2022/03/wonton-soup-1.jpg" },
        { name: "Shanghai pork", price: 389, description: "Braised pork belly", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://images.squarespace-cdn.com/content/v1/5d200a5be7d54200012d28f0/1590255364505-Y30QWRZ7KKTE9UCDGX62/Braised-Pork-Belly" },
        { name: "Xiao long bao", price: 365, description: "Soup dumplings", rating: 4.3, veg: false, spicy: true, popular: true, image: "https://i0.wp.com/peopleasia.ph/wp-content/uploads/2022/10/paradise-dynasty.jpg" },
        { name: "Hunan chicken", price: 399, description: "Spicy chicken with vegetables", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://simplyhomecooked.com/wp-content/uploads/2022/10/Hunan-chicken-recipe-2.jpg" },
        { name: "Sichuan noodles", price: 369, description: "Numbing-spicy noodles", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://www.seriouseats.com/thmb/EmF0ZsWi5P8_yzjQxtw-zh4_pEk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__10__20191022-fuchsia-dunlop-sichuan-cooking-shoot-vicky-wasik-beef-8-32cfddbdfdfe49afa8f5b65aeafbabd8.jpg" },
        { name: "Chinese Chili Oil", price: 209, description: "Spicy Sichuan oil", rating: 4.6, veg: true, spicy: true, popular: true, image: "https://thisishowicook.com/wp-content/uploads/2023/01/chinese-chili-oil-7-of-22-scaled.jpg" },
        { name: "Zhajiangmian", price: 399, description: "Noodles with soybean paste", rating: 4.3, veg: false, spicy: true, popular: true, image: "https://images.squarespace-cdn.com/content/v1/5d2809fea1ce850001cabece/1622354566268-DSGRXSB0OGH4MMRBA9J8/IMG_3579.JPG" }
    ];
    
    chineseDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "china"
        });
    });
    
    
    // Japanese dishes (52)
    const japaneseDishes = [
        { name: "Sushi Platter", price: 3999, description: "Assorted sushi with salmon and tuna", rating: 4.9, veg: false, spicy: false, popular: true, image: "https://sushiincorporated.com/wp-content/uploads/2025/02/Screenshot-2025-02-21-163817.jpg" },
        { name: "Ramen", price: 549, description: "Japanese noodle soup with pork and egg", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://images.themodernproper.com/production/posts/2022/EasyCurryRamen-_7.jpg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1747762318&s=49ae97198eec8aa953d13e0566310fc5" },
        { name: "Tempura", price: 2999, description: "Deep-fried seafood and vegetables", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop" },
        { name: "Teriyaki Chicken", price: 379, description: "Grilled chicken with teriyaki sauce", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" },
        { name: "Udon Noodles", price: 329, description: "Thick wheat noodles in broth", rating: 4.4, veg: true, spicy: false, popular: false, image: "https://tyberrymuch.com/wp-content/uploads/2022/04/vegan-sesame-yaki-udon-noodles-recipe-500x500.jpg" },
        { name: "Sashimi", price: 4599, description: "Fresh raw fish slices", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://int.japanesetaste.com/cdn/shop/articles/Assorted_4_kinds_of_sashimi_bigeye_tuna_yellowtail_sea_bream_scallop_e6c19bfd-aeb9-4ca2-9767-cf1e1b3bdef5.jpg?v=1759899678&width=600" },
        { name: "Miso Soup", price: 489, description: "Traditional Japanese soup", rating: 4.3, veg: true, spicy: false, popular: true, image: "https://makeitdairyfree.com/wp-content/uploads/2023/05/red-miso-soup-2.jpg" },
        { name: "Takoyaki", price: 759, description: "Octopus balls", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://s.hungryghostfoodandtravel.com/media/20240912224148/takoyaki-recipe_done.png" },
        { name: "Okonomiyaki", price: 859, description: "Japanese savory pancake", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://www.healthyfood.com/wp-content/uploads/2022/08/Chicken-noodle-okonomiyaki.jpg" },
        { name: "Yakitori", price: 979, description: "Grilled chicken skewers", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://d21klxpge3tttg.cloudfront.net/wp-content/uploads/2012/01/spark-grill-yakitori_05.jpg" },
        { name: "Donburi", price: 539, description: "Rice bowl with toppings", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjEVMPSEG7tP4sZgS_boos4jc8a4HqVmxfZg&s" },
        { name: "Tonkatsu", price: 429, description: "Breaded pork cutlet", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://www.seriouseats.com/thmb/HDqcye0uVz0epNLTqD3g2hCJr60=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250312PorkTonkatsu-FredHardy-08-26a58d83d15845d998763548d6b4f796.jpg" }
    ];

    
    japaneseDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "japan"
        });
    });
    
    // Thai dishes (41)
    const thaiDishes = [
        { name: "Pad Thai (ผัดไทย)", price: 369, description: "Stir-fried rice noodles with shrimp and peanuts", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://thai-foodie.com/wp-content/uploads/2025/09/beef-pad-thai.jpg" },
        { name: "Green Curry (แกงเขียวหวาน)", price: 579, description: "Coconut milk curry with chicken and vegetables", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34DjYPCunVAI2VMukmkLxbYOVhz8H8zD5Cg&s" },
        { name: "Tom Yum Soup (ต้มยำกุ้ง)", price: 3589, description: "Hot and sour shrimp soup", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/grit/italy/calcmenu/recipes/IT-recipes/%E0%B8%95%E0%B9%89%E0%B8%A1%E0%B8%A2%E0%B8%B3%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87/LINE-ALBUM-Images%20for%20website-250424-header.jpg" },
        { name: "Massaman Curry", price: 349, description: "Rich peanut and potato curry", rating: 4.5, veg: true, spicy: false, popular: false, image: "https://spicecravings.com/wp-content/uploads/2018/05/Thai-Massaman-Curry-Featured.jpg" },
        { name: "Mango Sticky Rice", price: 299, description: "Sweet mango with coconut rice", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://www.chenabgourmet.com/wp-content/uploads/2024/02/sticky-rice-with-mango-recipe.jpg" },
        { name: "Som Tum", price: 699, description: "Green papaya salad", rating: 4.6, veg: true, spicy: true, popular: true, image: "https://ianbenites.com/wp-content/uploads/2021/05/20210511_183402-1.jpg" },
        { name: "Pad See Ew", price: 319, description: "Stir-fried wide rice noodles", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://christieathome.com/wp-content/uploads/2023/12/pad-see-ew-4.jpg" },
        { name: "Tom Kha Gai", price: 499, description: "Coconut chicken soup", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://thai-foodie.com/wp-content/uploads/2024/09/tom-kha-gai-redo.jpg" },
        { name: "Satay", price: 999, description: "Grilled meat skewers with peanut sauce", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://static01.nyt.com/images/2025/02/13/multimedia/ND-Chicken-Satay-qbkg/ND-Chicken-Satay-qbkg-videoSixteenByNineJumbo1600.jpg" },
        { name: "Khao Soi", price: 769, description: "Northern Thai coconut curry noodle soup", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://hot-thai-kitchen.com/wp-content/uploads/2023/05/1-3.jpg" }
    ];

    thaiDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "thai"
        });
    });
    
    // Vietnamese dishes (36)
    const vietnameseDishes = [
        { name: "Pho", price: 899, description: "Traditional Vietnamese noodle soup", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2025_03/2089648/nini-nguyen-everything-pho-2x1-zz-250116.jpg" },
        { name: "Banh Mi", price: 238, description: "Vietnamese sandwich with meat and vegetables", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://fullforlife.com/wp-content/uploads/2024/11/Easy-Vietnamese-Chicken-Banh-Mi-1.jpg" },
        { name: "Goi Cuon", price: 469, description: "Fresh spring rolls", rating: 4.3, veg: true, spicy: false, popular: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzjChKdNFqymMpqsKWOn96UhHn7zugcWZyg&s" },
        { name: "Bun Cha", price: 629, description: "Grilled pork with noodles", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://www.seriouseats.com/thmb/J0g7JWjk9r6CHESo1CIrD1BfGd0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231204-SEA-VyTran-BunChaHanoi-19-f623913c6ef34a9185bcd6e5680c545f.jpg" },
        { name: "Com Tam", price: 1689, description: "Broken rice with grilled meat", rating: 4.4, veg: false, spicy: false, popular: false, image: "https://vietnamluxuryexpress.com/wp-content/uploads/2025/11/com-tam-146-1.jpg" },
        { name: "Bun Bo Hue", price: 349, description: "Spicy beef noodle soup", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://www.marionskitchen.com/wp-content/uploads/2021/09/Bun-Bo-Hue8627-1200x900.jpg" },
        { name: "Banh Xeo", price: 629, description: "Vietnamese sizzling pancake", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://vietnamnomad.com/wp-content/uploads/2022/07/Banh-Xeo-A-guide-to-Vietnamese-Pancakes-Vietnamnomad.jpg" },
        { name: "Mi Quang", price: 799, description: "Turmeric noodles with pork and shrimp", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://feedthepudge.com/wp-content/uploads/2024/01/DSC02490-scaled.jpg" },
        { name: "Cha Ca", price: 399, description: "Turmeric fish with dill", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://www.marionskitchen.com/wp-content/uploads/2019/07/Vietnamese-Turmeric-Dill-Fish-%E2%80%98Cha-Ca%E2%80%993.jpg" },
        { name: "Banh Cuon", price: 249, description: "Steamed rice rolls", rating: 4.4, veg: false, spicy: false, popular: true, image: "https://feedthepudge.com/wp-content/uploads/2025/02/Banh-Cuon-Cover-.webp" }
    ];
    
    vietnameseDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "vietnam"
        });
    });
    
    // Filipino dishes (34)
    const filipinoDishes = [
        { name: "Adobo", price: 319, description: "Chicken marinated in vinegar and soy sauce", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2024-04-filipino-adobo%2Ffilipino-adobo-426" },
        { name: "Sinigang", price: 349, description: "Sour tamarind soup with pork and vegetables", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/442ce059c4c490e1ab61cdaef9c98511.jpg.webp" },
        { name: "Lechon", price: 4999, description: "Roast suckling pig", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://www.thefooddictator.com/wp-content/uploads/2019/01/cebulechon.jpg" },
        { name: "Pancit", price: 579, description: "Filipino noodles", rating: 4.3, veg: true, spicy: false, popular: false, image: "https://www.billyparisi.com/wp-content/uploads/2025/04/pancit-2.jpg" },
        { name: "Halo-Halo", price: 289, description: "Mixed dessert with shaved ice", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://www.foodandwine.com/thmb/oybMSWdgpwqYxBW9EFSdIUmf57U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/halo-halo-FT-RECIPE0924-28931a658de3439d9719f83d5a6dfc2c.jpeg" },
        { name: "Kare-Kare", price: 429, description: "Oxtail and peanut stew", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_0auPVhIYfPHAlwvU-XQZhuT2M_NqhqfXxg&s" },
        { name: "Sisig", price: 599, description: "Sizzling pork dish", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://www.unileverfoodsolutions.com.ph/dam/global-ufs/mcos/SEA/calcmenu/recipes/PH-recipes/appetisers/sizzling-pork-sisig-manila/sizzling-pork-sisig-manila-main.jpg" },
        { name: "Lumpia", price: 289, description: "Filipino spring rolls", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://www.allrecipes.com/thmb/ndOxfSY8xgiuTmuoHbunghG88AA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/35151-traditional-filipino-lumpia-ddmfs-hero-3x4-0744-6a66461864c9437da74828a882f2c42a.jpg" },
        { name: "Tapsilog", price: 659, description: "Beef tapa with garlic rice and egg", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://images.yummy.ph/yummy/uploads/2018/01/best-tapa-ever-1.jpg" },
        { name: "Bicol Express", price: 749, description: "Spicy pork in coconut milk", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://www.thepeachkitchen.com/wp-content/uploads/2025/10/Sigarilyas-Bicol-Express2.png" }
    ];
    
    filipinoDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "philippines"
        });
    });
    
    // American dishes (47)
    const americanDishes = [
        { name: "Cheeseburger", price: 629, description: "Classic beef burger with cheese and fries", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://www.recipetineats.com/tachyon/2022/08/Stack-of-cheeseburgers.jpg" },
        { name: "BBQ Ribs", price: 3999, description: "Slow-cooked pork ribs with BBQ sauce", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://www.daringgourmet.com/wp-content/uploads/2024/04/Barbecue-Ribs-Recipe-7.jpg" },
        { name: "Buffalo Wings", price: 979, description: "Spicy chicken wings", rating: 4.5, veg: false, spicy: true, popular: false, image: "https://www.livinglou.com/wp-content/uploads/2017/01/buffalo-honey-chicken-wings.jpg" },
        { name: "Club Sandwich", price: 859, description: "Triple layer sandwich", rating: 4.3, veg: false, spicy: false, popular: true, image: "https://www.dukeshill.co.uk/cdn/shop/articles/20240725081844-chicken-20bacon-20club-20sandwich-20main-20landscape_1024x1024.jpg?v=1763654400" },
        { name: "Mac & Cheese", price: 779, description: "Creamy macaroni and cheese", rating: 4.2, veg: true, spicy: false, popular: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-Zcf_Bflc8T8-SmT_VkuqgrPzouv2jjTAQ&s" },
        { name: "Hot Dog", price: 459, description: "Classic American hot dog", rating: 4.4, veg: false, spicy: false, popular: true, image: "https://www.belbrandsfoodservice.com/wp-content/uploads/2018/05/recipe-desktop-merkts-cheesy-hot-dawg.jpg" },
        { name: "Steak", price: 1999, description: "Grilled beef steak", rating: 4.9, veg: false, spicy: false, popular: true, image: "https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg" },
        { name: "Pulled Pork Sandwich", price: 649, description: "Slow-cooked pork in BBQ sauce", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://www.chelseasmessyapron.com/wp-content/uploads/2020/07/Pulled-Pork-Sandwich-Recipe-ChelseasMessyApron-1200-1.jpg" },
        { name: "Caesar Salad", price: 1289, description: "Romaine lettuce with Caesar dressing", rating: 4.3, veg: false, spicy: false, popular: true, image: "https://static01.nyt.com/images/2024/09/10/multimedia/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb/JG-Parmesan-Crusted-Salmon-Caesar-Saladrex-kjpb-mediumSquareAt3X.jpg" },
        { name: "Apple Pie", price: 1529, description: "Classic American dessert", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://www.southernliving.com/thmb/bbDY1d_ySIrCFcq8WNBkR-3x6pU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2589601_Mailb_Mailbox_Apple_Pie_003-da802ff7a8984b2fa9aa0535997ab246.jpg" }
    ];
    
    americanDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "usa"
        });
    });
    
    // Arabic dishes (39)
    const arabicDishes = [
        { name: "Shawarma Platter", price: 3599, description: "Grilled meat served with rice and salad", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://urbanfarmandkitchen.com/wp-content/uploads/2024/01/chicken-shawarma-8.jpg" },
        { name: "Hummus with Pita", price: 985, description: "Chickpea dip with fresh pita bread", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/10/Hummus-8.jpg" },
        { name: "Falafel", price: 995, description: "Deep-fried chickpea balls", rating: 4.4, veg: true, spicy: false, popular: true, image: "https://lifeisnoyoke.com/wp-content/uploads/2023/01/falafel-2.jpg" },
        { name: "Baklava", price: 823, description: "Sweet pastry with nuts", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://thebaklavabox.com/cdn/shop/files/assorted-chocolate-turkish-baklava-750gms-549891.jpg?v=1745430652" },
        { name: "Mandi Rice", price: 4999, description: "Fragrant rice with lamb", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoM9DFqfqRKLA8FWssgt1F7aY8HQis9EWaHg&s" },
        { name: "Kabsa", price: 3599, description: "Spiced rice with chicken", rating: 4.7, veg: false, spicy: true, popular: true, image: "https://butfirstchai.com/wp-content/uploads/2019/05/chicken-kabsa-rice-recipe-post.jpg" },
        { name: "Fattoush", price: 549, description: "Levantine bread salad", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://ca-times.brightspotcdn.com/dims4/default/87cfb40/2147483647/strip/true/crop/2843x1777+0+59/resize/1200x750!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F2c%2F160379e74d308c8e18ad544fafca%2F2435098-fo-studioshoot12-ac.jpg" },
        { name: "Tabbouleh", price: 310, description: "Parsley and bulgur salad", rating: 4.4, veg: true, spicy: false, popular: true, image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/tk%2Fphoto%2F2025%2F07-2025%2F2025-07-tabbouleh%2Ftabbouleh-168" },
        { name: "Mansaf", price: 4995, description: "Lamb with fermented dried yogurt", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShdzmTNbeSGuUHCtEZ_SrUr2jR8coUMX8QLQ&s" },
        { name: "Kunafa", price: 559, description: "Sweet cheese pastry", rating: 4.9, veg: true, spicy: false, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-AJkib6dVPvHjf_b6YXxIj1DZA3vGC2TGMg&s" }
    ];
    
    arabicDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "arabic"
        });
    });
    
    // German dishes (32)
    const germanDishes = [
        { name: "Bratwurst", price: 999, description: "German sausage served with sauerkraut", rating: 4.5, veg: false, spicy: false, popular: true, image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/8/bratwurst%20on%20plate.jpg.rend.hgtvcom.476.340.85.suffix/1691431280636.webp" },
        { name: "Schnitzel", price: 1199, description: "Breaded pork cutlet with potato salad", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://thestayathomechef.com/wp-content/uploads/2024/04/Authentic-German-Schnitzel_Square-2.jpg" },
        { name: "Pretzel", price: 749, description: "Soft baked pretzel", rating: 4.3, veg: true, spicy: false, popular: true, image: "https://sugarspunrun.com/wp-content/uploads/2023/11/Chocolate-covered-Pretzels-1-of-1.jpg" },
        { name: "Sauerbraten", price: 799, description: "Marinated roast beef", rating: 4.7, veg: false, spicy: false, popular: false, image: "https://cdn.tasteatlas.com/images/dishes/79dceb1607db46a7af6a42e2f84417a9.jpg?m=facebook" },
        { name: "Black Forest Cake", price: 2999, description: "Chocolate cherry cake", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://www.fnp.com/images/pr/l/v20250612185111/black-forest-cake_1.jpg" },
        { name: "Sauerkraut", price: 889, description: "Fermented cabbage", rating: 4.2, veg: true, spicy: false, popular: true, image: "https://www.olgasflavorfactory.com/wp-content/uploads/2018/12/Homemade-Sauerkraut-3.jpg" },
        { name: "Spätzle", price: 999, description: "German egg noodles", rating: 4.6, veg: true, spicy: false, popular: true, image: "https://tarasmulticulturaltable.com/wp-content/uploads/2023/11/Homemade-Spatzle-Kasespatzle-1-of-1.jpg" },
        { name: "Currywurst", price: 1289, description: "Sausage with curry ketchup", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://spicebreeze.com/wp-content/uploads/2018/09/Currywurst-sq.jpg" },
        { name: "Rouladen", price: 879, description: "Beef rolls with bacon and pickles", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://www.acanadianfoodie.com/wp-content/uploads/2017/03/3-Rouladen-Spaetzle-Braised-Cabbage-and-Cucumber-2017.jpg" },
        { name: "Apple Strudel", price: 799, description: "Apple filled pastry", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://stressbaking.com/wp-content/uploads/2021/08/apple-strudel-1-3-500x375.jpg" }
    ];
    
    germanDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "germany"
        });
    });
    
    // Italian dishes (43)
    const italianDishes = [
        { name: "Margherita Pizza", price: 599, description: "Classic pizza with tomato and mozzarella", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg" },
        { name: "Spaghetti Carbonara", price: 679, description: "Pasta with eggs, cheese, and pancetta", rating: 4.7, veg: false, spicy: false, popular: true, image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg" },
        { name: "Lasagna", price: 899, description: "Layered pasta with meat and cheese", rating: 4.9, veg: false, spicy: false, popular: true, image: "https://www.tasteofhome.com/wp-content/uploads/2025/07/Best-Lasagna_EXPS_ATBBZ25_36333_DR_07_01_2b.jpg" },
        { name: "Risotto", price: 499, description: "Creamy Italian rice dish", rating: 4.6, veg: true, spicy: false, popular: true, image: "https://static01.nyt.com/images/2025/02/25/multimedia/Lobster-Risotto-cftz/Lobster-Risotto-cftz-mediumSquareAt3X.jpg" },
        { name: "Fettuccine Alfredo", price: 889, description: "Pasta with creamy Parmesan sauce", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://midwestfoodieblog.com/wp-content/uploads/2023/07/chicken-alfredo-1-4.jpg" },
        { name: "Tiramisu", price: 599, description: "Coffee-flavored Italian dessert", rating: 4.9, veg: true, spicy: false, popular: true, image: "https://www.micheldumas.com/wp-content/uploads/2025/05/tiramisu1-ezgif.com-jpg-to-webp-converter-1-1.webp" },
        { name: "Bruschetta", price: 649, description: "Toasted bread with tomato topping", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://www.simplyorganic.com/media/recipe/resized/520x520/wysiwyg/tmp/simply-oragnic-Roasted-Tomato-Bruschetta-1080x1080-thumbnail.jpg" },
        { name: "Minestrone Soup", price: 779, description: "Italian vegetable soup", rating: 4.4, veg: true, spicy: false, popular: true, image: "https://centslessdeals.com/wp-content/uploads/2022/02/Minestrone-Soup-Recipe-TheShortcutKitchen-1.jpeg" },
        { name: "Osso Buco", price: 599, description: "Braised veal shanks", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://www.foodandwine.com/thmb/Bab6Sn1SNxSwYUfjGL04ioXHQ6A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/osso-buco-FT-RECIPE0921-6a8ec84d5faa4bda909e0cb223049d93.jpeg" },
        { name: "Gelato", price: 699, description: "Italian ice cream", rating: 4.9, veg: true, spicy: false, popular: true, image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Strawberry-Gelato_EXPS_TOHAM25_212175_P2_MD_04_18_7b.jpg" }
    ];
    
    italianDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "italian"
        });
    });
    
    // Mexican dishes (35)
    const mexicanDishes = [
        { name: "Tacos Al Pastor", price: 869, description: "Marinated pork tacos with pineapple", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg" },
        { name: "Burrito Bowl", price: 929, description: "Rice bowl with Mexican toppings", rating: 4.3, veg: true, spicy: true, popular: false, image: "https://eatthegains.com/wp-content/uploads/2019/09/Chicken-Burrito-Bowl-15.jpg" },
        { name: "Quesadilla", price: 879, description: "Cheese filled tortilla", rating: 4.2, veg: false, spicy: false, popular: false, image: "https://www.simplyrecipes.com/thmb/YXIrmsOBXh5Cc5MAiBJgTaYO_0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Quesadilla-LEAD-1-b8e325610a7c46e1b6b6c2208d7ed4ee.jpg" },
        { name: "Nachos Supreme", price: 599, description: "Loaded nachos with toppings", rating: 4.6, veg: true, spicy: true, popular: true, image: "https://www.cravingsomecreativity.com/wp-content/uploads/2015/09/Chicken-Nachos-Closeup.jpg" },
        { name: "Churros", price: 489, description: "Fried dough with cinnamon sugar", rating: 4.8, veg: true, spicy: false, popular: true, image: "https://assets.bonappetit.com/photos/58ff5f162278cd3dbd2c069c/1:1/w_2560%2Cc_limit/churros.jpg" },
        { name: "Guacamole", price: 519, description: "Avocado dip", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://www.giallozafferano.com/images/255-25549/Guacamole_1200x800.jpg" },
        { name: "Enchiladas", price: 399, description: "Corn tortillas rolled around filling", rating: 4.5, veg: false, spicy: true, popular: true, image: "https://thecookingjar.com/wp-content/uploads/2024/02/beef-enchiladas-7.jpg" },
        { name: "Fajitas", price: 359, description: "Sizzling meat and vegetables", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://sharkninja-sfcc-prod-res.cloudinary.com/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.0,f_auto,g_north,h_400,q_auto,w_400/c_pad,h_400,w_400/v1/recipes/Steak-Fajitas-And-Vegetable-Fajitas?pgw=1&_i=AG" },
        { name: "Tamales", price: 479, description: "Steamed corn dough with filling", rating: 4.4, veg: false, spicy: false, popular: true, image: "https://keviniscooking.com/wp-content/uploads/2023/08/Pork-Tamales-Rojos-sauce.jpg" },
        { name: "Horchata", price: 249, description: "Rice milk drink", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://www.howtocook.recipes/wp-content/uploads/2022/01/Horchata-recipe-500x500.jpg" }
    ];
    
    mexicanDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "mexico"
        });
    });

    // Indian dishes (57)
    const indianDishes = [
        { name: "Butter Chicken", price: 399, description: "Creamy tomato based curry with tender chicken pieces", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/chicken-butter-masala-recipe.jpg" },
        // { name: "Thali", price: 299, description: "Different types of food", rating: 4.6, veg: false, spicy: true, popular: true, image: "https://content.jdmagicbox.com/comp/vijayawada/b1/0866px866.x866.201019112920.i4b1/catalogue/bezawada-dhaba-benz-circle-vijayawada-restaurants-civw99xkrf-250.jpg" },
        { name: "Chicken Biryani", price: 599, description: "Fragrant rice with chicken and spices", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuWkqR087ENNtJpkaDYBJ5iZx7BeaUJXfjzA&s" },
        { name: "Veg Biryani", price: 279, description: "Aromatic rice with mixed vegetables", rating: 4.3, veg: true, spicy: true, popular: false, image: "https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg" },
        { name: "Samosa", price: 129, description: "Crispy pastry with potato filling", rating: 4.6, veg: true, spicy: false, popular: true, image: "https://recipes.timesofindia.com/thumb/61050397.cms?width=1200&height=900" },
        { name: "Chole Bhature", price: 249, description: "Spicy chickpeas with fried bread", rating: 4.5, veg: true, spicy: true, popular: true, image: "https://img-global.cpcdn.com/recipes/af659064546e485d/680x781cq80/chhole-bhature.jpg" },
        { name: "Rogan Josh", price: 379, description: "Kashmiri lamb curry", rating: 4.7, veg: false, spicy: true, popular: false, image: "https://burmawalakitchen.com/wp-content/uploads/2024/05/Mutton-Rogan-Josh-1-1.jpg" },
        { name: "Prawn Biryani", price: 409, description: "Prawns cooked with aromatic rice", rating: 4.4, veg: false, spicy: false, popular: true, image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Prawn-Biryani-Recipe.jpg" },
        { name: "Fish Fry", price: 349, description: "Crispy fried fish with spices", rating: 4.6, veg: false, spicy: true, popular: false, image: "https://i.ytimg.com/vi/o8lDCY2_jyw/maxresdefault.jpg" },
        { name: "Ragi Sankati with Mutton curry", price: 399, description: "Traditional Andhra meal", rating: 4.3, veg: false, spicy: true, popular: true, image: "https://sarigamagrand.com/wp-content/uploads/2023/11/SG-FM-098-1024x1024.webp" },
        { name: "Pani Puri", price: 99, description: "Street Food with tangy water", rating: 4.5, veg: true, spicy: true, popular: true, image: "https://www.sidechef.com/recipe/3883dffb-5fa2-4ee9-8054-d8de1409899f.jpg" },
        { name: "Masala Dosa", price: 189, description: "Crispy rice crepe with potato filling", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg" },
        { name: "Butter Paneer", price: 329, description: "Cottage cheese in spinach gravy", rating: 4.5, veg: true, spicy: false, popular: true, image: "https://www.eitanbernath.com/wp-content/uploads/2020/05/Butter-Paneer-1-4x5-LOW-RES-819x1024.jpeg" },
        { name: "Tandoori Chicken", price: 459, description: "Chicken marinated in yogurt and spices", rating: 4.8, veg: false, spicy: true, popular: true, image: "https://www.kitchensanctuary.com/wp-content/uploads/2025/07/Tandoori-Chicken-Square-FS.jpg" },
        { name: "Dal Makhani", price: 229, description: "Kidney beans with rice", rating: 4.4, veg: true, spicy: true, popular: true, image: "https://www.sharmispassions.com/wp-content/uploads/2012/05/dal-makhani7-500x500.jpg" },
        { name: "Chicken Curry", price: 159, description: "Rich chicken leg piece curry", rating: 4.6, veg: false, spicy: false, popular: true, image: "https://myfoodstory.com/wp-content/uploads/2020/10/Dhaba-Style-Chicken-Curry-2-500x500.jpg" },
        { name: "Malai Kofta", price: 369, description: "Cottage cheese balls in creamy gravy", rating: 4.7, veg: true, spicy: false, popular: true, image: "https://carveyourcraving.com/wp-content/uploads/2021/09/Best-Malai-Kofta-recipe.jpg" },
        { name: "Mutton Curry", price: 499, description: "Rich mutton curry with nuts", rating: 4.8, veg: false, spicy: false, popular: true, image: "https://images.immediate.co.uk/production/volatile/sites/30/2023/12/10-Best-mild-Indian-curry-recipes-4c46c30.jpg" },
        { name: "Idli Sambar", price: 149, description: "Steamed rice cakes with lentil soup", rating: 4.5, veg: true, spicy: true, popular: true, image: "https://shwetainthekitchen.com/wp-content/uploads/2022/01/Idli-Sambar.jpg" },
        { name: "Gulab Jamun", price: 129, description: "Sweet milk dumplings in sugar syrup", rating: 4.9, veg: true, spicy: false, popular: true, image: "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347420/india-food-gulab-jamun/india-food-gulab-jamun-1120x732.jpg" }
    ];

    
    indianDishes.forEach(dish => {
        data.push({
            id: id++,
            ...dish,
            country: "india"
        });
    });
    
    return data;
}

// Initialize countries filter
function initCountriesFilter() {
    countries.forEach(country => {
        const checkbox = document.createElement('label');
        checkbox.className = 'country-checkbox';
        checkbox.innerHTML = `
            <input type="checkbox" value="${country.id}">
            <span class="checkmark"></span>
            <span class="country-label">${country.flag} ${country.name}</span>
            <span class="country-count">(${country.count})</span>
        `;
        countriesFilter.appendChild(checkbox);
    });
}

// Initialize price range
function initPriceRange() {
    const minPrice = 0;
    const maxPrice = 5000;
    
    minPriceInput.value = minPrice;
    maxPriceInput.value = maxPrice;
    priceMinDisplay.textContent = minPrice;
    priceMaxDisplay.textContent = maxPrice;
    rangeMin.value = minPrice;
    rangeMax.value = maxPrice;
    
    rangeMin.max = maxPrice;
    rangeMax.min = minPrice;
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', debounce(applyFilters, 300));
    
    // Sort
    sortSelect.addEventListener('change', applyFilters);
    
    // Price inputs
    minPriceInput.addEventListener('input', updatePriceRange);
    maxPriceInput.addEventListener('input', updatePriceRange);
    rangeMin.addEventListener('input', updatePriceFromSlider);
    rangeMax.addEventListener('input', updatePriceFromSlider);
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', applyFilters);
    clearAllFiltersBtn.addEventListener('click', clearAllFilters);
    
    // Dietary filters
    vegOnlyCheckbox.addEventListener('change', applyFilters);
    nonVegOnlyCheckbox.addEventListener('change', applyFilters);
    spicyOnlyCheckbox.addEventListener('change', applyFilters);
    popularOnlyCheckbox.addEventListener('change', applyFilters);
    
    // Countries filter
    countriesFilter.addEventListener('change', applyFilters);
    
    // Cart
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.view-btn').classList.add('active');
            const view = e.target.closest('.view-btn').dataset.view;
            changeView(view);
        });
    });
}

// Update price range from sliders
function updatePriceFromSlider() {
    const minValue = parseInt(rangeMin.value);
    const maxValue = parseInt(rangeMax.value);
    
    // Prevent crossing
    if (minValue > maxValue) {
        rangeMin.value = maxValue;
        minPriceInput.value = maxValue;
        priceMinDisplay.textContent = maxValue;
    } else {
        minPriceInput.value = minValue;
        priceMinDisplay.textContent = minValue;
    }
    
    if (maxValue < minValue) {
        rangeMax.value = minValue;
        maxPriceInput.value = minValue;
        priceMaxDisplay.textContent = minValue;
    } else {
        maxPriceInput.value = maxValue;
        priceMaxDisplay.textContent = maxValue;
    }
    
    applyFilters();
}

// Update price range from inputs
function updatePriceRange() {
    let minValue = parseInt(minPriceInput.value) || 0;
    let maxValue = parseInt(maxPriceInput.value) || 5000;
    
    // Clamp values
    minValue = Math.max(0, Math.min(5000, minValue));
    maxValue = Math.max(0, Math.min(5000, maxValue));
    
    minPriceInput.value = minValue;
    maxPriceInput.value = maxValue;
    rangeMin.value = minValue;
    rangeMax.value = maxValue;
    priceMinDisplay.textContent = minValue;
    priceMaxDisplay.textContent = maxValue;
    
    applyFilters();
}

// Apply all filters
function applyFilters() {
    currentPage = 1;
    
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;
    const minPrice = parseInt(minPriceInput.value) || 0;
    const maxPrice = parseInt(maxPriceInput.value) || 5000;
    
    // Get selected countries
    const selectedCountries = Array.from(
        countriesFilter.querySelectorAll('input:checked')
    ).map(cb => cb.value);
    
    // Get dietary filters
    const vegetarian = vegOnlyCheckbox.checked;
    const nonVeg = nonVegOnlyCheckbox.checked;
    const spicy = spicyOnlyCheckbox.checked;
    const popular = popularOnlyCheckbox.checked;
    
    // Filter data
    filteredData = menuData.filter(item => {
        // Search filter
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);
        
        // Country filter
        const matchesCountry = selectedCountries.length === 0 || 
            selectedCountries.includes(item.country);
        
        // Price filter
        const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
        
        // Dietary filters
        let matchesDietary = true;
        if (vegetarian && !item.veg) matchesDietary = false;
        if (nonVeg && item.veg) matchesDietary = false;
        if (spicy && !item.spicy) matchesDietary = false;
        if (popular && !item.popular) matchesDietary = false;
        
        return matchesSearch && matchesCountry && matchesPrice && matchesDietary;
    });
    
    // Sort data
    sortFilteredData(sortBy);
    
    // Update results count
    itemsCountElement.textContent = filteredData.length;
    
    // Render
    renderMenuGrid();
}

// Sort filtered data
function sortFilteredData(sortBy) {
    filteredData.sort((a, b) => {
        switch(sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            default: // 'popular'
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        }
    });
}

// Clear all filters
function clearAllFilters() {
    searchInput.value = '';
    sortSelect.value = 'popular';
    minPriceInput.value = 0;
    maxPriceInput.value = 5000;
    rangeMin.value = 0;
    rangeMax.value = 5000;
    priceMinDisplay.textContent = 0;
    priceMaxDisplay.textContent = 5000;
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset data
    filteredData = [...menuData];
    currentPage = 1;
    
    // Update UI
    itemsCountElement.textContent = filteredData.length;
    renderMenuGrid();
}

// Show loading skeleton
function showLoadingSkeleton() {
    loadingSkeleton.innerHTML = '';
    loadingSkeleton.style.display = 'grid';
    menuGrid.style.display = 'none';
    
    for (let i = 0; i < 9; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'skeleton-card';
        skeletonCard.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
            </div>
        `;
        loadingSkeleton.appendChild(skeletonCard);
    }
}

// Hide loading skeleton
function hideLoadingSkeleton() {
    loadingSkeleton.style.display = 'none';
    menuGrid.style.display = 'grid';
}

// Render menu grid with 3 dishes per line
function renderMenuGrid() {
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredData.slice(startIndex, endIndex);
    
    menuGrid.innerHTML = '';
    
    if (pageItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🍽️</div>
                <h3>No dishes found</h3>
                <p style="color: #666; margin-top: 0.5rem;">Try adjusting your filters or search terms</p>
            </div>
        `;
        renderPagination();
        return;
    }
    
    // Render 3 dishes per line
    pageItems.forEach(item => {
        const dishCard = createDishCard(item);
        menuGrid.appendChild(dishCard);
    });
    
    renderPagination();
}

// Create dish card element
function createDishCard(item) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    
    // Get country name
    const country = countries.find(c => c.id === item.country);
    const countryName = country ? country.name : item.country;
    const countryFlag = country ? country.flag : "🌍";
    
    card.innerHTML = `
        ${item.popular ? '<div class="dish-badge">🔥 Popular</div>' : ''}
        <img src="${item.image}" alt="${item.name}" class="dish-image">
        <div class="dish-info">
            <div class="dish-header">
                <h3 class="dish-name">${item.name}</h3>
                <div class="dish-price">₹${item.price}</div>
            </div>
            <p class="dish-description">${item.description}</p>
            <div class="dish-tags">
                <span class="tag country">${countryFlag} ${countryName}</span>
                <span class="tag ${item.veg ? 'veg' : 'nonveg'}">
                    ${item.veg ? '🟢 Vegetarian' : '🔴 Non-Veg'}
                </span>
                ${item.spicy ? '<span class="tag spicy">🌶️ Spicy</span>' : ''}
            </div>
            <div class="dish-footer">
                <div class="rating">
                    ⭐ ${item.rating.toFixed(1)}
                </div>
                <button class="add-cart-btn" onclick="addToCart(${item.id})">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <button class="page-btn" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span style="padding: 0.5rem">...</span>';
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <button class="page-btn" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderMenuGrid();
    window.scrollTo({ top: menuGrid.offsetTop - 100, behavior: 'smooth' });
}

// Change view
function changeView(view) {
    if (view === 'list') {
        menuGrid.classList.add('list-view');
    } else {
        menuGrid.classList.remove('list-view');
    }
}

// Add to cart
function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    // persist
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}

    updateCartCount();
    updateCartSidebar();
    showToast(`${item.name} added to cart!`);

    // Add animation to cart button
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => { cartBtn.style.transform = 'scale(1)'; }, 300);
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
    updateCartCount();
    updateCartSidebar();
    showToast('Item removed from cart!');
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartCount();
        updateCartSidebar();
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Update cart sidebar
function updateCartSidebar() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        
        document.querySelector('.cart-total .total-price').textContent = '₹0';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    document.querySelector('.cart-total .total-price').textContent = `₹${totalPrice}`;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    updateCartSidebar();
}

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Debounce function
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

// Export functions for HTML onclick
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.changePage = changePage;




// Add to menu.js or at the end of menu.html script
document.addEventListener('DOMContentLoaded', function() {
    // Load user data to personalize menu
    loadUserPreferences();
    
    // Set up favorite functionality
    setupFavoriteButtons();
    
    // Update cart count
    updateCartCount();
});

function loadUserPreferences() {
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    
    // Personalize greeting if user is logged in
    if (userData.name) {
        const greeting = document.getElementById('userGreeting');
        if (greeting) {
            greeting.textContent = `Hello, ${userData.name.split(' ')[0]}!`;
        }
    }
    
    // Mark favorite items in menu
    favorites.forEach(favorite => {
        const favoriteBtn = document.querySelector(`[data-item-id="${favorite.id}"]`);
        if (favoriteBtn) {
            favoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: #ff4757;"></i>';
            favoriteBtn.title = 'Remove from Favorites';
        }
    });
}

function setupFavoriteButtons() {
    // Add event listeners to all favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            const itemName = this.dataset.itemName;
            const itemPrice = parseFloat(this.dataset.itemPrice);
            const itemImage = this.dataset.itemImage;
            const itemCategory = this.dataset.itemCategory;
            
            toggleFavorite(itemId, itemName, itemPrice, itemImage, itemCategory, this);
        });
    });
}

function toggleFavorite(itemId, itemName, itemPrice, itemImage, itemCategory, button) {
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    const existingIndex = favorites.findIndex(fav => fav.id === itemId);
    
    if (existingIndex > -1) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.title = 'Add to Favorites';
        showNotification(`${itemName} removed from favorites`, 'info');
    } else {
        // Add to favorites
        favorites.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            image: itemImage,
            category: itemCategory
        });
        button.innerHTML = '<i class="fas fa-heart" style="color: #ff4757;"></i>';
        button.title = 'Remove from Favorites';
        showNotification(`${itemName} added to favorites`, 'success');
    }
    
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
    
    // Update favorites badge in profile link
    updateFavoritesBadge();
}

function updateFavoritesBadge() {
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    const favoritesBadge = document.getElementById('favoritesBadge');
    if (favoritesBadge) {
        favoritesBadge.textContent = favorites.length;
    }
}

function showNotification(message, type = 'info') {
    // Existing notification code from profile.js
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


