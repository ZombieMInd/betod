import React, { FC, useState } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CoursePreviewData } from '../../types/types';
import mockPic from '../../assets/img/book.png';
import { StaticPathResolver } from '../../utils/staticPathResolver';

export interface CoursePreviewProps {
	id : number,
	picSrc : string,
	name : string,
	description : string
}

const CoursePreview: FC<CoursePreviewData> = ({id, pic, name, description }) => {
	const dispatch = useDispatch();
	let picture;
	if (!pic) {
		picture = mockPic;
	} else {
		picture = StaticPathResolver(pic);
	}
	return (
		<div className={s.preview}>
			<Link to={"/course/" + id} className={s.wrapper}>
				<div className={s.header} style={{backgroundImage: `url(${picture})`}}>
					{/* <img src={mockPic} alt="image" className={s.image}/> */}
					<div className={s.name}>{name}</div>
				</div>
				<div className={s.footer}>
					<div className={s.description}>{description}</div>
					<div className={s.details}>Константинопольский М. Ш.</div>
				</div>
			</Link>
		</div>
	)
}

export default CoursePreview;
