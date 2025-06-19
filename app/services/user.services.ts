import { User } from "../model/user.data.model";
import { UserFormData as UserFormData } from "../model/userFormData.model";

export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:33229/api/users';
    }

    getAll(): Promise<User[]> {
        return fetch(this.apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw { status: response.status, message: response.text }
                }
                return response.json()
            })
            .then((users: User[]) => {
                return users;
            })
            .catch(error => {
                console.log(`Error: `, error.status)
                throw error
            })
    }

    getById(id: string):Promise<User>{
        return fetch(`${this.apiUrl}/${id}`)
        .then(response =>{
           if(!response.ok){
            throw {status: response.status, message: response.text}
           }
           return response.json();
        })
        .then((user: User)=>{
            return user;
        })
        .catch(error =>{
            console.log(`Error: `, error.status)
            throw error;
        })
    }

    create(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response=>{
            if(!response.ok){
                throw {status: response.status, message: response.text}
            }
            return response.json();
        })
        .catch(error=>{
            console.log(`Error: `, error.status)
            throw error;
        })
    }

    update(id: string, formData: UserFormData): Promise<User>{
        return fetch(`${this.apiUrl}/${id}`, {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })
        .then(response=>{
            if(!response.ok){
                throw {status: response.status, message: response.text}
            }
            return response.json();
        })
        .then((user: User)=>{
            return user;
        })
        .catch(error=>{
            console.log(`Error: `, error.status)
            throw error;
        })
    }

    delete(id: string): Promise<void>{
        return fetch(`${this.apiUrl}/${id}`, {method:'DELETE'})
        .then(response=>{
            if(!response.ok){
                throw {status: response.status, message: response.text}
            }
        })
        .catch(error=>{
            console.log(`Error: `, error.status)
            return error;
        });
    }

}