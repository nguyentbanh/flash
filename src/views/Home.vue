
<template>
  <div class="home">
    <FileUploader @deck-created="handleDeckCreated" />
    
    <div class="deck-list mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 class="text-xl text-gray-800 font-semibold mb-4">Your Flashcard Decks</h2>
      
      <div v-if="decks.length === 0" class="text-gray-500 py-4">
        You haven't created any decks yet. Upload a markdown file to get started.
      </div>
      
      <ul v-else class="space-y-3">
        <li
          v-for="deck in decks"
          :key="deck.id"
          class="border rounded p-4 flex justify-between items-center selector-dark:border-gray-700"
        >
          <div>
            <h3 class="font-medium text-gray-800">{{ deck.name }}</h3>
            <p class="text-sm text-gray-800 selector-dark:text-gray-400">
              {{ deck.cards.length + deck.knowStack.length + deck.relearnStack.length }} cards total
            </p>
          </div>
          
          <div class="flex gap-2">
            <button 
              @click="exportDeck(deck.id)" 
              class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
            >
              Export
            </button>
            <router-link 
              :to="`/study/${deck.id}`"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Study
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FileUploader from '../components/FileUploader.vue';
import deckService from '../services/deckService';

export default {
  name: 'Home',
  components: {
    FileUploader
  },
  
  data() {
    return {
      decks: []
    };
  },
  
  created() {
    this.loadDecks();
  },
  
  methods: {
    loadDecks() {
      this.decks = deckService.getAllDecks();
    },
    
    handleDeckCreated() {
      this.loadDecks();
    },
    
    exportDeck(deckId) {
      deckService.exportDeckToJSON(deckId);
    }
  }
};
</script>
