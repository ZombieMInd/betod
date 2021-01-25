import React, { FC, useState } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CoursePreviewData } from '../../types/types';

export interface CoursePreviewProps {
	id : number,
	picSrc : string,
	name : string,
	description : string
}

const CoursePreview: FC<CoursePreviewData> = ({id, pic, name, description }) => {
	const dispatch = useDispatch()
	return (
		<div className={s.CoursePreview}>
			<Link to={"/course/" + id}>
				<div className={s.PreviewHeader}>
					<img src={pic} alt="image" className={s.PreviewImg}/>
					<div className={s.PreviewName}>{name}</div>
				</div>
				<div className={s.PreviewFooter}>
					<div className={s.PreviewDesc}>{description}</div>
					<div className={s.PreviewDetails}>details</div>
				</div>
			</Link>
		</div>
	)
}

export default CoursePreview;
