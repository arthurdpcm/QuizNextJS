export default class AnswerModel {
    #value: string
    #correct: boolean
    #isVisible: boolean

    constructor(value: string, correct: boolean, isVisible = false){
        this.#value = value
        this.#correct = correct
        this.#isVisible = isVisible
        
    }
    
    static correct(value: string){
        return new AnswerModel(value, true)
    }
    static wrong(value: string){
        return new AnswerModel(value, false)

    }

    get value(){
        return this.#value
    }
    get correct(){
        return this.#correct
    }
    get isVisible(){
        return this.#isVisible
    }

    showSelectedAnswer(){
        return new AnswerModel(this.#value, this.#correct, true)
    }

    static convertFromObject(obj: AnswerModel): AnswerModel{
        return new AnswerModel(obj.value, obj.correct, obj.isVisible)
    }

    convertToObject(){
        return{
            value: this.#value,
            correct: this.#correct,
            isVisible: this.#isVisible,
        }
    }
}