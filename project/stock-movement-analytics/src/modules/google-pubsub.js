const { PubSub: PUBSUB } = require('@google-cloud/pubsub');

const {
    GOOGLE_PROJECT_ID,
    GOOGLE_API_ENDPOINT,
} = require('../config');

const PubSub = new PUBSUB({
    projectId: GOOGLE_PROJECT_ID,
    apiEndpoint: GOOGLE_API_ENDPOINT,
});

module.exports = PubSub;