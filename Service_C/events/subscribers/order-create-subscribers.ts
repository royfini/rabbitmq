import { Subscriber } from "../../../events/base-subscriber";
import { OrderCreateEvent } from "../order-create-event";

export class OrderCreateSubscriber extends Subscriber<OrderCreateEvent> {
  queueName = "order:created:2_queue";
  onMessage(data: OrderCreateEvent["message"]) {
    console.log(`Received message from queue '${this.queueName}':`, data);
  }
}
