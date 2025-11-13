document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('flowerSearch');
    const flowerCards = document.querySelectorAll('.flower-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        flowerCards.forEach(card => {
            const flowerName = card.querySelector('.flower-name').textContent.toLowerCase();
            
            if (flowerName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
    
        const visibleCards = document.querySelectorAll('.flower-card:not(.hidden)');
        const noResultsMessage = document.getElementById('noResultsMessage');
        
        if (visibleCards.length === 0 && searchTerm !== '') {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'no-results-message';
                message.textContent = 'Цветы с таким названием не найдены';
                document.querySelector('.flowers-grid').appendChild(message);
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    });
});