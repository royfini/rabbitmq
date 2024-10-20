import amqplib from "amqplib";

interface Event {
  queueName?: string;
  exchangeName?: string;
  message: any;
}

export abstract class Publisher<T extends Event> {
  abstract queueName?: T["queueName"];
  abstract exchangeName?: T["exchangeName"];
  abstract routingKey?: string;
  private channel: amqplib.Channel;

  constructor(channel: amqplib.Channel) {
    this.channel = channel;
  }

  sendMessageToQueueWithTopicExchange = async (message: T["message"]) => {
    try {
      let res = undefined;
      if (this.exchangeName) {
        res = this.channel.publish(
          this.exchangeName,
          this.routingKey || "",
          Buffer.from(JSON.stringify({ content: message }))
        );
      }
      if (this.queueName) {
        res = this.channel.sendToQueue(
          this.queueName,
          Buffer.from(JSON.stringify({ content: message }))
        );
      }
      if (res) {
        console.log(
          `Message sent to exchange '${this.exchangeName}' : ${message}`
        );
      } else {
        console.error("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error setting up topic exchange:", error);
    }
  };
}
