// Global Variables
let cart = [];
let total = 0;
let currentSection = "home";

// Product Data
const products = [
  {
    id: 1,
    name: "Celestial Bloom",
    price: "Rp 450.000",
    priceValue: 450000,
    image: "images/Product 1.jpg",
    description:
      "Aroma floral segar dengan sentuhan buah-buahan lembut, memancarkan keanggunan dan kelembutan.",
    details: {
      topNotes: "Bergamot, Lemon, Black Currant",
      middleNotes: "Jasmine, Rose, Lily of the Valley",
      baseNotes: "Musk, Cedarwood, Amber",
      longevity: "6-8 jam",
      size: "50ml",
    },
  },
  {
    id: 2,
    name: "Divine Night",
    price: "Rp 550.000",
    priceValue: 550000,
    image: "images/Product 2.jpg",
    description:
      "Perpaduan aroma amber dan musk yang hangat dan memikat, cocok untuk suasana malam yang elegan.",
    details: {
      topNotes: "Grapefruit, Cardamom, Violet Leaf",
      middleNotes: "Geranium, Cedar, Nutmeg",
      baseNotes: "Leather, Amber, Patchouli",
      longevity: "8-10 jam",
      size: "50ml",
    },
  },
  {
    id: 3,
    name: "Angel's Whisper",
    price: "Rp 500.000",
    priceValue: 500000,
    image: "images/Product 3.jpg",
    description:
      "Aroma lembut dan bersih dengan sentuhan vanilla dan white musk yang menenangkan.",
    details: {
      topNotes: "Pear, Pink Pepper, Bergamot",
      middleNotes: "Peony, Lily, Freesia",
      baseNotes: "Musk, Vanilla, Sandalwood",
      longevity: "5-7 jam",
      size: "50ml",
    },
  },
  {
    id: 4,
    name: "Golden Aura",
    price: "Rp 600.000",
    priceValue: 600000,
    image: "images/Product 4.jpg",
    description:
      "Campuran citrus dan woody yang segar dan elegan, memberi kesan cerah dan percaya diri.",
    details: {
      topNotes: "Mandarin, Orange, Ginger",
      middleNotes: "Cinnamon, Clove, Jasmine",
      baseNotes: "Vanilla, Amber, Sandalwood",
      longevity: "7-9 jam",
      size: "50ml",
    },
  },
  {
    id: 5,
    name: "Mystic Woods",
    price: "Rp 480.000",
    priceValue: 480000,
    image: "images/Product 5.jpg",
    description:
      "Aroma earthy dengan sentuhan cedarwood dan herbal, memberi kesan tenang dan natural.",
    details: {
      topNotes: "Bergamot, Black Pepper, Cypress",
      middleNotes: "Cedar, Vetiver, Guaiac Wood",
      baseNotes: "Leather, Tonka Bean, Amber",
      longevity: "8-10 jam",
      size: "50ml",
    },
  },
];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
  updateCartDisplay();
  updateCartCount();
});

// Initialize Application
function initializeApp() {
  // Load cart from localStorage if available
  loadCartFromStorage();

  // Set up smooth scrolling
  setupSmoothScrolling();

  // Set up header scroll effect
  setupHeaderScrollEffect();

  // Set up product detail navigation
  setupProductDetailNavigation();

  // Set up contact form
  setupContactForm();

  // Set up search functionality
  setupSearchFunctionality();

  // Set up loading animations
  setupLoadingAnimations();
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation click handlers
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", handleNavigation);
  });

  // Window scroll handler
  window.addEventListener("scroll", handleScroll);

  // Window resize handler
  window.addEventListener("resize", handleResize);

  // Add to cart button handlers
  document.querySelectorAll(".btn").forEach((button) => {
    if (button.textContent.includes("Beli")) {
      button.addEventListener("click", handleAddToCart);
    }
  });
}

// Navigation Handler
function handleNavigation(e) {
  e.preventDefault();
  const targetId =
    e.target.getAttribute("href") || e.target.closest("a").getAttribute("href");
  const targetSection = targetId.substring(1);

  showSection(targetSection);
  updateActiveNavigation(targetId);
}

// Show Section
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
    currentSection = sectionId;

    // Smooth scroll to section
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Update Active Navigation
function updateActiveNavigation(targetId) {
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
  });

  document.querySelector(`nav a[href="${targetId}"]`)?.classList.add("active");
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Header Scroll Effect
function setupHeaderScrollEffect() {
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Product Detail Navigation
function setupProductDetailNavigation() {
  // Add click handlers to product cards for detail view
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.addEventListener("click", function (e) {
      if (!e.target.classList.contains("btn")) {
        showProductDetail(index + 1);
      }
    });
  });
}

// Show Product Detail
function showProductDetail(productId) {
  // Hide all product details
  document.querySelectorAll(".product-detail").forEach((detail) => {
    detail.classList.remove("active");
  });

  // Show specific product detail
  const productDetail = document.getElementById(`product${productId}-detail`);
  if (productDetail) {
    productDetail.classList.add("active");
    productDetail.scrollIntoView({ behavior: "smooth" });
  }
}
