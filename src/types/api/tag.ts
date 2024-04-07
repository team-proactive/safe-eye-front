import { Pagination, QueryParams } from "./common";

interface Tag {
  id: number;
  tag_type: string;
  tag_content: string;
  tag_id: number;
  content_type: number;
  object_id: number;
}

interface TagRequest extends QueryParams {}
// Notice Response Type
interface TagResponse extends Pagination<Tag> {
  message: string;
}

export type { Tag, TagRequest, TagResponse };
