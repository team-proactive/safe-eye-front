import { Pagination, QueryParams } from "./common";

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface NoticeRequest extends QueryParams {
  title?: string;
  content?: string;
}
// Notice Response Type
interface NoticeResponse extends Pagination<Notice> {
  message: string;
}

export type { Notice, NoticeRequest, NoticeResponse };
