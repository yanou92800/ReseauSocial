const db = require('../DBConnect');

const sqlCreateComment = (UserId, PublicationId, content) => {
    return `INSERT INTO comments (UserId, PublicationId, content) VALUES ("${UserId}", "${PublicationId}", "${content}")`
};

const sqlUpdateComment = (content, id) => {
    return `UPDATE comments SET content = "${content}" WHERE id = "${id}"` // tester la sous requete
};

const sqlDeleteComment = (id) => {
    return `DELETE FROM comments WHERE id = "${id}"`
};

exports.createComment = (req, res, next) => {

    const createComment = sqlCreateComment(
        req.body.UserId,
        req.body.PublicationId,
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