import QuestionModel from "../model/question";
import styles from "../styles/Question.module.css";
import Answer from "./Answer";
import Sentence from "./Sentence";
import Timer from "./Timer";

const letters = [
	{ value: "A", bgcolor: "#F2C866" },
	{ value: "B", bgcolor: "#F266BA" },
	{ value: "C", bgcolor: "#85D4F2" },
	{ value: "D", bgcolor: "#BCE596" },
];

interface QuestionProps {
	value: QuestionModel;
	timeToAnswer?: number;
	onAnswer: (index: number) => void;
	timeIsOver: () => void;
}

export default function Question(props: QuestionProps) {
	const question = props.value;

	function renderAnswers() {
		return question.answers.map((answer, i) => {
			return (
				<Answer
					key={`${question.id}-${i}`}
					value={answer}
					index={i}
					letter={letters[i].value}
					backgroundColorLetter={letters[i].bgcolor}
					onAnswer={props.onAnswer}
				/>
			);
		});
	}

	return (
		<div className={styles.question}>
			<Sentence text={question.sentence} />
			<Timer
				key={question.id}
				countdownTime={props.timeToAnswer ?? 10}
				timeIsOver={props.timeIsOver}
			/>
			{renderAnswers()}
		</div>
	);
}
