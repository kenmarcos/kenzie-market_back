class ErrorHandler {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number, message: any) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorHandler;
