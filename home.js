const user = JSON.parse(localStorage.getItem("user"));
let foodCalories = null;

const init = () => {
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "login.html";
  } else {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://calorie.cisnux.xyz/users/${user.id}`, requestOptions)
      .then(async (response) => {
        const responseBody = await response.json();
        if (response.status === 200) {
          user.username = responseBody.data.user.username;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          alert(responseBody.message);
        }
      })
      .catch((error) => console.error(error));

    fetch(
      `https://calorie.cisnux.xyz/foodCalories?userId=${user.id}`,
      requestOptions
    )
      .then(async (response) => {
        const responseBody = await response.json();
        if (response.status === 200) {
          foodCalories = responseBody.data.foodCalories;
          if (user) {
            document.getElementById("username_profile").innerText =
              user.username;
            const container = document.getElementById("list_of_food_calories");
            let html = "";
            foodCalories.forEach((food) => {
              const [day, date, month, year] = food.createdAt.split(" ");

              html += `<div class="col-md-2">
              <a href="detail.html" onclick="onDetailClick('${
                food.createdAt
              }',${food.totalCalories})">
                <div class="card mb-3">
                  <div class="card-header">
                    <p>${day.slice(0, -1)}</p>
                  </div>
                  <div class="date-body">
                    <h1>${date}</h1>
                    <p>${month} ${year}</p>
                  </div>
                  <div class="card-desc">
                    <p>${food.totalCalories} Kalori</p>
                  </div>
                </div>
              </a>
            </div>`;
            });
            container.innerHTML = html;
          }
        } else {
          alert(responseBody.message);
        }
      })
      .catch((error) => console.error(error));
  }
};

init();

const onDetailClick = (detailId, totalCalories) => {
  localStorage.setItem("detailId", detailId);
  localStorage.setItem("totalCalories", totalCalories);
};
