import React, { useState } from 'react';
import clsx from 'clsx';
import { Check, X, AlertCircle } from 'lucide-react';
import styles from './styles.module.css';

interface QuizProps {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswerIndex, explanation }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (selected !== null) setIsSubmitted(true);
    };

    const isCorrect = selected === correctAnswerIndex;

    return (
        <div className={styles.quizContainer}>
            <div className={styles.quizHeader}>
                <AlertCircle size={20} className={styles.quizIcon} />
                <h3>Knowledge Check</h3>
            </div>

            <p className={styles.question}>{question}</p>

            <div className={styles.options}>
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        className={clsx(styles.option, {
                            [styles.selected]: selected === idx,
                            [styles.correct]: isSubmitted && idx === correctAnswerIndex,
                            [styles.wrong]: isSubmitted && selected === idx && idx !== correctAnswerIndex,
                        })}
                        onClick={() => !isSubmitted && setSelected(idx)}
                        disabled={isSubmitted}
                    >
                        {option}
                        {isSubmitted && idx === correctAnswerIndex && <Check size={16} className={styles.statusIcon} />}
                        {isSubmitted && selected === idx && idx !== correctAnswerIndex && <X size={16} className={styles.statusIcon} />}
                    </button>
                ))}
            </div>

            {!isSubmitted ? (
                <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={selected === null}
                >
                    Check Answer
                </button>
            ) : (
                <div className={clsx(styles.feedback, isCorrect ? styles.feedbackSuccess : styles.feedbackError)}>
                    <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
