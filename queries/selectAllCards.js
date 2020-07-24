const selectAllCards = `
    SELECT 
        * 
    FROM 
	    memory_cards
    WHERE 
	    memory_cards.user_id = ?
		    AND (memory_cards.imagery LIKE ? 
			OR memory_cards.answer LIKE ?)
    ORDER BY 
        ?;
    `;

module.exports = selectAllCards;
