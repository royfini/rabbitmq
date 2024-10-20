import amqplib from "amqplib";

interface Event {
  queueName: string;
  message: any;
}
export abstract class Subscriber<T extends Event> {
  abstract queueName: T["queueName"];
  abstract onMessage(data: T["message"]): void;
  private channel: amqplib.Channel;

  constructor(channel: amqplib.Channel) {
    this.channel = channel;
  }

  consumeMessageFromQueue = async () => {
    try {
      // Consume the message from the queue
      this.channel.consume(this.queueName, (message) => {
        if (message) {
          console.log(
            `Received message from queue '${
              this.queueName
            }': ${message.content.toString()}`
          );
          const messageString = message.content.toString();
          let data = JSON.parse(messageString);
          data = data.content;
          this.onMessage(data);
          this.channel.ack(message);
        }
      });
    } catch (error) {
      console.error("Error consuming message from queue:", error);
    }
  };
}
