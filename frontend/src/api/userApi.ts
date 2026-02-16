import type { UserResponse } from "../type/user";
import apiClient from "./client";

export async function checkUsername(username: string) {
    const response = await apiClient.post<UserResponse>('/user', {
        username
    });

    return response.data;
}