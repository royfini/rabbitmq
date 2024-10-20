import amqplib from "amqplib";

class RabbitMQWrapper {
  private _connection: amqplib.Connection | null;
  private _channel: amqplib.Channel | null;

  get channel() {
    if (this._channel === null) {
      throw new Error("Channel is not connected");
    }
    return this._channel;
  }

  constructor() {
    this._connection = null;
    this._channel = null;
  }

  async connect(connection_string: string) {
    this._connection = await amqplib.connect(connection_string);
    this._channel = await this._connection.createChannel();
  }
}

export const rabbitMQ = new RabbitMQWrapper();
