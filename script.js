const userForm = document.getElementById('userForm');
const userTableBody = document.querySelector('#userTable tbody');
const userListContainer = document.getElementById('userListContainer'); 


userForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    const photoFile = document.getElementById('photo').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const photo = e.target.result; 

 
        const user = {
            id: Date.now(),
            fullName,
            email,
            mobile,
            password,
            photo
        };

        saveUser(user);
        resetForm();
        showUserList(); 
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    } else {
        
        const user = {
            id: Date.now(),
            fullName,
            email,
            mobile,
            password,
            photo: null
        };
        saveUser(user);
        resetForm();
        showUserList(); 
    }
});


function saveUser(user) {
    let users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}


function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}


function displayUsers() {
    const users = getUsers();
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><img src="${user.photo || 'default.png'}" alt="User Photo"></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });

    if (users.length > 0) {
        showUserList();
    } else {
        hideUserList();
    }
}


function showUserList() {
    userListContainer.classList.remove('d-none');
    userListContainer.style.display = 'block';
}


function hideUserList() {
    userListContainer.style.display = 'none';
}


function deleteUser(userId) {
    let users = getUsers();
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}


function editUser(userId) {
    const users = getUsers();
    const user = users.find(user => user.id === userId);

    document.getElementById('fullName').value = user.fullName;
    document.getElementById('email').value = user.email;
    document.getElementById('mobile').value = user.mobile;
    document.getElementById('password').value = user.password;

    deleteUser(userId);
}


function resetForm() {
    userForm.reset();
}


displayUsers();
