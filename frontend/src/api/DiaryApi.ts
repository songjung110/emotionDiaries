import type { DiaryDto, DiaryRequest } from "../type/diary";
import apiClient from "./client";

export async function createDiary(data: DiaryRequest) {
    const response = await apiClient.post<DiaryDto>("/diary", data);
    return response.data;
}

export async function getDiaries(username: string) {
    const response = await apiClient.get<DiaryDto[]>(`/diary${username}`);
    return response.data;
}