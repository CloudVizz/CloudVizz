import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
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

  const userName = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName.textContent = user.email;
    } else {
      window.location.href = 'index.html';
    }
  });

  logoutButton.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  });
});
