import React, { FC, useEffect, useState } from 'react'
import s from './Editor.module.scss'
import { useDispatch } from 'react-redux';
import { CourseProgram, ProblemData, UserComment } from '../../../types/types';
import { Link } from 'react-router-dom';
import CustomDropdown from '../../Common/Helpers/CustomDropdown';
import { userAPI } from '../../../api/UserApi';

const CorseEditor = ({id} : {id : number}) => {
	const dispatch = useDispatch();

	

	const [problems, setProblems] = useState<ProblemData[]>([]);
 
	useEffect( () => {
		async function asyncWrap() {
			const allProblems = await userAPI.getAllProblemsFromCourse(id);
			setProblems(allProblems?.data); 
		};
		asyncWrap();
	}, []);

	const data = {
		chapters: [
			{
				name: "Задачи курса",
				sections: problems,
			}
		]
	};

	const program = data.chapters.map((chapter) => 
		<div className={s.chapter}>
			<CustomDropdown header={
				<div className={s.name}>
					{chapter.name}
				</div>
				}>
				<ol className={s.sections}>
					{chapter.sections.map((section, index) => 
						<li className={s.section} key={index}>
							<Link to={`/course/${id}/problem/${section.id}`}>{section.problemName}</Link>
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

export default CorseEditor;
