const db = require('../DBConnect');

const sqlCreatePublication = (title, content, userId) => {
    return `INSERT INTO publications (title, content, userId) VALUES ("${title}", "${content}", "${userId}")`
};


const sqlUpdatePublication = (title, content) => {
    return `UPDATE publications SET picture = "${title}", comment = "${content}" WHERE userId = "${userId}" and publicationId = "${publicationId}"` // tester la sous requete
};

const sqlDeletePublication = (userId, publicationId) => {
    return `DELETE FROM publications WHERE publicationId = "${publicationId}" and user_id = "${userId}"`
};

exports.createPublication = (req, res, next) => {

    const createPublication = sqlCreatePublication(
        req.body.title,
        req.body.content,
        userId
    );

        console.log(createPublication),


    db.query(
        createPublication,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Publication envoyée !' })
}


exports.updatePublication = (req, res, next) => {

    const updatePublication = sqlUpdatePublication(
        req.body.title,
        req.body.content,
        req.body.userId,
    );

        console.log(updatePublication),


    db.query(
        updatePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication modifiée !' })
}

exports.deletePublication = (req, res, next) => {

    const deletePublication = sqlDeletePublication(
        req.body.UserId,
        // recuperer l'id de la publication
    );

console.log(deletePublication)

    db.query(
        deletePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication suprimée !' })
}
