import amqplib from 'amqplib';

const declareExchange = async (channel: amqplib.Channel, exchangeType:string, exchangeName: string) => {
    try {
        await channel.assertExchange(exchangeName, exchangeType, {durable: true});
        console.log(`${exchangeName} exchange declared....`);
    } catch (error) {
        console.error(`Error declaring ${exchangeName} exchange:`, error);
    }
}

export default declareExchange