

import React, { FC, useState } from 'react'
import s from './Login.module.scss'
import { useHistory } from "react-router-dom"
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/me/actions';
import { LoginInput } from './LoginInput';
import { CustomField } from '../../Common/FormComponents/FormComponents';

type LoginValuesType = {
	login: string
	password: string
}
const Login: FC = () => {
	const dispatch = useDispatch()

	const validationSchema = yup.object({
		// login: yup.string().required('Обязательное поле'),
		// password: yup.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа').required('Обязательное поле'),
	});


	const [err, setError] = useState('')

	const handleSubmit = async (dataObj: LoginValuesType, setSubmitting: (val: boolean) => void) => {
		setSubmitting(true);
		await dispatch(login(dataObj.login, dataObj.password, setError))
		setSubmitting(false);
	}

	return (
		<div className={s.login}>
			<Formik
				
				validateOnChange={true}
				initialValues={{ login: '', password: '' }}
				validationSchema={validationSchema}
				enableReinitialize={true}
				onSubmit={(data, { setSubmitting }) => {
					handleSubmit(data, setSubmitting)
				}}
			>
				{({ isSubmitting }) => (
					<Form className={s.loginForm}>
						<CustomField
							name="login"
							placeholder="Введите логин"
							Component={LoginInput}
							className={s.loginInputWrapper}
						/>
						
						<CustomField
							name="password"
							placeholder="Введите пароль"
							Component={LoginInput}
							type="password"
							className={s.loginInputWrapper}
						/>
						<button className={s.loginBtn} disabled={isSubmitting}>Войти</button>

						<div className={s.errorBlock}>
							<p>{err}</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Login;
