declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      cpf: string;
      email: string;
      phone: string;
      isAdm: boolean;
      cart: { id: string };
    };
  }
}
