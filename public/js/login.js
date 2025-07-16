document.getElementById('loginUser').addEventListener('submit', async (event) => {
    // Set up form data
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Initialize Error Message
    const errorBox = document.getElementById('errorMessage');
    errorBox.textContent = '';
    errorBox.style.display = 'none'
    
    // Send to backend
    const response =  await fetch('/authLogin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: data.username, password: data.password })
    });

    // Handle Result
    const result = await response.json();
    if (!response.ok){
       errorBox.textContent = result.error || "Invalid Credentials";
       errorBox.style.display = 'block';
       return;
    };

    // Redirect
    window.location.href = '/dashboard'
});