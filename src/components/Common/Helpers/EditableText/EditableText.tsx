 
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import s from './EditableText.module.scss'
import dropdownArrow from '../../../../assets/img/arrow.svg'
import { createUseStyles } from 'react-jss'
import { MeType } from '../../../../types/me'
import { AppStateType } from '../../../../types/types'
import { useSelector } from 'react-redux'
import { Type } from 'typescript'

type PropsType = {
	text : string,
	setText : any,
	prefix? : string,
	isArea? : boolean,
}

export const EditableText = ({text, setText, prefix, isArea}: PropsType) => {
	const styles = useStyles();
	const [editing, setEditing] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>(text);

	useEffect(() => {
		if (text)
			setInputText(text);
	}, [text])

	// useEffect(() => {
	// 	autosize(document.querySelector('textarea'));
	// }, [inputText])

	const handleKeyDown = (e: React.KeyboardEvent<any>) => {
		e.currentTarget.style.height = 'inherit';
		e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; 
		// In case you have a limitation
		// e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
	}

	const handleFocus = (e: React.FocusEvent<any>) => {
		e.currentTarget.style.height = 'inherit';
		e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; 
		// In case you have a limitation
		// e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
	}

	const handlePencilClick = () => {
		setEditing(true)
	}

	const handleInputBlur = async () => {
		setText(inputText)
		setEditing(false)
	}

	const handleChangeInput = (e: React.ChangeEvent<any>) => {
		setInputText(e.currentTarget.value);
	}

	const pencil = () => {
		return (
			<div className={styles.pencil} onClick={handlePencilClick}>
				<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path  d="M10.6202 0.246422C10.4249 0.05116 10.1083 0.05116 9.91309 0.246422L1.98118 8.17833C1.89122 8.26829 1.81925 8.37459 1.76914 8.49152L0.207068 12.1363C0.12653 12.3243 0.168518 12.5423 0.313087 12.6869C0.457657 12.8314 0.675679 12.8734 0.8636 12.7929L4.50843 11.2308C4.62536 11.1807 4.73166 11.1087 4.82162 11.0188L12.7535 3.08686C12.8473 2.99309 12.9 2.86592 12.9 2.73331C12.9 2.6007 12.8473 2.47352 12.7535 2.37976L10.6202 0.246422ZM2.68828 8.88544L10.2666 1.30708L11.6929 2.73331L4.11451 10.3117L2.52586 10.9925L2.00743 10.4741L2.68828 8.88544Z" fill="#828282"/>
				</svg>
			</div>
		)
	}

	return (
		<div className={styles.root}>
			{editing ?
				!isArea ?
					<input autoFocus={true} className={`${styles.text} editable`} onChange={handleChangeInput} onBlur={handleInputBlur} value={inputText}/>
				:
					<textarea autoFocus={true} className={`${styles.text} editable`} onChange={handleChangeInput} onBlur={handleInputBlur} value={inputText} onKeyDown={handleKeyDown} onFocus={handleFocus}/>
			:
				<>
				<div className={styles.text}>{(prefix ? prefix : '') + text}</div>
				{pencil()}
				</>
			}
		</div>
	)
	
}

const useStyles = createUseStyles({
    root : {
		position: 'relative',
		paddingRight: '16px',
	},

	pencil : {
		position: 'absolute',
		top: 0,
		right: 0,
		cursor: 'pointer',

		'&:hover svg path' : {
			fill: 'black',
		}
	},

	text : {
		wordWrap: 'break-word',

		'&.editable': {
			border: 0,
			backgroundColor: '#F2F2F2',
			font: 'inherit',
			padding: '4px',
			resize: 'none',
			maxWidth: '100%',
		},

		// '&.area' : {
			
		// }
	}
})
