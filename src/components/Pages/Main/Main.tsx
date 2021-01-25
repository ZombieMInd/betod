import React, { FC, useState } from 'react'
import s from './Main.module.scss'
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';

const Main: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Main}>
			<CourseGrid/>
		</div>
	)
}

export default Main;
