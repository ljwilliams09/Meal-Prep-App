document.getElementById('registerForm').addEventListener('submit', async(event) => {
    // Setup data
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Initialze error message
    const errorBox = document.getElementById('errorMessage')
    errorBox.textContent = '';
    errorBox.style.display = 'none'

    // Get response from backend
    const response = await fetch('/authRegister', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });

    // Evaluate result
    const result = await response.json();
    if (!response.ok){
        errorBox.textContent = result.error
        errorBox.style.display = 'block'
        return;
    }

    // Redirect
    window.location.href = '/dashboard';
});