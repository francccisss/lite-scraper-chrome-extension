class StateManager {
    instance = null;
    states = {};
    get_instance() {
        if (this.instance === null) {
            this.instance = new StateManager();
        }
        return this.instance;
    }
    get_state(key) {
        return key !== undefined ? { key: this.states[key] } : this.states;
    }
    set_state(key, value) {
        this.states = { ...this.states, [key]: value };
        return this.states;
    }
}
const State_Manager = new StateManager().get_instance();
export default State_Manager;
