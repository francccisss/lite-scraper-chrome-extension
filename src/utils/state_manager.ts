class StateManager {
  private instance: null | StateManager = null;
  private states: { [key: string]: any } = {};

  get_instance() {
    if (this.instance === null) {
      this.instance = new StateManager();
    }
    return this.instance;
  }
  get_state(key?: string) {
    return key !== undefined ? { key: this.states[key] } : this.states;
  }

  set_state(key: string, value: any) {
    this.states = { ...this.states, [key]: value };
    return this.states;
  }
}

const State_Manager = new StateManager().get_instance();
export default State_Manager;
