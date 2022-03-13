declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    deliveryman: {
      id: string;
    };
  }
}
