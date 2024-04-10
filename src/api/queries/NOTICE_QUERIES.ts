import { Notice, NoticeRequest, NoticeResponse } from "@/types/api/notice";
import { notFound } from "next/navigation";
import { NOTICE_BASE_URL } from "../constants/urls";
import axiosInstance from "../instance";

export const noticeQueryKeys = {
  notice: (id: number) => ["notice", id],
  notices: (query?: Partial<NoticeRequest>) => ["notices", query],
};

export const getNoticeById = async (id: number) => {
  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const response = await axiosInstance.get<Notice>(`${NOTICE_BASE_URL}${id}`);
  return response.data;
};

export const getNotice = async (
  query?: NoticeRequest
): Promise<NoticeResponse> => {
  const response = await axiosInstance.get<NoticeResponse>(NOTICE_BASE_URL, {
    params: query,
  });
  return response.data;
};

export const updateNotice = async (id: number, updatedNotice: Notice) => {
  const response = await axiosInstance.put<Notice>(
    `${NOTICE_BASE_URL}${id}`,
    updatedNotice
  );
  return response.data;
};

export const deleteNotice = async (id: number) => {
  await axiosInstance.delete(`${NOTICE_BASE_URL}${id}`);
};
