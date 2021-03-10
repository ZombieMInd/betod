import React, { FC, useEffect, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { AppStateType } from '../../types/types';
import Avatar from '../Pages/Profile/Avatar';
import { MeType } from '../../types/me';

const Menu: FC = () => {
	const dispatch = useDispatch()
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
	const id = useSelector<AppStateType, MeType>(state => state.me.userInfo);

	const authorClick = () => {
		console.log("u r author now!");
	}
	const studentClick = () => {
		console.log("u r student now!");
	}
	let btns : JSX.Element;
	if (logged) {
		btns = <>
			<Avatar/>
		</>;
	} else {
		btns =  
			<Link to="/login" className={s.loginBtn}>вход</Link>
		;
	}

	// useEffect (() => {
	// 	console.log(logged,id);
	// });

	return (
		<div className={s.header}>
			<div className={s.inner}>
				<Logo/>
				<div className={s.control}>{btns}</div>
			</div>
		</div>
	)
}

export default Menu;
