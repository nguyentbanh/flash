<template>
  <div class="file-uploader p-4 bg-white selector-dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-2 text-gray-800">Create New Flashcard Deck</h2>

    <div class="mb-4">
      <label for="deckName" class="block text-sm font-medium mb-1 text-gray-800">Deck Name</label>
      <input
        type="text"
        id="deckName"
        v-model="deckName"
        class="w-full p-2 border rounded selector-dark:bg-gray-700 selector-dark:border-gray-600 selector-dark:text-white"
        placeholder="Enter deck name"
      />
    </div>

    <div class="mb-4">
      <label for="markdownFile" class="block text-sm font-medium mb-1 text-gray-800">Upload Markdown File</label>
      <div class="flex items-center">
        <input
          type="file"
          id="markdownFile"
          accept=".md"
          @change="handleFileUpload"
          class="w-full p-2 border rounded selector-dark:bg-gray-700 selector-dark:border-gray-600 selector-dark:text-white"
        />
      </div>
      <p class="text-xs text-gray-500 selector-dark:text-gray-400 mt-1">
        Format: Front===Back, separated by ---
      </p>
    </div>
    
    <button
      @click="createDeck"
      :disabled="!canCreateDeck"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Create Deck
    </button>
  </div>
</template>

<script>
import parserService from '../services/parserService';
import deckService from '../services/deckService';

export default {
  name: 'FileUploader',
  data() {
    return {
      deckName: '',
      fileContent: '',
    };
  },
  
  computed: {
    canCreateDeck() {
      return this.deckName.trim() !== '' && this.fileContent !== '';
    }
  },
  
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = e => {
        this.fileContent = e.target.result;
      };
      reader.readAsText(file);
    },
    
    createDeck() {
      if (!this.canCreateDeck) return;
      
      const cards = parserService.parseMarkdown(this.fileContent);
      if (cards.length === 0) {
        alert('No valid flashcards found in the file.');
        return;
      }
      
      const deck = deckService.createDeck(this.deckName, cards);
      this.$emit('deck-created', deck);
      
      // Reset form
      this.deckName = '';
      this.fileContent = '';
      document.getElementById('markdownFile').value = '';
    }
  }
};
</script>
