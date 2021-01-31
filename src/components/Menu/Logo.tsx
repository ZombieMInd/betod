import React, { FC, useState } from 'react'
import s from './Menu.module.scss'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Logo: FC = () => {
	const dispatch = useDispatch()

	return (
		<Link className={s.logo} to="/">
			<svg width="69" height="18" viewBox="0 0 69 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.59115 5.03521C8.81761 5.03521 9.91042 5.30383 10.8696 5.84106C11.8445 6.3783 12.6071 7.13675 13.1574 8.11642C13.7077 9.09609 13.9829 10.2259 13.9829 11.5058C13.9829 12.7856 13.7077 13.9233 13.1574 14.9188C12.6071 15.8985 11.8445 16.6569 10.8696 17.1941C9.91042 17.7314 8.81761 18 7.59115 18C6.72634 18 5.93228 17.8499 5.20898 17.5497C4.50141 17.2494 3.9039 16.7991 3.41646 16.1987V17.8341H0.609755V0.247477H3.55798V6.71802C4.06114 6.16499 4.65079 5.74626 5.32691 5.46184C6.01876 5.17742 6.77351 5.03521 7.59115 5.03521ZM7.26095 15.4639C8.3459 15.4639 9.23429 15.1005 9.92614 14.3736C10.6337 13.6468 10.9875 12.6908 10.9875 11.5058C10.9875 10.3207 10.6337 9.36471 9.92614 8.63786C9.23429 7.91101 8.3459 7.54758 7.26095 7.54758C6.55338 7.54758 5.91656 7.71349 5.3505 8.04531C4.78444 8.36134 4.33631 8.81957 4.00611 9.42001C3.67591 10.0205 3.51081 10.7157 3.51081 11.5058C3.51081 12.2958 3.67591 12.9911 4.00611 13.5915C4.33631 14.1919 4.78444 14.6581 5.3505 14.9899C5.91656 15.3059 6.55338 15.4639 7.26095 15.4639Z" fill="black"/>
				<path d="M28.619 11.5769C28.619 11.7823 28.6033 12.0746 28.5718 12.4538H18.6894C18.8623 13.3861 19.3105 14.1287 20.0338 14.6818C20.7728 15.219 21.6848 15.4876 22.7697 15.4876C24.1534 15.4876 25.2934 15.0294 26.1897 14.1129L27.7699 15.938C27.2038 16.6174 26.4884 17.1309 25.6236 17.4786C24.7588 17.8262 23.7839 18 22.699 18C21.3153 18 20.0967 17.7235 19.0432 17.1704C17.9897 16.6174 17.172 15.8511 16.5902 14.8714C16.0242 13.8759 15.7411 12.754 15.7411 11.5058C15.7411 10.2733 16.0163 9.16719 16.5667 8.18752C17.1327 7.19206 17.911 6.4178 18.9016 5.86477C19.8922 5.31173 21.0086 5.03521 22.2508 5.03521C23.4773 5.03521 24.5701 5.31173 25.5293 5.86477C26.5041 6.402 27.2589 7.16835 27.7935 8.16382C28.3438 9.14349 28.619 10.2812 28.619 11.5769ZM22.2508 7.40537C21.3074 7.40537 20.5055 7.68979 19.8451 8.25863C19.2004 8.81167 18.8073 9.55432 18.6658 10.4866H25.8123C25.6865 9.57012 25.3013 8.82747 24.6566 8.25863C24.0119 7.68979 23.21 7.40537 22.2508 7.40537Z" fill="black"/>
				<path d="M39.022 17.1467C38.6761 17.4312 38.2515 17.6445 37.7484 17.7867C37.2609 17.9289 36.742 18 36.1917 18C34.808 18 33.7388 17.6366 32.984 16.9097C32.2293 16.1829 31.8519 15.1242 31.8519 13.7337V7.64239H29.7764V5.27222H31.8519V2.38062H34.8001V5.27222H38.1729V7.64239H34.8001V13.6626C34.8001 14.2788 34.9495 14.7529 35.2483 15.0847C35.547 15.4007 35.9794 15.5587 36.5455 15.5587C37.2059 15.5587 37.7562 15.3849 38.1965 15.0373L39.022 17.1467Z" fill="black"/>
				<path d="M46.6933 18C45.4196 18 44.2718 17.7235 43.2497 17.1704C42.2277 16.6174 41.4258 15.8511 40.844 14.8714C40.2779 13.8759 39.9949 12.754 39.9949 11.5058C39.9949 10.2575 40.2779 9.14349 40.844 8.16382C41.4258 7.18415 42.2277 6.4178 43.2497 5.86477C44.2718 5.31173 45.4196 5.03521 46.6933 5.03521C47.9826 5.03521 49.1383 5.31173 50.1604 5.86477C51.1824 6.4178 51.9765 7.18415 52.5425 8.16382C53.1243 9.14349 53.4152 10.2575 53.4152 11.5058C53.4152 12.754 53.1243 13.8759 52.5425 14.8714C51.9765 15.8511 51.1824 16.6174 50.1604 17.1704C49.1383 17.7235 47.9826 18 46.6933 18ZM46.6933 15.4639C47.7782 15.4639 48.6745 15.1005 49.382 14.3736C50.0896 13.6468 50.4434 12.6908 50.4434 11.5058C50.4434 10.3207 50.0896 9.36471 49.382 8.63786C48.6745 7.91101 47.7782 7.54758 46.6933 7.54758C45.6083 7.54758 44.7121 7.91101 44.0045 8.63786C43.3126 9.36471 42.9667 10.3207 42.9667 11.5058C42.9667 12.6908 43.3126 13.6468 44.0045 14.3736C44.7121 15.1005 45.6083 15.4639 46.6933 15.4639Z" fill="black"/>
				<path d="M68.5698 0.247477V17.8341H65.7395V16.1987C65.2521 16.7991 64.6467 17.2494 63.9234 17.5497C63.2158 17.8499 62.4297 18 61.5648 18C60.3541 18 59.2613 17.7314 58.2864 17.1941C57.3273 16.6569 56.5725 15.8985 56.0222 14.9188C55.4718 13.9233 55.1967 12.7856 55.1967 11.5058C55.1967 10.2259 55.4718 9.09609 56.0222 8.11642C56.5725 7.13675 57.3273 6.3783 58.2864 5.84106C59.2613 5.30383 60.3541 5.03521 61.5648 5.03521C62.3982 5.03521 63.1608 5.17742 63.8527 5.46184C64.5445 5.74626 65.1342 6.17289 65.6216 6.74172V0.247477H68.5698ZM61.9186 15.4639C62.6262 15.4639 63.263 15.3059 63.8291 14.9899C64.3951 14.6581 64.8433 14.1919 65.1735 13.5915C65.5037 12.9911 65.6688 12.2958 65.6688 11.5058C65.6688 10.7157 65.5037 10.0205 65.1735 9.42001C64.8433 8.81957 64.3951 8.36134 63.8291 8.04531C63.263 7.71349 62.6262 7.54758 61.9186 7.54758C61.2111 7.54758 60.5742 7.71349 60.0082 8.04531C59.4421 8.36134 58.994 8.81957 58.6638 9.42001C58.3336 10.0205 58.1685 10.7157 58.1685 11.5058C58.1685 12.2958 58.3336 12.9911 58.6638 13.5915C58.994 14.1919 59.4421 14.6581 60.0082 14.9899C60.5742 15.3059 61.2111 15.4639 61.9186 15.4639Z" fill="black"/>
				<path d="M0.569824 0H6.41912V2.25191H0.569824V0Z" fill="black"/>
				<path d="M62.7129 0H68.5622V2.25191H62.7129V0Z" fill="black"/>
			</svg>
		</Link>
	)
}

export default Logo;