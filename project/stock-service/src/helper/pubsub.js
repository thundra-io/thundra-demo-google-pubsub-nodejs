const PubSub = require('../modules/google-pubsub')

const createTopic = async (topicName) => {
    return await PubSub.createTopic(topicName);
}

const getTopic = async (topicName) => {
    return await PubSub.topic(topicName);
}

const getSubscription = async (topicName, subscriptionName) => {

    let subscription;
    try {
        const topic = await getTopic(topicName);
        const [s] = await topic.createSubscription(subscriptionName);
        subscription = s;
    } catch (error) {
        console.warn(error);
    } finally {
        if (!subscription) {
            subscription = await PubSub.subscription(subscriptionName);
        }
    }

    return subscription;
}

const prepareTopic = async (topic) => {
    try {
        await createTopic(topic)
    } catch (error) {
        console.warn(error);
    }
}

module.exports = {
    prepareTopic,
    createTopic,
    getTopic,
    getSubscription,
}