class PubSub {
  events: { [key: string]: Array<() => void> } = {};
  private instance: null | PubSub = null;
  constructor() {
    this.events;
  }
  get_instance() {
    if (this.instance === null) {
      this.instance = new PubSub();
    }
    return this.instance;
  }
  subscribe(event: string, cb: () => void) {
    if (Object.keys(this.events).find((e) => e === event)) {
      this.events[event].push(cb);
      return;
    }
    this.events[event] = [cb];
  }
}

const Event_Signal = new PubSub().get_instance();
export default Event_Signal;

function cb() {}

Event_Signal.subscribe("new", cb);
