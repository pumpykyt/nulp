import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";
import lessonStore from "./lessonStore";

const initialToken = localStorage.getItem('token');

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    isLoggedIn = !!initialToken;
    isAdmin = (initialToken !== null ? jwtDecode(initialToken).role === 'admin' : false);
    currentUser = {};
    users = [];
    currentUserStats = {};

    login(token){
        localStorage.setItem('token', token)
        this.isLoggedIn = true;
        this.isAdmin = jwtDecode(token).role === 'admin';
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.currentUser = null;
        this.currentUserStats = null;
        this.users = [];
        lessonStore.lessons = [];
    }

    getCurrentUserEmail(){
        return jwtDecode(localStorage.getItem('token')).email;
    }
}

export default new AuthStore();