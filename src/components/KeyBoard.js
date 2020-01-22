import React, { Component } from 'react';
import '../style/KeyBoard.scss';
class KeyBoard extends Component {
    greenButton = {
        backgroundColor: '#28a745',
        borderWidth: '1',
        borderColor: '#28a745',
    }

    state = {
        value: '',
    }

    //Obsluga klawisza (jesli sie kliknie myszka)
    handleButton = (e) => {
        this.setState({
            value: e.target.value,
        })
    }



    //Obsluga klawisza (wcisniecie na klawiaturze)
    handleKey = (e) => {
        if (e.keyCode >= 65 && e.keyCode <= 90) { //tylko bierz pod uwage nacisniete literki od A-Z
            let key = String.fromCharCode(e.keyCode) //UNICODE na stringa
            if (this.props.wrongLetters.includes(key)) { //warunek podobny do tego w disabled, jesli wcisne literke, ktora juz sie powtorzyla to zakoncz funkcje, a kiedy jest taka, ktora jeszcze nie bylo to przekaz ja
                return
            } else {
                this.setValueAsPressedKey(key)
            }
        }
    }

    //Funkcja sluzaca do przekazania wartosci z wcisnietego klawisza
    setValueAsPressedKey = (e) => {
        this.setState({
            value: e,
        })
    }

    componentDidMount() {
        //pomocny link
        //https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it/46123962
        //przy zaladowaniu niech zostanie dodany event, ktory bedzie "zczytywal" nacisniete klawisze
        document.addEventListener("keydown", this.handleKey, false);
    }

    //Przekazanie za pomoca props wartosci kliknietego lub nacisnietego klawisza (pobierze stan z value) do  App do metody handleButton
    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.handleButton(this.state.value);
        }
    }



    render() {

        let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
        let keyBoard = letters.split('').map((item, index) => (
            <button type="button" className="btn btn-primary btn-lg btn-keyBoard" key={index} value={item} /* disabled={item === this.props.cLetter ? true : false} */
                disabled={this.props.guess.includes(item) || this.props.wrongLetters.includes(item)} //jesli w odgadnietym slowie jest litera wcisnieta z klawiatury to zablokuj ja, lub jesli zostala kliknieta litera z wrongLetters, czyli zle odgadnietych to tez zablokuj taka litere
                onClick={this.handleButton}
                style={
                    //jesli dobre literki wcisniete to na zielono niech beda mialy tlo, jesli zle to zostanie im kolor
                    this.props.guess.includes(item) ? this.greenButton : null
                    //Kolor czerwony na disabled został ustawiony w pliku Result.scss

                }
            /*                 style={{
                                //jesli dobre literki wcisniete to na zielono niech beda mialy tlo, jesli zle to zostanie kolor im dodatkowo nadany w css
                                //to jest troszke inny sposob
                                    backgroundColor: (this.props.guess.includes(item) && 'green'),
                                    borderWidth: (this.props.guess.includes(item) && '1'),
                                    borderColor: (this.props.guess.includes(item) && 'green'),
            
                            }} */
            >
                {item}
            </button>
        ))
        return (
            <>

                {keyBoard}

            </>
        );
    }
}

export default KeyBoard;