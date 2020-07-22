module.exports = function selectAllCards(user_id, search_term, order) {
   return `
    SELECT 
        * 
    FROM 
	    memory_cards
    WHERE 
	    memory_cards.user_id = '${user_id}'
		    AND (memory_cards.imagery LIKE '%${search_term}%' 
			OR memory_cards.answer LIKE '%{search_term}%')
    ORDER BY 
        ${order};
    `;
};
