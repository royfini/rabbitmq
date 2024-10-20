import { CONNECTION_STRING } from "../../constant";
import { OrderCreateSubscriber } from "../events/subscribers/order-create-subscribers";
import { rabbitMQ } from "./rabbitmq-wrapper";
import setupRabbitMQ from "./setup";


const start = async () => {
  try {
   await rabbitMQ.connect(CONNECTION_STRING); 
   await setupRabbitMQ();
   await new OrderCreateSubscriber(rabbitMQ.channel!).consumeMessageFromQueue();
  } catch (err) {
    console.error(err);
  }
};

start();
