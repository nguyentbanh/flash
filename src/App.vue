<template>
  <div class="app-container">
    <div class="container mx-auto p-4 max-w-3xl">
      <header class="text-center mb-8 relative">
        <div class="absolute right-0 top-0">
          <DarkModeToggle />
        </div>
        <h1 class="text-3xl font-bold">Flashcard System</h1>
        <p class="text-secondary">Create and study flashcards from Markdown files</p>
      </header>

      <router-view />
    </div>
  </div>
</template>

<script>
import DarkModeToggle from './components/DarkModeToggle.vue';

export default {
  name: 'App',
  components: {
    DarkModeToggle
  }
}
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: var(--bg-app);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}
</style>
