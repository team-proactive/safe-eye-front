// queries/noticeQueries.ts
import { Notice, NoticeRequest, NoticeResponse } from "@/types/api/notice";
import axiosInstance from "../instance";

export const noticeQueryKeys = {
  notice: (id: number) => ["notice", id],
  notices: (query?: NoticeRequest) => ["notices", query],
};

export const fetchNoticeById = async (id: number) => {
  const response = await axiosInstance.get<Notice>(`/notice/${id}`);
  return response.data;
};

export const getNotice = async (
  query?: NoticeRequest
): Promise<NoticeResponse> => {
  const response = await axiosInstance.get<NoticeResponse>("notice/", {
    params: query,
  });
  return response.data;
};

export const updateNotice = async (id: number, updatedNotice: Notice) => {
  const response = await axiosInstance.put<Notice>(
    `/notice/${id}`,
    updatedNotice
  );
  return response.data;
};

export const deleteNotice = async (id: number) => {
  await axiosInstance.delete(`/notice/${id}`);
};
