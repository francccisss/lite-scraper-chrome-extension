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
    subscribe(event, cb) {
        if (Object.keys(this.events).find((e) => e === event)) {
            this.events[event].push(cb);
            return;
        }
        this.events[event] = [cb];
    }
    publish(event, data) {
        if (!Object.keys(this.events).find((e) => e === event)) {
            return;
        }
        this.events[event].forEach((cb) => cb(data));
    }
}
const Event_Signal = new PubSub().get_instance();
export default Event_Signal;
