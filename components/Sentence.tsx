import styles from "../styles/Sentence.module.css";

interface SentenceProps {
	text: string;
}

export default function Sentence(props: SentenceProps) {
	return (
		<div className={styles.sentence}>
			<span className={styles.text}>{props.text}</span>
		</div>
	);
}
