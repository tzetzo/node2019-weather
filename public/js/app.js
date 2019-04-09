const weatherForm = document.querySelector("form");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(
    `http://localhost:3000/weather?address=${
      document.querySelector(".location").value
    }`
  )
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return (message1.textContent = data.error);
      }
      message1.textContent = data.address;
      message2.textContent = data.forecast;
    })
    .catch(err => console.log(err));
});
