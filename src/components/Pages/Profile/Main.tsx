import React, { FC, useState } from 'react'
import s from './Profile.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { AppStateType, SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import Actions from './Actions';
import Info from './Info';
import CourseLast from '../../Courses/Last';
import { Dropdown } from '../../Common/FormComponents/Components/DropDown';
import CustomDropdown from '../../Common/Helpers/CustomDropdown';
import CourseList from '../../Courses/List/List';
import LoginPage from '../Login/Page';

const ProfileMain: FC = () => {
    const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	if (!logged) {
        return <LoginPage/>
    }
	
	return (
		<div className={s.pageWrapper}>
			<div className={s.main}>
				<div style={{marginBottom: "16px 0 0 0"}}>
					<CustomDropdown header={<div className={s.dropName}>Последние действия</div>}><Actions/></CustomDropdown>
				</div>
				<CustomDropdown header={<div className={s.dropName}>Последние курсы</div>}><CourseList/></CustomDropdown>
			</div>
			
			<Info/>
		</div>
	)
}

export default ProfileMain;
