import React, { FC, useState } from 'react'
import s from './Search.module.scss'
import { useDispatch } from 'react-redux';
import searchPic from '../../assets/img/search.png';

const SearchMain: FC = () => {
	const dispatch = useDispatch()
	const [searchStr, setSearchStr] = useState<string>("");

	const handleChangeSearch = () => {
		search();
	}

	const search = () => {
		console.log("searching...");
	}

	return (
		<div className={s.search}>
			<div className={s.pic}>	
				<img src={searchPic} alt="search"/>
			</div>
			<div className={s.main}>
				<div className={s.text}>
					<div className={s.title}>Портал дистанционного обучения</div>
					<div className={s.subtitle}>Санкт-Петербургский государственный архитектурно-строительный университет</div>
				</div>
				<form className={s.form} onSubmit={search}>
					<input type="text" placeholder='Поиск курса или предмета' className={s.input} value={searchStr} onChange={handleChangeSearch}/>
					<button className={s.button}>Поиск</button>
					<div className={s.searchIcon}>
						<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5611 7.41981C11.5611 9.51849 9.85974 11.2198 7.76106 11.2198C5.66238 11.2198 3.96106 9.51849 3.96106 7.41981C3.96106 5.32113 5.66238 3.61981 7.76106 3.61981C9.85974 3.61981 11.5611 5.32113 11.5611 7.41981ZM10.7833 11.1491C9.95813 11.8186 8.90645 12.2198 7.76106 12.2198C5.11009 12.2198 2.96106 10.0708 2.96106 7.41981C2.96106 4.76885 5.11009 2.61981 7.76106 2.61981C10.412 2.61981 12.5611 4.76885 12.5611 7.41981C12.5611 8.5652 12.1599 9.61688 11.4904 10.442L14.5146 13.4663C14.7099 13.6615 14.7099 13.9781 14.5146 14.1734C14.3194 14.3686 14.0028 14.3686 13.8075 14.1734L10.7833 11.1491Z" fill="black"/>
						</svg>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SearchMain;
