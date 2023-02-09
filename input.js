const user = JSON.parse(localStorage.getItem("user"));

const init = () => {
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "login.html";
  }
};

window.onload = function () {
  document.getElementById("username_profile").innerText = user.username;
};

init();

const onSave = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    userId: user.id,
    foodName: document.getElementById("inputFood").value,
    quantity: parseInt(document.getElementById("inputQuantity").value),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://calorie.cisnux.xyz/foodCalories", requestOptions)
    .then(async (response) => {
      const responseBody = await response.json();
      if (response.status === 201) {
        alert(responseBody.message);
        window.location.href = "home.html";
      } else {
        alert(responseBody.message);
      }
    })
    .catch((error) => console.error(error));
};
