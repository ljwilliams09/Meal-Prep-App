document.getElementById('registerForm').addEventListener('submit', async(event) => {
    event.preventDefault();
    document.getElementById('errorMessage').textContent = ""
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/authRegister', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok){
        registerError()
        alert(result.error || 'Registration failed')
        return;
    }
});

function registerError(){
    document.getElementById('errorMessage').textContent = "Register account failed"
}
