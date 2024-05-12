class PubSub {
  events: { [key: string]: Array<(data: any | null) => void> } = {};
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
  subscribe(event: string, cb: (data: any) => void) {
    if (Object.keys(this.events).find((e) => e === event)) {
      this.events[event].push(cb);
      return;
    }
    this.events[event] = [cb];
  }

  publish(event: string, data: any) {
    if (!Object.keys(this.events).find((e) => e === event)) {
      return;
    }
    this.events[event].forEach((cb) => cb(data));
  }
}

const Event_Signal = new PubSub().get_instance();
export default Event_Signal;