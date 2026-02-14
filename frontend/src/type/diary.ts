export interface DiaryDto {
    id: number;
    date: string;
    username: string;
}


export interface DiaryRequest {
    date: string;
    username: string;
}