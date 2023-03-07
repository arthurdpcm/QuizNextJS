import AnswerModel from "../model/answer";
import styles from "../styles/Answer.module.css";

interface AnswerProps {
	value: AnswerModel;
	index: number;
	letter: string;
	backgroundColorLetter: string;
	onAnswer: (index: number) => void;
}

export default function Answer(props: AnswerProps) {
	const answer = props.value;
	const answerIsVisible = answer.isVisible ? styles.answerIsVisible : "";

	return (
		<div className={styles.answer} onClick={() => props.onAnswer(props.index)}>
			<div className={`${answerIsVisible} ${styles.contentAnswer}`}>
				<div className={styles.front}>
					<div
						className={styles.letter}
						style={{
							backgroundColor: props.backgroundColorLetter,
						}}
					>
						{props.letter}
					</div>
					<div className={styles.value}>{answer.value}</div>
				</div>

				<div className={styles.back}>
					{answer.correct ? (
						<div className={styles.correct}>
							Correct answer!
							<div className={styles.value}>{answer.value} </div>
						</div>
					) : (
						<div className={styles.wrong}>
							The given answer is wrong...
							<div className={styles.value}>{answer.value} </div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
