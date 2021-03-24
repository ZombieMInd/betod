import React, { FC, useState, useEffect } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CourseData, ProblemData, SwitcherProps } from '../../types/types';
// import { userAPI } from '../../api/UserApi';
import Comments from './Comments';
import Statistic from './Statistic';
import Authors from './Authors';
import ContentSwitcher from '../Common/Helpers/ContentSwitcher';
import Program from './Program/Program';
import { userAPI } from '../../api/UserApi';
import mockPic from '../../assets/img/course.png';
import { StaticPathResolver } from '../../utils/staticPathResolver';

const Course: FC = (props: any) => {
	let { id } : any = useParams();
	const dispatch = useDispatch();
	// const data = getCourseData(id);

	const [data, setData] = useState<CourseData>();
 
	useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getCourseDataById(id);
			if (result) {
				if (result.data.course.courseMainPictureUrl){
					setData({...result.data.course, courseMainPictureUrl: StaticPathResolver(result.data.course.courseMainPictureUrl)});
				} else {
					setData(result.data.course);
				}
			}
		};
		asyncWrap();
	}, []);

	const courseContents : SwitcherProps[] = [
		{
			name : "Программа курса",
			content: <Program id={id}/>
		},
		{
			name : "Отзывы",
			content: <Comments/>
		},
	];

	const detailData = [
		{
			name : "Длительность курса",
			data : data?.courseDuration
		},
		{
			name : "Для кого",
			data : "нужно уверенно владеть школьным курсом математики"
		},
		{
			name : "Язык",
			data : "русский"
		},
		{
			name : "В курс входят",
			data : "24 урока, 7 часов видео, 30 тестов, 12 задач"
		},
	];
	const details = detailData.map((item, index) =>
		<div className={s.item} key={index}>
			<span className={s.bold}>{item.name}:</span> {item.data}
		</div>
	)
	return (
		<div className={s.course}>
			<div className={s.header}>{data?.courseName}</div>
			<div className={s.body}>
				<div className={s.main}>
					<div className={s.desc}>
						<span className={s.bold}> Описание: </span> {data?.description}
					</div>
					<div className={s.details}>
						{details}
					</div>
					<button className={s.enter}>Поступить</button>
					<div className={s.switcher}>
						<ContentSwitcher contents={courseContents} style="space-between"/>
					</div>
				</div>
				<div className={s.right}>
					<img className={s.pic} src={data?.courseMainPictureUrl}/>
					<Statistic/>
					<Authors/>
				</div>
			</div>
			
		</div>
	)
}

export default Course;
