import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <h1 className="text-center mt-4">Welcome to Squirrel Cannon</h1>
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Start Learning</h5>
                            <p className="card-text">Review your flashcards and track your progress.</p>
                            <Link to="/subjects" className="btn btn-primary">Go to Subjects</Link>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Create Flashcards</h5>
                            <p className="card-text">Add new flashcards to your collection.</p>
                            <Link to="/create" className="btn btn-success">Create Flashcard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
