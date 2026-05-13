function login(){

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  // Validation
  if(username === "" || password === ""){
    message.style.color = "orange";
    message.textContent = "Please fill all fields!";
    return;
  }

  // Fake authentication
  if(username === "admin" && password === "1234"){

    message.style.color = "lightgreen";
    message.textContent = "Login successful!";

    // Simulate redirect
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);

  } else {

    message.style.color = "red";
    message.textContent = "Invalid credentials!";

  }
}