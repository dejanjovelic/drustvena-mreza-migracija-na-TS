import { UserFormData } from "../model/userFormData.model.js";
import { UserService } from "../services/user.services.js";

function intitalizationForm(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        const updateHeader = document.querySelector('#form-header')
        updateHeader.textContent = "Update user form"
        userService.getById(id)
            .then(user => {
                (document.querySelector('#username') as HTMLInputElement).value = user.username;
                (document.querySelector('#name') as HTMLInputElement).value = user.name;
                (document.querySelector('#surname') as HTMLInputElement).value = user.surname;
                (document.querySelector('#birthday') as HTMLInputElement).value = new Date(user.birthday).toISOString().substring(0, 10);

            })

    }
    else {
        const updateHeader = document.querySelector('#form-header')
        updateHeader.textContent = "Add user form"
    }
}

const userService = new UserService();

function submit(): void {
    const username = (document.querySelector('#username') as HTMLInputElement).value;
    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const surname = (document.querySelector('#surname') as HTMLInputElement).value;
    const birthday = new Date((document.querySelector('#birthday') as HTMLInputElement).value);


    if (!username || !name || !surname || !birthday || !(birthday instanceof Date)) {
        alert('All fileds are required!')
        return
    }

    const formData: UserFormData = { username, name, surname, birthday }

    const usernameErrorMessage = document.querySelector('#usernameErrorMessage');
    usernameErrorMessage.textContent = "";

    const nameErrorMessage = document.querySelector('#nameErrorMessage');
    nameErrorMessage.textContent = "";

    const surnameErrorMessage = document.querySelector('#surnameErrorMessage');
    surnameErrorMessage.textContent = "";

    const birthdaynameErrorMessage = document.querySelector('#birthdayErrorMessage');
    birthdaynameErrorMessage.textContent = "";

    if (formData.username.trim() === "") {
        usernameErrorMessage.textContent = "Username field is required!"

    }
    if (formData.name.trim() === "") {
        nameErrorMessage.textContent = "Name field is required!"

    }
    if (formData.surname.trim() === "") {
        surnameErrorMessage.textContent = "Surname field is required!"

    }
    if (formData.birthday.toDateString() === "") {
        nameErrorMessage.textContent = "Birthday field is required!"
        return
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {

        userService.update(id, formData)
            .then(() => {
                window.location.href = "../users/user.html";
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })

    } else {
        userService.create(formData)
            .then(() => {
                window.location.href = "../users/user.html";
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })
    }

}

document.addEventListener('DOMContentLoaded', () => {
    intitalizationForm();
    const submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', submit)
});

