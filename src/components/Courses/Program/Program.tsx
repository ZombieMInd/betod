import React, { FC } from 'react'
import s from './Program.module.scss'
import { useDispatch } from 'react-redux';
import { CourseProgram, UserComment } from '../../../types/types';
import { Link } from 'react-router-dom';
import CustomDropdown from '../../Common/Helpers/CustomDropdown';

const mockData : CourseProgram = {
	chapters : [
		{
			name : "Глава один",
			link : "/course/11/chapter/1",
			sections : [
				{
					name : "Раздел один",
					link : "/course/11/chapter/1/section/1",
				},
				{
					name : "Раздел два",
					link : "/course/11/chapter/1/section/2",
				},
				{
					name : "Раздел три",
					link : "/course/11/chapter/1/section/3",
				},
			]
		},
		{
			name : "Глава два",
			link : "/course/11/chapter/1",
			sections : [
				{
					name : "Раздел один",
					link : "/course/11/chapter/1/section/1",
				},
				{
					name : "Раздел два",
					link : "/course/11/chapter/1/section/2",
				},
				{
					name : "Раздел три",
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
		<div className={s.chapter}>
			<CustomDropdown header={
				<div className={s.name}>
					<Link to={chapter.link}>{chapter.name}</Link>
				</div>
				}>
				<ol className={s.sections}>
					{chapter.sections.map((section) => 
						<li className={s.section}>
							<Link to={section.link}>{section.name}</Link>
						</li>
					)}
				</ol>
			</CustomDropdown>
		</div>
	)

	return (
		<div className={s.program}>
			{program}
		</div>
	)
}

export default Program;
