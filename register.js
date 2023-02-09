const onRegister = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://calorie.cisnux.xyz/users", requestOptions)
    .then(async (response) => {
      const responseBody = await response.json();
      if (response.status === 201) {
        alert("Akun anda berhasil dibuat");
        window.location.href = "login.html";
      } else {
        alert(responseBody.message);
      }
    })
    .catch((error) => console.error(error));
};
