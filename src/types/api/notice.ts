interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Notice Request Type
interface NoticeRequest {
  title: string;
  content: string;
}

// Notice Response Type
interface NoticeResponse {
  data: Notice;
  message: string;
}

export type { Notice, NoticeRequest, NoticeResponse };
