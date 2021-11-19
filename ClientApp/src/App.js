import React from 'react';
import './custom.css'
import 'antd/dist/antd.css';
import {Route, Switch} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Signin from "./components/Signin/Signin";
import {observer} from "mobx-react-lite";
import authStore from './stores/authStore';
import apiStore from './stores/apiStore';
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import StudentPanel from "./components/StudentPanel/StudentPanel";
import TeacherPanel from "./components/TeacherPanel/TeacherPanel";

const App = observer(() => {

    return (
        <div className="app min-h-screen">
            <Nav/>
            { apiStore.isFetching && <div className="lds-dual-ring text-center">Loading</div> }
            <Switch>
                { !authStore.isLoggedIn && <Route exact path="/login" component={Signin}/> }
                { !authStore.isLoggedIn && <Route exact path="/register" component={Signup}/> }
                { authStore.isAdmin && <Route exact path="/teacher/panel" component={TeacherPanel}/> }
                { authStore.isLoggedIn && !authStore.isAdmin && <Route exact path="/student" component={StudentPanel}/>}
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    )
});

export default App;