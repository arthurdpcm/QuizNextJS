import { shuffle } from "../functions/array";
import AnswerModel from "./answer";

export default class QuestionModel {
	#id: number;
	#sentence: string;
	#answers: AnswerModel[];
	#choseCorrectly: boolean;
	// #answered: boolean

	constructor(
		id: number,
		sentence: string,
		answers: any[],
		choseCorrectly = false
	) {
		this.#id = id;
		this.#sentence = sentence;
		this.#answers = answers;
		this.#choseCorrectly = choseCorrectly;
	}

	get id() {
		return this.#id;
	}
	get sentence() {
		return this.#sentence;
	}
	get answers() {
		return this.#answers;
	}
	get choseCorrectly() {
		return this.#choseCorrectly;
	}

	get notAnswered(){
		return !this.answered
	}

	get answered() {
		for (let answer of this.#answers) {
			if (answer.isVisible) return true;
		}

		return false;
	}

	getUserAnswer(index: number): QuestionModel {
		const choseCorrectly = this.#answers[index]?.correct;
		const answers = this.#answers.map((answer, i) => {
			const selectedAnswer = index === i;
			const showAnswer = selectedAnswer || answer.correct;
			return showAnswer ? answer.showSelectedAnswer() : answer;
			//return answer.showSelectedAnswer();
		});
		return new QuestionModel(this.id, this.sentence, answers, choseCorrectly);
	}

	shuffleAnswers(): QuestionModel {
		let shuffledAnsweres = shuffle(this.#answers);
		return new QuestionModel(
			this.#id,
			this.#sentence,
			shuffledAnsweres,
			this.#choseCorrectly
		);
	}

	static convertFromObject(obj: QuestionModel): QuestionModel{
		const answers = obj.answers.map(res=> AnswerModel.convertFromObject(res))
        return new QuestionModel(obj.id, obj.sentence, answers, obj.choseCorrectly)
    }

	convertToObject() {
		return {
			id: this.#id,
			sentence: this.#sentence,
			answered: this.answered,
			choseCorrectly: this.#choseCorrectly,
			answers: this.#answers.map((answer) => answer.convertToObject()),
		};
	}
}
