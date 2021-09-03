import React from 'react';
import classes from "./exam.module.scss";

const ExamSlide = (props: {examQuestion: string, examAnswers: string[]}) => {
    return (
        <div className={classes.examInnerWrapper}>
            <div className={classes.examHeading}>
                <h1 className={classes.examHeadingText}>Cybersecurity alapok</h1>
                <div className={classes.progress}>
                    <div className={classes.progressValue} />
                </div>
            </div>


            <div className={classes.quizWrapper}>
                <form className={classes.quizForm}>
                    <div className={classes.quizFormInnerWrapper}>
                        <p className={classes.quizFormQuestion}>
                            {props.examQuestion}
                        </p>
                        {props.examAnswers.map((answer, index) => {
                            return <label className={classes.quizFormAnswer}>
                                <input type="radio" name="q1" id="q11" value="A"/>
                                <span className={classes.answerDesign} />
                                <span className={classes.answerText}>{props.examAnswers[index]}</span>
                            </label>
                        })}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExamSlide;