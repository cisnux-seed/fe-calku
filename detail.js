const user = JSON.parse(localStorage.getItem("user"));
const detailId = localStorage.getItem("detailId");
const parameters = new URLSearchParams(window.location.search);
const keyword = parameters.get("keyword");
let foods = null;

const init = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "login.html";
  } else if (keyword !== null) {
    fetch(
      `https://calorie.cisnux.xyz/foodCalories?userId=${user.id}&date=${detailId}&keyword=${keyword}`,
      requestOptions
    )
      .then(async (response) => {
        const responseBody = await response.json();
        if (response.status === 200) {
          foods = responseBody.data.foodCalories;
          loadFoods();
        } else {
          alert(responseBody.message);
        }
      })
      .catch((error) => console.error(error));
  } else {
    fetch(
      `https://calorie.cisnux.xyz/foodCalories?userId=${user.id}&date=${detailId}`,
      requestOptions
    )
      .then(async (response) => {
        const responseBody = await response.json();
        if (response.status === 200) {
          foods = responseBody.data.foodCalories;
          loadFoods();
        } else {
          alert(responseBody.message);
        }
      })
      .catch((error) => console.error(error));
  }
};

const loadFoods = () => {
  document.getElementById("username_profile").innerText = user.username;
  const container = document.getElementById("list_of_foods");
  let html = "";
  for (let index = 0; index < foods.length; index++) {
    const food = foods[index];
    html += `<div class="list-item">
    <p class="name-item">${food.foodName}</p>
    <p class="quantity">${food.quantity}</p>
    <p class="calori-item">&nbsp;${food.calorie}&nbsp;Kalori&nbsp;</p>
    <a type="button" class="btn-edit" onclick="onUpdate(${index})">Ubah</a>
    <a type="button" class="btn-delete" onclick="onDelete('${food.id}')">Hapus</a>
  </div>`;
  }
  html =
    `<div class="search-item mb-5">
  <input id="search_food" placeholder="search" />
</div>` + html;
  container.innerHTML = html;
  const searchBox = document.getElementById("search_food");
  searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && searchBox.value.trim().length > 0) {
      window.location.href = `detail.html?keyword=${searchBox.value}`;
    }
  });
};

init();

const onUpdate = (index) => {
  const food = foods[index];
  localStorage.setItem("food", JSON.stringify(food));
  window.location.href = "edit.html";
};

const onDelete = (id) => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch(`https://calorie.cisnux.xyz/foodCalories/${id}`, requestOptions)
    .then(async (response) => {
      const responseBody = await response.json();
      if (response.status === 200) {
        alert(responseBody.message);
        window.location.reload();
      } else {
        alert(responseBody.message);
      }
    })
    .catch((error) => console.error(error));
};
