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
  });

  closeEmailExistsPopup.addEventListener('click', () => {
    emailExistsPopup.style.display = 'none';
  });

  closeInvalidPopup.addEventListener('click', () => {
    invalidCredentialsPopup.style.display = 'none';
  });

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

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