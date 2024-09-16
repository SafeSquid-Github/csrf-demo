const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

// Read data from JSON file
const readData = () => {
  const data = fs.readFileSync(path.resolve(__dirname, 'data.json'));
  return JSON.parse(data);
};

// Write data to JSON file
const writeData = data => {
  fs.writeFileSync(
    path.resolve(__dirname, 'data.json'),
    JSON.stringify(data, null, 2)
  );
};

// Simple auth middleware
function isAuthenticated(req, res, next) {
  if (req.cookies.email) {
    const data = readData();
    const user = data.find(user => user.email === req.cookies.email);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  const user = data.find(
    user => user.email === email && user.password === password
  );
  if (user) {
    res.cookie('email', email, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/', isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/profile', isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

app.post('/profile', isAuthenticated, (req, res) => {
  const { name, email, mobile } = req.body;
  const data = readData();

  const userIndex = data.findIndex(
    user => user.email === res.locals.user.email
  );

  data[userIndex] = {
    name: name || res.locals.user.name,
    email: email || res.locals.user.email,
    mobile: mobile || res.locals.user.mobile,
    password: res.locals.user.password,
  };

  writeData(data);

  res.redirect('/profile');
});

app.get('/user-profile', isAuthenticated, (_req, res) => {
  const { user } = res.locals;
  res.json({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
