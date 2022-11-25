import Kafka from "node-rdkafka";
import mastostream from "./mastostream";
import dotenv from "dotenv"
dotenv.config();
import producer from "./producer";

console.log(Kafka.features); // check that you have 'ssl', among other things, if it is not there install openssl

producer.on('ready', async () => {
    mastostream((status) => {
        producer.produce(
            'fosstodon',  // topic to send the message to
            null,  // partition, null for librdkafka default partitioner
            Buffer.from(status),  // value
            null,  // optional key
            Date.now()  // optional timestamp
        );
        producer.flush(2000);
    }).catch((error) => {
        throw error;
    });
});

producer.connect({}, (err) => {
    if (err) {
        console.error(err);
    }
});


