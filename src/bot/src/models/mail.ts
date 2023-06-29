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

export { MAIL };
