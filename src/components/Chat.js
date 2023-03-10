import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import firebase from 'firebase/compat/app'; 
import db from '../firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const Chat = () => {
    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, sentMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot =>
                 (setRoomName(snapshot.data().name)
                 )) 
                 db.collection('rooms')
                 .doc(roomId)
                 .collection('messages')
                 .orderBy('timestamp', 'asc')
                 .onSnapshot(snapshot => sentMessages(snapshot.docs.map(doc => doc.data())))
        }
    })

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])
    
const sentMessage = e => {
    e.preventDefault()
    db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
}

  return (
    <div className='chat'>
       <div  className='chat__header'>
       <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
        <div className='chat__headerInfo'>
            <h3>{roomName}</h3>
            <p>last Seen {" "}
            { new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
            </p>
        </div>
        <div className='chat__headerright'>
            <IconButton>
                <SearchOutlined />
            </IconButton>
            <IconButton>
                <AttachFile />
            </IconButton>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
       </div>
       <div className='chat__body'>
        {messages.map(message => (

             <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
            <span className='chat__name'>{message.name}</span>
               {message.message}
            <span className='chat__timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
        </p>
        ))}
      
       </div>
       <div className='chat__Footer'>
        <InsertEmoticon />
        <form>
            <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a message' type='text' />
            <button onClick={sentMessage} type='submit'>Send a message</button>
        </form>
        <Mic />
       </div>
    </div>
  )
}

export default Chat