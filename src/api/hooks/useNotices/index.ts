// hooks/useNotice.ts
import { Notice } from "@/types/api/notice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotice,
  fetchNoticeById,
  getNotice,
  noticeQueryKeys,
  updateNotice,
} from "../../querys/NOTICE_QUERY";

export const useNoticeById = (id: number) => {
  return useQuery<Notice, Error>({
    queryKey: noticeQueryKeys.notice(id),
    queryFn: () => fetchNoticeById(id),
  });
};

export const useNotices = () => {
  return useQuery<Notice[], Error>({
    queryKey: noticeQueryKeys.notices(),
    queryFn: getNotice,
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
