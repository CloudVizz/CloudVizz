document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('container');
  const overlayCon = document.getElementById('overlayCon');
  const overlayBtn = document.getElementById('overlayBtn');
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');
  const emailExistsPopup = document.getElementById('emailExistsPopup');
  const closeEmailExistsPopup = document.getElementById('closeEmailExistsPopup');
  const invalidCredentialsPopup = document.getElementById('invalidCredentialsPopup');
  const closeInvalidPopup = document.getElementById('closeInvalidPopup');
  const usernametakenPopup = document.getElementById('usernametakenPopup');
  const closeUsernamePopup = document.getElementById('closeUsernamePopup');
  const signUpError = document.getElementById('signUpError');
  const signInError = document.getElementById('signInError');

  overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');

    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame(() => {
      overlayBtn.classList.add('btnScaled');
    });
  });

  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('right-panel-active');
  });

  closeEmailExistsPopup.addEventListener('click', () => {
    emailExistsPopup.style.display = 'none';
  });

  closeInvalidPopup.addEventListener('click', () => {
    invalidCredentialsPopup.style.display = 'none';
  });

  closeUsernamePopup.addEventListener('click', () => {
    usernametakenPopup.style.display = 'none';
  });

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    const existingUser = Object.keys(localStorage).find(key => {
      try {
          const parsedItem = JSON.parse(localStorage.getItem(key));
          return parsedItem.username === username;
      } catch (error) {
          console.error('Error parsing JSON:', error);
          return false;
      }
  });
  
  if (existingUser) {
      usernametakenPopup.style.display = 'block';
      return;
  }
  

    if (localStorage.getItem(email)) {
      emailExistsPopup.style.display = 'block';
      return;
    }

    const user = { username, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    popup.style.display = 'block';
    signUpError.textContent = '';
  });

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = signInForm.identifier.value;
    const password = signInForm.password.value;

    const user = JSON.parse(localStorage.getItem(identifier)) || JSON.parse(localStorage.getItem(identifier.toLowerCase()));

    if (user && user.password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'homepage.html';
    } else {
      invalidCredentialsPopup.style.display = 'block';
      signInError.textContent = 'Invalid credentials!';
    }
  });
});

const signUpButton = document.getElementById('signUpBtn');

// Get reference to the sign-in and sign-up form containers
const signInContainer = document.querySelector('.sign-in-container');
const signUpContainer = document.querySelector('.sign-up-container');

// Add click event listener to the "Sign Up" button
signUpButton.addEventListener('click', () => {
    // Add the class 'right-panel-active' to the container to show the sign-up form
    container.classList.add('right-panel-active');
    signUpButton.style.display = 'none';
});