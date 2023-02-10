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
  const createdAt = document.getElementById("inputDate").value;
  const foodName = document.getElementById("inputFood").value;
  const quantity = document.getElementById("inputQuantity").value;

  if (
    !user.id ||
    !foodName ||
    !createdAt ||
    !user.id.trim("").length ||
    !foodName.trim("").length ||
    !createdAt.trim("").length ||
    !quantity
  ) {
    alert("Data yang anda masukkan tidak boleh kosong");
  } else if (quantity === "0") {
    alert("Quantity harus lebih dari 0");
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      userId: user.id,
      foodName: foodName,
      quantity: parseInt(quantity),
      createdAt: new Intl.DateTimeFormat("id-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(createdAt)),
    });

    const requestOptions = {
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
  }
};
