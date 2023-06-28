type MAIL = {
  id: string;
  name: string;
  image?: string;
  content?: string;
  sendAt: string;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
};

type UpdateMailData = {
  name?: string;
  content?: string;
  sendAt?: string;
  needToSend?: number;
  totalSended?: number;
  isPaused?: boolean;
};

export default MAIL;
export { type UpdateMailData };
