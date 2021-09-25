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
  displayUser.textContent = `your user is ${email.value}`;
  fetch(`/users/findUser/${email.value}`, {method: 'POST'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    displayUser.textContent = `your user is ${data}`;
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
    displayCreatedUser.textContent = `You added new user ${data}`;
  })
  event.preventDefault();
}

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
  displayUpdatedUser.textContent = `your user is ${email.value}`;
  displayUpdatedUserBalance.textContent = `This user's new balance is ${balance.value}`;
  fetch(`/users/updateBalance/${email.value}/${balance.value}`, {method: 'PUT'})
  .then(response => response.text())
  .then(data => {
    console.log(data);
    displayUser.textContent = `your user is ${data}`;
  })
  event.preventDefault();
}


const deleteUserForm = document.getElementById("deleteUserForm").addEventListener("submit", handleDeleteUser);
const createUserForm = document.getElementById("createUserForm").addEventListener("submit", handleCreateUser);
const getUserForm = document.getElementById("getUserForm").addEventListener("submit", handleFindUser);
const updateUserBalanceForm = document.getElementById("updateUserBalanceForm").addEventListener("submit", handleUpdateUserBalance);
const displayUser = document.getElementById('displayUser');
const displayUpdatedUser = document.getElementById('displayUpdatedUser');
//const displayOldUserBalance = document.getElementById('oldUserBalance');
const displayUpdatedUserBalance = document.getElementById('updatedUserBalance');
const displayDeletedUser = document.getElementById("displayDeletedUser");
const displayAllUsers = document.getElementById("displayAllUsers");
const displayCreatedUser = document.getElementById("displayCreatedUser");


