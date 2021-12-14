const { 
    GOOGLE_PROJECT_ID,
    GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME,
    GOOGLE_API_HOST,
    GOOGLE_API_PORT,
} = require('../config');
const thundra = require('@thundra/core');

const { BigQuery } = require('@google-cloud/bigquery');
const { v1 } = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');
const { insertClientOrder } = require('../dataacess/client-order');

const subClient = new v1.SubscriberClient({
  apiEndpoint: GOOGLE_API_HOST,
  port: GOOGLE_API_PORT,
  sslCreds: grpc.credentials.createInsecure(),
});

const bigquery = new BigQuery();

const cancellationPuller = async function () {
    const formattedSubscription = subClient.subscriptionPath(
      GOOGLE_PROJECT_ID,
      GOOGLE_PUBSUB_ORDER_CANCELATION_SUBSCRIPTION_NAME,
    );
  
    const request = {
      subscription: formattedSubscription,
      maxMessages: 10,
      returnImmediately: true,
    };
  
    const result = await subClient.pull(request);
    const [response] = result;
  
    const ackIds = [];
    const data = [];
    for (const message of response.receivedMessages) {
      try {
        const messageContent = JSON.parse(`${message.message.data}`);
        data.push({
          orderId: messageContent.id || messageContent._id,
          clientId: messageContent.client,
          basket: {
            products: messageContent.basket.products.map(x => {
              return {
                id: x.product,
                count: x.count,
              }
            })
          },
          date: bigquery.datetime(messageContent.updatedAt)
        });
        ackIds.push(message.ackId);
      } catch (error) {
        console.warn(error);
      }
    }
  
    let ackFlag = false;
    if (data && data.length) {
  
      try {
        await insertClientOrder(data);
        ackFlag = true;
      } catch (error) {
        console.warn(error);
      }
    }
  
    if (ackFlag && ackIds.length !== 0) {
      const ackRequest = {
        subscription: formattedSubscription,
        ackIds: ackIds,
      };
  
      await subClient.acknowledge(ackRequest);
    }
}

const init = (interval = 60000) => {
    setInterval(async ()=> {
        try {
            thundra.nodeWrapper(cancellationPuller)();
        } catch (error) {
            console.warn(error);
        }
    }, interval)
}

module.exports = {
    init,
}