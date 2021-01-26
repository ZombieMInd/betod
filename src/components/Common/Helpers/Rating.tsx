import React, { FC, JSXElementConstructor, useEffect, useState } from 'react'
import s from './Helpers.module.scss'
import { useDispatch } from 'react-redux';
import { SwitchProps } from 'react-router-dom';
import { SwitcherProps } from '../../../types/types';
import { JsxElement } from 'typescript';

interface RatingProp {
	initRating : number;
}

const Rating: FC<RatingProp> = ({initRating} : RatingProp) => {
	const dispatch = useDispatch();

	const [rating, setRating] = useState<number>();
	const [tempRating, setTempRating] = useState<number>();
	
	const handleMouseover = (rat : number) => {
		setRating(rat);
		setTempRating(rating);
	}

	const handleMouseout = () => {
		setRating(tempRating);
	}

	const rate = (rat : number) => {
		setRating(rat);
		setTempRating(rat);
	}

	useEffect( () => {
		setRating(initRating);
		setTempRating(initRating);
	}, []);

	const stars = () => <div></div>;

	return (
		<div className="switcher">
			{stars}
		</div>
	)
}

export default Rating;
