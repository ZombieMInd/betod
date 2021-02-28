import React, { FC } from 'react'
import s from './Courses.module.scss'
import { useDispatch } from 'react-redux';
import { CourseStatistic } from '../../types/types';
import { styles } from './styles';
import withStyles, { WithStylesProps } from 'react-jss';

const mockData : CourseStatistic = {
	members : 956,
	finished : 154,
	started : 149,
};

interface IProps extends WithStylesProps<typeof styles> {
	
}

const Statistic: FC<IProps> = ({classes}) => {
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
		<div className={classes.CourseStatistic}>
			<div className={classes.number}>
				{data.members}
				<div className={classes.text}>поступили</div>
			</div>
			<div className={classes.number}>
				{data.started}
				<div className={classes.text}>учатся</div>
			</div>
			<div className={classes.number}>
				{data.finished}
				<div className={classes.text}>закончили</div>
			</div>
		</div>
	)
}

export default withStyles(styles)(Statistic);
