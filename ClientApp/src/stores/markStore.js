import {makeAutoObservable} from 'mobx'

class MarkStore{
    constructor() {
        makeAutoObservable(this)
    }

    marks = [];
    marksGlobal = [];

    addMark(data){
        this.marks.push(data);
    }

    addMarkGlobal(data){
        this.marksGlobal.push(data);
    }
}

export default new MarkStore();