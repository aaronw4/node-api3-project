const express = require('express');
const db = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({error: 'The posts information could not be retrieved.'});
    });
});

router.get('/:id', (req, res) => {
 res.status(200).json(req.post);
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware


function validatePostId(req, res, next) {
  const {id} = req.params;

  db.getById(id)
    .then(post => {
      if (post) {
      req.post = post;
      next();
      } else {
        res.status(404).json({message: "invalid post id"});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There is an error in your request.'});
    });
}

module.exports = router;
