const selectUserByEmail = `
    SELECT 
        id 
    FROM 
	    users
    WHERE 
        email = ?
        LIMIT 1;
    `;

module.exports = selectUserByEmail;
