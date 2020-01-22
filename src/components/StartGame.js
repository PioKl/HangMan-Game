//Dzialanie tego komponentu jest podobne jak z Komponentem KeyBoard

import React, { Component } from 'react';
import '../style/StartGame.scss';

class StartGame extends Component {
    state = {
        start: true,
    }

    //Obsluga przycisku Start
    handleStart = () => { //jesli zostanie wcisniety przycisk start to zmien start na false, czyli wlasnie oznacza to ze przycisk zostal wcisniety/klikniety
        this.setState({
            start: false,
        })
    }

    componentDidUpdate(prevProps, prevState) { //jesli poprzedni stan startu rozni sie od aktualnego to przekaz nowa wartosc za pomoca props do handleStart, ktore jest w App
        if (prevState.start !== this.state.start) {
            this.props.handleStart(this.state.start);
        }
    }
    render() {
        return (
            <div id='intro' className="d-flex align-items-center flex-column col-12">
                <div className="intro-heading mb-auto p-4">
                    <h1 className="intro-heading--h1">Welcome in HangMan Game</h1>
                    <h2 className="intro-heading--h2">Click Button Start To Begin</h2>
                </div>
                <div className="intro-start mb-auto">
                    <button type="button" className="btn btn-primary btn-start" onClick={this.handleStart}>Start</button>
                </div>
                <div className="intro-whoMade mb-auto">
                    <h2 className="intro-whoMade--h2">Made By Piotr Kłosowski</h2>
                </div>


            </div>
        );
    }
}

export default StartGame;