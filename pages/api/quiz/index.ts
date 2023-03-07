import questions from "../questionsDB";
import { shuffle } from "../../../functions/array";

export default function handler(req, res){
	const ids = questions.map((question) => question.id);
	res.status(200).json(shuffle(ids));
};
