import React, { FC } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { CourseStatistic } from '../../types/types';

const mockData : CourseStatistic = {
	members : 956,
	finished : 154,
	started : 149,
};

const Statistic: FC = () => {
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


	return (
		<div className={s.CourseStatistic}>
			<div className={s.CourseStatisticNumber}>
				{data.members}
			</div>
			<div className={s.CourseStatisticNumber}>
				{data.started}
			</div>
			<div className={s.CourseStatisticNumber}>
				{data.finished}
			</div>
		</div>
	)
}

export default Statistic;
