import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFlashcards, reviewCard, nextCard } from '../store/flashcardsSlice';
import { fetchSubjectBoxStats } from '../store/boxStatusSlice';
import BoxStatsChart from '../components/BoxStatsChart';

function FlashcardReview() {
    const { subjectId } = useParams();
    const dispatch = useDispatch();
    const { flashcards, currentCardIndex, status, error } = useSelector(state => state.flashcards);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        dispatch(fetchFlashcards(subjectId));
        dispatch(fetchSubjectBoxStats(subjectId));
    }, [dispatch, subjectId]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (flashcards.length === 0) {
        return <div>No flashcards available for this subject.</div>;
    }

    const currentCard = flashcards[currentCardIndex];

    const handleCheckAnswer = async () => {
        const isCorrect = userAnswer.toLowerCase().trim() === currentCard.answer.toLowerCase().trim();
        await dispatch(reviewCard({ id: currentCard.id, correct: isCorrect }));
        dispatch(fetchSubjectBoxStats(subjectId));
        setShowResult(true);
    };

    const handleNextCard = () => {
        dispatch(nextCard());
        setUserAnswer('');
        setShowResult(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior
            if (showResult) {
                handleNextCard(); // Trigger Next Card if result is shown
            } else {
                handleCheckAnswer(); // Trigger Check Answer otherwise
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Flashcard Review</h2>
            <div className="card-number">
                Card {currentCardIndex + 1} of {flashcards.length}
            </div>
            <div className="flashcard-container">
                <div className="flashcard">
                    <h5 className="question-title">Question:</h5>
                    <p className="question-text">{currentCard.question}</p>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            className={`form-control ${showResult ? 'bg-light' : ''}`}
                            value={userAnswer}
                            onChange={(e) => {
                                if (!showResult) {
                                    setUserAnswer(e.target.value); // Only update the answer if showResult is false
                                }
                            }}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {!showResult ? (
                        <button className="btn btn-primary" onClick={handleCheckAnswer}>Check Answer</button>
                    ) : (
                        <>
                            {userAnswer.toLowerCase().trim() !== currentCard.answer.toLowerCase().trim() && (
                                <p>The correct answer: <b>{currentCard.answer}</b></p>
                            )}
                            <p>{userAnswer.toLowerCase().trim() === currentCard.answer.toLowerCase().trim() ?
                                "Correct!" : "Incorrect. Try again next time!"}
                            </p>
                            <button className="btn btn-primary" onClick={handleNextCard}>Next Card</button>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-3">
                <BoxStatsChart subjectId={subjectId} />
            </div>
        </div>
    );
}

export default FlashcardReview;
