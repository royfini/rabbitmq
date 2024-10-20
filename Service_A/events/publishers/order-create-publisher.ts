import { Publisher } from "../../../events/base-publisher";
import { OrderCreateEvent } from "../order-create-event";

export class OrderCreatePublisher extends Publisher<OrderCreateEvent> {
  queueName = undefined;
  exchangeName = "order_created_exchange";
  routingKey = "key1";
}
