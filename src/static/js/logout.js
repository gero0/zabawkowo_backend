window.onload = () =>{
  const logoutButton = document.getElementById("logout-button");
  if(logoutButton){
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("logged out");
      document.cookie = `token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
      window.location.href = `/`;
    })
  }
}