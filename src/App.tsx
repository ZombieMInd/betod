import React, { useLayoutEffect, FC } from 'react';
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
// import NotFound from './components/NotFound/NotFound';
// import Login from './components/Login/Login';
// import Header from './components/Header/Header'
// import Menu from './components/Menu/Menu'


const App = ({ ...props }) => {
    const dispatch = useDispatch()
    const logged = useSelector<AppStateType, boolean>(state => state.me.logged)

    useLayoutEffect(() => {
        dispatch(authUser())
    }, []);
    // if (!logged) {
    //     return <Login />
    // }
    return (
        <>
        <Menu/>
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/course/:id" component={Course}/>
            <Route path="/" component={Main}/>
        </Switch>
        
        <Footer/>
        </>
    );
}

export default App