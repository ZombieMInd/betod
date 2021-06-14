import React, { FC, useEffect, useState } from 'react'
import { userAPI } from '../../../api/UserApi';
import { Chat, Dialog } from '../../Chat/Chat';
import { UserType } from '../../Users/Models/Users.Model';
import { UsersBigView } from '../../Users/Views/Users.Big';

const ChatPage: FC = () => {
	const [selectedDialog, setSelectedDialog] = useState<Dialog>({
		chatID : 0,
		title : "Выберете диалог",
		last : "",
		pic : "",
	});

	const [usersData, setUsersData] = useState<UserType[]>();
    useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getAllUsers();
            console.log(result?.data);
            let res : UserType[] = [];
            for (const data of result?.data) {
                const id = data.id
                const username = data.userName;
                const name = `${data.lastName} ${data.firstName}`
                const pic = data.userPicture
                res.push({id, name, username, pic})
            }
			setUsersData(res);
		};
		asyncWrap();
	}, []);

	return (
		<>
		{usersData && 
		<>
			<Chat usersData={usersData} selectedDialog={selectedDialog} setSelectedDialog={setSelectedDialog}/>
			<UsersBigView usersData={usersData} setSelectedDialog={setSelectedDialog} />
		</>
		}
		</>
	)
}

export default ChatPage;
