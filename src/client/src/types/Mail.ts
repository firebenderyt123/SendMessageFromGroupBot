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

type CreateMailData = {
  name: string;
  content: string;
  sendAt: string;
  needToSend: number;
};

type UpdateMailData = {
  name?: string;
  content?: string;
  sendAt?: string;
  needToSend?: number;
  totalSended?: number;
  isPaused?: boolean;
};

type UploadMailImageData = {
  image: File;
};

export default MAIL;
export { type CreateMailData, type UpdateMailData, type UploadMailImageData };
