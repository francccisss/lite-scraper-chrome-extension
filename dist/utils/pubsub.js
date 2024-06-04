class PubSub {
    events = {};
    instance = null;
    constructor() {
        this.events;
    }
    get_instance() {
        if (this.instance === null) {
            this.instance = new PubSub();
        }
        return this.instance;
    }
    subscribe(event, ...args) {
        if (Object.keys(this.events).find((e) => e === event)) {
            args.forEach((cb) => {
                this.events[event].push(cb);
            });
            return;
        }
        this.events[event] = [...args];
    }
    publish(event, data) {
        if (!Object.keys(this.events).find((e) => e === event)) {
            return;
        }
        this.events[event].forEach(async (cb) => {
            function is_async(fn) {
                return Object.prototype.toString.call(fn) === "[object AsyncFunction]";
            }
            if (is_async(cb))
                await cb(data);
            cb(data);
        });
    }
    unsubscribe(event) {
        for (let existing_event in this.events) {
            if (existing_event === event)
                delete this.events[existing_event];
        }
    }
}
const Event_Signal = new PubSub().get_instance();
export default Event_Signal;
