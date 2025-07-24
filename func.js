// Scroll animation trigger
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });



animateElements.forEach(el => observer.observe(el));
document.addEventListener('DOMContentLoaded', function () {
    // Floor Tab Navigation
    const floorTabs = document.querySelectorAll('.floor-tab');
    const floorContents = document.querySelectorAll('.floor-content');

    floorTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const floorId = this.getAttribute('id').replace('-tab', '');

            // Update tab states
            floorTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });

            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            this.removeAttribute('tabindex');

            // Update content visibility
            floorContents.forEach(content => {
                if (content.id === floorId) {
                    content.classList.add('active');
                    content.removeAttribute('hidden');
                    content.setAttribute('tabindex', '0');
                } else {
                    content.classList.remove('active');
                    content.setAttribute('hidden', 'true');
                    content.setAttribute('tabindex', '-1');
                }
            });
        });
    });

    // Book Now Button Handler
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const roomId = this.getAttribute('data-room-id');
            const roomTitle = this.parentElement.parentElement.querySelector('h3').textContent;

            // Here you would typically open a booking modal or redirect to a booking page
            console.log(`Booking room: ${roomTitle} (ID: ${roomId})`);
            alert(`You are booking: ${roomTitle}\nRoom ID: ${roomId}\n\nThis would typically open a booking form.`);

            // In a real implementation, you might do something like:
            // openBookingModal(roomId, roomTitle);
        });
    });

    // Keyboard navigation for tabs
    floorTabs.forEach(tab => {
        tab.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }

            // Arrow key navigation between tabs
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const currentIndex = Array.from(floorTabs).indexOf(this);
                let nextIndex;

                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % floorTabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + floorTabs.length) % floorTabs.length;
                }

                floorTabs[nextIndex].focus();
                floorTabs[nextIndex].click();
            }
        });
    });

    // Initialize the first tab as active
    if (floorTabs.length > 0) {
        floorTabs[0].click();
    }
});

// This would be part of your modal handling in a complete implementation
function openBookingModal(roomId, roomTitle) {
    // Create and show a modal with booking form
    // You would implement this based on your modal system
    console.log(`Opening booking modal for ${roomTitle}`);
}


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.luxury-menu-toggle');
    const navLinks = document.querySelector('.luxury-nav-links');
    const navActions = document.querySelector('.luxury-nav-actions');

    menuToggle.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
    });
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.luxury-nav') &&
        navLinks.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // =====================
    // DINING SECTION FUNCTIONALITY
    // =====================
    const diningTabs = document.querySelectorAll('.dining-tab');
    const diningContents = document.querySelectorAll('.dining-content');

    // Initialize first tab as active
    if (diningTabs.length > 0) {
        diningTabs[0].classList.add('active');
        diningContents[0].removeAttribute('hidden');
    }

    // Tab switching functionality
    diningTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            diningTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.removeAttribute('tabindex');
            });

            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Hide all content sections
            diningContents.forEach(content => {
                content.setAttribute('hidden', 'true');
            });

            // Show the selected content section
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.removeAttribute('hidden');

                // Smooth scroll to section if on mobile
                if (window.innerWidth < 768) {
                    targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // =====================
    // MENU ITEM INTERACTIONS
    // =====================
    const menuItems = document.querySelectorAll('.menu-card');

    menuItems.forEach(item => {
        // Add hover effects
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });

        // Add to cart functionality
        const addToCartBtn = item.querySelector('.btn-add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const itemId = this.getAttribute('data-item-id');
                const itemTitle = this.parentElement.parentElement.querySelector('h3').textContent;
                const itemPrice = this.parentElement.querySelector('.menu-price').textContent;

                // Create visual feedback
                const feedback = document.createElement('span');
                feedback.textContent = 'Added!';
                feedback.style.position = 'absolute';
                feedback.style.right = '10px';
                feedback.style.bottom = '10px';
                feedback.style.color = '#A52A2A';
                feedback.style.fontWeight = '600';
                feedback.style.fontSize = '0.8rem';
                feedback.style.animation = 'fadeOut 1.5s forwards';

                this.parentElement.appendChild(feedback);

                // Remove feedback after animation
                setTimeout(() => {
                    feedback.remove();
                }, 1500);

                // Here you would typically add to cart logic
                console.log(`Added to cart: ${itemTitle} (${itemId}) - ${itemPrice}`);

                // You would replace this with actual cart functionality
                // addToCart(itemId, itemTitle, itemPrice);
            });
        }
    });

    // =====================
    // SERVICES SECTION INTERACTIONS
    // =====================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });

        // Book service button
        const bookBtn = card.querySelector('.btn-book-service');
        if (bookBtn) {
            bookBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const serviceTitle = this.closest('.service-card-content').querySelector('h3').textContent;

                // Visual feedback
                this.style.backgroundColor = '#D4AF37';
                this.style.color = '#ffffff';

                setTimeout(() => {
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#000000';
                }, 300);

                // Here you would typically implement booking logic
                console.log(`Booking service: ${serviceTitle}`);

                // You would replace this with actual booking functionality
                // bookService(serviceTitle);
            });
        }
    });

    // =====================
    // HELPER FUNCTIONS
    // =====================

    // Debounce function for scroll/resize events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Handle window resize
    window.addEventListener('resize', debounce(function () {
        // Any responsive adjustments can go here
    }));
});
document.addEventListener('DOMContentLoaded', function () {
    // Cart state with localStorage
    const cart = {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        total: 0,

        // Add item to cart
        addItem: function (itemId, name, price) {
            const existingItem = this.items.find(item => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: itemId,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            this.updateCart();
        },

        // Remove item from cart
        removeItem: function (itemId) {
            this.items = this.items.filter(item => item.id !== itemId);
            this.updateCart();
        },

        // Update quantity of an item
        updateQuantity: function (itemId, newQuantity) {
            const item = this.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                if (item.quantity <= 0) {
                    this.removeItem(itemId);
                } else {
                    this.updateCart();
                }
            }
        },

        // Clear all items
        clearCart: function () {
            this.items = [];
            this.updateCart();
        },

        // Calculate total and save to localStorage
        updateCart: function () {
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            localStorage.setItem('cartItems', JSON.stringify(this.items));
            this.renderCart();
            this.updateCartCounter();
        },

        // Render cart UI
        renderCart: function () {
            const cartList = document.querySelector('.cart-list');

            if (this.items.length === 0) {
                cartList.innerHTML = '<p class="empty-cart-message">Your cart is empty. Add some delicious items!</p>';
                document.querySelector('.cart-total span').textContent = '₦0';
                document.querySelector('.btn-clear-cart').style.display = 'none';
                return;
            }

            let html = '<ul class="cart-items">';

            this.items.forEach(item => {
                html += `
                    <li class="cart-item" data-item-id="${item.id}" style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-bottom: 12px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-left: 4px solid #4CAF50;
">
    <div class="cart-item-info" style="flex: 1; min-width: 0; margin-right: 20px;">
        <h4 style="
            margin: 0 0 8px 0;
            font-size: 17px;
            font-weight: 600;
            color: #2c3e50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        ">${item.name}</h4>
        <p style="
            margin: 0;
            font-size: 14px;
            color: #7f8c8d;
            font-weight: 500;
        ">₦${item.price.toLocaleString()} × <span style="color: #2c3e50;">${item.quantity}</span></p>
    </div>
    <div class="cart-item-controls" style="
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0 15px;
    ">
        <button class="btn-quantity minus" aria-label="Decrease quantity" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #f1f1f1;
            color: #2c3e50;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        ">−</button>
        <span style="
            min-width: 24px;
            text-align: center;
            font-weight: 600;
            color: #2c3e50;
            font-size: 15px;
        ">${item.quantity}</span>
        <button class="btn-quantity plus" aria-label="Increase quantity" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #f1f1f1;
            color: #2c3e50;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        ">+</button>
        <button class="btn-remove" aria-label="Remove item" style="
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            background: #ffeeee;
            color: #e74c3c;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            margin-left: 10px;
        ">×</button>
    </div>
    <p class="cart-item-total" style="
        font-weight: 700;
        color: #2c3e50;
        min-width: 90px;
        text-align: right;
        font-size: 16px;
    ">₦${(item.price * item.quantity).toLocaleString()}</p>
</li>
                `;
            });

            html += '</ul>';
            cartList.innerHTML = html;
            document.querySelector('.cart-total span').textContent = `₦${this.total.toLocaleString()}`;
            document.querySelector('.btn-clear-cart').style.display = 'block';

            this.addCartEventListeners();
        },

        // Update cart counter badge
        updateCartCounter: function () {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            const counter = document.querySelector('.cart-counter');

            if (totalItems > 0) {
                counter.textContent = totalItems;
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        },

        // Add event listeners to cart controls
        addCartEventListeners: function () {
            document.querySelectorAll('.btn-quantity.minus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    const item = this.items.find(item => item.id === itemId);
                    if (item) this.updateQuantity(itemId, item.quantity - 1);
                });
            });

            document.querySelectorAll('.btn-quantity.plus').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    const item = this.items.find(item => item.id === itemId);
                    if (item) this.updateQuantity(itemId, item.quantity + 1);
                });
            });

            document.querySelectorAll('.btn-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = e.target.closest('.cart-item').dataset.itemId;
                    this.removeItem(itemId);
                });
            });
        }
    };

    // Initialize cart on load
    cart.updateCart();

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const menuCard = e.target.closest('.menu-card');
            const itemName = menuCard.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuCard.querySelector('.menu-price').textContent.replace(/[^\d.]/g, ''));

            cart.addItem(itemId, itemName, itemPrice);

            // Visual feedback with animation
            const originalText = e.target.textContent;
            e.target.textContent = '✓ Added!';
            e.target.classList.add('added');

            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.classList.remove('added');
            }, 1500);
        });
    });

    // Clear cart button
    document.querySelector('.btn-clear-cart')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart.clearCart();
        }
    });

    // Checkout button (basic implementation)
    document.querySelector('.btn-checkout')?.addEventListener('click', () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Order placed! Total: ₦${cart.total.toLocaleString()}\n\nThis is a demo. Connect to a payment gateway for real transactions.`);
        cart.clearCart();
    });

    // Add cart counter to the UI if it doesn't exist
    if (!document.querySelector('.cart-counter')) {
        const cartIcon = document.querySelector('.cart-icon') || document.querySelector('#cart-heading');
        if (cartIcon) {
            const counter = document.createElement('span');
            counter.className = 'cart-counter';
            cartIcon.appendChild(counter);
            cart.updateCartCounter();
        }
    }
});

// Enhanced CSS (add to your stylesheet)
const style = document.createElement('style');
style.textContent = `
    /* Cart counter badge */
    .cart-counter {
        display: none;
        position: absolute;
        top: -8px;
        right: -8px;
        background: #e91e63;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
    }
    
    /* Cart item animations */
    .cart-item {
        transition: all 0.3s ease;
    }
    
    .cart-item:hover {
        background: #f9f9f9;
    }
    
    /* Add to cart button animation */
    .btn-add-to-cart.added {
        background-color: #4CAF50 !important;
        transform: scale(0.95);
    }
    
    .btn-add-to-cart {
        transition: all 0.3s ease;
    }
    
    /* Empty cart message */
    .empty-cart-message {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    /* Clear cart button */
    .btn-clear-cart {
        background: none;
        border: none;
        color: #ff5252;
        cursor: pointer;
        margin-top: 1rem;
        display: none;
    }
    
    /* Checkout button */
    .btn-checkout {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .btn-checkout:hover {
        background: #388E3C;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;
    const header = document.querySelector('header');

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
    });

    // Close menu when clicking links
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 1024) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Header scroll effect with more dramatic change
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 20);

        // Add scaling effect on scroll
        const scale = 1 - Math.min(scrollY / 1000, 0.1);
        header.style.transform = `scaleY(${scale})`;

        // Change header background opacity
        const opacity = 0.96 - Math.min(scrollY / 500, 0.3);
        header.style.background = `rgba(15, 15, 15, ${opacity})`;
    });

    // Responsive behavior
    function handleResponsive() {
        if (window.innerWidth <= 1024) {
            mobileMenuToggle.style.display = 'flex';
        } else {
            mobileMenuToggle.style.display = 'none';
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }

    // Initial check
    handleResponsive();

    // Update on resize
    window.addEventListener('resize', handleResponsive);

    // Enhanced smooth scrolling for anchor links with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 80;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Hero section parallax effect with more movement
    const heroVideo = document.querySelector('.luxury-hero-video video');
    const heroContent = document.querySelector('.luxury-hero-content');
    if (heroVideo && heroContent) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY;
            heroVideo.style.transform = `translateY(${scrollPosition * 0.5}px) scale(${1 + scrollPosition * 0.0005})`;
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            heroContent.style.opacity = 1 - Math.min(scrollPosition / 500, 0.5);
        });
    }

    // Creative scroll animations using Intersection Observer
    const animateOnScroll = function () {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Different animations based on element type
                    if (entry.target.classList.contains('room-card')) {
                        entry.target.style.animation = 'flipIn 1s ease-out forwards';
                    }
                    else if (entry.target.classList.contains('menu-card')) {
                        entry.target.style.animation = 'swingIn 0.8s ease-out forwards';
                    }
                    else if (entry.target.classList.contains('service-card')) {
                        entry.target.style.animation = 'zoomIn 0.6s ease-out forwards';
                    }
                    else if (entry.target.classList.contains('gallery-item')) {
                        entry.target.style.animation = 'rotateIn 1s ease-out forwards';
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements that should animate
        document.querySelectorAll('.room-card, .menu-card, .service-card, .gallery-item').forEach(element => {
            element.style.opacity = '0'; // Start hidden
            observer.observe(element);
        });

        // Special observation for about section
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const aboutObserver = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    aboutSection.style.animation = 'fadeInLeft 1.2s ease-out forwards';
                    aboutObserver.unobserve(aboutSection);
                }
            }, { threshold: 0.2 });

            aboutObserver.observe(aboutSection);
        }
    };

    // Floor tabs functionality with animation
    const floorTabs = document.querySelectorAll('.floor-tab');
    floorTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const floorId = this.getAttribute('aria-controls');

            // Animate out current content
            const currentActive = document.querySelector('.floor-content.active');
            if (currentActive) {
                currentActive.style.animation = 'fadeOutRight 0.4s ease-out forwards';
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.setAttribute('hidden', 'true');
                    currentActive.style.animation = '';
                }, 400);
            }

            // Remove active class from all tabs
            document.querySelectorAll('.floor-tab').forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Animate in new content
            const floorContent = document.getElementById(floorId);
            floorContent.style.animation = 'fadeInLeft 0.6s ease-out forwards';
            floorContent.classList.add('active');
            floorContent.removeAttribute('hidden');
        });
    });

    // Dining tabs functionality with animation
    const diningTabs = document.querySelectorAll('.dining-tab');
    diningTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const diningId = this.getAttribute('aria-controls');

            // Animate out current content
            const currentActive = document.querySelector('.dining-content.active');
            if (currentActive) {
                currentActive.style.animation = 'fadeOutDown 0.4s ease-out forwards';
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.setAttribute('hidden', 'true');
                    currentActive.style.animation = '';
                }, 400);
            }

            // Remove active class from all tabs
            document.querySelectorAll('.dining-tab').forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Animate in new content
            const diningContent = document.getElementById(diningId);
            diningContent.style.animation = 'fadeInUp 0.6s ease-out forwards';
            diningContent.classList.add('active');
            diningContent.removeAttribute('hidden');
        });
    });

    // Cart functionality with enhanced animations
    let cartItems = [];
    const cartList = document.querySelector('.cart-list');
    const cartTotal = document.querySelector('.cart-total span');
    const cartCounter = document.querySelector('.cart-counter');

    // Add to cart buttons for rooms with bounce animation
    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', function () {
            const roomId = this.getAttribute('data-room-id');
            const roomCard = this.closest('.room-card');
            const roomName = roomCard.querySelector('h3').textContent;
            const roomPrice = parseFloat(roomCard.querySelector('.price-amount').textContent.replace(/[^\d.]/g, ''));

            addToCart({
                id: roomId,
                name: roomName,
                price: roomPrice,
                type: 'room'
            });

            // Create flying element animation
            const flyingElement = document.createElement('div');
            flyingElement.className = 'flying-to-cart';
            flyingElement.textContent = '✓';
            flyingElement.style.position = 'fixed';
            flyingElement.style.left = `${button.getBoundingClientRect().left}px`;
            flyingElement.style.top = `${button.getBoundingClientRect().top}px`;
            document.body.appendChild(flyingElement);

            // Animate to cart
            const cartPos = cartCounter.getBoundingClientRect();
            const animation = flyingElement.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1,
                    backgroundColor: '#4CAF50'
                },
                {
                    transform: `translate(${cartPos.left - button.getBoundingClientRect().left}px, ${cartPos.top - button.getBoundingClientRect().top}px) scale(0.5)`,
                    opacity: 0.8
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });

            animation.onfinish = () => {
                flyingElement.remove();
                // Pulse cart counter
                cartCounter.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.5)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
            };
        });
    });

    // Add to cart buttons for menu items
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.getAttribute('data-item-id');
            const menuCard = this.closest('.menu-card');
            const itemName = menuCard.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuCard.querySelector('.menu-price').textContent.replace(/[^\d.]/g, ''));

            addToCart({
                id: itemId,
                name: itemName,
                price: itemPrice,
                type: 'menu'
            });

            // Button confirmation animation
            button.innerHTML = '<span class="checkmark">✓</span> Added!';
            button.classList.add('added');

            setTimeout(() => {
                button.innerHTML = 'Add to Cart';
                button.classList.remove('added');
            }, 1500);
        });
    });

    // Clear cart button with animation
    const clearCartBtn = document.querySelector('.btn-clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            if (cartItems.length === 0) return;

            // Animate cart items out
            const cartItemsElements = document.querySelectorAll('.cart-item');
            cartItemsElements.forEach((item, index) => {
                item.style.animation = `fadeOutRight 0.3s ease-out ${index * 0.1}s forwards`;
            });

            setTimeout(() => {
                clearCart();
            }, 300 + (cartItemsElements.length * 100));
        });
    }

    function addToCart(item) {
        cartItems.push(item);
        updateCart();
    }

    function updateCart() {
        // Update cart counter with animation
        cartCounter.textContent = cartItems.length;
        cartCounter.style.display = cartItems.length > 0 ? 'block' : 'none';

        // Update cart list with entrance animation
        if (cartItems.length === 0) {
            cartList.innerHTML = '<p class="cart-empty-message">No items in cart.</p>';
            cartTotal.textContent = '₦0';
            return;
        }

        let total = 0;
        let itemsHtml = '';

        cartItems.forEach((item, index) => {
            total += item.price;
            itemsHtml += `
                <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()}</p>
                    <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove ${item.name} from cart">
                        <span class="remove-icon">✕</span>
                    </button>
                </div>
            `;
        });

        cartList.innerHTML = itemsHtml;
        cartTotal.textContent = `₦${total.toLocaleString()}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                // Animate out before removing
                this.closest('.cart-item').style.animation = 'fadeOutRight 0.3s ease-out forwards';
                setTimeout(() => {
                    removeFromCart(itemId);
                }, 300);
            });
        });
    }

    function removeFromCart(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCart();
    }

    function clearCart() {
        cartItems = [];
        updateCart();
    }

    // Checkout button with animation
    const checkoutBtn = document.querySelector('.btn-primary[aria-label="Proceed to checkout"]');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cartItems.length === 0) {
                // Shake animation for empty cart
                this.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 400,
                    iterations: 2
                });
                return;
            }

            // Ripple effect animation
            const ripple = document.createElement('span');
            ripple.className = 'checkout-ripple';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
                // Here you would typically redirect to a checkout page or show a modal
                alert('Checkout functionality would be implemented here. Items in cart: ' + cartItems.length);
            }, 600);
        });
    }

    // Enhanced scroll indicator animation
    const scrollIndicator = document.querySelector('.luxury-scroll-indicator');
    if (scrollIndicator) {
        let scrollPosition = 0;
        let animationFrame;
        let direction = 1;

        function animateScrollIndicator() {
            scrollPosition += direction;
            if (scrollPosition > 100) direction = -1;
            if (scrollPosition < 0) direction = 1;

            scrollIndicator.style.transform = `translateY(${scrollPosition}%) rotate(${scrollPosition * 3.6}deg)`;
            animationFrame = requestAnimationFrame(animateScrollIndicator);
        }

        // Start animation when hero section is visible
        const heroObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animationFrame = requestAnimationFrame(animateScrollIndicator);
            } else {
                cancelAnimationFrame(animationFrame);
            }
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.luxury-hero');
        if (heroSection) heroObserver.observe(heroSection);
    }

    // Lazy loading for images with fade-in effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.8s ease-out';

                    // Force repaint before setting opacity to 1
                    void img.offsetWidth;

                    img.style.opacity = '1';
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Enhanced room card hover effect with 3D tilt and glow
    document.querySelectorAll('.room-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;

            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;

            const angleX = (y - centerY) / 15;
            const angleY = (centerX - x) / 15;

            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            this.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(224, 169, 109, 0.3)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Keyframe animations */
        @keyframes flipIn {
            from {
                opacity: 0;
                transform: perspective(1000px) rotateY(90deg);
            }
            to {
                opacity: 1;
                transform: perspective(1000px) rotateY(0);
            }
        }
        
        @keyframes swingIn {
            0% {
                opacity: 0;
                transform: rotate(-30deg) translateY(50px);
            }
            60% {
                transform: rotate(10deg);
            }
            100% {
                opacity: 1;
                transform: rotate(0) translateY(0);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.5);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
            }
            to {
                opacity: 1;
                transform: rotate(0) scale(1);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeOutRight {
            to {
                opacity: 0;
                transform: translateX(50px);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOutDown {
            to {
                opacity: 0;
                transform: translateY(50px);
            }
        }
        
        /* Flying to cart animation */
        .flying-to-cart {
            width: 30px;
            height: 30px;
            background: #4CAF50;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
        }
        
        /* Checkout ripple effect */
        .checkout-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out forwards;
        }
        
        @keyframes ripple {
            to {
                width: 200%;
                padding-bottom: 200%;
                opacity: 0;
            }
        }
        
        /* Remove button animation */
        .remove-icon {
            transition: transform 0.3s ease;
        }
        
        .btn-remove-item:hover .remove-icon {
            transform: rotate(90deg) scale(1.3);
        }
        
        /* Checkmark animation */
        .checkmark {
            display: inline-block;
            transform: scale(0);
            animation: checkmark 0.3s ease-out forwards;
        }
        
        @keyframes checkmark {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.3);
            }
            100% {
                transform: scale(1);
            }
        }
        
        /* Cart item entrance animation */
        .cart-item {
            animation: fadeInRight 0.3s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Enhanced scroll indicator */
        .luxury-scroll-indicator::after {
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(224, 169, 109, 0.8);
        }
    `;
    document.head.appendChild(style);

    // Initialize animations after everything is set up
    setTimeout(animateOnScroll, 100);
});