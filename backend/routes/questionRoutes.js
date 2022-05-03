const express = require('express')
const router = express.Router()
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion 
} = require('../controllers/questionController')

router.route('/').get(getQuestions).post(createQuestion)
router.route('/:id').delete(deleteQuestion).put(updateQuestion)

// router.get('/', getQuestions)
// router.post('/', createQuestion)
// router.put('/:id', updateQuestion)
// router.delete('/:id', deleteQuestion)

module.exports = router
