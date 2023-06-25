interface MAIL {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
}

export default MAIL;
