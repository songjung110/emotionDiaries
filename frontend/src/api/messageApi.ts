import type { MessageDto, MessageRequest } from "../type/message";
import apiClient from "./client";

export async function getDiaryMessages(diaryId: number) {
    const response = await apiClient.get<MessageDto[]>(`/diary/ai/${diaryId}`);
    return response.data;
}

export async function streamDiaryMessage(
    data: MessageRequest,
    onChunk: (chunk: string) => void
) {
    const response = await apiClient.post(`/diary/ai`, data, {
        responseType: 'stream',
        adapter: 'fetch'
    });

    const reader = response.data.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if(done) break;

        const chunk = decoder.decode(value, {stream: true});
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for(const line of lines) {
            const cleanLine = line.replace(/\r$/, '');
            if(!cleanLine.startsWith('data:')) continue;

            const content = cleanLine.substring(5);
            
            onChunk(content);
        }
    }
}