import React, { FC, useEffect, useState } from 'react'
import s from './Helpers.module.scss'

interface Props {
	header : any;
}

const CustomDropdown: FC<Props> = ({header, children} ) => {
	const [active, setActive] = useState<boolean>();

	const handleClick = () => {
		if (active){
			console.log(active);
			setActive(false);
		} else {
			setActive(true);
		}
	}

	const isActive = () => {
		if (active){
			return s.body + ' ' + s.active;
		} else {
			return s.body
		}
	}


	useEffect( () => {
		setActive(false);
	}, []);

	return (
		<div className={s.dropdown}>
			<div className={s.header} onClick={handleClick}>
				{header}
			</div>
			<div className={isActive()}>
				{children}
			</div>
		</div>
	)
}

export default CustomDropdown;

