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

	const headerTri = () => {
		if (!active){
			return (
				<div className={s.tri} style={{padding: "6px 8px 8px"}}>
					<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.400024 0.684631L11.6 0.684631L6.00002 7.05134L0.400024 0.684631Z" fill="black"/>
					</svg>
				</div>
			);
		} else {
			return (
				<div className={s.tri} style={{padding: "5px 8px"}}>
					<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.599991 10.7587L0.599991 0.854956L7.79999 5.80684L0.599991 10.7587Z" fill="black"/>
					</svg>
				</div>
			);
		}
	}

	useEffect( () => {
		setActive(false);
	}, []);

	return (
		<div className={s.dropdown}>
			<div className={s.wrapper}>
				<div className={s.header} onClick={handleClick}>
					{header} {headerTri()}
				</div>
			</div>
			<div className={isActive()}>
				{children}
			</div>
		</div>
	)
}

export default CustomDropdown;

