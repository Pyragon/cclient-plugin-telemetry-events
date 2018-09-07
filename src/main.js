var _telemetry = () => {

    var subscribed = false;

    var defaults = [{
        name: 'logged_in',
        replace: true,
        callback: () => console.log('Logged in - plugin')
    }, {
        name: 'logged_out',
        replace: true,
        callback: () => console.log('Logged out - plugin')
    }, {
        name: 'token_expiry',
        replace: true,
        callback: () => {
            sendNotification('Token expiring soon', 'Your authentication is about to expire. If you do not have auto login enabled, click here to relogin', () => {
                switchToLogin();
            });
            console.log('Token is about to expire.');
        }
    }, {
        name: 'server_restart',
        replace: true,
        callback: (data) => sendNotification(`Server update has begun. Server will restart in ${data.delay} seconds.`)
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
                });
            }
        },

        getDelay: () => {
            return 1000;
        },

        destroy: () => {
            ui.getTelemetry().unsubscribeFromEvents(this.accepted);
        }

    };

};
module.exports = _telemetry;