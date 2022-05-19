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
