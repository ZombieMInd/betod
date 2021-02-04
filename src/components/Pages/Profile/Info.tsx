import React, { FC, useState } from 'react'
import s from './Profile.module.scss';
import pic from '../../../assets/img/book.png';
import { useDispatch } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { ProfileMini, ProfileStatistics, SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import { Link, Redirect } from 'react-router-dom';
import { userAPI } from '../../../api/api';
import { logout } from '../../../redux/me/actions';

const moke : ProfileMini = {
	name : "Александра Константинопольская",
	tag : "@konstantinopolskaya",
	bio : "Родилась, закончила школу, поступила в ПГУПС Люблю собак",
	statistic : {
		current : 11,
		finished : 7,
		all : 18,
	},
} 

const Info: FC = () => {
	const dispatch = useDispatch();
	const data = moke; 

	const logOut = () => {
		dispatch(logout());
	}

	return (
		<div className={s.miniProfile}>
			<div className={s.profilePic}>
				<img src={pic}/>
			</div>
			<div className={s.body}>
				<div className={s.name}>
					<div className={s.full}>
						{data.name}
					</div>
					<div className={s.tag}>
						{data.tag}
					</div>
				</div>
				<div className={s.bio}>
					{data.bio}
				</div>
				<InfoStatistic statistic={data.statistic}/>
				<div className={s.control}>
					<Link to="/profile/edit" className={s.control}>Редактировать профиль</Link>
					<Link to="/settings" className={s.control}>Настройки</Link>
					<Link to="/" className={s.control} onClick={logOut}>Выйти из учетной записи</Link>
				</div>
			</div>
		</div>
	)
}

export default Info;

interface StatisticsProps {
	statistic : ProfileStatistics
}

const InfoStatistic: FC<StatisticsProps> = ({statistic} : StatisticsProps) => {
	
	return (
		<div className={s.statistic}>
			<div className={s.value}>{statistic.current}</div>
			<div className={s.value}>{statistic.finished}</div>
			<div className={s.value}>{statistic.all}</div>
		</div>
	)
}