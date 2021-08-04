const db = require('../DBConnect');

const sqlCreatePublication = (UserId, title, content) => {
    return `INSERT INTO publications (UserId, title, content) VALUES ("${UserId}", "${title}", "${content}")`
};


const sqlUpdatePublication = (title, content, id) => {
    return `UPDATE publications SET title = "${title}", content = "${content}" WHERE id = "${id}"` // tester la sous requete
};

const sqlDeletePublication = (id) => {
    return `DELETE FROM publications WHERE id = "${id}"`
};

exports.createPublication = (req, res, next) => {

    const createPublication = sqlCreatePublication(
        req.body.UserId,
        req.body.title,
        req.body.content
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
        req.body.id
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
        req.body.id,
    );

console.log(deletePublication)

    db.query(
        deletePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication supprimée !' })
}
