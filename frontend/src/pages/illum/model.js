class Card {
  constructor () {}
}

class Deck {
  constructor () {}
}

class Faction {
  constructor () {
    this.table = []
    this.hand = []
  }

  initCards () {}
}

export class Model {
  constructor () {
    this.factions = []
  }

  initFactions () {
    const fac = new Faction()
    fac.initCards()
    this.factions.push(fac)
  }
}
