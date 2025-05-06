export interface SenderEmailInfo {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
}

export interface MailContent {
  from: string;
  to: string;
  subject: string;
  text: string;
}
