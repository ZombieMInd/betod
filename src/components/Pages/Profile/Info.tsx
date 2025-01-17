import React, { FC, useEffect, useRef, useState } from 'react'
import s from './Profile.module.scss';
import pic from '../../../assets/img/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import CourseGrid from '../../Courses/Grid';
import { AppStateType, ProfileMini, ProfileStatistics, SwitcherProps } from '../../../types/types';
import Login from '../Login/Login';
import Course from '../../Courses/Course';
import ContentSwitcher from '../../Common/Helpers/ContentSwitcher';
import Search from '../../Search/Search';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../../redux/me/actions';
import withStyles, { WithStylesProps } from 'react-jss';
import { MeType } from '../../../types/me';
import { EditableText } from '../../Common/Helpers/EditableText/EditableText';
import { userAPI } from '../../../api/UserApi';

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

const styles = {
	button: {
	  backgroundColor: 'yellow'
	},
	label: {
	  fontWeight: 'bold'
	}
}

interface IProps extends WithStylesProps<typeof styles> {
	
}

const Info: FC<IProps> = ({classes}) => {
	const dispatch = useDispatch();
	const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
	const data = moke; 
	const [avatar, setAvatar] = useState('');
	const [username, setUsername] = useState<string>(userInfo.username);
	const [bio, setBio] = useState<string>(userInfo.userDescription);
	const picInput = useRef(null);

	useEffect(() => {
		setUsername(userInfo.username);
		setBio(userInfo.userDescription);
		if (userInfo.userPicture)
			setAvatar(userInfo.userPicture)
		else 
			setAvatar(pic)
	}, [userInfo])

	useEffect(() => {
		async function asyncWrap() {
			if (username) {
				const result = await userAPI.editProfile({
					id: userInfo.id, 
					userName : username, 
				});
			}
		};
		asyncWrap();
	}, [username])

	useEffect(() => {
		async function asyncWrap() {
			if (username) {
				const result = await userAPI.editProfile({
					id: userInfo.id, 
					userDescription: bio
				});
			}
		};
		asyncWrap();
	}, [bio])


	const logOut = () => {
		dispatch(logout());
	}

	const handleAvatarClick = () => {
		if (picInput && picInput.current) {
			const curr = picInput.current! as any
            curr.click()
		}
	} 

	const handleAvatarChange = (e : any) => {
		e.preventDefault();
		const files = [...e.currentTarget.files];
		const data = new FormData();
		data.append('avatar', files[0]);
		const result = userAPI.postProfilePic(data);
		setAvatar(URL.createObjectURL(files[0]))
	}

	return (
		<div className={s.miniProfile}>
			<div className={s.profilePic} onClick={handleAvatarClick}>
				<img src={avatar}/>
				<div className={s.changePic}>Загрузить фото</div>
				<input type='file' style={{display: 'none'}} ref={picInput} onChange={handleAvatarChange}/>
			</div>
			<div className={s.body}>
				<div className={s.name}>
					<div className={s.full}>
						{userInfo.lastName + " " + userInfo.firstName}
						
					</div>
					<div className={s.tag}>
						<EditableText prefix='@' text={username} setText={setUsername}/>
					</div>
				</div>
				<div className={s.bio}>
					<EditableText text={bio} setText={setBio} isArea={true}/>
				</div>
				<InfoStatistic statistic={data.statistic}/>
				<div className={s.controls}>
					<Link to="/profile/edit" className={s.controlItem}>
						<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path  fill-rule="evenodd" clip-rule="evenodd" d="M5.29996 2.14069C5.29996 1.86454 5.0761 1.64069 4.79996 1.64069C4.52382 1.64069 4.29996 1.86454 4.29996 2.14069L4.29996 8.00735C4.29996 8.03442 4.30211 8.06099 4.30625 8.08689C3.08789 8.31799 2.16663 9.38842 2.16663 10.674C2.16663 11.9596 3.08789 13.0301 4.30625 13.2611C4.30211 13.287 4.29996 13.3136 4.29996 13.3407V14.9407C4.29996 15.2168 4.52382 15.4407 4.79996 15.4407C5.0761 15.4407 5.29996 15.2168 5.29996 14.9407V13.3407C5.29996 13.3136 5.29781 13.287 5.29367 13.2611C6.51203 13.0301 7.43329 11.9596 7.43329 10.674C7.43329 9.38842 6.51203 8.31799 5.29367 8.08689C5.29781 8.06099 5.29996 8.03442 5.29996 8.00735L5.29996 2.14069ZM11.7 2.14069C11.7 1.86454 11.4761 1.64069 11.2 1.64069C10.9238 1.64069 10.7 1.86454 10.7 2.14069V3.74069C10.7 3.76776 10.7021 3.79432 10.7063 3.82023C9.48789 4.05132 8.56663 5.12175 8.56663 6.40735C8.56663 7.69296 9.48789 8.76339 10.7063 8.99448C10.7021 9.02038 10.7 9.04695 10.7 9.07402V14.9407C10.7 15.2168 10.9238 15.4407 11.2 15.4407C11.4761 15.4407 11.7 15.2168 11.7 14.9407V9.07402C11.7 9.04695 11.6978 9.02038 11.6937 8.99448C12.912 8.76339 13.8333 7.69296 13.8333 6.40735C13.8333 5.12175 12.912 4.05132 11.6937 3.82023C11.6978 3.79432 11.7 3.76776 11.7 3.74069V2.14069ZM4.79996 9.04069C3.89789 9.04069 3.16663 9.77195 3.16663 10.674C3.16663 11.5761 3.89789 12.3074 4.79996 12.3074C5.70202 12.3074 6.43329 11.5761 6.43329 10.674C6.43329 9.77195 5.70202 9.04069 4.79996 9.04069ZM9.56663 6.40735C9.56663 5.50529 10.2979 4.77402 11.2 4.77402C12.102 4.77402 12.8333 5.50529 12.8333 6.40735C12.8333 7.30942 12.102 8.04069 11.2 8.04069C10.2979 8.04069 9.56663 7.30942 9.56663 6.40735Z" fill="black"/>
						</svg>
						Редактировать профиль
					</Link>
					<Link to="/settings" className={s.controlItem}>
						<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path  fill-rule="evenodd" clip-rule="evenodd" d="M7.54246 1.15259C7.11896 1.15259 6.75187 1.44577 6.65824 1.85879L6.40428 2.97897C6.00001 3.09654 5.61436 3.25754 5.25277 3.45647L4.28103 2.84391C3.92277 2.61807 3.45589 2.67033 3.15643 2.96979L2.50993 3.61629C2.21047 3.91575 2.15821 4.38263 2.38405 4.74089L2.99683 5.71298C2.79807 6.07447 2.63721 6.46 2.51976 6.86413L1.39969 7.11806C0.986664 7.21169 0.693481 7.57878 0.693481 8.00229V8.91657C0.693481 9.34008 0.986664 9.70717 1.39969 9.8008L2.51989 10.0548C2.63741 10.459 2.79836 10.8446 2.99723 11.2062L2.38455 12.1781C2.15871 12.5364 2.21097 13.0033 2.51043 13.3027L3.15693 13.9492C3.45639 14.2487 3.92327 14.3009 4.28153 14.0751L5.25352 13.4624C5.61489 13.6611 6.00029 13.822 6.40428 13.9395L6.65824 15.0597C6.75187 15.4727 7.11896 15.7659 7.54246 15.7659H8.45675C8.88025 15.7659 9.24734 15.4727 9.34098 15.0597L9.59484 13.9399C9.99917 13.8224 10.3849 13.6615 10.7466 13.4626L11.7185 14.0753C12.0767 14.3012 12.5436 14.2489 12.8431 13.9494L13.4896 13.3029C13.789 13.0035 13.8413 12.5366 13.6155 12.1783L13.003 11.2068C13.202 10.845 13.3631 10.4592 13.4807 10.0547L14.6006 9.8008C15.0136 9.70717 15.3068 9.34008 15.3068 8.91657V8.00229C15.3068 7.57878 15.0136 7.21169 14.6006 7.11806L13.4808 6.8642C13.3633 6.45983 13.2023 6.07409 13.0034 5.71241L13.616 4.74068C13.8418 4.38241 13.7895 3.91553 13.4901 3.61607L12.8436 2.96957C12.5441 2.67011 12.0772 2.61785 11.719 2.84369L10.7473 3.45622C10.3854 3.25717 9.99945 3.09611 9.59484 2.97856L9.34098 1.85879C9.24734 1.44577 8.88025 1.15259 8.45675 1.15259H7.54246ZM5.24869 4.52568C5.81051 4.13195 6.46055 3.85552 7.16325 3.73195L7.54246 2.05925H8.45675L8.83591 3.73171C9.53897 3.85513 10.1893 4.13155 10.7514 4.52539L12.2025 3.61068L12.849 4.25718L11.9342 5.70825C12.3279 6.27018 12.6043 6.92033 12.7277 7.62314L14.4001 8.00229V8.91657L12.7276 9.29573C12.6041 9.99865 12.3276 10.6489 11.9338 11.2108L12.8485 12.6618L12.202 13.3083L10.7508 12.3935C10.1888 12.7871 9.5387 13.0634 8.83591 13.1867L8.45675 14.8592H7.54246L7.16325 13.1865C6.46082 13.063 5.81102 12.7867 5.24936 12.3932L3.79804 13.3081L3.15154 12.6616L4.0664 11.2103C3.67276 10.6485 3.39642 9.99848 3.27292 9.2958L1.60015 8.91657V8.00229L3.27285 7.62307C3.39626 6.9205 3.67247 6.27055 4.06595 5.70876L3.15104 4.2574L3.79754 3.6109L5.24869 4.52568ZM9.62675 8.45908C9.62675 9.35742 8.89851 10.0857 8.00017 10.0857C7.10184 10.0857 6.3736 9.35742 6.3736 8.45908C6.3736 7.56075 7.10184 6.83251 8.00017 6.83251C8.89851 6.83251 9.62675 7.56075 9.62675 8.45908ZM10.5867 8.45908C10.5867 9.88761 9.4287 11.0457 8.00017 11.0457C6.57165 11.0457 5.4136 9.88761 5.4136 8.45908C5.4136 7.03056 6.57165 5.87251 8.00017 5.87251C9.4287 5.87251 10.5867 7.03056 10.5867 8.45908Z" fill="black"/>
						</svg>
						Настройки
					</Link>
					<Link to="/" className={s.controlItem} onClick={logOut}>
						<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.79999 1.47742C4.52385 1.47742 4.29999 1.70127 4.29999 1.97742C4.29999 2.25356 4.52385 2.47742 4.79999 2.47742H12.8C12.8184 2.47742 12.8333 2.49234 12.8333 2.51075V14.2441C12.8333 14.2625 12.8184 14.2774 12.8 14.2774H4.79999C4.52385 14.2774 4.29999 14.5013 4.29999 14.7774C4.29999 15.0536 4.52385 15.2774 4.79999 15.2774H12.8C13.3707 15.2774 13.8333 14.8148 13.8333 14.2441V2.51075C13.8333 1.94006 13.3707 1.47742 12.8 1.47742H4.79999ZM7.02021 5.62386C6.82495 5.4286 6.50837 5.4286 6.3131 5.62386C6.11784 5.81913 6.11784 6.13571 6.3131 6.33097L7.85955 7.87742H0.533325C0.257183 7.87742 0.0333252 8.10127 0.0333252 8.37742C0.0333252 8.65356 0.257183 8.87742 0.533325 8.87742H7.85955L6.3131 10.4239C6.11784 10.6191 6.11784 10.9357 6.3131 11.131C6.50837 11.3262 6.82495 11.3262 7.02021 11.131L9.42021 8.73097C9.61547 8.53571 9.61547 8.21913 9.42021 8.02386L7.02021 5.62386Z" fill="black"/>
						</svg>
						Выйти из учетной записи
					</Link>
				</div>
			</div>
		</div>
	)
}

export default withStyles(styles)(Info);

interface StatisticsProps {
	statistic : ProfileStatistics
}

const InfoStatistic: FC<StatisticsProps> = ({statistic} : StatisticsProps) => {
	
	return (
		<div className={s.statistic}>
			<div className={s.item}>
				<div className={s.value}>{statistic.current}</div>
				<div className={s.statDesc}>текущие</div>
			</div>
			<div className={s.item}>
				<div className={s.value}>{statistic.finished}</div>
				<div className={s.statDesc}>изучено</div>
			</div>
			<div className={s.item}>
				<div className={s.value}>{statistic.all}</div>
				<div className={s.statDesc}>всего</div>
			</div>
		</div>
	)
}