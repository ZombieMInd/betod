import React, { FC, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch } from 'react-redux';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Menu}>
			<Logo/>
			<Link to="/login">Вход</Link>
		</div>
	)
}

export default Menu;
