const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const path = require('path');

const app = express();

app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  (token, tokenSecret, profile, done) => {
    return done(null, profile);
  }));

passport.use(new GitHubStrategy({
  clientID: 'YOUR_GITHUB_CLIENT_ID',
  clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/home');
  });

// GitHub Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/home');
  });

app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'homepage.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname)));

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('homepage.html');
  });
});

app.post('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});