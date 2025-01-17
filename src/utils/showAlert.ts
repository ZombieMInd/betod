import React from 'react'
import alertify from "alertifyjs";
import { AlertifyStatusEnum } from '../types/types';
alertify.set('notifier', 'position', 'top-right');

export const showAlert = (status: AlertifyStatusEnum, text: string) => {	
	alertify[status](text)
}
