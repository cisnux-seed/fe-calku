const user = JSON.parse(localStorage.getItem("user"));
const food = JSON.parse(localStorage.getItem("food"));

const init = () => {
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "login.html";
  }
};

window.onload = function () {
  document.getElementById("username_profile").innerText = user.username;
  document.getElementById("inputFood").value = food.foodName;
  document.getElementById("inputQuantity").value = food.quantity;
  document.getElementById("inputEditDate").value = food.createdAt;
};

init();

const onSave = () => {
  const quantity = document.getElementById("inputQuantity").value;

  if (!quantity || quantity === "0") {
    alert("Quantity harus lebih dari 0");
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      quantity: parseInt(quantity),
    });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`https://calorie.cisnux.xyz/foodCalories/${food.id}`, requestOptions)
      .then(async (response) => {
        const responseBody = await response.json();
        if (response.status === 200) {
          alert(responseBody.message);
          window.location.href = "detail.html";
        } else {
          alert(responseBody.message);
        }
      })
      .catch((error) => console.error(error));
  }
};
