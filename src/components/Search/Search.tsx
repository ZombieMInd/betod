import React, { FC, useState } from 'react'
import s from './Search.module.scss'
import { useDispatch } from 'react-redux';
import searchPic from '../../assets/img/search.png';

const SearchMain: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Search}>
			<div className={s.pic}>	
				<img src={searchPic} alt="search"/>
			</div>
			<div className={s.main}>
				<div className={s.text}>
					<div className={s.title}>Портал дистанционного обучения</div>
					<div className={s.subtitle}>Санкт-Петербургский государственный архитектурно-строительный университет</div>
				</div>
				<form className={s.form} onSubmit={search}>
					<input type="text" placeholder='поиск' className={s.input} value={searchStr} onChange={handleChangeSearch}/>
					
				</form>
			</div>
		</div>
	)
}

export default SearchMain;
