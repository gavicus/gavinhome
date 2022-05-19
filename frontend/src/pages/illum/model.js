import { Point } from "./helpers"

const cardData = [
  {name:'first test card'},
  {name:'second test card'},
  {name:'third test card'},
]
class Card {
  constructor (id, data) {
    this.id = id
    this.name = data.name
    this.tablePlace = new Point(0,0)
    this.screenRect = null
  }
}

class Deck {
  constructor () {
    this.cards = []
    this.drawn = []
  }

  draw () {
    if (this.cards.length === 0) { return null }
    const card = this.cards[0]
    this.drawn.push(card)
    this.cards = this.cards.filter(c => c !== card)
    return card
  }

  init () {
    this.initCards()
  }

  initCards() {
    for (const cardIndex in cardData) {
      const data = cardData[cardIndex]
      const card = new Card(cardIndex, data)
      this.cards.push(card)
    }
  }
}

class Faction {
  constructor () {
    this.table = []
    this.hand = []
  }

  drawCard (deck) {
    // TODO: move card to hand
    //   now it goes straight to table
    const card = deck.draw()
    card.tablePlace.x = this.table.length * 130
    this.table.push(card)
  }
  
}

export class Model {
  constructor () {
    this.factions = []
    this.deck = null
    this.init()
    this.activeFaction = 0
  }

  getActiveFaction () {
    return this.factions[this.activeFaction]
  }

  getCardFromScreen (x,y) {
    const fac = this.getActiveFaction()
    for (const card of fac.table) {
      const rect = card.screenRect
      if (!rect) { continue }
      if (x < rect.x || y < rect.y) { continue }
      if (x > rect.x + rect.w) { continue }
      if (y > rect.y + rect.h) { continue }
      return card
    }
  }

  init () {
    this.initDeck()
    this.initFactions()
  }

  initDeck () {
    this.deck = new Deck()
    this.deck.init()
  }

  initFactions () {
    const fac = new Faction()
    fac.drawCard(this.deck)
    fac.drawCard(this.deck)
    this.factions.push(fac)
  }
}
