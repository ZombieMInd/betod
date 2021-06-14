 
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Redirect, Route } from 'react-router-dom'
import { FC } from 'react'
// import dropdownArrow from '../../../../assets/img/arrow.svg'
type PropsType = {
	Component: any
	auth: boolean
	path: string
}

export const GuardedRoute = ({ Component, auth, path, ...rest }: PropsType) => {
	return (
		<Route path={path} {...rest} render={(props) => (
			auth === true
				? <Component {...props} />
				: <Redirect to='/login' />
		)} />
	)
}
