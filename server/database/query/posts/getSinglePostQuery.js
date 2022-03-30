const { connection } = require('../../config');

const getSinglePostQuery = (post_id) => {
    const sql = {
        text: `SELECT 
        p.id, p.title, p.content, p.post_image, p.user_id,
        u.image AS user_image,
        u.username,
        (SELECT COUNT(v.id) FROM votes v WHERE (v.vote_status = true AND v.post_id = p.id)) AS up_count,
        (SELECT COUNT(v.id) FROM votes v WHERE (v.vote_status = false AND v.post_id = p.id)) AS down_count,
        (SELECT COUNT(c.id) FROM comments c WHERE c.post_id = p.id) AS comments_count
        
        FROM 
        posts p 
        JOIN users u 
        ON u.id = p.user_id

        WHERE p.id = $1
        
        GROUP BY
        p.id,
        u.image,
        u.username;`,
        
        values: [post_id]
    }
    
    return connection.query(sql);
}

module.exports = getSinglePostQuery;