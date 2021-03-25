import React, { FC, useEffect, useState } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { CourseAuthor, CourseStatistic } from '../../types/types';
import mockPic from '../../assets/img/ava.png';
import { userAPI } from '../../api/UserApi';
import { StaticPathResolver } from '../../utils/staticPathResolver';

// const mockData : CourseAuthor[] = [
// 	{
// 		name : "Максимова Кира Юрьевна",
// 		nickname : "@maximova",
// 		pic : "/static/author",
// 	},
// 	{
// 		name : "Константинопольский Владислав Александрович",
// 		nickname : "@konstantinopolsky",
// 		pic : "/static/author",
// 	}
// ];

const Authors = ({ids} : {ids : Array<number>}) => {
	const dispatch = useDispatch();

	// const data = mockData;
	const [data, setData] = useState<CourseAuthor[]>([]);
	let authors;
	useEffect( () => {
		async function asyncWrap() {
			ids.map(async id =>  {
				const result = await userAPI.getCourseDataById(id);
				setData({...data, ...result?.data.user});
			})
		};
		asyncWrap();
		authors = data.map((author, index) => 
		<div className={s.CourseAuthor} key={index}>
			<div className={s.CourseAuthorPic}>
				<img src={StaticPathResolver(author.userPicture)} alt="author"/>
			</div>
			<div className={s.CourseAuthorName}>
				{`${author.lastName} ${author.firstName}`}
				<div className={s.CourseAuthorNick}>
					{author.userName}
				</div>
			</div>
		</div>
		)
	}, []);

	

	return (
		<div className={s.CourseAuthors}>
			{authors &&
				<div className={s.AuthorsHeader}>Преподаватели курса</div>
			}
			{authors}
		</div>
	)
}

export default Authors;
