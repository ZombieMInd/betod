import React, { FC, useEffect, useState } from 'react'
import s from './Problem.module.scss'
import { useDispatch } from 'react-redux';
import { CourseData, CourseProgram, ProblemData } from '../../../types/types';
import Program from '../Program/Program';
import { useParams } from 'react-router';
import { userAPI } from '../../../api/UserApi';
import Solution from './Solution';
import { Link } from 'react-router-dom';

// const mockData : CourseProgram = {
	
// };

const Problem: FC = () => {
	const dispatch = useDispatch();
	let { courseid, id } : any = useParams();

	// const data = mockData;
	const [data, setData] = useState<ProblemData>();
 
	useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getProblemByID(id);
			setData(result?.data);
		};
		asyncWrap();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [id]);

	const [nextProblem, setNextProblem] = useState<number>();
 
	useEffect( () => {
		async function asyncWrap() {
			const allProblems = await userAPI.getAllProblemsFromCourse(courseid);
			console.log(allProblems?.data);
			if (allProblems && allProblems.data && allProblems.data[+id]) {
				setNextProblem(allProblems.data[+id].id);
				 
			}
		};
		asyncWrap();
	}, [id]);

	return (
		<div className={s.problem}>
			<div className={s.main}>
				<div className={s.title}>
					{data?.problemName}
				</div>
				<div className={s.problemBody}>
					<div className={s.text}>
						{data?.problemText.split("\n").map((i : string, key : number) => {
                        	return <p className = {s.description} key={key}>{i}</p>;
                    	})}
					</div>
					<div className={s.solution}>
						<Solution id={id}/>
					</div>
					{nextProblem &&
						<div className={s.buttons}>
							<Link to={`/course/${courseid}/problem/${nextProblem}`} className={s.next}>
								следующая задача
							</Link>
						</div>
					}
				</div>
			</div>
			<div className={s.right}>
				<Program id={courseid}/>
			</div>
		</div>
	)
}

export default Problem;
