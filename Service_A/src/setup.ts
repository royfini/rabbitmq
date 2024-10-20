import amqplib from "amqplib";
import declareExchange from "../../events/utils/create_exchange/index";
import bindQueueWithExchange from "../../events/utils/bind_queue_with_exchange/index";
import { QUEUE_OPTIONS } from "../../constant";
import { rabbitMQ } from "./rabbitmq-wrapper";

interface QueueConfig {
    queueName: string;
    exchangeName?: string;
    exchangeType?: "direct" | "topic" | "fanout" | "headers";
    routingKey?: string;
}

const queueConfigs: QueueConfig[] = [
    // {
    //     queueName: "order_queue",
    //     exchangeName: "order_exchange",
    //     exchangeType: "topic",
    //     routingKey: "order.created",
    // },
    // {
    //     queueName: "payment_queue",
    //     exchangeName: "payment_exchange",
    //     exchangeType: "topic",
    //     routingKey: "payment.created",
    // },
    // {
    //     queueName: "log_queue",
    //     // No exchange for this queue
    // },
];

const setupRabbitMQ = async () => {
    try {
        const channel = rabbitMQ.channel!;
        for (const config of queueConfigs) {
            if (config.exchangeName && config.exchangeType) {
                // Declare the exchange if it exists
                await declareExchange(channel, config.exchangeType, config.exchangeName);
            }

            // Declare the queue
            await channel.assertQueue(config.queueName, QUEUE_OPTIONS);

            if (config.exchangeName && config.routingKey) {
                // Bind the queue to the exchange with the routing key if they exist
                await bindQueueWithExchange(
                    channel,
                    config.queueName,
                    config.exchangeName,
                    QUEUE_OPTIONS,
                    config.routingKey
                );

                console.log(
                    `Queue '${config.queueName}' bound to exchange '${config.exchangeName}' with routing key '${config.routingKey}'`
                );
            } else {
                console.log(`Queue '${config.queueName}' declared without exchange.`);
            }
        }

        console.log("RabbitMQ setup completed successfully.");
    } catch (error) {
        console.error("Error setting up RabbitMQ:", error);
    }
};

export default setupRabbitMQ;
