import React, { FC, useState } from 'react'
import s from './List.module.scss'
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CoursePreviewData } from '../../../types/types';
import mockPic from '../../../assets/img/book.png';

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
				<div className={s.body}>
					<div className={s.left}>
						<img src={pic ? pic : mockPic} alt="image" className={s.image}/>
						<div className={s.progress}>
							<div className={s.inner} style={{width: Math.round(Math.random() * 100) + '%'}}></div>
						</div>
					</div>
					<div className={s.right}>
						<div className={s.text}>
							<div className={s.name}>{name}</div>
							<div className={s.description}>{description}</div>
						</div>
						<div className={s.details}>
							<div className={s.time}>
								<svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3.54888 0.532104C3.54888 0.255962 3.77273 0.0321045 4.04888 0.0321045H5.24682H6.44476C6.7209 0.0321045 6.94476 0.255962 6.94476 0.532104C6.94476 0.808247 6.7209 1.0321 6.44476 1.0321H5.74682V1.73579C6.56613 1.81388 7.33004 2.08191 7.99424 2.49538C7.99582 2.49376 7.99741 2.49215 7.99901 2.49054L8.79764 1.69054C9.04151 1.44626 9.43723 1.44592 9.68152 1.68978C9.92581 1.93365 9.92615 2.32938 9.68228 2.57367L8.97391 3.28325C9.89261 4.22448 10.4587 5.51224 10.4587 6.93209C10.4587 9.8142 8.12608 12.1521 5.24682 12.1521C2.36755 12.1521 0.0349121 9.8142 0.0349121 6.93209C0.0349121 4.2188 2.10227 1.98785 4.74682 1.73579V1.0321H4.04888C3.77273 1.0321 3.54888 0.808247 3.54888 0.532104ZM1.03491 6.93209C1.03491 4.60063 2.92146 2.71208 5.24682 2.71208C7.57218 2.71208 9.45872 4.60063 9.45872 6.93209C9.45872 9.26354 7.57218 11.1521 5.24682 11.1521C2.92146 11.1521 1.03491 9.26354 1.03491 6.93209ZM1.73285 6.93208C1.73285 4.98804 3.30611 3.41208 5.24682 3.41208L5.24682 6.93209L7.73156 9.4211C7.09566 10.0581 6.21717 10.4521 5.24682 10.4521C3.30611 10.4521 1.73285 8.87613 1.73285 6.93208Z" fill="#4F4F4F"/>
								</svg>
								77/81 ч
							</div>
							<div className={s.author}>
								@Barbarisov
							</div>
						</div>
					</div>
				</div>
				
			</Link>
		</div>
	)
}

export default CourseListPreview;
