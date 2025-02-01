import React from 'react';
import { Link } from 'react-router-dom';
import squirrelIcon from '../images/icons8-squirrel-94.png'

function Home() {
    return (
        <div className="container">
            <h1 className="text-center">Welcome to The Squirrel Cannon</h1>

            <div className="row mt-4">
                <div className="col-md-8 offset-md-2">
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
                            <Link to="/create" className="btn btn-success">Create Flashcards</Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Smart Review System</h5>
                            <p className="card-text">
                                Based on the Leitner system, Squirrel Cannon's spaced repetition algorithm organizes your flashcards into boxes.
                                 When you get one right, the card advances to a higher box with a longer review interval. 
                                 If you get one wrong, the cards returns to the first box for more frequent practice. 
                                Once you've got a card right six times, you've clearly learnt it and you won't see it again. 
                            </p>
                            <div className="mt-3 text-center">
                                <img src={squirrelIcon} alt="Squirrel Icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
