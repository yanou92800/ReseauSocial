const db = require('../DBConnect');

const sqlAddLike = (publicationId, userId) => {
    return `INSERT INTO likes (publicationId, userId) VALUES ("${publicationId}", "${userId}")`
};

const sqlDeleteLike = (id) => {
    return `DELETE FROM likes WHERE id = "${id}"`
};

const sqlGetAllLikes = (id) => {
    return `SELECT likes.*, users.username, users.avatar FROM likes JOIN users ON likes.userId = users.id WHERE publicationId = ${id} ORDER BY createdAt DESC`
  };

// Ajouter un like
exports.addLike = (req, res) => {
	const addLike = sqlAddLike (
		req.body.publicationId,
		req.body.userId,
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
        req.params.id,
    );

    //console.log(deleteLike)

    db.query(
        deleteLike,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Like supprimé !' })
};

exports.getAllLikes = (req, res, next) => {
  
    const getAllLikes = sqlGetAllLikes(
        req.params.id
    );
  
    //console.log(getAllLikes)
    
    db.query(
      getAllLikes,
      function(error, result) {
        if (error) throw error;
        console.log(error);
        if (result) {
          //console.log(result)
          }
        res.status(200).json(result)
      }
    )
  };