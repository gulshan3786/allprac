// After successful login, store the received token in localStorage
const loginForm = async () => {
    // Assuming you have obtained the JWT token from the server response
    const token = 'example_jwt_token_from_server';

    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Redirect to another page or perform any other action
    window.location.href = '/dashboard'; // Redirect to dashboard page after successful login
};
