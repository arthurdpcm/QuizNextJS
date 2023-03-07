import { useEffect, useState } from "react";

import Quiz from "../components/Quiz";
import QuestionModel from "../model/question";
import { useRouter } from "next/router";

const BASE_URL = "https://quiz-next-js-seven.vercel.app/api";

export default function Home() {
	const [questionsIds, setQuestionsIds] = useState<number[]>([]);
	const [question, setQuestion] = useState<QuestionModel>();
	const [correctAnswers, setCorrectAnswers] = useState<number>(0);

	const router = useRouter();

	async function loadQuestionsIds() {
		const res = await fetch(`${BASE_URL}/quiz`);
		const questionsIds = await res.json();
		setQuestionsIds(questionsIds);
	}

	async function loadQuestion(questionId: number) {
		const res = await fetch(`${BASE_URL}/questions/${questionId}`);
		const json = await res.json();
		const newQuestion = QuestionModel.convertFromObject(json);
		setQuestion(newQuestion);
	}

	useEffect(() => {
		loadQuestionsIds();
	}, []);

	useEffect(() => {
		questionsIds.length > 0 && loadQuestion(questionsIds[0]);
	}, [questionsIds]);

	function questionAnswered(questionAnswered: QuestionModel) {
		setQuestion(questionAnswered);
		const choseCorrectly = questionAnswered.choseCorrectly;
		setCorrectAnswers(correctAnswers + (choseCorrectly ? 1 : 0));
	}

	function nextQuestionId() {
			const nextId = questionsIds.indexOf(question.id) + 1;
			return questionsIds[nextId];

	}

	function goToNextStep() {
		const nextId = nextQuestionId();

		nextId ? goToNextQuestion(nextId) : goToResults();
	}

	function goToNextQuestion(nextId: number) {
		loadQuestion(nextId);
	}

	function goToResults() {
		router.push({
			pathname: "/Result",
			query: {
				total: questionsIds.length,
				correctAnswers,
			},
		});
	}

	return (
		<>
			{question ?
				<Quiz
					question={question}
					lastQuestion={nextQuestionId() === undefined}
					questionAnswered={questionAnswered}
					goToNextStep={goToNextStep}
				/> : false
			}
		</>
	);
}
