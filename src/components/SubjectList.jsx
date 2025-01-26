import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSubjects } from '../store/subjectsSlice';

function SubjectList() {
    const dispatch = useDispatch();
    const { subjects, status, error } = useSelector(state => state.subjects);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSubjects());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2 className="mt-4 mb-4">Select a Subject</h2>
            <div className="row">
                {subjects.map(subject => (
                    <div key={subject.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{subject.title}</h5>
                                <Link to={`/review/${subject.id}`} className="btn btn-primary">
                                    Start Review
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubjectList;
