const selectUserByEmail = `
    SELECT 
        * 
    FROM 
	    users
    WHERE 
        email = ?
        LIMIT 1;
    `;

module.exports = selectUserByEmail;
