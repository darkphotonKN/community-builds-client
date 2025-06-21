export interface Notification {
  id: string;
  memberId: string;
  type: string;
  title: string;
  message: string;
  created_at: {
    seconds: number;
    nanos: number;
  };
}

export interface NotificationsResponse {
  message: string;
  result: Notification[];
  statusCode: number;
}
