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

