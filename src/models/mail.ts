interface MAIL {
  id: string;
  name: string;
  image?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
}

type createMailData = {
  name: string;
  image?: string;
  content: string;
  needToSend: number;
};

export default MAIL;
export { createMailData };
