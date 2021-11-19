import {makeAutoObservable} from 'mobx'

class LessonStore{
    constructor() {
        makeAutoObservable(this)
    }

    lessons = [];
    lessonsGlobal = [];

    addLesson(data){
        this.lessons.push(data);
    }

    addLessonGlobal(data){
        this.lessonsGlobal.push(data);
    }
}

export default new LessonStore;