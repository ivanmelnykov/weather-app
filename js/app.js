const searchbutton = document.querySelector("search-button");
const searchinput = document.querySelector("input");
searchbutton.addEventListener("click", () => {
  const city = searchinput.value;
  console.log("Searching for: " ,city);

});