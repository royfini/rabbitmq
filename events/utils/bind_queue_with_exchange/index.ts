import { QUEUE_OPTIONS } from "../../../constant";
import amqplib from "amqplib";

const bindQueueWithExchange = async (
  channel: amqplib.Channel,
  queueName: string,
  exchangeName: string,
  queueOptions = QUEUE_OPTIONS,
  routingKey: string
) => {
  try {
    await channel.assertQueue(queueName, queueOptions);
    await channel.bindQueue(queueName, exchangeName, routingKey);
    console.log("Queue declared and bound to exchange:", queueName);
  } catch (error) {
    console.error("Error declaring and binding queue:", error);
  }
};

export default bindQueueWithExchange;
