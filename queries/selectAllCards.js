module.exports = function selectAllCards(userId, searchTerm, order) {
   return `
    SELECT 
        * 
    FROM 
	    memory_cards
    WHERE 
	    memory_cards.user_id = '${userId}'
		    AND (memory_cards.imagery LIKE '%${searchTerm}%' 
			OR memory_cards.answer LIKE '%${searchTerm}%')
    ORDER BY 
        ${order};
    `;
};
