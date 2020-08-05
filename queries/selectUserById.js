const selectUserById = `
    SELECT 
        id, email, created_at 
    FROM 
	    users
    WHERE 
        id = ?
        LIMIT 1;
    `;

module.exports = selectUserById;
