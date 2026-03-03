import { Fragment } from "react/jsx-runtime";
import styles from "./ChatPage.module.css"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { MessageDto } from "../type/message";
import useUser from "../hooks/useUser";

const DUMMY_MESSAGES: MessageDto[] = [
    {
        id: 0,
        diaryId: 0,
        type: 'MSG',
        username: "HI",
        message: "안녕~~"
    },
    {
        id: 1,
        diaryId: 1,
        type: 'MSG',
        username: "HI",
        message: "안녕~~"
    },
    {
        id: 2,
        diaryId: 0,
        type: 'MSG',
        username: "JUNG",
        message: "안녕~~"
    }
]

function ChatPage() {
    const navigate = useNavigate();
    const { username } = useUser();

    const handleSubmit = () =>{

    };
    return (
        <>
            <header className={styles.header}>
                <Button
                    variant={'ghost'}    
                    size={'small'}
                    onClick={()=> navigate('/')}
                    style={{padding: 8}}
                >
                    {'<'}
                </Button>
            </header>
            <div className={styles.chatList}>
                {DUMMY_MESSAGES.map((message, index) => {
                    const isMe = username === message.username;
                    return (
                        <div
                            key={message.id}
                            className={`${styles.messageRow} ${isMe ? styles.myMessage : styles.otherMessage}`}
                        
                        >
                            {!isMe && <div className={styles.avatar} />}
                            <div className={styles.bubble}>
                                {message.type == "MSG" ? (
                                    message.message
                                ) : (
                                    <img />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <form className={styles.inputArea} onSubmit={handleSubmit}>
                <input 
                    className={styles.input}
                />
                <Button
                    type={'submit'}
                >
                    전송
                </Button>
            </form>            
        </>
    )
}
export default ChatPage;