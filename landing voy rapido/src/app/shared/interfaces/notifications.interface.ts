export interface Notification {
  _id: string;
  title: string;
  description: string;
  wasSeen: boolean;
  createdAt: Date;
}
