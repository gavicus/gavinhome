
export const createScoreEntries = (scoreList, questionList, loggedUser) => {
  if (!scoreList || !questionList || !loggedUser) return []
  const amendedScores = [...scoreList]
  for (const q of questionList) {
    const score = amendedScores.find(s => s.question === q._id)
    if (!score) {
      amendedScores.push({
        _id: null,
        question: q._id,
        user: loggedUser._id,
        right: 0,
        wrong: 0,
      })
    }
  }
  return amendedScores.map((s) => {
    const trys = s.right + s.wrong
    const percentage = trys ? s.right / trys : 0
    const score = Math.floor(percentage * 100)
    const question = questionList.find(q => q._id === s.question)
    return ({
      question: question.question,
      answer: question.answer,
      right: s.right,
      wrong: s.wrong,
      questionId: question._id,
      scoreId: s._id,
      score: score,
      type: question.type,
      subject: question.subject,
      message: question.message,
    })
  } )
}
