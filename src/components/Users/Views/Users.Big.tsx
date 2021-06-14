import React, { useEffect, useState } from "react";
import { FC } from "react";
import { classNames } from "react-select/src/utils";
import { userAPI } from "../../../api/UserApi";
import { Dialog } from "../../Chat/Chat";
import { UserType } from "../Models/Users.Model";
import s from './View.module.scss'
import ava from '../../../assets/img/avatar.png';
import { StaticPathResolver } from "../../../utils/staticPathResolver";
import { SwitcherProps } from "../../../types/types";
import ContentSwitcher from "../../Common/Helpers/ContentSwitcher";

interface IChatProps {
    usersData : UserType[]
    setSelectedDialog : React.Dispatch<React.SetStateAction<Dialog>>
  }

export const UsersBigView: FC<IChatProps> = ({usersData, setSelectedDialog}) => {
    

    
    const users = usersData?.map(item => 
        <div className={s.userWrapper} onClick={() => setSelectedDialog({
            chatID: item.id,
            title: item.name,
            last: "",
            pic: item.pic || "",
        })}>
            <div className={s.pic}>
                <img src={item.pic ? StaticPathResolver(item.pic) : ava} alt="ava"/>
            </div>
            <div className={s.user}>
                <div className={s.name}>{item.name}</div>
                {item.username && 
                    <div className={s.username}>@{item.username}</div>
                }
            </div>
        </div>
    )
    const content : SwitcherProps[] = [
		{
			name : "Друзья",
			content: (<div className={s.users}>
                        {users}
                    </div>)
		}
	];
    return (
        <>
        {usersData && 
            <div className={s.usersWrapper}>
                <ContentSwitcher contents={content}/>
            </div>
        }
        </>
    )
}