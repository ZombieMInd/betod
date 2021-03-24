import React, { FC } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { CourseAuthor, CourseStatistic } from '../../types/types';
import mockPic from '../../assets/img/ava.png';

const mockData : CourseAuthor[] = [
	{
		name : "Максимова Кира Юрьевна",
		nickname : "@maximova",
		pic : "/static/author",
	},
	{
		name : "Константинопольский Владислав Александрович",
		nickname : "@konstantinopolsky",
		pic : "/static/author",
	}
];

const Authors: FC = () => {
	const dispatch = useDispatch();

	const data = mockData;
	// const [data, setData] = useState<CourseData>();
 
	// useEffect( () => {
	// 	async function asyncWrap() {
	// 		// const result = await userAPI.getCourseDataById(id);
	// 		setData(result?.data);
	// 	};
	// 	asyncWrap();
	// }, []);

	const authors = data.map((author, index) => 
		<div className={s.CourseAuthor} key={index}>
			<div className={s.CourseAuthorPic}>
				<img src={mockPic} alt="author"/>
			</div>
			<div className={s.CourseAuthorName}>
				{author.name}
				<div className={s.CourseAuthorNick}>
					{author.nickname}
				</div>
			</div>
		</div>
	)

	return (
		<div className={s.CourseAuthors}>
			<div className={s.AuthorsHeader}>Преподаватели курса</div>
			{authors}
		</div>
	)
}

export default Authors;
