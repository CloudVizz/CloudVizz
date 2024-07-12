const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Passport.js setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  (token, tokenSecret, profile, done) => {
    return done(null, profile);
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Google authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Google auth successful, redirecting to /dashboard');
    res.redirect('/dashboard');
  });

// GitHub authentication routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log('GitHub auth successful, redirecting to /dashboard');
    res.redirect('/dashboard');
  });

const roleSchema = new mongoose.Schema({
  service_name: String,
  role_arn: String,
  external_id: String,
});

const Role = mongoose.model('Role', roleSchema);

app.post('/create_role', async (req, res) => {
  const { service_name, role_arn, external_id } = req.body;
  const role = new Role({ service_name, role_arn, external_id });

  try {
    await role.save();
    res.status(200).send({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).send({ message: 'Error creating role', error });
  }
});

app.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving roles', error });
  }
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
