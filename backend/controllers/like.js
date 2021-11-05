const db = require('../DBConnect');

const sqlAddLike = (PublicationId, UserId) => {
    return `INSERT INTO likes (PublicationId, UserId) VALUES ("${PublicationId}", "${UserId}")`
};

const sqlDeleteLike = (id) => {
    return `DELETE FROM likes WHERE id = "${id}"`
};

// Ajouter un like
exports.addLike = (req, res) => {
	const addLike = sqlAddLike (
		req.body.PublicationId,
		req.body.UserId,
    );
	db.query(
        addLike,
        function(error) {
            if (error) throw error;
        }
    )
        res.status(201).json({ message: 'Like envoyé !' })
};

exports.deleteLike = (req, res, next) => {

    const deleteLike = sqlDeleteLike(
        req.body.id,
    );

console.log(deleteLike)

    db.query(
        deleteLike,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Like supprimé !' })
}