const MessageTypeList = [
    'IMG' , 'MSG'
] as const;

type MessageType = typeof MessageTypeList[number]


export interface MessageDto {
    id: number;
    diaryId: number;
    type: MessageType;
    username: string;
    message: string;
}

export interface MessageRequest {
    diaryId: number;
    type: MessageType;
    username: string;
    message: string;
}