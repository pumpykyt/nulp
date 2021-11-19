import apiStore from "../stores/apiStore";
import subjectStore from "../stores/subjectStore";
import myAxios from "../myAxios";

class SubjectService {
    async getSubjects() {
        try {
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/subject/get');
            subjectStore.subjects = response.data;
        } catch (err) {
            console.log(err);
        } finally {
            apiStore.setIsFetching(false);
        }
    }

    async addSubject(data) {
        try {
            apiStore.setIsFetching(true);
            const response = await myAxios.post('/api/subject/create', data);
            const subjects = await myAxios.get('/api/subject/get');
            subjectStore.subjects = subjects;
        } catch (err) {
            console.log(err);
        } finally {
            apiStore.setIsFetching(false);
        }
    }
}

export default new SubjectService();