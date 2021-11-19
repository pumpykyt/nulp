import apiStore from "../stores/apiStore";
import myAxios from "../myAxios";
import lessonStore from "../stores/lessonStore";
import {notification} from "antd";

class LessonService{
    async addLesson(data){
        try {
            apiStore.setIsFetching(true);
            const response = await myAxios.post('/api/lesson/create', data);
            lessonStore.addLessonGlobal(response.data);
            notification.success({
                message: 'Успішно добавлено урок'
            });
        } catch (err) {
            console.log(err);
        } finally {
            apiStore.setIsFetching(false);
        }
    }

    async getLessons(groupName){
        try {
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/lesson/get?groupName=' + groupName);
            lessonStore.lessons = response.data;
        } catch (err) {
            console.log(err);
        } finally {
            apiStore.setIsFetching(false);
        }
    }

    async getAllLessons(){
        try {
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/lesson/get-all');
            lessonStore.lessonsGlobal = response.data;
        } catch (err) {
            console.log(err);
        } finally {
            apiStore.setIsFetching(false);
        }
    }
}

export default new LessonService();