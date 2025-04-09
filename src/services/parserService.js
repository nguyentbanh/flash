// Service for parsing markdown files into flashcards
export default {
  parseMarkdown(markdown) {
    const cards = [];
    
    // Split the markdown content by the separator for different cards
    const cardContents = markdown.split('---').filter(content => content.trim() !== '');
    
    cardContents.forEach((content, index) => {
      // Split each card content by the separator for front and back
      const [front, back] = content.split('===').map(side => side.trim());
      
      if (front && back) {
        cards.push({
          id: `card-${index}`,
          front,
          back,
          status: 'new'
        });
      }
    });
    
    return cards;
  }
}
