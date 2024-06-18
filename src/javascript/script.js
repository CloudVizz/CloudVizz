import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';


document.addEventListener('DOMContentLoaded', function () {
  const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const container = document.getElementById('container');
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');
  const popup = document.getElementById('popup');
  const signUpError = document.getElementById('signUpError');
  const invalidCredentialsPopup = document.getElementById('invalidCredentialsPopup');
  const signInError = document.getElementById('signInError');

  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      

      popup.style.display = 'block';
      signUpError.textContent = '';
    } catch (error) {
      console.error('Error signing up:', error.message);
      signUpError.textContent = 'Error signing up: ' + error.message;
    }
  });

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifier = signInForm.identifier.value;
    const password = signInForm.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      const user = userCredential.user;
      
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Error signing in:', error.message);
      signInError.textContent = 'Invalid credentials!';
      invalidCredentialsPopup.style.display = 'block';
    }
  });

  const overlayBtn = document.getElementById('overlayBtn');
  overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');
    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame(() => {
      overlayBtn.classList.add('btnScaled');
    });
  });

  const closePopup = document.getElementById('closePopup');
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('right-panel-active');
  });

  const closeInvalidPopup = document.getElementById('closeInvalidPopup');
  closeInvalidPopup.addEventListener('click', () => {
    invalidCredentialsPopup.style.display = 'none';
  });


  const signUpButton = document.getElementById('signUpBtn');
  signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
    signUpButton.style.display = 'none';
  });
});
