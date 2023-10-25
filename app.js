// Swipper
let swiper = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

// tabs
let tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    let target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active-tab');
    });
    target.classList.add('active-tab');

    tabs.forEach((tab) => {
      tab.classList.remove('active-tab');
    });

    tab.classList.add('active-tab');
  });
});

// Image Gallery
function imgGallery() {
  let mainImg = document.querySelector('.details__img'),
    smallImg = document.querySelectorAll('.details__small-img');
  smallImg.forEach((img) => {
    img.addEventListener('click', function () {
      mainImg.src = this.src;
    });
  }
  )
}

imgGallery()

// Menu Showing and hiding
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

// Show-menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    console.log('Clicked');
    navMenu.classList.add('show-menu');
  });
}

// hide-Menu
if (navClose) {
  navClose.addEventListener('click', () => {
    console.log('Clicked');
    navMenu.classList.remove('show-menu');
  });
}

// Login register form
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.register .form');
  const passwordInput = registerForm.querySelector('input[type="password"]');
  const confirmPasswordInput = registerForm.querySelector('input[type="password"][placeholder="Confirm Password"]');
  const submitButton = registerForm.querySelector('.btn');

  passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 4) {
      passwordInput.classList.add('success');
    } else {
      passwordInput.classList.remove('success');
    }
  });

  submitButton.addEventListener('click', function (e) {
    const inputs = registerForm.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    for (const input of inputs) {
      if (!input.value) {
        alert('Please fill in all details.');
        e.preventDefault();
        return;
      }
    }

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      passwordInput.classList.add('error-animation');
      confirmPasswordInput.classList.add('error-animation');

      setTimeout(() => {
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        passwordInput.classList.remove('error-animation');
        confirmPasswordInput.classList.remove('error-animation');
      }, 500); // Reduced the animation duration to 0.5s

      e.preventDefault();
    } else {
      // Create the modal
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'modal-overlay';
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content modal-2';
      modalContent.innerHTML = `
        <span class="close-button" id="closeButton" onclick="closeModal()">&times;</span>
        <h2>Explore Evara: Where Shopping Sparks Connections.</h2>
        <button id="proceedButton" onclick="redirectToHomePage()">Proceed</button>
      `;

      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);

      // Display the modal
      modalOverlay.style.display = 'flex';

      // Prevent the form submission
      e.preventDefault();
    }
  });
});

function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    document.body.removeChild(modalOverlay);
  }
}

function redirectToHomePage() {
  closeModal();
  window.location.href = 'index.html';
}


// Updating price
// Get all quantity input fields and buttons
const quantityInputs = document.querySelectorAll('.quantity');
const incrementButtons = document.querySelectorAll('.btn-increment');
const decrementButtons = document.querySelectorAll('.btn-decrement');

// Add event listeners to increment and decrement buttons
incrementButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    quantityInputs[index].value = parseInt(quantityInputs[index].value) + 1;
    updateSubtotal(index);
  });
});

decrementButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    const currentQuantity = parseInt(quantityInputs[index].value);
    if (currentQuantity > 1) {
      quantityInputs[index].value = currentQuantity - 1;
      updateSubtotal(index);
    }
  });
});

// Function to update the subtotal based on quantity and price
function updateSubtotal(index) {
  const quantity = parseInt(quantityInputs[index].value);
  const price = parseFloat(document.querySelectorAll('.table__price')[index].textContent.replace('$', ''));
  const subtotal = quantity * price;
  document.querySelectorAll('.table__subtotal')[index].textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const table = document.querySelector('.table');
  const updateCartButton = document.querySelector('.cart__actions .btn:first-child');
  const cartSubtotal = document.querySelector('.cart__total-price');
  const cartShipping = document.querySelector('.shipping');
  const cartTotal = document.querySelector('.total');

  // Function to update the cart row subtotal
  const updateRowSubtotal = (row) => {
    const quantity = parseInt(row.querySelector('.quantity').value);
    const price = parseFloat(row.querySelector('.table__price').textContent.replace('$', ''));
    const subtotal = quantity * price;
    row.querySelector('.table__subtotal').textContent = `$${subtotal.toFixed(2)}`;
    return subtotal;
  };

  // Function to update the cart totals
  const updateCartTotals = () => {
    let subtotal = 0;
    table.querySelectorAll('tr:not(:first-child)').forEach((row) => {
      subtotal += updateRowSubtotal(row);
    });

    const shipping = 10; // Example shipping cost
    const total = subtotal + shipping;

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartShipping.textContent = `$${shipping.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
  };

  // Event listener for updating the cart
  updateCartButton.addEventListener('click', (e) => {
    e.preventDefault();
    updateCartTotals();
  });

  // Event delegation for removing items from cart
  table.addEventListener('click', (e) => {
    if (e.target.classList.contains('fi-rs-trash')) {
      const row = e.target.closest('tr');
      row.remove();
      updateCartTotals();
    }
  });

  // Initial cart total calculation
  updateCartTotals();
});

// deleting via trash

document.addEventListener('DOMContentLoaded', function () {
  const trashIcons = document.querySelectorAll('.fi-rs-trash');
  let modalVisible = false;
  let currentItemToRemove = null;

  // Function to create the modal and its content
  function createModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-2');

    const modalText = document.createElement('p');
    modalText.textContent = 'Your item has been removed from the cart';

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go back to cart';

    modalContent.appendChild(modalText);
    modalContent.appendChild(goBackButton);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    return { modalOverlay, goBackButton };
  }

  const { modalOverlay, goBackButton } = createModal();

  // Function to show the modal
  function showModal() {
    modalOverlay.style.display = 'flex';
    modalVisible = true;

    // Automatically close the modal after 3 seconds
    setTimeout(function () {
      if (modalVisible) {
        hideModal();
      }
    }, 3000);
  }

  // Function to hide the modal
  function hideModal() {
    modalOverlay.style.display = 'none';
    modalVisible = false;
  }

  // Event listeners for clicking the trash icons
  trashIcons.forEach((trashIcon) => {
    trashIcon.addEventListener('click', function () {
      showModal();
      currentItemToRemove = trashIcon.closest('tr'); // Save the item to remove
      currentItemToRemove.remove(); // Remove the row
    });

    // Add cursor pointer style to trash icons
    trashIcon.style.cursor = 'pointer';
  });

  // Event listener for clicking the "Go back to cart" button
  goBackButton.addEventListener('click', function () {
    if (modalVisible) {
      hideModal();
    }
  });
});


// adding to cart
document.addEventListener('DOMContentLoaded', function () {
  const cartButtons = document.querySelectorAll('.cart__btn');

  cartButtons.forEach((cartButton) => {
    cartButton.addEventListener('click', function () {
      window.location.href = 'cart.html';
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const fingerprintIcon = document.querySelector('.divider .fi-rs-fingerprint');

  fingerprintIcon.style.cursor = 'pointer';

  fingerprintIcon.addEventListener('click', function () {
    window.location.href = 'login-register.html';
  });
});
