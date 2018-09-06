var _telemetry = () => {

    var subscribed = false;

    return {

        init: (config) => {},

        update: () => {
            if (!subscribed && userData) {
                subscribed = true;
                console.log('Subscribed via plugin');
                ui.getTelemetry().subscribeToEvents([{
                    name: 'logged_in',
                    replace: true,
                    callback: () => console.log('Logged in - plugin')
                }]);
            }
        },

        getDelay: () => {
            return 1000;
        },

        destroy: () => {
            console.log('destroying');
            ui.getTelemetry().unsubscribeFromEvents('logged_in');
        }

    };

};
module.exports = _telemetry;