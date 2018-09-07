var _telemetry = () => {

    var subscribed = false;

    var defaults = [{
        name: 'logged_in',
        replace: true,
        callback: () => console.log('Logged in - plugin')
    }];

    var accepted;

    var config;

    return {

        init: (config) => {
            this.config = config;
        },

        update: () => {
            if (!subscribed && userData) {
                subscribed = true;
                var filtered = defaults;
                if (this.config.subscriptions)
                    filtered = defaults.filter(o => this.config.subscriptions.value.includes(o.name));
                ui.getTelemetry().subscribeToEvents(defaults, (accepted) => {
                    this.accepted = accepted;
                    console.log(accepted);
                });
            }
        },

        getDelay: () => {
            return 1000;
        },

        destroy: () => {
            ui.getTelemetry().unsubscribeFromEvents(accepted);
        }

    };

};
module.exports = _telemetry;