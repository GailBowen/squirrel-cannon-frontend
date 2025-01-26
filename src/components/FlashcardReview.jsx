import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFlashcards, reviewCard, nextCard } from '../store/flashcardsSlice';

function FlashcardReview() {
    const { subjectId } = useParams();
    const dispatch = useDispatch();
    const { flashcards, currentCardIndex, status, error } = useSelector(state => state.flashcards);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        dispatch(fetchFlashcards(subjectId));
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

    const handleCheckAnswer = () => {
        const isCorrect = userAnswer.toLowerCase().trim() === currentCard.answer.toLowerCase().trim();
        dispatch(reviewCard({ id: currentCard.id, correct: isCorrect }));
        setShowResult(true);
    };

    const handleNextCard = () => {
        dispatch(nextCard());
        setUserAnswer('');
        setShowResult(false);
    };

    return (
        <div className="container mt-4">
            <h2>Flashcard Review</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Question:</h5>
                    <p className="card-text">{currentCard.question}</p>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            className="form-control"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Type your answer here"
                            disabled={showResult}
                        />
                    </div>
                    {!showResult ? (
                        <button className="btn btn-primary" onClick={handleCheckAnswer}>Check Answer</button>
                    ) : (
                        <>
                            <h5 className="mt-4">Correct Answer:</h5>
                            <p>{currentCard.answer}</p>
                            <p>Your answer: {userAnswer}</p>
                            <p>{userAnswer.toLowerCase().trim() === currentCard.answer.toLowerCase().trim() ?
                                "Correct!" : "Incorrect. Try again next time!"}
                            </p>
                            <button className="btn btn-primary" onClick={handleNextCard}>Next Card</button>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-3">
                Card {currentCardIndex + 1} of {flashcards.length}
            </div>
        </div>
    );
}

export default FlashcardReview;
