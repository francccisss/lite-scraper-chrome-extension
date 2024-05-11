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
}
const Event_Signal = new PubSub().get_instance();
export default Event_Signal;
function cb() { }
Event_Signal.subscribe("new", cb);
