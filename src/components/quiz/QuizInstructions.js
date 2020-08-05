import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Helmet } from "react-helmet";

const QuizInstructions = () => {
    return (
        <Fragment>
           <Helmet><title>instructions - Quia App</title></Helmet>
           <div className="instructions container">
               <h1>How to play the game</h1>
               <p>please Ensure you read the instruction from start to finish</p>
               <ul className="browser-default" id='main-list'>
                    <li>the game has a duration of 15 minutes and ends as soon as your timer ends</li>
                    <li>bla bla bla ans that is it</li>
                    <li>every question contains 4 amswers</li>
               </ul>
           </div>
           <div>
               <span className='left'><Link to='/'>no take me back </Link></span>
               <span className='right'><Link to='/play/quiz'>continue</Link></span>
           </div>
        </Fragment>
    )
}

export default QuizInstructions
