 
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import s from './Dropdown.module.scss'
import dropdownArrow from '../../../../assets/img/arrow.svg'
type PropsType = {
	selectors: Array<SelectorType>
	selectedValue?: number | string
	onChange: (val: string | number) => void
}

export type SelectorType = {
	id: number | string
	label: string
}


export const Dropdown = ({ selectedValue, selectors = [], onChange, ...props }: PropsType) => {

	const [activeSelector, setActiveSelector] = useState({} as SelectorType)

	useEffect(() => {
		if (selectors.length) {
			let IDs = selectors.map(selector => selector.id)
			let index = 0

			if (selectedValue) {
				index = IDs.indexOf(selectedValue)
			}
			setActiveSelector(selectors[index])
		}

	}, [selectedValue])

	const handleChange = (selector: SelectorType) => {
		setActiveSelector(selector); 
		onChange(selector.id)
		setOpen(!open);
	}


	const [open, setOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		const checkTarget = (e: any) => {
			if (dropdownRef.current && !(dropdownRef as any).current.contains(e.target)) {
				setOpen(false)
				e.stopPropagation()
			}
		}

		document.addEventListener('touchstart', checkTarget)
		document.addEventListener('click', checkTarget)

		return () => { document.removeEventListener('click', () => { }) }
	}, [])

	return (
		<div className={s.selectorBlock} ref={dropdownRef}>
			<div className={s.activeSelector} onClick={() => setOpen(!open)}>
				<p>{activeSelector.label}</p>
				<img className={classNames(s.arrow, { [s.rotate]: open })} src={dropdownArrow} alt="arrow" />
			</div>
			<div className={`${s.selectorsList} ${open ? s.active : ""}`}>
				{selectors.map(selector => (
					<div
						key={selector.id}
						className={classNames(s.selectorElement, { [s.active]: selector.id === activeSelector.id })}
						onClick={() => { handleChange(selector) }}
					>
						{selector.label}
					</div>
				))}
			</div>
		</div>
	)
}
