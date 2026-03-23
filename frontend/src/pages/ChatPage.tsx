import { Fragment } from "react/jsx-runtime";
import styles from "./ChatPage.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { MessageDto } from "../type/message";
import useUser from "../hooks/useUser";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getDiaryMessages, streamDiaryMessage } from "../api/messageApi";


function toImageSrc(base64: string) {
    return `data:image/png;base64,${base64}`
}

function ChatPage() {
    const navigate = useNavigate();
    const { username } = useUser();
    // navigate로 받은 값을 Location을 통해 받음
    const location = useLocation();
    const diaryId = location.state?.diaryId as number;
    const initialImage = location.state?.initialImage as String;

    const [messages, setMessages] = useState<MessageDto[]>([])
    const [inputText, setInputText] = useState('');

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(!diaryId || !username) {
            navigate('/', {replace: true});
            return;
        }

        const initialize = async () => {
            console.log("init")
            const response = await getDiaryMessages(diaryId);

            if(initialImage && !response.find(message => message.type === "IMG")) {
                const userImageMessage: MessageDto = {
                    id: Date.now(),
                    diaryId,
                    type: 'IMG',
                    username,
                    message: initialImage,
                }
                const aiMessageId = Date.now() + 1;
                const aiMessage: MessageDto = {
                    id: aiMessageId,
                    diaryId,
                    type: 'MSG',
                    username: "AI",
                    message: "..."
                }

                setMessages([...messages, userImageMessage, aiMessage]);

                let text = '';

                await streamDiaryMessage({
                    diaryId,
                    type: "IMG",
                    username,
                    message: initialImage
                }, (chunk) => {
                    text += chunk;
                    setMessages(prev => {
                        const next = [...prev];
                        const targetIndex = next.findIndex(m => m.id === aiMessageId);

                        if(targetIndex !== -1) {
                            next[targetIndex] = {
                                ...next[targetIndex],
                                message: text,
                            };
                        }

                        return next;
                    })
                })
            } else {
                setMessages(response);
            }
        }
        initialize();
    }, [username, navigate, diaryId, initialImage])

    useEffect(() => {
        const scroll = scrollRef.current;
        if(!scroll) return;
        scroll.scrollTop = scroll.scrollHeight;
    }, [messages])

    const handleSubmit = async (event: FormEvent) =>{
        event.preventDefault();
        if(!inputText.trim() || !username) return;

        setInputText('');

        const userMessage: MessageDto = {
            id: Date.now(),
            diaryId,
            type: "MSG",
            username,
            message: inputText
        }

        const aiMessageId = Date.now() + 1;
        const aiMessage: MessageDto = {
            id: aiMessageId,
            diaryId,
            type: "MSG",
            username: "AI",
            message: "..."
        }

        setMessages(prev => [...prev, userMessage, aiMessage]);

        let text = '';
        await streamDiaryMessage({
            diaryId,
            type: "MSG",
            username,
            message: inputText
        }, chunk => {
            text += chunk;
            setMessages(prev => {
                const next = [...prev];
                const targetIndex = next.findIndex(m => m.id === aiMessageId);

                if(targetIndex !== -1) {
                    next[targetIndex] = {
                        ...next[targetIndex],
                        message: text,
                    };
                }

                return next;
            })
        })
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
            <div className={styles.chatList} ref={scrollRef}>
                {messages.map((message, index) => {
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
                                    <img 
                                        src={toImageSrc(message.message)}
                                        className={styles.image}
                                    />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <form className={styles.inputArea} onSubmit={handleSubmit}>
                <input 
                    className={styles.input}
                    value={inputText}
                    onChange={event => setInputText(event.target.value)}
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