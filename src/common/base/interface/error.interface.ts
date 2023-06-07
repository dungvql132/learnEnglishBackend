interface IErrorResponse {
  status: number;
  message: string;
  error: any;
}

class ErrorResponse {
  status: number;
  message: string;
  error: any;

  constructor(status: number, message: string, error: any) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
export { ErrorResponse, type IErrorResponse };
