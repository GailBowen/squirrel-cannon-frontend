import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlashcard } from '../store/flashcardsSlice';
import { fetchSubjects } from '../store/subjectsSlice';

function CreateFlashcard() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const dispatch = useDispatch();
    const subjects = useSelector(state => state.subjects.subjects);
    const subjectsStatus = useSelector(state => state.subjects.status);

    useEffect(() => {
        if (subjectsStatus === 'idle') {
            dispatch(fetchSubjects());
        }
    }, [subjectsStatus, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createFlashcard({ question, answer, subjectId: parseInt(subjectId) }));
        setQuestion('');
        setAnswer('');
        setSubjectId('');
    };

    if (subjectsStatus === 'loading') {
        return <div>Loading subjects...</div>;
    }

    if (subjectsStatus === 'failed') {
        return <div>Error loading subjects. Please try again later.</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Create New Flashcard</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Question:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer">Answer:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="subject">Subject:</label>
                    <select
                        className="form-control"
                        id="subject"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        required
                    >
                        <option value="">Select a subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.title}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Flashcard</button>
            </form>
        </div>
    );
}

export default CreateFlashcard;
