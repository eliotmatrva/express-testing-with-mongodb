const myButton = document.getElementById("getAllUsers");
myButton.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/api/users', {method: 'GET'})
    .then(response => response.text())
    .then(data => {
      displayAllUsers.textContent = data;
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

const resetFindUser = document.getElementById('resetFindUser');
resetFindUser.addEventListener('click', function(e){
  log.textContent = '';
});

const resetAllUsers = document.getElementById('resetAllUsers');
resetAllUsers.addEventListener('click', function(e){
  displayAllUsers.textContent = '';
})

const resetCreatedUser = document.getElementById('displayCreatedUser');
resetCreatedUser.addEventListener('click', function(e){
  displayCreatedUser.textContent ='';
})

 
function handleFindUser(event){
  let email = document.getElementById("email");
  log.textContent = `your user is ${email.value}`;
  fetch(`/submit-form/${email.value}`, {method: 'POST'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    log.textContent = `your user is ${data}`;
  })
  event.preventDefault();
}

function handleCreateUser(event){
  let name = document.getElementById("newUserName");
  let email = document.getElementById("newUserEmail");
  let password = document.getElementById("newUserPassword");
  let balance = document.getElementById("newUserBalance");
  console.log('starting create user');
  fetch(`/api/users/${name.value}/${email.value}/${password.value}/${balance.value}`, {method: 'POST'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    displayCreatedUser.textContent = `your user is ${data}`;
  })
  event.preventDefault();
}

const createUserForm = document.getElementById("createUserForm").addEventListener("submit", handleCreateUser);
const getUserForm = document.getElementById("getUserForm").addEventListener("submit", handleFindUser);
const log = document.getElementById('displayUser');
const log2 = document.getElementById('displayAllUsers');


