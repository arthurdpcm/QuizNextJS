import QuestionModel from "../model/question";
import styles from "../styles/Quiz.module.css";
import Button from "./Button";
import Question from "./Question";

interface QuizProps {
	question: QuestionModel;
	lastQuestion: boolean;
	questionAnswered: (question: QuestionModel) => void;
	goToNextStep: () => void;
}

export default function Quiz(props: QuizProps) {
	function onAnswer(index: number) {
		if (props.question.notAnswered) {
			props.questionAnswered(props.question.getUserAnswer(index));
		}
	}

	return (
		<div className={styles.quiz}>
			{props.question ? (
				<Question
					value={props.question}
					timeToAnswer={10}
					onAnswer={onAnswer}
					timeIsOver={props.goToNextStep}
				/>
			) : (
				false
			)}

			<Button
				onClick={props.goToNextStep}
				text={props.lastQuestion ? "End Quiz" : "Next"}
			/>
		</div>
	);
}
