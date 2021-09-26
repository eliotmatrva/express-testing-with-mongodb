function handleCreateUser(event){
  let name = document.getElementById("newUserName");
  let email = document.getElementById("newUserEmail");
  let password = document.getElementById("newUserPassword");
  let balance = document.getElementById("newUserBalance");
  console.log('starting create user');
  fetch(`/users/createUser/${name.value}/${email.value}/${password.value}/${balance.value}`, {method: 'POST'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    displayCreatedUser.textContent = `You added new user ${data}`;
  })
  event.preventDefault();
}

function handleFindUser(event){
  let email = document.getElementById("email");
  fetch(`/users/findUser/${email.value}`, {method: 'GET'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    displayUser.textContent = `your user is ${data}`;
  })
  event.preventDefault();
}

function handleGetAllUsers(event) {
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
  };


function handleDeleteUser(event){
  let email = document.getElementById("deletedUserEmail");
  displayDeletedUser.textContent = `your user is ${email.value}`;
  fetch(`/users/deleteUser/${email.value}`, {method: 'DELETE'})
  .then(response => response.json())
  .then(data => {
    if (data.deletedCount === 0) {
      displayDeletedUser.textContent = `Could not delete ${email.value}.  Try a valid email`;
      return;
    }
    console.log(JSON.stringify(data));
    console.log(`delete successful? ${data.acknowledged}`);
    displayDeletedUser.textContent = `You deleted user ${email.value}`;
  });
  event.preventDefault();
};

function handleUpdateUserBalance(event){
  let email = document.getElementById("updateBalanceEmail");
  let balance = document.getElementById("updatedBalance");
  fetch(`/users/updateBalance/${email.value}/${balance.value}`, {method: 'PUT'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    serverResponse.textContent = `server response ${data}`;
  })
  event.preventDefault();
}

/**********************CREATE**********************/
//buttons and display for creating a user
const resetCreatedUser = document.getElementById('resetCreatedUser').addEventListener('click', function(e){
  displayCreatedUser.textContent ='';
})
const createUserForm = document.getElementById("createUserForm").addEventListener("submit", handleCreateUser);
const displayCreatedUser = document.getElementById("displayCreatedUser");

/**********************READ**********************/
//buttons and display for finding one user
const resetFindUser = document.getElementById('resetFindUser').addEventListener('click', function(e){
  displayUser.textContent = '';
});
const getUserForm = document.getElementById("getUserForm").addEventListener("submit", handleFindUser);
const displayUser = document.getElementById('displayUser');

//buttons and display for getting all users
const resetAllUsers = document.getElementById('resetAllUsers').addEventListener('click', function(e){
  displayAllUsers.textContent = '';
});
const getAllUsers = document.getElementById("getAllUsers").addEventListener('click', handleGetAllUsers);
const displayAllUsers = document.getElementById("displayAllUsers");

/**********************UPDATE**********************/
//buttons and display for updating a user balance
const resetServerResponse = document.getElementById('resetServerResponse').addEventListener('click', function(e){
  serverResponse.textContent = '';
});
const updateUserBalanceForm = document.getElementById("updateUserBalanceForm").addEventListener("submit", handleUpdateUserBalance);
const serverResponse = document.getElementById('serverResponse');

/**********************DELETE**********************/
//buttons and display for deleting a user balance
const resetDeletedUser = document.getElementById("resetDeletedUser").addEventListener("click", function(e) {
  displayDeletedUser.textContent = '';
});
const deleteUserForm = document.getElementById("deleteUserForm").addEventListener("submit", handleDeleteUser);
const displayDeletedUser = document.getElementById("displayDeletedUser");