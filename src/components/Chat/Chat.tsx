import React, { useState, useRef, FC, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { MeType } from '../../types/me';
import s from './Chat.module.scss'
import { AppStateType } from '../../types/types';
import ava from '../../assets/img/avatar.png';
import ava2 from '../../assets/img/ava2.png';
import ava3 from '../../assets/img/ava3.png';
import ava4 from '../../assets/img/ava4.png';
import classNames from 'classnames';
import { userAPI } from '../../api/UserApi';
import { StaticPathResolver } from '../../utils/staticPathResolver';
import { UserType } from '../Users/Models/Users.Model';

const URL = "ws://localhost:8080/chat/";

type ChatMessage = {
	data : string,
	sender : string | null,
}

interface IChatMessage {
  data : ChatMessage,
  index : number
}

export type Dialog = {
  chatID: number
  title: string,
  last: string,
  pic: string,
}

interface IChatProps {
  selectedDialog : Dialog
  setSelectedDialog : React.Dispatch<React.SetStateAction<Dialog>>
  usersData : UserType[]
}

export const Chat: FC<IChatProps> = ({selectedDialog, setSelectedDialog, usersData} : IChatProps) => {
  const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
  const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const [searchStr, setSearchStr] = useState<string>('');
  const testValue = { messages, setMessages };
  const [messageToSend, setMessageToSend] = useState<ChatMessage>({data : '', sender : userInfo.username});

  const [dialogsDTO, setDialogs] = useState<Dialog[]>()
  const [dialogList, setDialogList] = useState<Dialog[]>()

  // const ws = useRef(new WebSocket(URL));
  const ws = useRef<WebSocket | null>(null);  // changed here
  const messageRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight - messageRef.current.clientHeight;
    }
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageToSend({data: e.currentTarget.value, sender : `${userInfo.lastName} ${userInfo.firstName}`});
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.ctrlKey){
      e.preventDefault();
      send();
    } else if (e.key == "Enter") { 
      setMessageToSend({data : messageToSend.data + '\n', sender : `${userInfo.lastName} ${userInfo.firstName}`});
    }
  }

  const submitMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    send();
  };

  const send = () => {
    if (messageToSend.data !== '') {
      if (ws.current) {   
        ws.current.send(messageToSend.data);
      } 

      addMessage(messageToSend);
      setMessageToSend({data : '', sender : userInfo.username});
      setDialogs(prev => 
        prev && prev.map(item => 
          item.chatID === selectedDialog.chatID 
          ? {...item, last: `${messageToSend.sender}:${messageToSend.data}`} 
          : item
        )
      )
    }
  }
  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => {   
      return [...prev, msg];  
    });                       
    
  };

  const search = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log('search...');
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('search...');
    setSearchStr(e.currentTarget.value);
  }

  // websocket onmessage
  useEffect(() => {
    if (!selectedDialog) {
      return
    }
    // ws.current?.send("close")
    ws.current?.close()
    if (selectedDialog.chatID !== 0) {
      ws.current = new WebSocket(`${URL}${userInfo.id}/${selectedDialog.chatID}` );  // changed here
      ws.current.onmessage = (msg: MessageEvent) => { 
        if (msg.data) {
          
          let senderID: number;
          let sender : string = "";
          let data = '';
          const result = msg.data.split(':');
          if (result && result.length > 1) {
            senderID = +result[0];
            sender = usersData.find(item => item.id === senderID)?.name || ""
            data = result[1].trim();
          } else {
            data = msg.data;
          }
          setDialogs(prev => 
            prev && prev.map(item => 
              item.chatID === selectedDialog.chatID 
              ? {...item, last: msg.data} 
              : item
            )
          )
          addMessage({data : data, sender : sender});
        }
      }
    }
    
  }, [selectedDialog]);

  // close websocket
  useEffect(() => {
    return () => {
      if (ws.current) {       // changed here
        ws.current.close();
      }                       // changed here
    };
  }, [ws]);

  useEffect( () => {
		async function asyncWrap() {
			const result = await userAPI.getDialogs(`${userInfo.id}`);
      if (result && result.data && result.data != null) {
        let res : Dialog[] = [];
        for (const data of result.data) {
            const chatID = data.Receiver;
            // const resultUser = await userAPI.getUserByID(chatID);
            const resultUser = usersData.find(item => item.id == chatID);
            console.log(resultUser)
            if (resultUser) {
              // const title = `${resultUser?.data.user.lastName} ${resultUser?.data.user.firstName}`;
              // if (resultUser.id === userInfo.id) {
              //   resultUser.name = "Сохраненные сообщения"
              // }
              let last = ""
              if (data.LastMessage.Message) {
                last = `${usersData.find(item => item.id == data.LastMessage.User)?.name || data.LastMessage.User}: ${data.LastMessage.Message}`
              }
              res.push({chatID, title: resultUser.name, last, pic: resultUser.pic ? StaticPathResolver(resultUser.pic) : ava})
            }
            
        }
        setDialogList(res);
        setDialogs(res);
      }
		};
    asyncWrap();
	}, []);

  const dialogs = dialogsDTO?.map((dialog : Dialog, index) => {
    return (
      <div className={ classNames(s.dialog, selectedDialog == dialog ? s.active : null ) } key={dialog.chatID} onClick={() => setSelectedDialog(dialog)}>
        <div className={s.dialogPic}>
          <img src={dialog.pic} alt="ava"/>
        </div>
        <div className={s.info}>
          <div className={s.title}>{dialog.chatID == userInfo.id ? "Сохраненные сообщения" : dialog.title}</div>
          <div className={s.last}>{dialog.last}</div>
        </div>
      </div>
    );
  });

  useEffect( () => {
		async function asyncWrap() {
      if (selectedDialog.chatID !== 0) {
        try {
          const result = await userAPI.getMessageHistory(`${userInfo.id}/${selectedDialog.chatID}`);
          let res : ChatMessage[] = [];
          // result?.data.reverse()
          for (let data of result?.data) {
              data = JSON.parse(data)
              const sender = data.User;
              const resultUser = usersData.find(item => item.id == sender);
              const message = data.Message
              res.push({data: message, sender: resultUser ? resultUser.name : sender})
          }
          console.log(res);
          setMessages(res.reverse());
        } catch (err) {
          console.log(err)
        }
      }
		};
    if (selectedDialog)
		  asyncWrap();
	}, [selectedDialog]);

  const messagesElems = messages.map((msg: ChatMessage, index) => {
    return (
      <ChatMessage data={msg} index={index}/>
    );
  });

  useEffect(() => {
    setDialogs(dialogList);
    if (searchStr.length > 0) {
      setDialogs(prev => prev?.filter(item => (item.title).trim().toLocaleLowerCase().includes(searchStr.trim().toLocaleLowerCase())))
    } else {
      setDialogs(dialogList);
    }
  }, [searchStr])

  return (
    <div className={s.chat}>
      <div className={s.navigator}>
        <div className={s.search}>
          <form onSubmit={search} className={s.searchForm}>
            {/* <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.09634 5.62413C9.09634 7.72281 7.39502 9.42413 5.29634 9.42413C3.19766 9.42413 1.49634 7.72281 1.49634 5.62413C1.49634 3.52545 3.19766 1.82413 5.29634 1.82413C7.39502 1.82413 9.09634 3.52545 9.09634 5.62413ZM8.31854 9.35344C7.49341 10.0229 6.44172 10.4241 5.29634 10.4241C2.64537 10.4241 0.496338 8.27509 0.496338 5.62413C0.496338 2.97316 2.64537 0.824127 5.29634 0.824127C7.94731 0.824127 10.0963 2.97316 10.0963 5.62413C10.0963 6.76951 9.69516 7.8212 9.02565 8.64633L12.0499 11.6706C12.2452 11.8658 12.2452 12.1824 12.0499 12.3777C11.8546 12.5729 11.538 12.5729 11.3428 12.3777L8.31854 9.35344Z" fill="#BDBDBD"/>
            </svg> */}
            <input type="text" placeholder='поиск' className={s.searchInput} value={searchStr} onChange={handleChangeSearch}/>
          </form>
        </div>
        <div className={s.dialogs}>
          {dialogs}
        </div>
      </div>
      <div className={s.main}>
        <div className={s.header}>
          <div className={s.headerPic}>
            <img src={dialogsDTO?.find(el => el.chatID == selectedDialog.chatID)?.pic || ava} alt="ava"/>
          </div>
          <div className={s.info}>
            <div className={s.title}>{dialogsDTO?.find(el => el.chatID == selectedDialog.chatID)?.title}</div>
            <div className={s.last}>@{usersData.find(item => item.id == selectedDialog.chatID)?.username}</div>
          </div>
        </div>
        <div className={s.dialogWindow} ref={messageRef}>
          {messagesElems}
        </div>
        <div className={s.sendBlock}>
          <form onSubmit={submitMessage} className={s.sendForm}>
            <div className={s.inputWrapper}>
              <textarea cols={1} rows={1} className={s.sendInput} placeholder="Напишите сообщение..." value={messageToSend.data} onChange={handleChange} onKeyPress={handleKeyPress}/>
            </div>
            <div className={s.buttonWrapper}>
              <button className={s.sendButton}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5063 2.05288C1.30803 1.96476 1.07556 2.01457 0.930799 2.17618C0.786035 2.33778 0.762017 2.57431 0.871339 2.76172L4.45771 8.90979L0.871339 15.0579C0.762017 15.2453 0.786035 15.4818 0.930799 15.6434C1.07556 15.805 1.30803 15.8548 1.5063 15.7667L15.9063 9.36669C16.0869 9.28644 16.2032 9.10738 16.2032 8.90979C16.2032 8.71219 16.0869 8.53313 15.9063 8.45288L1.5063 2.05288ZM5.38208 8.50979L2.51557 3.59576L14.4721 8.90979L2.51557 14.2238L5.38208 9.30979H9.83656C10.0575 9.30979 10.2366 9.1307 10.2366 8.90979C10.2366 8.68888 10.0575 8.50979 9.83656 8.50979H5.38208Z" fill="#BDBDBD"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
};



export const ChatMessage: FC<IChatMessage> = ({data, index} : IChatMessage) => {
  const userInfo = useSelector<AppStateType, MeType>(state => state.me.userInfo);
  // const messageRef = React.useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (messageRef.current) {
  //     messageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, []);
  return (
    <div className={s.message} key={index} id={"message-" + index}> 
        <span className={classNames(s.sender, data.sender === `${userInfo.lastName} ${userInfo.firstName}` ? s.me : s.other)}>{data.sender}{data.sender ? ":" : null}</span> {data.data} 
    </div>
  )
}

// export const ChatMini: FC<Dialog> = (dialog: Dialog) => {
//   return (
//     <div className={ classNames(s.dialog, selectedDialog == index ? s.active : null ) } key={index} onClick={() => selectDialog(index)}>
//       <img src={dialog.pic} alt="ava"/>
//       <div className={s.info}>
//         <div className={s.title}>{dialog.title}</div>
//         <div className={s.last}>{dialog.last}</div>
//       </div>
//     </div>
//   )
// }