import React,{useState,useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket,username,room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList,setMessageList]=useState([])

    const handleClick=async()=>{
      const trimmed=currentMessage.trim()
      if(trimmed!==""){
        const messageData={
          room:room,
          author:username,
          message:currentMessage,
          time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send-message",messageData)
        // setMessageList([...messageList,messageData])
        setMessageList(list=>[...list,messageData])
        setCurrentMessage("")
      }
    }
  
    useEffect(() => {
      // Define the event listener function
      const handleReceiveMessage = (data) => {
        setMessageList(list => [...list, data]);
      };
    
      // Register the event listener when the component mounts using the "on" function
      socket.on("receive-message", handleReceiveMessage);
    
      // Define a cleanup function to remove the event listener when the component unmounts using the "off" function
      return () => {
        socket.off("receive-message", handleReceiveMessage);
      };
    }, [socket]);
  return (
    // style={{maxHeigtht:"500px", overflow:"auto"}}
        <div className="chat-window" >
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
          <ScrollToBottom className="message-container">
          {
            messageList.map((val)=>{
              return(
                <div className='message' id={username===val.author ? "you" : "other"}>
                <div>
                  <div className='message-content'>
                  <p>{val.message}</p>
                  </div>
                  <div className='message-meta'>
                  <p id="time">{val.time}</p>
                  <p id="author">{val.author}</p>
                  </div>
                </div>
                </div>
              )
          
            })
          }
          </ScrollToBottom>
          </div>
          <div className='chat-footer'>
          <input  type="text" value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} placeholder="Hey..." 
            onKeyDown={(e)=>{e.key==="Enter" && handleClick()}}
          />
          <button onClick={handleClick}>&#9658;</button>
          </div>      
      </div>
    
  )
}

export default Chat

