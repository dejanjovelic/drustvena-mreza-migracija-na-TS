import { UserService } from "../services/user.services.js";

const userService = new UserService()
function renderData(): void {
    userService.getAll()
        .then(users => {
            const userContainer = document.querySelector('#user-container');

            for (const user of users) {
                const userCard = document.createElement('div');
                userCard.classList.add("user-card");

                const p1 = document.createElement("p");
                p1.id = "user-id";
                const strong1 = document.createElement("strong");
                strong1.textContent = "ID:";
                p1.appendChild(strong1);
                p1.innerHTML += ` ${user.id.toString()}`;
                userCard.appendChild(p1);

                const p2 = document.createElement("p");
                p2.id = "username";

                const strong2 = document.createElement("strong");
                strong2.textContent = "Username:";
                p2.appendChild(strong2);
                p2.innerHTML += ` ${user.username}`;
                userCard.appendChild(p2);

                const p3 = document.createElement("p");
                p3.id = "name";
                const strong3 = document.createElement("strong");
                strong3.textContent = "Name:";
                p3.appendChild(strong3);
                p3.innerHTML += ` ${user.name}`;
                userCard.appendChild(p3);

                const p4 = document.createElement("p");
                p4.id = "surname";

                const strong4 = document.createElement("strong");
                strong4.textContent = "Surname:";
                p4.appendChild(strong4);
                p4.innerHTML += ` ${user.surname}`;
                userCard.appendChild(p4);


                const p5 = document.createElement("p");
                p5.id = "birthday";
                const strong5 = document.createElement("strong");
                strong5.textContent = "Birthday:";
                p5.appendChild(strong5);
                p5.innerHTML += ` ${new Date(user.birthday).toLocaleDateString()}`
                userCard.appendChild(p5)

                const buttonDiv = document.createElement("div")
                buttonDiv.classList.add("button-section")

                const edtitBtn = document.createElement("button");
                edtitBtn.textContent = "Edit";
                edtitBtn.classList.add("buttons");


                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("buttons");

                buttonDiv.appendChild(edtitBtn)
                buttonDiv.appendChild(deleteBtn)

                userCard.appendChild(buttonDiv)

                userContainer.appendChild(userCard);

            }
        })
        .catch(error => {
            console.log(`Error: `, error.status)
        })
}
renderData()