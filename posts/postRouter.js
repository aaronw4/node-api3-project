const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  db
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
  // do your magic!
}

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
