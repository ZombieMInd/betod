import React, { FC, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { AppStateType } from '../../types/types';
import Avatar from '../Pages/Profile/Avatar';

const Menu: FC = () => {
	const dispatch = useDispatch()
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
	const authorClick = () => {
		console.log("u r author now!");
	}
	const studentClick = () => {
		console.log("u r student now!");
	}
	let btns : JSX.Element;
	if (logged) {
		btns = <>
			<button className={s.loginBtn} onClick={authorClick}>автор</button>
			<button className={s.loginBtn} onClick={studentClick}>студент</button>
			<Avatar/>
		</>;
	} else {
		btns =  
			<Link to="/login" className={s.loginBtn}>вход</Link>
		;
	}

	return (
		<div className={s.header}>
			<div className={s.inner}>
				<Logo/>
				{btns}
			</div>
		</div>
	)
}

export default Menu;
