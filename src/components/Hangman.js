import React from 'react';
import '../style/Hangman.scss';

//Pobranie obrazkow hangmana
import hangman0 from '../images/hangman0.png';
import hangman1 from '../images/hangman1.png';
import hangman2 from '../images/hangman2.png';
import hangman3 from '../images/hangman3.png';
import hangman4 from '../images/hangman4.png';
import hangman5 from '../images/hangman5.png';

const Hangman = (props) => {
    //props, bo wyswietlany obrazek bedzie zalezny od attempts, czyli podejsc gracza
    const hangManImages = [hangman0, hangman1, hangman2, hangman3, hangman4, hangman5]; //tablica zawierajaca te obrazki
    return (
        <>
            <div>
                <img src={hangManImages[props.attempts]} className="hangmanImg" alt="hangman" />
            </div>
        </>
    );
}

export default Hangman;