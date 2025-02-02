import React from 'react';
import { Link } from 'react-router-dom';
import squirrelIcon from '../images/icons8-squirrel-94.png'

function Home() {
    return (
        <div className="container">
            <h1 className="text-center">Welcome to Squirrel Cannon</h1>

            <div className="row mt-4">
                <div className="col-md-8 offset-md-2">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Start Learning</h5>
                            <p className="card-text">Review your flashcards and track your progress.</p>
                            <Link to="/subjects" className="btn btn-primary">Go to Subjects</Link>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Create Flashcards</h5>
                            <p className="card-text">Add new flashcards to your collection.</p>
                            <Link to="/create" className="btn btn-success">Create Flashcards</Link>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">How it Works</h5>
                            <p className="card-text">
                            Based on the Leitner system, Squirrel Cannon's spaced repetition algorithm organizes your flashcards into cannons.				
                            To win the game, you need to get a card past cannon seven. If a card is in cannon one, you'll be asked it every day till you get it right. Once it's in cannon two, every other day. Then the interval increases per cannon reaching 64 days in cannon seven. If you can recall the word after over two months, you can expect to remember it for at least a year if not for life.
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
