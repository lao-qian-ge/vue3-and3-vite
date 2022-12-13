import type { AxiosResponse } from "axios";

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export type ConfigType<T = ResponseData> = Promise<AxiosResponse<T>>;
