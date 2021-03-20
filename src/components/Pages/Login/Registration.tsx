

import React, { FC, useState } from 'react'
import s from './Login.module.scss'
import { useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/me/actions';
import { LoginInput } from './LoginInput';
import { CustomField } from '../../Common/FormComponents/FormComponents';
import { userAPI } from '../../../api/UserApi';
import { RegisterValuesType } from '../../../types/types';


const Registration: FC = () => {
	const dispatch = useDispatch()
	const history = useHistory();


	const validationSchema = yup.object({
		// login: yup.string().required('Обязательное поле'),
		// password: yup.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа').required('Обязательное поле'),
	});


	const [err, setError] = useState('')

	const handleSubmit = async (dataObj: RegisterValuesType, setSubmitting: (val: boolean) => void) => {
		setSubmitting(true);
		const res = await userAPI.regUser(dataObj);
		setSubmitting(false);
		console.log(res);
		history.push("/");
	}

	return (
		<div className={s.login}>
			<Formik
				
				validateOnChange={true}
				initialValues={{ 
					userName: '',
					password: '',
					passwordConfirm: '',
					lastName: '',
					firstName: '',
					recordBookNumber: '',
				}}
				validationSchema={validationSchema}
				enableReinitialize={true}
				onSubmit={(data, { setSubmitting }) => {
					handleSubmit(data, setSubmitting)
				}}
			>
				{({ isSubmitting }) => (
					<Form className={s.loginForm}>
						<CustomField
							name="lastName"
							placeholder="Фамилия"
							Component={LoginInput}
							className={s.loginInputWrapper}
						/>
						
						<CustomField
							name="firstName"
							placeholder="Имя"
							Component={LoginInput}
							className={s.loginInputWrapper}
						/>
						<CustomField
							name="recordBookNumber"
							placeholder="Номер студенческого билета"
							Component={LoginInput}
							className={s.loginInputWrapper}
						/>

						<CustomField
							name="userName"
							placeholder="Ник"
							Component={LoginInput}
							className={s.loginInputWrapper}
						/>

						<CustomField
							name="password"
							placeholder="Пароль"
							Component={LoginInput}
							type="password"
							className={s.loginInputWrapper}
						/>

						<CustomField
							name="passwordConfirm"
							placeholder="Повтор пароль"
							Component={LoginInput}
							type="password"
							className={s.loginInputWrapper}
						/>
						
						<div className={s.footer}>
							<div className={s.remember}></div>
							<button className={s.loginBtn} disabled={isSubmitting}>Далее</button>
						</div>

						<div className={s.errorBlock}>
							<p>{err}</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Registration;
