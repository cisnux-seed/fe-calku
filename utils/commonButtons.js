const onLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("detailId");
  localStorage.removeItem("food");
};
