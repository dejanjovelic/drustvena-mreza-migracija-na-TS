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
    const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;

    // submitBtn.disabled = true;
    // showSpinner()


    const username = (document.querySelector('#username') as HTMLInputElement).value;
    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const surname = (document.querySelector('#surname') as HTMLInputElement).value;
    const birthday = new Date((document.querySelector('#birthday') as HTMLInputElement).value);

    if (!username || !name || !surname || !birthday || !(birthday instanceof Date)) {
        alert('All fileds are required!')
        submitBtn.disabled = false;
        hideSpinner()
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
        showSpinner()
        submitBtn.disabled = true;
        userService.update(id, formData)
            .then(() => {
                hideSpinner()
                submitBtn.disabled = false;
                window.location.href = "../users/user.html";
            })
            .catch(error => {
                HandleError(error);
            })

    } else {
        showSpinner()
        submitBtn.disabled = true;
        userService.create(formData)
            .then(() => {
                hideSpinner()
                submitBtn.disabled = false;
                window.location.href = "../users/user.html";
            })
            .catch(error => {
                HandleError(error);
            })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    intitalizationForm();
    const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;
    submitBtn.addEventListener('click', () => {
        submit()
    })
});


function showSpinner() {
    const spinner = document.querySelector('#spinner') as HTMLDivElement
    spinner.classList.remove('hidden');
}

function hideSpinner() {
    const spinner = document.querySelector('#spinner') as HTMLDivElement
    spinner.classList.add('hidden');
}

function HandleError(error) {
    hideSpinner()
    alert(`Error: ${error.status}`)
    const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;
    submitBtn.disabled = false;
}

