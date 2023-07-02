interface MAIL {
  id: string;
  name: string;
  image?: string;
  content: string;
  sendAt: string;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
}

type UpdateMailData = {
  totalSended: number;
};

export default MAIL;
export { type UpdateMailData };
