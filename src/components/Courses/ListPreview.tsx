import React, { FC, useState } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CoursePreviewData } from '../../types/types';
import mockPic from '../../assets/img/book.png';

export interface CoursePreviewProps {
	id : number,
	picSrc : string,
	name : string,
	description : string
}

const CourseListPreview: FC<CoursePreviewData> = ({id, pic, name, description }) => {
	const dispatch = useDispatch();
	return (
		<div className={s.listPreview}>
			<Link to={"/course/" + id} className={s.wrapper}>
				<div className={s.header}>
					<img src={mockPic} alt="image" className={s.image}/>
					<div className={s.name}>{name}</div>
				</div>
				<div className={s.footer}>
					<div className={s.description}>{description}</div>
					<div className={s.details}>details</div>
				</div>
			</Link>
		</div>
	)
}

export default CourseListPreview;
