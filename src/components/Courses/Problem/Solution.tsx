import React, { FC, useEffect, useState } from 'react'
import s from './Problem.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, CourseData, CourseProgram, ProblemData } from '../../../types/types';
import Program from '../Program/Program';
import { useParams } from 'react-router';
import { userAPI } from '../../../api/UserApi';
import AceEditor from "react-ace";
import { Dropdown } from '../../Common/Helpers/ArsDrop/Dropdown';
import Select from 'react-select';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/ext-language_tools"
import { SelectorType } from '../../Common/Helpers/ArsDrop/Dropdown';
import { MeType } from '../../../types/me';

// const mockData : CourseProgram = {
	
// };

enum Theme {
	ambiance = 'ambiance',
	chaos = 'chaos',
	chrome = 'chrome',
	clouds = 'clouds',
	clouds_midnight = 'clouds_midnight',

	cobalt = 'cobalt',
	crimson_editor = 'crimson_editor',
	dawn = 'dawn',
	dracula = 'dracula',
	dreamweaver = 'dreamweaver',
	eclipse = 'eclipse',
	github = 'github',
	gob = 'gob',
	gruvbox = 'gruvbox',
	idle_fingers = 'idle_fingers',
}

const themes = [
	'github',
	'chaos',
	'chrome',
	'clouds',
	// 'clouds_midnight',
	// 'cobalt',
	// 'crimson_editor',
	// 'dawn',
	// 'dracula',
	// 'dreamweaver',
	// 'eclipse',
	// 'gob',
	// 'gruvbox',
	// 'idle_fingers',
	// 'iplastic',
	// 'katzenmilch',
	// 'kr_theme',
	// 'kuroir',
	// 'merbivore',
	// 'merbivore_soft',
	// 'mono_industrial',
	// 'monokai',
	// 'pastel_on_dark',
	// 'solarized_dark',
	// 'solarized_light',
	// 'sqlserver',
	// 'terminal',
	// 'textmate',
	// 'tomorrow',
	// 'tomorrow_night',
	// 'tomorrow_night_blue',
	// 'tomorrow_night_bright',
	// 'tomorrow_night_eighties',
	// 'twilight',
	// 'vibrant_ink',
	// 'xcode',
];

const mods = [
	'c_cpp',
	'java',
]

const modsOptions : {id: number, label: string}[] = [];

const themesOptions = [
	{
		id: 0,
		label: 'ambiance'
	}
];

for (let mod in mods) {
	modsOptions.push({
		id: +mod + 1,
		label: mods[mod]
	});
}

for (let mod in themes) {
	themesOptions.push({
		id: +mod + 1,
		label: themes[mod]
	});
}

enum SolutionStatus {
	READY_TO_COMPILE = "В очереди на компиляцию",
	ON_COMPILE = "На компиляции",
	COMPILATION_ERROR = "Ошибка компиляции",
	RUNTIME_ERROR = "Ошибка времени исполнения",
	WRONG_ANSWER = "Неверный ответ",
	PROBLEM_SOLVED = "Верное решение"
}

const Solution = ({id} : {id : string}) => {
	const dispatch = useDispatch();
	let { courseid } : any = useParams();
	const [solution, setSolution] = useState<string>();
	const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
	const [theme, setTheme] = useState<number>(themesOptions[0].id);
	const [mode, setMode] = useState<number>(modsOptions[0].id);
	const [status, setStatus] = useState<string>();
	const [solutionId, setId] = useState<number>();
	

	const onChange = (value : string) => {
		setSolution(value);
	}

	const onChangeMode = (option : any) => {
		setMode(option);
	}

	const onChangeTheme = (option : any) => {
		setTheme(option);
	}

	const submitSolution = async () => {
		if (solution) {
			const result = await userAPI.submitSolutionText(courseid, +id, solution, mode)
			if (result && result.data.id) {
				setId(result.data.id);
			}
			// setId(36);
		}
	}

	const testSolution = async () => {
		if (solutionId) {
			const result = await userAPI.getProblemStatus(solutionId);
			if (result && result.data && result.data.status) {
				setStatus(result.data.status);
				if (result.data.status === "READY_TO_COMPILE"
					|| result.data.status === "ON_COMPILE") {
					setTimeout(testSolution, 2000)
				}
			} else {
				setTimeout(testSolution, 2000)
			}
		}
	}
	useEffect(() => {
		setTimeout(testSolution, 1000)
		// setInterval(testSolution, 5000);
	},[solutionId])



	return (
		<div className={s.solution}>
			<div className={s.controls}>
				<Dropdown 
					selectors={modsOptions}
					onChange={onChangeMode}
					selectedValue={mode}
				/>
				
				<Dropdown 
					selectors={themesOptions}
					onChange={onChangeTheme}
					selectedValue={theme}
				/>
			</div>
			
			<div className={s.editor}>
				<AceEditor
					mode={modsOptions[mode].label}
					theme={themesOptions[theme].label}
					onChange={onChange}
					name="UNIQUE_ID_OF_DIV"
					width='100%'
					editorProps={{ 
						$blockScrolling: true,
					}}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true
					}}
				/>
			</div>
			{solutionId && 
			<div className={s.status}>
				Статус последнего решения: {status}
			</div>
			}

			<div className={s.wrapper}>
				<button className={s.send} onClick={submitSolution}>Отправить</button>
			</div>
		</div>
	)
}

export default Solution;
