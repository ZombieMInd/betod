import React, { FC, useEffect, useState } from 'react'
import s from './Helpers.module.scss'
import { useDispatch } from 'react-redux';
import { SwitchProps } from 'react-router-dom';
import { SwitcherProps } from '../../../types/types';

interface Contents {
	contents :  SwitcherProps[];
}

const ContentSwitcher: FC<Contents> = ({contents} : Contents) => {
	const dispatch = useDispatch();
	const data : SwitcherProps[] = contents;

	const [content, setContent] = useState<FC>();
	const [active, setActive] = useState<string>();

	const handleClick = (btn : SwitcherProps) => {
		setContent(btn.content);
		setActive(btn.name);
	}

	const isActive = (btn : SwitcherProps) => {
		if (btn.name == active){
			return s.switcherBtn + ' ' + s.active;
		} else {
			return s.switcherBtn
		}
	}

	const btns = data.map((btn) =>
		<button className={isActive(btn)} onClick={() => handleClick(btn)}>{btn.name}</button>
	);

	useEffect( () => {
		setContent(contents[0].content);
		setActive(contents[0].name);
	}, []);

	return (
		<div className="switcher">
			<div className="switcherBtns">
				{btns}
			</div>
			<div className="switcherBody">
				{content}
			</div>
		</div>
	)
}

export default ContentSwitcher;

