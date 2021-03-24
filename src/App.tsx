import React, { useLayoutEffect, FC, useEffect } from 'react';
import { Route, withRouter, useHistory } from "react-router-dom"
import { Switch, RouteComponentProps, Router } from 'react-router'
import './App.scss'
import { withSuspense } from './hoc/withSuspense';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateType } from './types/types';
import { authUser } from './redux/me/actions';
import Login from './components/Pages/Login/Login';
import Menu from './components/Menu/Menu';
import Main from './components/Pages/Main/Main';
import Footer from './components/Menu/Footer';
import Course from './components/Courses/Course';
import LoginPage from './components/Pages/Login/Page';
import Profile from './components/Pages/Profile/Profile';
import { Chat } from './components/Chat/Chat';
import { MeType } from './types/me';
import Problem from './components/Courses/Problem/Problem';
// import NotFound from './components/NotFound/NotFound';
// import Login from './components/Login/Login';
// import Header from './components/Header/Header'
// import Menu from './components/Menu/Menu'


const App = ({ ...props }) => {
    const dispatch = useDispatch()
    // const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo)
    const logged = useSelector<AppStateType, boolean>(state => state.me.logged)

    useLayoutEffect(() => {
        dispatch(authUser());
    }, []);
    
    useEffect(() => {
        document.title = "Betod";
     }, []);

    if (!logged) {
        return <LoginPage/>
    }

    return (
        <>
        <Menu/>
        <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/login" component={LoginPage}/>
            {/* {logged && (
                <>
                
                </>
            )} */}
            <Route path="/profile" component={Profile}/>
            <Route path="/course/:courseid/problem/:id" component={Problem}/>
            
            <Route path="/course/:id" component={Course}/>
            <Route path="/" component={Main}/>
        </Switch>
        
        <Footer/>
        </>
    );
}

export default App