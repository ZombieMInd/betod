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
	const btns = data.map((btn) =>
		<button className="switcher-btn" onClick={() => setContent(btn.content)}>{btn.name}</button>
	);
	useEffect( () => {
		setContent(contents[0].content);
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
