const db = require('../DBConnect');

const sqlCreatePublication = (author, UserId, content) => {
    return `INSERT INTO publications (author, UserId, content) VALUES ("${author}", "${UserId}", "${content}")`
};

const sqlUpdatePublication = (content, UserId, id) => {
    return `UPDATE publications SET content = "${content}", UserId= "${UserId}" WHERE id = "${id}"` // tester la sous requete
};

const sqlGetPublication = (id) => {
    return `SELECT * FROM publications WHERE id = '${id}'`
  };

const sqlDeletePublication = (id) => {
    return `DELETE FROM publications WHERE id = "${id}"`
};

const sqlGetAllPublications = () => {
    return `SELECT author, content, id, UserId, createdAt FROM publications ORDER BY createdAt DESC`
  };

exports.createPublication = (req, res, next) => {

    const createPublication = sqlCreatePublication(
        req.body.author,
        req.body.UserId,
        req.body.content
    );
    
    // console.log(createPublication),


    db.query(
        createPublication,
        function(error, result) {
            if (error) throw error;
            if (result) {
                // console.log(result)
            }
            res.status(201).json({ 
                    message: 'Publication envoyée !',
            })
        }
    )
   
}

exports.getPublication = (req, res, next) => {
  
    const getPublication = sqlGetPublication(
      req.params.id
    );
  
    // console.log(getPublication)
    
    db.query(
      getPublication,
      function(error, result) {
        if (error) throw error;
        if (result) {
          // console.log(result[0].username)
          }
        res.status(200).json({
          message: 'Acces à la publication',
          infos: {
            id: result[0].id,
            content: result[0].content
          }
        })
      }
    )
  };

exports.updatePublication = (req, res, next) => {

    const updatePublication = sqlUpdatePublication(
        req.body.content,
        req.body.UserId,
        req.params.id
    );

        // console.log(updatePublication),


    db.query(
        updatePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication modifiée !' })
}

exports.deletePublication = (req, res, next) => {

    // console.log("ID", req.params)

    const deletePublication = sqlDeletePublication(
      req.params.id,
    );
    
    // console.log(deletePublication)

    db.query(
        deletePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication supprimée !' })
}

exports.getAllPublications = (req, res, next) => {
  
    const getAllPublications = sqlGetAllPublications();
  
    //console.log(getAllPublications)
    
    db.query(
      getAllPublications,
      function(error, result) {
        if (error) throw error;
        console.log(error);
        if (result) {
          // console.log(result)
          }
        res.status(200).json(result)
      }
    )
  };
  