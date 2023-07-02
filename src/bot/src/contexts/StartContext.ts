import { Context } from "telegraf";

interface StartContext extends Context {
  startPayload?: string;
}

export { StartContext };
