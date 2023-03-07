import questions from "../questionsDB";

export default function handler(req, res) {
	const selectedId = +req.query.id;

	const questionOrNull = questions.filter(
		(question) => question.id === selectedId
	);

	if (questionOrNull.length === 1) {
		const selectedQuestion = questionOrNull[0].shuffleAnswers();
		res.status(200).json(selectedQuestion.convertToObject());
	} else {
		res.status(204).send();
	}

}
