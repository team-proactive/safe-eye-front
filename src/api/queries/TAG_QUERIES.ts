// queries/tagQueries.ts
import { Tag, TagRequest, TagResponse } from "@/types/api/tag";
import { notFound } from "next/navigation";
import axiosInstance from "../instance";

export const tagQueryKeys = {
  tag: (id: number) => ["tag", id],
  tags: (query?: Partial<TagRequest>) => ["tags", query],
};

export const getTagById = async (id: number) => {
  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const response = await axiosInstance.get<Tag>(`/utils/tags/${id}`);
  return response.data;
};

export const getTag = async (query?: TagRequest): Promise<TagResponse> => {
  const response = await axiosInstance.get<TagResponse>("/utils/tags/", {
    params: query,
  });
  return response.data;
};

export const updateTag = async (id: number, updatedTag: Tag) => {
  const response = await axiosInstance.put<Tag>(
    `/utils/tags/${id}`,
    updatedTag
  );
  return response.data;
};

export const deleteTag = async (id: number) => {
  await axiosInstance.delete(`/utils/tags/${id}`);
};
