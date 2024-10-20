export interface OrderCreateEvent {
    exchangeName: string;
    queueName: string;
    message: {
        id: string;
        version: number;
        status: string;
        userId: string;
        expiresAt: string;
        ticket: {
          id: string;
          price: number;
        };
      }
}