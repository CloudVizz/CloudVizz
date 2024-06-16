   // Function to check and display user
   function displayUser(username) {
    document.getElementById('user-name').textContent = username;
}

// Check for standard login
const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (user) {
    displayUser(user.username);
} else {
    // Check for OAuth login
    fetch('/user')
        .then(response => response.json())
        .then(data => {
            if (data && data.displayName) {
                displayUser(data.displayName);
            } else {
                // Redirect to login page if no user data found
                window.location.href = 'index.html';
            }
        })
        .catch(() => {
            // Redirect to login page if there's an error
            window.location.href = 'index.html';
        });
}

// Logout button functionality
document.getElementById('logout').addEventListener('click', () => {
    // Remove user data from local storage
    localStorage.removeItem('loggedInUser');
    
    // Logout from the server for OAuth
    fetch('/logout', { method: 'POST' })
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(() => {
            window.location.href = 'index.html';
        });
});