const compose = require('docker-compose');
const path = require('path');
const buildContext = path.resolve(__dirname, '../../docker');
const { googlePubSubChaos } = require('./config/chaos');
(async () => {
    const result = await compose.upAll({ 
        cwd: buildContext, 
        log: true,
        env: {
            ...process.env,
            THUNDRA_GOOGLE_PUBSUB_CHAOS: JSON.stringify(googlePubSubChaos),
            // 'thundra_agent_debug_enable': 'true',
        },
        commandOptions : [
            '--build'
        ]
    });
    console.log(result);
})().catch(err => console.error(err));