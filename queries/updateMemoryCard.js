const updateMemoryCard = `
    UPDATE 
        memory_cards 
    SET 
        ?
    WHERE
        id = ?;
`;
module.exports = updateMemoryCard;
