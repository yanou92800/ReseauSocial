const db = require('../DBConnect');

const sqlCreateComment = (userId, publicationId, content) => {
    return `INSERT INTO comments (userId, publicationId, content) VALUES ("${userId}", "${publicationId}", "${content}")`
};

const sqlGetOneComment = (id) => {
    return `SELECT comments.*, users.username FROM comments JOIN users ON comments.userId = users.id  WHERE comments.id = ${id}`
  };

const sqlUpdateComment = (content, id) => {
    return `UPDATE comments SET content = "${content}" WHERE id = "${id}"` // tester la sous requete
};

const sqlDeleteComment = (id) => {
    return `DELETE FROM comments WHERE id = "${id}"`
};

const sqlGetAllComments = () => {
  return `SELECT comments.*, users.username, users.avatar FROM comments JOIN users ON comments.userId = users.id ORDER BY createdAt DESC`
};

exports.createComment = (req, res, next) => {

    const createComment = sqlCreateComment(
        req.body.userId,
        req.params.id,
        req.body.content
    );

        console.log(createComment),


    db.query(
        createComment,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Commentaire envoyé !' })
}

exports.getOneComment = (req, res, next) => {
  
    const getOneComment = sqlGetOneComment(
      req.params.id
    );
  
    // console.log(getOneComment)
    
    db.query(
      getOneComment,
      function(error, result) {
        if (error) throw error;
        if (result) {
          // console.log(result[0].username)
          }
        res.status(200).json({
          message: 'Acces au commentaire',
          id: result[0].id,
          userId: result[0].userId,
          username: result[0].username,
          content: result[0].content,
          publicationId: result[0].publicationId,
          createdAt: result[0].createdAt
        })
      }
    )
  };

exports.updateComment = (req, res, next) => {

    const updateComment = sqlUpdateComment(
        req.body.content,
        req.body.id
    );

        console.log(updateComment),


    db.query(
        updateComment,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Commentaire modifié !' })
}

exports.deleteComment = (req, res, next) => {

    const deleteComment = sqlDeleteComment(
        req.body.id,
    );

console.log(deleteComment)

    db.query(
        deleteComment,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Commentaire supprimé !' })
}

exports.getAllComments = (req, res, next) => {
  
    const getAllComments = sqlGetAllComments();
  
    console.log(getAllComments)
    
    db.query(
      getAllComments,
      function(error, result) {
        if (error) throw error;
        console.log(error);
        if (result) {
          console.log(result)
          }
        res.status(200).json(result)
      }
    )
  };

  exports.getAllComments = (req, res, next) => {
  
    const getAllComments = sqlGetAllComments();
  
    //console.log(getAllComments)
    
    db.query(
      getAllComments,
      function(error, result) {
        if (error) throw error;
        console.log(error);
        if (result) {
          console.log(result)
          }
        res.status(200).json(result)
      }
    )
  };