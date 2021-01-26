import React, { FC } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { UserComment } from '../../types/types';

const mockData : UserComment[] = [
	{
		name : "Григорий томатов",
		rating : 4,
		message : "Курс довольно хорош, бесплатен, есть задачи для решения. Но во второй половине мало практики, иногда объяснения очень непонятные, но это учит гуглить и разбираться самому в вопросе.",
		date : "25.12.2020",
	},
	{
		name : "Ангелина Христорождественская",
		rating : 1,
		message : "Этот курс отнял у меня всё.",
		date : "25.12.2020",
	},
];

const Comments: FC = () => {
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

	const comments = data.map((comment) => 
		<div className={s.CourseComment}>
			<div className={s.CourseCommentAuthor}>
				{comment.name}
			</div>
			<div className={s.CourseCommentRating}>
				{comment.rating}
			</div>
			<div className={s.CourseCommentText}>
				{comment.message}
			</div>
			<div className={s.CourseCommentDate}>
				{comment.date}
			</div>
		</div>
	)

	return (
		<div className={s.Course}>
			{comments}
		</div>
	)
}

export default Comments;
