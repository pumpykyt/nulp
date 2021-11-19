import apiStore from "../stores/apiStore";
import myAxios from "../myAxios";
import authStore from "../stores/authStore";
import {notification} from "antd";

class UserService{

    async getCurrentUser(){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/user/current-user');
            authStore.currentUser = response.data;
        }catch(err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async uploadUserImage(data){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.post('/api/user/upload-image', data);
            notification.success({
                message: 'Аватар завантажено успішно'
            });
        }catch(err){
            console.log(err);
            notification.error({
                message: 'Помилка сервера'
            });
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getUsers(){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/user/get-all');
            authStore.users = response.data;
        }catch(err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getUserStats(){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/user/stats');
            authStore.currentUserStats = response.data;
        }catch(err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }
}

export default new UserService();