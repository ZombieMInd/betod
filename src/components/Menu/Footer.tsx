import React, { FC, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch } from 'react-redux';

const Footer: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Footer}>
			Footer
		</div>
	)
}

export default Footer;
