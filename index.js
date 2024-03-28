const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const secretKey = 'your_secret_key'; // Change this to a secure random string

// Sample user data (replace this with your actual user database)
const users = [
    { id: 1, email: 'user1@example.com', password: 'password1' },
    { id: 2, email: 'user2@example.com', password: 'password2' }
];

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    // Check if user exists and password is correct
    if (user && user.password === password) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Send token as response
        res.json({ token });
    } else {
        // Send error response for invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
    // If authentication succeeds, return dashboard data
    res.json({ message: 'Welcome to the dashboard!' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // If token is not provided, return 401 Unauthorized
        return res.sendStatus(401);
    }

    // Verify token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            // If token is invalid, return 403 Forbidden
            return res.sendStatus(403);
        }
        // Store user data in request object for further use
        req.user = user;
        next();
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






















