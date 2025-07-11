document.getElementById('loginUser').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("logging in")
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data))
    const response =  await fetch('/authLogin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok || !result.success){
        alert(result.error || "Login Failed" )
    };
});