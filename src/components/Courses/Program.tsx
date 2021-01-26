import React, { FC } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { CourseProgram, UserComment } from '../../types/types';
import { Link } from 'react-router-dom';

const mockData : CourseProgram = {
	chapters : [
		{
			name : "Глава 1",
			link : "/course/11/chapter/1",
			sections : [
				{
					name : "Раздел 1",
					link : "/course/11/chapter/1/section/1",
				},
				{
					name : "Раздел 2",
					link : "/course/11/chapter/1/section/2",
				},
				{
					name : "Раздел 3",
					link : "/course/11/chapter/1/section/3",
				},
			]
		},
		{
			name : "Глава 2",
			link : "/course/11/chapter/1",
			sections : [
				{
					name : "Раздел 1",
					link : "/course/11/chapter/1/section/1",
				},
				{
					name : "Раздел 2",
					link : "/course/11/chapter/1/section/2",
				},
				{
					name : "Раздел 3",
					link : "/course/11/chapter/1/section/3",
				},
			]
		}
	],
};

const Program: FC = () => {
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

	const program = data.chapters.map((chapter) => 
		<div className={s.CourseComment}>
			<div className={s.CourseCommentAuthor}>
				<Link to={chapter.link}>{chapter.name}</Link>
			</div>
			{chapter.sections.map((section) => 
				<div className={s.CourseCommentAuthor}>
					<Link to={section.link}>{section.name}</Link>
				</div>
			)}
		</div>
	)

	return (
		<div className={s.Course}>
			{program}
		</div>
	)
}

export default Program;
