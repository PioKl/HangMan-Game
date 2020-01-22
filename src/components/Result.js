import React from 'react';
import '../style/Result.scss';

const Result = (props) => {

    const { attempts, word, guess, restart } = props.results
    const { pointsOverall, points, handleRestart } = props

    return (
        <>
            <div id='hangManGuess' className="col-12  col-md-4">
                <em className='guess'>Guess Animal</em>
            </div>
            <div id='wordResult' className="col-12 order-2 order-md-1 col-md-4">
                {restart ? <p className='knownWord'>{word}</p> : null}
                {restart ? null : <p className='unknownWord'>{guess}</p>}
                {restart ? <button className="btn btn-primary btn-restart" onClick={handleRestart}>Restart</button> : null}
            </div>
            <div id='pointsResult' className="col-12 order-1 order-md-2 col-md-4">
                <ul className='pointsResultListItem'>
                    <li className='pointsOverall pointsResultItem'>Points Overall: <span className='pointsOverallNumber'>{pointsOverall}</span></li>
                    <li className='points pointsResultItem'>Points In This Game: <span className='pointsNumber'>{points}</span></li>
                    <li className='attempts pointsResultItem'>Failures: <span className='attemptsNumber'>{attempts}</span></li>
                </ul>

            </div>
        </>
    );
}

export default Result;