const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  db.insert(req.user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding user."
      })
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
  .then(users => {
      res.status(200).json(users);
  })
  .catch(err => {
      res.status(500).json({success: false, errorMassage: 'The users information could not be retrieved'});
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
      req.user = user;
      next();
      } else {
        res.status(404).json({message: "invalid user id"});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There is an error in your request.'});
    });
}

function validateUser(req, res, next) {
  const userInfo = req.body;
  const {name} = req.body;

  if (!name) {
    res.status(400).json({message: "missing required name field"});
  };

  db.insert(userInfo)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: "missing user data"});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There is an error in your request.'});
    })
}



module.exports = router;
