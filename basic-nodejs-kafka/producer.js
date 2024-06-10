const { Kafka, logLevel } = require("kafkajs");

const kafkaProducer = async () => {
  // step 1: create kafka client
  const kafka = new Kafka({
    clientId: "basic-kafka",
    brokers: ["localhost:9092"],
    logLevel: logLevel.NOTHING,
  });

  // step 2: create producer
  const producer = kafka.producer();

  // step 3: producer connect
  try {
    await producer.connect();

    for (let index = 0; index < 100; index++) {
      // step 4: send message to topic

      await producer.send({
        topic: "basic-topic",
        messages: [
          { value: `this is message for basic topic number ${index}` },
        ],
      });
    }

    console.log("send message success");
  } catch (error) {
    console.log(error);
  } finally {
    producer.disconnect();
  }
};

kafkaProducer();
