import React, { FC, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch } from 'react-redux';

const Footer: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Footer}>
			<div className={s.Company}>© 2021 DAD co.</div>
		</div>
	)
}

export default Footer;
