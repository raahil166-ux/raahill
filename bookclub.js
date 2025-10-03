// Digital Reading Platform JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the digital reading platform
    initializeDigitalReading();
    
    // Add smooth loading animation
    document.body.classList.add('loaded');
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize reading progress tracking
    initializeReadingProgress();
    
    // Initialize library filters
    initializeLibraryFilters();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize shopping cart
    initializeShoppingCart();
    
    // Initialize store filters
    initializeStoreFilters();
    
    // Initialize book details modal
    initializeBookDetailsModal();
});

function initializeDigitalReading() {
    // Add reading status indicator
    const readingStatus = document.querySelector('.reading-status');
    if (readingStatus) {
        // Simulate reading activity
        setInterval(() => {
            const indicator = readingStatus.querySelector('.reading-indicator');
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'pulse 2s infinite';
            }, 100);
        }, 5000);
    }
    
    // Add digital page turning effect
    addPageTurningEffect();
    
    // Initialize reading timer
    initializeReadingTimer();
}

function addPageTurningEffect() {
    const continueBtn = document.querySelector('.btn-primary');
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create page turning animation
            const pageTurn = document.createElement('div');
            pageTurn.className = 'page-turn-effect';
            pageTurn.innerHTML = '📖';
            pageTurn.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(0deg);
                font-size: 4rem;
                z-index: 9999;
                pointer-events: none;
                animation: pageTurn 1s ease-out forwards;
            `;
            
            document.body.appendChild(pageTurn);
            
            // Add CSS animation
            if (!document.querySelector('#page-turn-style')) {
                const style = document.createElement('style');
                style.id = 'page-turn-style';
                style.textContent = `
                    @keyframes pageTurn {
                        0% { 
                            transform: translate(-50%, -50%) rotate(0deg) scale(1);
                            opacity: 1;
                        }
                        50% { 
                            transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
                            opacity: 0.8;
                        }
                        100% { 
                            transform: translate(-50%, -50%) rotate(360deg) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                pageTurn.remove();
            }, 1000);
        });
    }
}

function initializeReadingTimer() {
    // Track reading time
    let readingStartTime = Date.now();
    let totalReadingTime = 0;
    
    // Update reading time every minute
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            totalReadingTime += 60000; // Add 1 minute
            updateReadingTimeDisplay(totalReadingTime);
        }
    }, 60000);
    
    // Update display when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            readingStartTime = Date.now();
        } else {
            totalReadingTime += Date.now() - readingStartTime;
        }
    });
}

function updateReadingTimeDisplay(totalTime) {
    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    
    const timeElements = document.querySelectorAll('.mini-stat span');
    timeElements.forEach(element => {
        if (element.textContent.includes('h') && element.textContent.includes('m')) {
            element.textContent = `${hours}h ${minutes}m`;
        }
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('library-grid') || 
                    entry.target.classList.contains('progress-cards') ||
                    entry.target.classList.contains('community-features')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.section-header, .library-grid, .progress-cards, .community-features, .activity-feed');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initializeReadingProgress() {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill, .mini-progress, .progress-fill-small');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Animate circular progress
    const circularProgress = document.querySelector('.progress-ring-circle');
    if (circularProgress) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circumference = 2 * Math.PI * 56;
                    const progress = 65; // 65%
                    const offset = circumference - (progress / 100) * circumference;
                    
                    circularProgress.style.strokeDasharray = circumference;
                    circularProgress.style.strokeDashoffset = circumference;
                    
                    setTimeout(() => {
                        circularProgress.style.strokeDashoffset = offset;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        progressObserver.observe(circularProgress);
    }
}

function initializeLibraryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const libraryBooks = document.querySelectorAll('.library-book');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter books with animation
            libraryBooks.forEach((book, index) => {
                const status = book.getAttribute('data-status');
                
                if (filter === 'all' || status === filter) {
                    setTimeout(() => {
                        book.style.display = 'block';
                        book.style.opacity = '0';
                        book.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            book.style.opacity = '1';
                            book.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    book.style.opacity = '0';
                    book.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        book.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeInteractiveElements() {
    // Add hover effects to book covers
    const bookCovers = document.querySelectorAll('.book-cover-small img, .book-cover-large img');
    bookCovers.forEach(cover => {
        cover.addEventListener('mouseenter', () => {
            cover.style.transform = 'scale(1.05) rotateY(5deg)';
            cover.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.3)';
        });
        
        cover.addEventListener('mouseleave', () => {
            cover.style.transform = 'scale(1) rotateY(0deg)';
            cover.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Add digital reading stats animation
    animateReadingStats();
}

function animateReadingStats() {
    const statNumbers = document.querySelectorAll('.stat-number, .card-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent.replace(/,/g, ''));
        const duration = 2000;
        const increment = finalNumber / (duration / 16);
        let currentNumber = 0;
        
        const updateNumber = () => {
            currentNumber += increment;
            if (currentNumber < finalNumber) {
                stat.textContent = Math.floor(currentNumber).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = finalNumber.toLocaleString();
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Add keyboard shortcuts for reading
document.addEventListener('keydown', function(e) {
    // Space bar to continue reading
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const continueBtn = document.querySelector('.btn-primary');
        if (continueBtn) {
            continueBtn.click();
        }
    }
    
    // Arrow keys for navigation
    if (e.code === 'ArrowRight') {
        // Next page logic
        console.log('Next page');
    }
    
    if (e.code === 'ArrowLeft') {
        // Previous page logic
        console.log('Previous page');
    }
});

// Add reading streak counter
function updateReadingStreak() {
    const streakElement = document.querySelector('.card-number');
    if (streakElement && streakElement.textContent === '15') {
        // Simulate streak update
        setInterval(() => {
            const currentStreak = parseInt(streakElement.textContent);
            streakElement.textContent = currentStreak + 1;
        }, 86400000); // Update every 24 hours
    }
}

// Initialize reading streak
updateReadingStreak();

// Add achievement unlock animation
function unlockAchievement(achievementName) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
        <div class="achievement-content">
            <i class="fas fa-trophy"></i>
            <h3>Achievement Unlocked!</h3>
            <p>${achievementName}</p>
        </div>
    `;
    
    achievement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #000;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        achievement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            achievement.remove();
        }, 500);
    }, 3000);
}

// Simulate achievement unlock after 5 seconds
setTimeout(() => {
    unlockAchievement('Digital Reader');
}, 5000);

// Shopping Cart Functionality
function initializeShoppingCart() {
    let cart = JSON.parse(localStorage.getItem('bookCart')) || [];
    let cartTotal = 0;
    
    // Book data
    const bookData = {
        'harry-potter': { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', price: 12.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg' },
        '1984': { title: '1984', author: 'George Orwell', price: 9.99, image: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg' },
        'becoming': { title: 'Becoming', author: 'Michelle Obama', price: 14.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'don-quixote': { title: 'Don Quixote', author: 'Miguel de Cervantes', price: 11.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'long-walk': { title: 'Long Walk to Freedom', author: 'Nelson Mandela', price: 13.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'sapiens': { title: 'Sapiens', author: 'Yuval Noah Harari', price: 16.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'born-crime': { title: 'Born a Crime', author: 'Trevor Noah', price: 12.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'educated': { title: 'Educated', author: 'Tara Westover', price: 15.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' },
        'glass-castle': { title: 'The Glass Castle', author: 'Jeannette Walls', price: 11.99, image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg' }
    };
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            const bookId = e.target.getAttribute('data-book');
            const book = bookData[bookId];
            
            if (book) {
                // Check if book already in cart
                const existingItem = cart.find(item => item.id === bookId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: bookId,
                        title: book.title,
                        author: book.author,
                        price: book.price,
                        image: book.image,
                        quantity: 1
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('bookCart', JSON.stringify(cart));
                
                // Update cart display
                updateCartDisplay();
                
                // Show success animation
                showAddToCartAnimation(e.target);
                
                // Update cart count
                updateCartCount();
            }
        }
    });
    
    // Cart icon click
    const cartIcon = document.getElementById('cart-icon');
    const shoppingCart = document.getElementById('shopping-cart');
    
    if (cartIcon && shoppingCart) {
        cartIcon.addEventListener('click', () => {
            shoppingCart.classList.toggle('open');
        });
        
        // Close cart
        const closeCart = document.querySelector('.close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                shoppingCart.classList.remove('open');
            });
        }
    }
    
    // Clear cart
    const clearCartBtn = document.querySelector('.clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            localStorage.setItem('bookCart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    }
    
    // Checkout
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                processCheckout();
            } else {
                alert('Your cart is empty!');
            }
        });
    }
    
    // Initialize cart display
    updateCartDisplay();
    updateCartCount();
    
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #cccccc; padding: 20px;">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }
        
        let total = 0;
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h5>${item.title}</h5>
                    <p>${item.author}</p>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = total.toFixed(2);
        
        // Add remove item functionality
        cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('bookCart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            });
        });
    }
    
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Animate cart count
            if (totalItems > 0) {
                cartCount.style.animation = 'none';
                setTimeout(() => {
                    cartCount.style.animation = 'bounce 0.6s ease';
                }, 100);
            }
        }
    }
    
    function showAddToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#4ecdc4';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
    }
    
    function processCheckout() {
        // Simulate checkout process
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Show checkout modal
        const checkoutModal = document.createElement('div');
        checkoutModal.className = 'checkout-modal';
        checkoutModal.innerHTML = `
            <div class="checkout-content">
                <h3>🛒 Checkout</h3>
                <div class="checkout-summary">
                    <p>Total Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    <p>Total Amount: $${total.toFixed(2)}</p>
                </div>
                <div class="checkout-form">
                    <input type="email" placeholder="Email" required>
                    <input type="text" placeholder="Card Number" required>
                    <div class="form-row">
                        <input type="text" placeholder="Expiry" required>
                        <input type="text" placeholder="CVV" required>
                    </div>
                </div>
                <div class="checkout-actions">
                    <button class="btn btn-outline cancel-checkout">Cancel</button>
                    <button class="btn btn-primary confirm-checkout">Complete Purchase</button>
                </div>
            </div>
        `;
        
        checkoutModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(checkoutModal);
        
        // Add checkout modal styles
        if (!document.querySelector('#checkout-modal-style')) {
            const style = document.createElement('style');
            style.id = 'checkout-modal-style';
            style.textContent = `
                .checkout-content {
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    max-width: 400px;
                    width: 90%;
                }
                .checkout-content h3 {
                    color: #ffd700;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .checkout-summary {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .checkout-summary p {
                    color: #cccccc;
                    margin-bottom: 5px;
                }
                .checkout-form input {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 215, 0, 0.3);
                    border-radius: 8px;
                    color: #ffffff;
                    font-family: 'Poppins', sans-serif;
                }
                .form-row {
                    display: flex;
                    gap: 10px;
                }
                .form-row input {
                    flex: 1;
                }
                .checkout-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }
                .checkout-actions .btn {
                    flex: 1;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Event listeners for checkout modal
        checkoutModal.querySelector('.cancel-checkout').addEventListener('click', () => {
            checkoutModal.remove();
        });
        
        checkoutModal.querySelector('.confirm-checkout').addEventListener('click', () => {
            // Simulate successful purchase
            cart = [];
            localStorage.setItem('bookCart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
            
            checkoutModal.remove();
            
            // Show success message
            showPurchaseSuccess();
        });
        
        // Close modal on background click
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.remove();
            }
        });
    }
    
    function showPurchaseSuccess() {
        const successModal = document.createElement('div');
        successModal.className = 'purchase-success';
        successModal.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h3>Purchase Successful!</h3>
                <p>Your books have been added to your digital library.</p>
                <button class="btn btn-primary close-success">Continue Reading</button>
            </div>
        `;
        
        successModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(successModal);
        
        // Add success modal styles
        if (!document.querySelector('#success-modal-style')) {
            const style = document.createElement('style');
            style.id = 'success-modal-style';
            style.textContent = `
                .success-content {
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                    padding: 40px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    text-align: center;
                    max-width: 300px;
                    width: 90%;
                }
                .success-icon {
                    font-size: 3rem;
                    margin-bottom: 20px;
                }
                .success-content h3 {
                    color: #ffd700;
                    margin-bottom: 15px;
                }
                .success-content p {
                    color: #cccccc;
                    margin-bottom: 25px;
                }
            `;
            document.head.appendChild(style);
        }
        
        successModal.querySelector('.close-success').addEventListener('click', () => {
            successModal.remove();
        });
        
        // Auto close after 3 seconds
        setTimeout(() => {
            if (document.body.contains(successModal)) {
                successModal.remove();
            }
        }, 3000);
    }
}

// Store Filters Functionality
function initializeStoreFilters() {
    const filterButtons = document.querySelectorAll('.store-filters .filter-btn');
    const bookCards = document.querySelectorAll('.store-grid .book-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter books with animation
            bookCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Add bounce animation for cart count
if (!document.querySelector('#cart-animation-style')) {
    const style = document.createElement('style');
    style.id = 'cart-animation-style';
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: scale(1); }
            40% { transform: scale(1.2); }
            60% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// Book Details Modal Functionality
function initializeBookDetailsModal() {
    // Extended book data with detailed information
    const detailedBookData = {
        'harry-potter': {
            title: 'Harry Potter and the Philosopher\'s Stone',
            author: 'J.K. Rowling',
            price: 12.99,
            originalPrice: 15.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg',
            rating: 4.8,
            reviewCount: 2847,
            pages: 223,
            publishedYear: 1997,
            genre: 'Fantasy Fiction',
            language: 'English',
            description: 'Harry Potter has never played a sport while flying on a broomstick. He\'s never worn a Cloak of Invisibility, befriended a giant, or helped hatch a dragon. All Harry knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley. Harry\'s room is a tiny closet at the foot of the stairs, and he hasn\'t had a birthday party in eleven years.',
            longDescription: 'Harry Potter has never played a sport while flying on a broomstick. He\'s never worn a Cloak of Invisibility, befriended a giant, or helped hatch a dragon. All Harry knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley. Harry\'s room is a tiny closet at the foot of the stairs, and he hasn\'t had a birthday party in eleven years. But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry—and anyone who reads about him—will find unforgettable.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-439-35548-4',
            publisher: 'Bloomsbury Publishing',
            awards: ['British Book Awards Children\'s Book of the Year', 'Nestlé Smarties Book Prize'],
            tags: ['Magic', 'Wizardry', 'Adventure', 'Friendship', 'Coming of Age']
        },
        '1984': {
            title: '1984',
            author: 'George Orwell',
            price: 9.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg',
            rating: 4.7,
            reviewCount: 1923,
            pages: 328,
            publishedYear: 1949,
            genre: 'Dystopian Fiction',
            language: 'English',
            description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
            longDescription: '1984 is a dystopian social science fiction novel and cautionary tale by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime. Thematically, it centres on the consequences of totalitarianism, mass surveillance and repressive regimentation of people and behaviours within society.',
            formats: ['Digital', 'Paperback', 'Hardcover'],
            isbn: '978-0-452-28423-4',
            publisher: 'Secker & Warburg',
            awards: ['Time\'s 100 Best Novels', 'Modern Library\'s 100 Best Novels'],
            tags: ['Dystopia', 'Totalitarianism', 'Surveillance', 'Political Fiction', 'Classic']
        },
        'becoming': {
            title: 'Becoming',
            author: 'Michelle Obama',
            price: 14.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.9,
            reviewCount: 3456,
            pages: 448,
            publishedYear: 2018,
            genre: 'Autobiography',
            language: 'English',
            description: 'An intimate, powerful, and inspiring memoir by the former First Lady of the United States.',
            longDescription: 'In her memoir, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world\'s most famous address. With unerring honesty and lively wit, she describes her triumphs and her disappointments, both public and private.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-1-5247-6313-8',
            publisher: 'Crown Publishing Group',
            awards: ['Goodreads Choice Award for Memoir & Autobiography'],
            tags: ['Memoir', 'Politics', 'Inspiration', 'Women\'s Rights', 'Leadership']
        },
        'don-quixote': {
            title: 'Don Quixote',
            author: 'Miguel de Cervantes',
            price: 11.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.2,
            reviewCount: 892,
            pages: 863,
            publishedYear: 1605,
            genre: 'Classic Literature',
            language: 'Spanish',
            description: 'The story of a man who reads so many chivalric romances that he loses his sanity and decides to become a knight-errant.',
            longDescription: 'Don Quixote is a Spanish novel by Miguel de Cervantes. It was originally published in two parts, in 1605 and 1615. A founding work of Western literature, it is often labeled as the first modern novel and is considered one of the greatest works ever written. The story follows the adventures of a noble from La Mancha named Alonso Quixano, who reads so many chivalric romances that he loses his sanity and decides to become a knight-errant.',
            formats: ['Digital', 'Hardcover'],
            isbn: '978-0-14-243723-0',
            publisher: 'Penguin Classics',
            awards: ['Nobel Prize in Literature (considered)'],
            tags: ['Classic', 'Adventure', 'Satire', 'Spanish Literature', 'Philosophy']
        },
        'long-walk': {
            title: 'Long Walk to Freedom',
            author: 'Nelson Mandela',
            price: 13.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.8,
            reviewCount: 1234,
            pages: 656,
            publishedYear: 1994,
            genre: 'Autobiography',
            language: 'English',
            description: 'The autobiography of Nelson Mandela, one of the great moral and political leaders of our time.',
            longDescription: 'Long Walk to Freedom is the autobiography of Nelson Mandela, the first democratically elected president of South Africa. The book profiles his early life, coming of age, education and 27 years in prison. Mandela rose to prominence in the ANC\'s 1952 Defiance Campaign and the 1955 Congress of the People.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-316-87496-8',
            publisher: 'Little, Brown and Company',
            awards: ['Nobel Peace Prize'],
            tags: ['Autobiography', 'Politics', 'Apartheid', 'Freedom', 'Leadership']
        },
        'sapiens': {
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            price: 16.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.6,
            reviewCount: 2156,
            pages: 443,
            publishedYear: 2011,
            genre: 'Non-Fiction',
            language: 'Hebrew',
            description: 'A brief history of humankind, exploring how Homo sapiens came to dominate the world.',
            longDescription: 'Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari, first published in Hebrew in Israel in 2011 and in English in 2014. The book surveys the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century, focusing on Homo sapiens.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-06-231609-7',
            publisher: 'Harper',
            awards: ['National Library of China\'s Wenjin Book Award'],
            tags: ['History', 'Anthropology', 'Philosophy', 'Science', 'Evolution']
        },
        'born-crime': {
            title: 'Born a Crime',
            author: 'Trevor Noah',
            price: 12.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.8,
            reviewCount: 1890,
            pages: 304,
            publishedYear: 2016,
            genre: 'Autobiography',
            language: 'English',
            description: 'Trevor Noah\'s unlikely path from apartheid South Africa to the desk of The Daily Show.',
            longDescription: 'Born a Crime is the story of a mischievous young boy who grows into a restless young man as he struggles to find himself in a world where he was never supposed to exist. It is also the story of that young man\'s relationship with his fearless, rebellious, and fervently religious mother—his teammate, a woman determined to save her son from the cycle of poverty, violence, and abuse that would ultimately threaten her own life.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-399-58814-7',
            publisher: 'Spiegel & Grau',
            awards: ['Audie Award for Autobiography/Memoir'],
            tags: ['Autobiography', 'Comedy', 'Apartheid', 'Family', 'Resilience']
        },
        'educated': {
            title: 'Educated',
            author: 'Tara Westover',
            price: 15.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.7,
            reviewCount: 2100,
            pages: 334,
            publishedYear: 2018,
            genre: 'Autobiography',
            language: 'English',
            description: 'A memoir about a woman who grows up in a survivalist Mormon family and eventually goes on to earn a PhD from Cambridge University.',
            longDescription: 'Educated is a memoir by Tara Westover. It was published in 2018 by Random House. The book follows Westover\'s life from her childhood in rural Idaho, where she was raised by survivalist Mormon parents who distrusted the government and public education, to her eventual pursuit of higher education.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-399-59050-8',
            publisher: 'Random House',
            awards: ['Goodreads Choice Award for Memoir & Autobiography'],
            tags: ['Memoir', 'Education', 'Family', 'Resilience', 'Self-Discovery']
        },
        'glass-castle': {
            title: 'The Glass Castle',
            author: 'Jeannette Walls',
            price: 11.99,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81QZ4X8QZJL.jpg',
            rating: 4.3,
            reviewCount: 1650,
            pages: 288,
            publishedYear: 2005,
            genre: 'Autobiography',
            language: 'English',
            description: 'A memoir about a young girl growing up in a dysfunctional family of nonconformist nomads.',
            longDescription: 'The Glass Castle is a 2005 memoir by Jeannette Walls. The book recounts the unconventional, poverty-stricken upbringing Walls and her siblings had at the hands of their deeply dysfunctional parents. The title refers to her father\'s long-held intention of building his dream house, a glass castle.',
            formats: ['Digital', 'Audiobook', 'Hardcover'],
            isbn: '978-0-7432-4753-5',
            publisher: 'Scribner',
            awards: ['Alex Award'],
            tags: ['Memoir', 'Family', 'Poverty', 'Resilience', 'Childhood']
        }
    };
    
    // Add click listeners to all book elements
    document.addEventListener('click', function(e) {
        // Check if clicked element is a book or inside a book element
        let bookElement = e.target.closest('.book-card, .library-book, .autobiography-book, .featured-autobiography');
        
        if (bookElement && !e.target.classList.contains('add-to-cart') && !e.target.classList.contains('preview-btn')) {
            e.preventDefault();
            
            // Get book ID from data attribute or determine from context
            let bookId = null;
            
            // Try to get book ID from various sources
            const addToCartBtn = bookElement.querySelector('.add-to-cart');
            if (addToCartBtn) {
                bookId = addToCartBtn.getAttribute('data-book');
            }
            
            // If no book ID found, try to determine from title
            if (!bookId) {
                const titleElement = bookElement.querySelector('h3, h4');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes('harry potter')) bookId = 'harry-potter';
                    else if (title.includes('1984')) bookId = '1984';
                    else if (title.includes('becoming')) bookId = 'becoming';
                    else if (title.includes('don quixote')) bookId = 'don-quixote';
                    else if (title.includes('long walk')) bookId = 'long-walk';
                    else if (title.includes('sapiens')) bookId = 'sapiens';
                    else if (title.includes('born a crime')) bookId = 'born-crime';
                    else if (title.includes('educated')) bookId = 'educated';
                    else if (title.includes('glass castle')) bookId = 'glass-castle';
                }
            }
            
            if (bookId && detailedBookData[bookId]) {
                showBookDetailsModal(detailedBookData[bookId], bookId);
            }
        }
    });
    
    function showBookDetailsModal(book, bookId) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'book-details-modal';
        modal.innerHTML = `
            <div class="book-details-content">
                <button class="close-book-details">&times;</button>
                
                <div class="book-details-header">
                    <div class="book-details-cover">
                        <img src="${book.image}" alt="${book.title}">
                        <div class="book-details-badges">
                            ${book.originalPrice ? '<span class="discount-badge">Save $' + (book.originalPrice - book.price).toFixed(2) + '</span>' : ''}
                            <span class="rating-badge">★ ${book.rating}</span>
                        </div>
                    </div>
                    
                    <div class="book-details-info">
                        <h1>${book.title}</h1>
                        <p class="book-author">by ${book.author}</p>
                        
                        <div class="book-rating-section">
                            <div class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</div>
                            <span class="rating-text">${book.rating} (${book.reviewCount.toLocaleString()} reviews)</span>
                        </div>
                        
                        <div class="book-price-section">
                            <span class="current-price">$${book.price}</span>
                            ${book.originalPrice ? `<span class="original-price">$${book.originalPrice}</span>` : ''}
                        </div>
                        
                        <div class="book-formats">
                            ${book.formats.map(format => `<span class="format-badge">${format}</span>`).join('')}
                        </div>
                        
                        <div class="book-actions">
                            <button class="btn btn-primary add-to-cart-details" data-book="${bookId}">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-outline preview-book">
                                <i class="fas fa-eye"></i> Preview
                            </button>
                            <button class="btn btn-outline wishlist-btn">
                                <i class="fas fa-heart"></i> Wishlist
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="book-details-body">
                    <div class="book-description">
                        <h3>Description</h3>
                        <p>${book.description}</p>
                        <p>${book.longDescription}</p>
                    </div>
                    
                    <div class="book-specifications">
                        <h3>Book Details</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label">Pages:</span>
                                <span class="spec-value">${book.pages}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Published:</span>
                                <span class="spec-value">${book.publishedYear}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Genre:</span>
                                <span class="spec-value">${book.genre}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Language:</span>
                                <span class="spec-value">${book.language}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">ISBN:</span>
                                <span class="spec-value">${book.isbn}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Publisher:</span>
                                <span class="spec-value">${book.publisher}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="book-awards" style="${book.awards ? '' : 'display: none;'}">
                        <h3>Awards & Recognition</h3>
                        <ul>
                            ${book.awards ? book.awards.map(award => `<li>${award}</li>`).join('') : ''}
                        </ul>
                    </div>
                    
                    <div class="book-tags">
                        <h3>Tags</h3>
                        <div class="tags-container">
                            ${book.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="book-reviews">
                        <h3>Customer Reviews</h3>
                        <div class="reviews-summary">
                            <div class="reviews-stats">
                                <div class="rating-breakdown">
                                    <div class="rating-bar">
                                        <span>5★</span>
                                        <div class="bar"><div class="fill" style="width: 75%"></div></div>
                                        <span>75%</span>
                                    </div>
                                    <div class="rating-bar">
                                        <span>4★</span>
                                        <div class="bar"><div class="fill" style="width: 20%"></div></div>
                                        <span>20%</span>
                                    </div>
                                    <div class="rating-bar">
                                        <span>3★</span>
                                        <div class="bar"><div class="fill" style="width: 3%"></div></div>
                                        <span>3%</span>
                                    </div>
                                    <div class="rating-bar">
                                        <span>2★</span>
                                        <div class="bar"><div class="fill" style="width: 1%"></div></div>
                                        <span>1%</span>
                                    </div>
                                    <div class="rating-bar">
                                        <span>1★</span>
                                        <div class="bar"><div class="fill" style="width: 1%"></div></div>
                                        <span>1%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sample-reviews">
                            <div class="review-item">
                                <div class="review-header">
                                    <div class="reviewer-info">
                                        <img src="https://via.placeholder.com/40x40/ffd700/ffffff?text=SM" alt="Reviewer">
                                        <div>
                                            <h5>Sarah M.</h5>
                                            <div class="review-rating">★★★★★</div>
                                        </div>
                                    </div>
                                    <span class="review-date">2 days ago</span>
                                </div>
                                <p class="review-text">"Absolutely amazing book! Couldn't put it down. The story is captivating and the writing is beautiful."</p>
                            </div>
                            
                            <div class="review-item">
                                <div class="review-header">
                                    <div class="reviewer-info">
                                        <img src="https://via.placeholder.com/40x40/4ecdc4/ffffff?text=JD" alt="Reviewer">
                                        <div>
                                            <h5>James D.</h5>
                                            <div class="review-rating">★★★★☆</div>
                                        </div>
                                    </div>
                                    <span class="review-date">1 week ago</span>
                                </div>
                                <p class="review-text">"Great read! The characters are well-developed and the plot keeps you engaged throughout."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        if (!document.querySelector('#book-details-modal-style')) {
            const style = document.createElement('style');
            style.id = 'book-details-modal-style';
            style.textContent = `
                .book-details-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    padding: 20px;
                    overflow-y: auto;
                }
                
                .book-details-content {
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    max-width: 900px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                
                .close-book-details {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: #cccccc;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 10001;
                    transition: color 0.3s ease;
                }
                
                .close-book-details:hover {
                    color: #ffd700;
                }
                
                .book-details-header {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 30px;
                    padding: 30px;
                    border-bottom: 1px solid rgba(255, 215, 0, 0.1);
                }
                
                .book-details-cover {
                    position: relative;
                    text-align: center;
                }
                
                .book-details-cover img {
                    width: 250px;
                    height: 350px;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                }
                
                .book-details-badges {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .discount-badge {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
                
                .rating-badge {
                    background: linear-gradient(135deg, #ffd700, #ffed4e);
                    color: #000;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
                
                .book-details-info h1 {
                    font-size: 2rem;
                    font-weight: 600;
                    color: #ffffff;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }
                
                .book-author {
                    color: #cccccc;
                    font-size: 1.1rem;
                    margin-bottom: 16px;
                }
                
                .book-rating-section {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                
                .stars {
                    color: #ffd700;
                    font-size: 1.1rem;
                }
                
                .rating-text {
                    color: #cccccc;
                    font-size: 0.9rem;
                }
                
                .book-price-section {
                    margin-bottom: 20px;
                }
                
                .book-price-section .current-price {
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: #ffd700;
                }
                
                .book-price-section .original-price {
                    font-size: 1.2rem;
                    color: #999;
                    text-decoration: line-through;
                    margin-left: 12px;
                }
                
                .book-formats {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }
                
                .format-badge {
                    background: rgba(255, 215, 0, 0.1);
                    color: #ffd700;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .book-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .book-actions .btn {
                    flex: 1;
                    min-width: 120px;
                }
                
                .book-details-body {
                    padding: 30px;
                }
                
                .book-details-body h3 {
                    color: #ffd700;
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
                    padding-bottom: 8px;
                }
                
                .book-description p {
                    color: #cccccc;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }
                
                .specs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 12px;
                    margin-bottom: 24px;
                }
                
                .spec-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .spec-label {
                    color: #cccccc;
                    font-weight: 500;
                }
                
                .spec-value {
                    color: #ffffff;
                    font-weight: 600;
                }
                
                .book-awards ul {
                    list-style: none;
                    padding: 0;
                }
                
                .book-awards li {
                    color: #cccccc;
                    padding: 4px 0;
                    position: relative;
                    padding-left: 20px;
                }
                
                .book-awards li::before {
                    content: '🏆';
                    position: absolute;
                    left: 0;
                }
                
                .tags-container {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                
                .tag {
                    background: rgba(255, 215, 0, 0.1);
                    color: #ffd700;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .reviews-summary {
                    margin-bottom: 24px;
                }
                
                .rating-breakdown {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .rating-bar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .rating-bar span:first-child {
                    color: #cccccc;
                    font-size: 0.9rem;
                    min-width: 30px;
                }
                
                .rating-bar span:last-child {
                    color: #cccccc;
                    font-size: 0.8rem;
                    min-width: 30px;
                }
                
                .bar {
                    flex: 1;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ffd700, #ffed4e);
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }
                
                .sample-reviews {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                
                .review-item {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 16px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 215, 0, 0.1);
                }
                
                .review-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                
                .reviewer-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .reviewer-info img {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }
                
                .reviewer-info h5 {
                    color: #ffffff;
                    font-size: 0.9rem;
                    margin: 0;
                }
                
                .review-rating {
                    color: #ffd700;
                    font-size: 0.8rem;
                }
                
                .review-date {
                    color: #999;
                    font-size: 0.8rem;
                }
                
                .review-text {
                    color: #cccccc;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin: 0;
                }
                
                @media (max-width: 768px) {
                    .book-details-header {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    
                    .book-details-cover img {
                        width: 200px;
                        height: 280px;
                    }
                    
                    .book-actions {
                        justify-content: center;
                    }
                    
                    .specs-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.close-book-details').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Add to cart from details page
        modal.querySelector('.add-to-cart-details').addEventListener('click', (e) => {
            e.preventDefault();
            const bookId = e.target.getAttribute('data-book');
            
            // Trigger the existing add to cart functionality
            const addToCartEvent = new Event('click');
            e.target.dispatchEvent(addToCartEvent);
            
            // Show success animation
            e.target.textContent = 'Added to Cart!';
            e.target.style.background = '#4ecdc4';
            
            setTimeout(() => {
                e.target.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                e.target.style.background = '';
            }, 1500);
        });
        
        // Preview functionality
        modal.querySelector('.preview-book').addEventListener('click', () => {
            showBookPreview(book);
        });
        
        // Wishlist functionality
        modal.querySelector('.wishlist-btn').addEventListener('click', (e) => {
            e.target.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
            e.target.style.background = '#ff6b6b';
            e.target.style.color = 'white';
        });
        
        // Animate modal appearance
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 100);
    }
    
    function showBookPreview(book) {
        const previewModal = document.createElement('div');
        previewModal.className = 'book-preview-modal';
        previewModal.innerHTML = `
            <div class="preview-content">
                <button class="close-preview">&times;</button>
                <h3>📖 ${book.title} - Preview</h3>
                <div class="preview-text">
                    <p><strong>Chapter 1</strong></p>
                    <p>${book.longDescription}</p>
                    <p>This is a preview of the book. To read the full content, please purchase the book.</p>
                </div>
                <div class="preview-actions">
                    <button class="btn btn-primary purchase-from-preview" data-book="${book.title.toLowerCase().replace(/\s+/g, '-')}">
                        Purchase Full Book - $${book.price}
                    </button>
                </div>
            </div>
        `;
        
        previewModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;
        
        // Add preview modal styles
        if (!document.querySelector('#preview-modal-style')) {
            const style = document.createElement('style');
            style.id = 'preview-modal-style';
            style.textContent = `
                .preview-content {
                    background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                .close-preview {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #cccccc;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .preview-content h3 {
                    color: #ffd700;
                    margin-bottom: 20px;
                }
                .preview-text {
                    color: #cccccc;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .preview-text p {
                    margin-bottom: 12px;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(previewModal);
        
        previewModal.querySelector('.close-preview').addEventListener('click', () => {
            previewModal.remove();
        });
        
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                previewModal.remove();
            }
        });
    }
}