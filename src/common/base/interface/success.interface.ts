interface ISuccessResponse {
  status: number;
  message: string;
  token: string;
}

class SuccessResponse {
  status: number;
  message: string;
  token?: string;
  data?: any;

  constructor(status: number, message: string, token?: string, data?: any) {
    this.status = status;
    this.message = message;
    this.token = token;
    this.data = data;
  }
}
export { SuccessResponse, type ISuccessResponse };
