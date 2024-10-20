import { CONNECTION_STRING } from "../../constant";
import { OrderCreatePublisher } from "../events/publishers/order-create-publisher";
import { rabbitMQ } from "./rabbitmq-wrapper";
import setupRabbitMQ from "./setup";

const start = async () => {
  try {
    await rabbitMQ.connect(CONNECTION_STRING);
    await setupRabbitMQ();
    await new OrderCreatePublisher(
      rabbitMQ.channel!
    ).sendMessageToQueueWithTopicExchange({
      id: "1",
      version: 0,
      status: "created",
      userId: "1",
      expiresAt: "2021-08-01",
      ticket: {
        id: "1",
        price: 10,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

start();
