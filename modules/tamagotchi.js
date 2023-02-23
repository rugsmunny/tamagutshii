class Tamagotchi {
  #hunger;
  #happiness;

  constructor(hunger, happiness) {
    this.#hunger = hunger;
    this.#happiness = happiness;
  }
  setHungerStat(newHungerStat) {
    this.#hunger = newHungerStat;
  }
  setHappinessStat(newHappinessStat) {
    this.#happiness = newHappinessStat;
  }
  getHappinessStat() {
    return this.#happiness;
  }
  getHungrynessStat() {
    return this.#hunger;
  }
}

export { Tamagotchi };
