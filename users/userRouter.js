const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {

  db.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Something went wrong.'
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

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      res.status(200).end()
    })
    .catch(err => {
      res.status(500).json({
        error: "The post could not be removed."
      })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ message: "missing user data" })
  }

  db.update(req.params.id, userInfo)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
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
  const {name} = req.body;
  const body = req.body;

  if (!body) {
    res.status(400).json({ message: "missing user data" })
  }

  if (!name) {
    res.status(400).json({message: "missing required name field"});
  };  

  next();
}



module.exports = router;
