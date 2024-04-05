// hooks/useNotice.ts
import {
  deleteNotice,
  getNotice,
  getNoticeById,
  noticeQueryKeys,
  updateNotice,
} from "@/api/queries/NOTICE_QUERIES";
import { Notice, NoticeResponse } from "@/types/api/notice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNoticeById = (id: number) => {
  return useQuery<Notice, Error>({
    queryKey: noticeQueryKeys.notice(id),
    queryFn: () => getNoticeById(id),
  });
};

export const useNotices = () => {
  return useQuery<NoticeResponse, Error>({
    queryKey: noticeQueryKeys.notices(),
    queryFn: () => getNotice(),
  });
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Notice,
    Error,
    { id: number; updatedNotice: Partial<Notice> }
  >({
    mutationFn: async ({ id, updatedNotice }) => {
      const notice = await updateNotice(id, updatedNotice as Notice);
      return notice;
    },
    onSuccess: (updatedNotice) => {
      queryClient.invalidateQueries({
        queryKey: noticeQueryKeys.notice(updatedNotice.id),
      });
      queryClient.invalidateQueries({ queryKey: noticeQueryKeys.notices() });
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await deleteNotice(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeQueryKeys.notices() });
    },
  });
};
