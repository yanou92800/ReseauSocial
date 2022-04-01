const db = require('../DBConnect');

const sqlCreatePublication = (userId, content, attachment) => {
    return `INSERT INTO publications (userId, content, attachment) VALUES ("${userId}", "${content}", "${attachment}")`
};

const sqlUpdatePublication = (content, userId, id) => {
    return `UPDATE publications SET content = "${content}", userId = "${userId}" WHERE id = "${id}"` // tester la sous requete
};

const sqlGetOnePublication = (id) => {
    return `SELECT publications.*, users.username, users.avatar FROM publications JOIN users ON publications.userId = users.id WHERE publications.id = ${id}`
  };

const sqlDeletePublication = (id) => {
    return `DELETE FROM publications WHERE id = "${id}"`
};

const sqlGetAllPublications = () => {
    return `SELECT publications.*, users.username, users.avatar FROM publications JOIN users ON publications.userId = users.id ORDER BY createdAt DESC`
  };

exports.createPublication = (req, res, next) => {

    let attachment = null;
    if (req.file) {
      attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    } 
    if (req.body.content == "" && req.file == undefined) {
      res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
    }
    else {
      const createPublication = sqlCreatePublication(
        req.body.userId,
        req.body.content,
        attachment
      );
      db.query(
        createPublication,
        function(error, result) {
            if (error) throw error;
            console.log(error);
            if (result) {
                // console.log(result)
            }
            res.status(201).json(result)
        }
      ) 
    }
};

exports.getOnePublication = (req, res, next) => {

    //console.log(getOnePublication)
  
    const getOnePublication = sqlGetOnePublication(
      req.params.id
    );
  
    //console.log("getPubli", getOnePublication)
    
    db.query(
      getOnePublication,
      function(error, result) {
        if (error) throw error;
        if (result) {
          //console.log(result[0].username)
          }
        res.status(200).json(result)
      }
    )
  };

exports.updatePublication = (req, res, next) => {

      const updatePublication = sqlUpdatePublication(
          req.body.content,
          req.body.userId,
          req.params.id
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

    // console.log("ID", req.params)

    const deletePublication = sqlDeletePublication(
      req.params.id
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
        //console.log(error);
        if (result) {
          //console.log(result)
          }
        res.status(200).json(result)
      }
    )
  };
  