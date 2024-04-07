// hooks/useTag.ts
import {
  deleteTag,
  getTag,
  getTagById,
  tagQueryKeys,
  updateTag,
} from "@/api/queries/TAG_QUERIES";
import { Tag, TagResponse } from "@/types/api/tag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTagById = (id: number) => {
  return useQuery<Tag, Error>({
    queryKey: tagQueryKeys.tag(id),
    queryFn: () => getTagById(id),
  });
};

export const useTags = () => {
  return useQuery<TagResponse, Error>({
    queryKey: tagQueryKeys.tags(),
    queryFn: () => getTag(),
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation<Tag, Error, { id: number; updatedTag: Partial<Tag> }>({
    mutationFn: async ({ id, updatedTag }) => {
      const tag = await updateTag(id, updatedTag as Tag);
      return tag;
    },
    onSuccess: (updatedTag) => {
      queryClient.invalidateQueries({
        queryKey: tagQueryKeys.tag(updatedTag.id),
      });
      queryClient.invalidateQueries({ queryKey: tagQueryKeys.tags() });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await deleteTag(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagQueryKeys.tags() });
    },
  });
};
