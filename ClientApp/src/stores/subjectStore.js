import {makeAutoObservable} from 'mobx'

class SubjectStore{
    constructor() {
        makeAutoObservable(this)
    }

    subjects = [];

    addSubject(data){
        this.subjects.push(data);
    }
}

export default new SubjectStore();