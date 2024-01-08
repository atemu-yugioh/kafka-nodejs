const { Kafka, logLevel } = require("kafkajs");

const partition = 0;
let topic = "wikimedia.recentchange";

const consumerService = async () => {
  const kafka = new Kafka({
    clientId: "wikimedia-producer",
    brokers: ["127.0.0.1:9092"],
    logLevel: logLevel.NOTHING,
  });
  try {
    const consumer = kafka.consumer({
      groupId: "wiki-group-consumer",
      enableAutoCommit: false,
      batch: {
        // Thêm cấu hình batch vào đây
        size: 10, // Kích thước batch mong muốn
      },
    });

    // consumer connect
    await consumer.connect();

    // subscribe to topic
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    // listen message
    await consumer.run({
      eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning }) => {
        console.log(`receiver ${batch.messages.length}`);

        // Commit the offset after processing the batch
        await consumer.commitOffsets([
          { topic, partition, offset: batch.highWatermark },
        ]);

        // Resolve the offset to mark the batch as processed
        await resolveOffset(batch.highWatermark);

        // Simulate a heartbeat to prevent rebalancing and keep the consumer running
        await heartbeat();

        // Check if the consumer is still running; if not, stop processing
        if (!isRunning()) {
          console.log("Consumer is not running. Stopping...");
          return;
        }
      },
    });

    // You may need to customize the logic here based on your requirements
    await new Promise((resolve) => setTimeout(resolve, 600000)); // Sleep for 10 minutes
  } catch (error) {
    console.log(error);
  }
};

consumerService().catch((error) => console.log(error));
