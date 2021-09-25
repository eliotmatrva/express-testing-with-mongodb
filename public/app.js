/*
let fetchResponse = fetch('http://localhost:8081/api/users')
    .then(response => response.text())
    .then(data => {
        let apiResponseElement = document.getElementById("apiDisplayElement");
        apiResponseElement.innerText = data;
        return data;
    });
console.log(fetchResponse);
*/

const myButton = document.getElementById("getAllUsers");
myButton.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/api/users', {method: 'GET'})
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

/*
function getUser(event) {
  log.textContent = `Bruh you did it! ${event.timeStamp}`;
  event.preventDefault();
};
const getUserForm = document.getElementById("getUserForm").addEventListener("submit", getUser);
const log = document.getElementById('displayUser');
*/
