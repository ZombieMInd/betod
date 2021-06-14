import React, { Children, ReactChild } from "react";
import { FC, useEffect, useState } from "react";
import { userAPI } from "../../../api/UserApi";

export type UserType = {
	id: number
	name : string,
	username : string,
	pic? : string,
}

// export const UsersModel: FC<IUsersModel> = ({view}) => {
//     const [data, setData] = useState<UserType[]>();
//     useEffect( () => {
// 		async function asyncWrap() {
// 			const result = await userAPI.getAllUsers();
// 			setData(result?.data);
// 		};
// 		asyncWrap();
// 	}, []);

//     return (
// 		<>
// 			{view}
// 		</>
//     )
// }