document.getElementById('loginUser').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    const response =  await fetch('/authLogin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok || !result.success){
        alert(result.error || "Login Failed" )
        return;
    };

});