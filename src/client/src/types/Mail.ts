type MAIL = {
  id: string;
  name: string;
  image?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
};

export default MAIL;
