<template>
  <div class="study p-4 bg-white selector-dark:bg-gray-800 rounded-lg shadow-md">
    <div class="mb-4 flex justify-between items-center flex-wrap">
      <h2 class="text-xl font-semibold text-gray-800 selector-dark:text-white mb-2 sm:mb-0">
        Studying: {{ deck ? deck.name : 'Loading...' }}
      </h2>
      <div class="flex gap-2">
        <button
          @click="exportDeck"
          class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
        >
          Export
        </button>
        <router-link to="/" class="text-blue-500 hover:text-blue-700 selector-dark:text-blue-400 selector-dark:hover:text-blue-300 px-3 py-1">
          Back
        </router-link>
      </div>
    </div>

    <div v-if="deck && currentCard" class="mb-6">
      <Flashcard
        :card="currentCard"
        @card-action="handleCardAction"
      />

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          @click="handleCardAction(currentCard.id, 'relearn')"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Need to Review (⬅️)
        </button>

        <button
          @click="handleCardAction(currentCard.id, 'know')"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Know It (➡️)
        </button>
      </div>

      <!-- Progress indicators - simplified for mobile -->
      <div class="flex justify-between mt-4 flex-wrap">
        <div class="text-green-600 selector-dark:text-green-400 font-medium mb-1">
          Know: {{ deck.knowStack.length }}
        </div>
        <div class="text-blue-600 selector-dark:text-blue-400 font-medium mb-1">
          Left: {{ deck.cards.length }}
        </div>
        <div class="text-red-600 selector-dark:text-red-400 font-medium mb-1">
          Relearn: {{ deck.relearnStack.length }}
        </div>
      </div>
    </div>

    <div v-else-if="deck && deck.cards.length === 0" class="text-center py-8 selector-dark:text-white">
      <p class="text-lg mb-4">No cards left to study!</p>
      <button
        v-if="deck.relearnStack.length > 0"
        @click="restartWithRelearnCards"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Review cards to relearn
      </button>
    </div>
  </div>
</template>

<script>
import Flashcard from '../components/Flashcard.vue';
import deckService from '../services/deckService';

export default {
  name: 'Study',
  components: {
    Flashcard
  },
  
  data() {
    return {
      deck: null,
      currentCardIndex: 0
    };
  },
  
  computed: {
    currentCard() {
      if (!this.deck || this.deck.cards.length === 0) {
        return null;
      }
      
      return this.currentCardIndex < this.deck.cards.length
        ? this.deck.cards[this.currentCardIndex]
        : null;
    }
  },
  
  created() {
    this.loadDeck();
  },
  
  methods: {
    loadDeck() {
      const deckId = this.$route.params.deckId;
      this.deck = deckService.getDeck(deckId);
      this.currentCardIndex = 0;
    },
    
    handleCardAction(cardId, action) {
      deckService.moveCardToStack(this.deck.id, cardId, action);
      
      // Move to the next card
      this.currentCardIndex++;
      
      // Reload the deck to get the updated state
      this.deck = deckService.getDeck(this.deck.id);
    },
    
    restartWithRelearnCards() {
      // Move cards from relearnStack back to the main deck
      this.deck.cards = [...this.deck.relearnStack];
      this.deck.relearnStack = [];
      
      deckService.saveDeck(this.deck);
      this.currentCardIndex = 0;
    },
    
    exportDeck() {
      if (this.deck) {
        deckService.exportDeckToJSON(this.deck.id);
      }
    }
  }
};
</script>
