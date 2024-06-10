const { Kafka, logLevel } = require("kafkajs");
const EventSource = require("eventsource");

async function main() {
  const kafka = new Kafka({
    clientId: "wikimedia-producer",
    brokers: ["127.0.0.1:9092"],
    logLevel: logLevel.NOTHING,
  });

  const producer = kafka.producer();
  const topic = "wikimedia.recentchange";

  // start the producer
  await producer.connect();

  const url = "https://stream.wikimedia.org/v2/stream/recentchange";
  const eventSource = new EventSource(url);

  eventSource.onmessage = async (event) => {
    try {
      const eventData = event.data;
      console.log(eventData);

      // send to Kafka

      await producer.send({
        topic: topic,
        messages: [{ value: eventData }],
      });
    } catch (error) {
      console.error("Error handling message:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("Error with EventSource:", error);
  };

  // You may need to customize the logic here based on your requirements
  await new Promise((resolve) => setTimeout(resolve, 600000)); // Sleep for 10 minutes

  // close the EventSource and Kafka producer
  eventSource.close();
  await producer.disconnect();
}

main().catch((error) => console.error("Error in main:", error));
