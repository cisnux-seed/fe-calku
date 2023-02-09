const onClickLogin = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://calorie.cisnux.xyz/authentications", requestOptions)
    .then(async (response) => {
      const responseBody = await response.json();
      if (response.status === 200) {
        window.location.href = "home.html";
        const user = { id: responseBody.data.id };
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        alert(responseBody.message);
      }
    })
    .catch((error) => console.error(error));
};
