import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Timer.module.css'

interface TimerProps{

    countdownTime: number
    key: number
    timeIsOver: ()=> void

}

export default function Timer(props: TimerProps){
    return (
        <div className={styles.timer}>
            <CountdownCircleTimer 
                duration={props.countdownTime}
                size={120}
                isPlaying
                onComplete={props.timeIsOver}
                colors={['#50c878', '#ffed00', '#ed7400', '#ed0000']}
                colorsTime={[props.countdownTime, props.countdownTime/2, props.countdownTime/3, 0]}
                
            > 

                {({ remainingTime}) => remainingTime}

            </CountdownCircleTimer>
        </div>  
      )
}