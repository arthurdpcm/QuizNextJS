import { useRouter } from "next/router"
import Button from "../components/Button"
import Statistic from "../components/Statistic"
import styles from "../styles/Result.module.css"


export default function result(){


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    const total = +router.query.total
    const correctAnswers = +router.query.correctAnswers
    const percentage = Math.round((correctAnswers/total)*100)

    function renderPercentage(){
        if(percentage >= 70){
            return "#9cd2a4"
        } else if(percentage >=50){
            return "#e5e272"
        } else{
            return "#e57272"
        }
    }


    return(
        <div className={styles.result}>
            <h1>Result</h1>

            <div style={{display: "flex"}}>
                <Statistic
                    text="Questions"
                    value={total}
                />
                <Statistic
                    text="Correct Answers"
                    value={correctAnswers}
                    backgroundColor="#9cd2a4"
                />
                <Statistic
                    text="Percentage"
                    value={`${percentage}%`}
                    backgroundColor={renderPercentage()}
                />
            </div>


            <Button href="/" text="Try Again"/>
        </div>
    )
}