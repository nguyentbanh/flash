<template>
  <div
    class="flashcard"
    :class="{ 'flipped': isFlipped }"
    @click="flip"
    @touchstart="touchStart"
    @touchend="touchEnd"
  >
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <div class="markdown" v-html="compiledFront"></div>
      </div>
      <div class="flashcard-back">
        <div class="markdown" v-html="compiledBack"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  name: 'Flashcard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      isFlipped: false,
      touchStartX: 0,
      touchEndX: 0
    };
  },
  
  computed: {
    compiledFront() {
      return marked(this.card.front);
    },
    
    compiledBack() {
      return marked(this.card.back);
    }
  },
  
  methods: {
    flip() {
      this.isFlipped = !this.isFlipped;
    },
    
    touchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    
    touchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    
    handleSwipe() {
      if (Math.abs(this.touchEndX - this.touchStartX) > 100) {
        this.$emit('card-action', this.card.id, 
          this.touchEndX > this.touchStartX ? 'know' : 'relearn');
      }
    }
  }
};
</script>

<style scoped>
.flashcard {
  perspective: 1000px;
  width: 100%;
  height: 300px;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flashcard-front {
  background-color: #f8f9fa;
  color: #212529;
}

.flashcard-back {
  background-color: #e9ecef;
  color: #212529;
  transform: rotateY(180deg);
}

.dark .flashcard-front {
  background-color: #2d3748;
  color: #f7fafc;
}

.dark .flashcard-back {
  background-color: #1a202c;
  color: #f7fafc;
}
</style>
