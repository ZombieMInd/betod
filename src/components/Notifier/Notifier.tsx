import React, { useState, useRef, FC, useEffect, useLayoutEffect } from 'react';
import s from './Notifier.module.scss'
import { UserType } from '../Users/Models/Users.Model';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../types/types';
import { MeType } from '../../types/me';
import { type } from 'os';
import ava2 from '../../assets/img/ava2.png';

const URL = "ws://localhost:8080/notify/";

type Notification = {
  message: string
  sender: UserType
}
// interface INotifierProps {
//   selectedDialog : string
// }

export const Notifier: FC = () => {
  const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
  const ws = useRef<WebSocket | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>()

  useEffect(() => {
    if (userInfo.id) {
      ws.current?.close()
      ws.current = new WebSocket(`${URL}${userInfo.id}` );
      ws.current.onmessage = (msg: MessageEvent) => { 
        let data = JSON.parse(msg.data)
        setNotifications(prev => prev ? [
          ...prev, 
          {
            message: data.message,
            sender: data.sender
          }
        ] : [{
          message: data.message,
          sender: data.sender
        }])
        setTimeout(() => {
          setNotifications(prev => prev?.slice(1, prev.length))
        }, 20000)
      }
    }
  }, [userInfo.id]);

  useEffect(() => {
    return () => {
      if (ws.current) {       
        ws.current.close();
      }                       
    };
  }, [ws]);

  // useEffect(() => {
  //   console.log("notifications", notifications)
  //   if (notifications && notifications.length > 0) {
      
  //   }
  // }, [notifications])

  // const clickHandler = () => {

  // }

  const pushes = notifications?.map((item, index) => {
    return (
      <NotificationEl notification={item} order={index} count={notifications.length - 1}/>
    )
  })

  return (
    <>
    {pushes}
    </>
  );  
};

interface INotificationProps {
  notification: Notification,
  count: number
  order: number
}

const NotificationEl: FC<INotificationProps> = ({notification, count, order}) => {
  const [offset, setOffset] = useState<number>(-200);
  // const [offsetRight, setOffsetRight] = useState<number>(32);

  useEffect(() => {
    setTimeout(() => setOffset(0), 100)
    // setTimeout(() => setOffsetRight(-500), 10000)
  })

  useEffect(() => {
    console.log(notification, order, offset)
  }, [])

  

  return (
    <div className={`${s.push}`} 
      key={order}
      style={
        {
          bottom: offset + 20 + 64 * (count - order) + 16 * (count - order),
          // right: offsetRight
        }
      }
    >
      <div className={s.picture}>
        <img src={notification?.sender.pic || ava2} alt="pic" />
      </div>
      <div className={s.sender}>
        <div className={s.name}>
          {notification?.sender.name}
        </div>
        <div className={s.message}>
          {notification?.message}
        </div>
      </div>
    </div>
  )
}