class Sand extends Particle {
    static sandColors = ["#d6c078", "#cab77a", "#bdad7b", "#c6b168", "#e6d085", "#ead594", "#eedba3"];

    constructor() {
        super({ color: sample(Sand.sandColors), isEmpty: false });
    }
}
