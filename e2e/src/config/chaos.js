const googlePubSubChaos = {
    type: 'FilteringSpanListener',
    config: {
        listener: {
            type: 'ErrorInjectorSpanListener',
            config: {
                errorType: 'ChaosError',
                errorMessage: 'Google PubSub Chaos Injected!',
                injectPercentage: 100,
            }
        },
        filters: [
            {
                className: 'Google-PubSub',
            }
        ]
    }
}

module.exports = {
    googlePubSubChaos,
}