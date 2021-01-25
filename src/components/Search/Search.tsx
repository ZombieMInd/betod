import React, { FC, useState } from 'react'
import s from './Search.module.scss'
import { useDispatch } from 'react-redux';

const Search: FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.Search}>
			Search
		</div>
	)
}

export default Search;
