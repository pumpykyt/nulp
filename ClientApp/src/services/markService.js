import apiStore from "../stores/apiStore";
import myAxios from "../myAxios";
import markStore from "../stores/markStore";
import {notification} from "antd";

class MarkService{
    async getUserMarks(){
        try{
            apiStore.setIsFetching(true);
            const response = await  myAxios.get('/api/mark/get');
            markStore.marks = response.data;
        }catch(err){
            console.log(err);
        }finally{
            apiStore.setIsFetching(false);
        }
    }

    async getMarks(){
        try{
            apiStore.setIsFetching(true);
            const response = await  myAxios.get('/api/mark/get-all');
            markStore.marksGlobal = response.data;
        }catch(err){
            console.log(err);
        }finally{
            apiStore.setIsFetching(false);
        }
    }

    async addMark(data){
        try{
            apiStore.setIsFetching(true);
            const response = await  myAxios.post('/api/mark/add', data);
            markStore.addMarkGlobal(response.data);
            notification.success({
                message: 'Успішно добавлено оцінку'
            });
        }catch(err){
            console.log(err);
        }finally{
            apiStore.setIsFetching(false);
        }
    }
}

export default new MarkService();