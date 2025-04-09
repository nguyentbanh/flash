// Service for managing flashcard decks
export default {
  saveDeck(deck) {
    localStorage.setItem(`deck-${deck.id}`, JSON.stringify(deck));
  },
  
  getDeck(deckId) {
    const deckJson = localStorage.getItem(`deck-${deckId}`);
    return deckJson ? JSON.parse(deckJson) : null;
  },
  
  getAllDecks() {
    const decks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('deck-')) {
        const deck = JSON.parse(localStorage.getItem(key));
        decks.push(deck);
      }
    }
    return decks;
  },
  
  createDeck(name, cards) {
    const deckId = `${Date.now()}`;
    const deck = {
      id: deckId,
      name,
      cards,
      knowStack: [],
      relearnStack: []
    };
    
    this.saveDeck(deck);
    return deck;
  },
  
  moveCardToStack(deckId, cardId, stack) {
    const deck = this.getDeck(deckId);
    if (!deck) return;
    
    const cardIndex = deck.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;
    
    // Move the card to the appropriate stack
    const card = deck.cards.splice(cardIndex, 1)[0];
    card.status = stack;
    
    if (stack === 'know') {
      deck.knowStack.push(card);
    } else if (stack === 'relearn') {
      deck.relearnStack.push(card);
    }
    
    this.saveDeck(deck);
  },
  
  // In a real-world scenario, this would be handled by a server
  exportDeckToJSON(deckId) {
    const deck = this.getDeck(deckId);
    if (!deck) return;
    
    const jsonContent = JSON.stringify(deck, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deck-${deckId}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
