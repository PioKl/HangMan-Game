import React, { Component } from 'react';
import '../style/App.scss';
import Hangman from './Hangman';
import KeyBoard from './KeyBoard';
import Result from './Result';
import { getRandomWord } from './RandomWord';
import StartGame from './StartGame';

class App extends Component {
  fails = 0;
  points = 0;
  pointsOverall = 0;
  state = {
    attempts: 0,
    word: "",
    guess: "",
    letter: '',
    restart: false,
    wrongLetters: [],
    start: true,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEnter, false);
    let word = [];
    word = getRandomWord(); //pobranie losowego slowa i przypisanie do zmiennej

    //Nowa wersja na slowo ze spacja tez
    let guess = []; //zgadywane slowo na poczatku pusta tablica
    let wordArray = [...word] // wordArray to tablica pobranego slowa
    wordArray.forEach((item, index) => { //przejdz przez tablice
      if (item === " ") {//w przypadku, gdy napotka "spacje"
        guess[index] = " "; //to w guess o takim samym indexie dodaj spacje
      } else { //w innym przypadku wypelnij guesss -, czyli kazdy inny index zostanie wstawiony -
        guess[index] = '-';
      }
    })
    //aktualizacja stanu
    this.setState({ //word: word, guess: guess
      word,
      guess,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.letter !== this.state.letter) { //zeby nie pojawil sie blad o zapetlaniu, jesli zostanie nowa litera wcisnieta wtedy:
      if (this.state.attempts < 5) { //w celu uniemozliwiena dalszego naciskania na literki i dalszego naliczania punktow i porazek
        let word = [...this.state.word]; //tablica slowa do odgadniecia
        let idOfLetter = []; //id literki
        let guess = [...this.state.guess]; //tablica zgadywanego slowa
        word.forEach((i, index) => {
          if (i === this.state.letter) { //jesli jakas litera w tablicy zgadza sie z wcisnieta literka
            idOfLetter.push(index); //to dodaj index tej litery do tablicy idOfLetter
            this.points += 1;
            this.pointsOverall += 1;
            guess[index] = this.state.letter;//nastepnie wstaw w tablicy zgadywanego slowa pod ten indeks wcisnieta litere
          }
          else {
            return false; //w przeciwnym razie zakoncz
          }
        })

        if (word.indexOf(this.state.letter) === -1) { //jesli w odgadywanym slowie nie ma wcisnietej przez uzytkownika litery
          if (this.state.restart !== true) { //jak pojawi sie przycisk restart czyli gra w zgadywanie zostanie skonczona, to jak bede klikal jeszcze w przyciski to nie naliczaj punktow, natomiast jestli jest false, czyli nie zostalo skonczone to pozwol na naliczanie, gdybym tego nie dodal to np, jakbym dobrze odgadl haslo i potem sobie klikal w zle literki to by moglo mi faile naliczac
            this.fails += 1; //to zwieksz liczbe porazek
            this.state.wrongLetters.push(this.state.letter); //dodaj literke do tablicy 'zlych literek'
          }
        }

        this.setState({ //zmien stan guess na aktualny guess: guess, a attempts czyli proby ma teraz zaktualizowac sie o liczbe porazek
          guess,
          attempts: this.fails,
        })
      }
    } else if (prevState.guess !== this.state.guess) {  //zastosowane poniewaz update by sie robil dopiero jak nacisne literke, czyli jakbym wpisal Gitara to by mi reset nie wyskoczyl, bo update by mi poszedl jakbym wcisnal jakas litere dobra, ktora sie nie powtarzala poprzednio, wtedy by zrobil update i by zobaczyl, ze sie zgadza, a tu niech robi update jak widzi, ze poprzedni zgadywany rozni sie od aktualnego zgadywanego
      if (this.state.attempts === 5 || (this.state.word === this.state.guess.join(""))) {//jesli liczba prob wynosi 5, to uzytkownik przegrywa lub haslo zostalo odgadniete, join laczy w jeden wyraz tablicy np. [B,A] to bedzie po join BA
        this.setState({
          restart: true, //jesli tak to niech bedzie dostepny przycisk restart
        })
      }

    }

  }

  //Obsluga klawisza z klawiatury (value bedzie pochodzilo z KeyBoard)
  handleButton = value => {
    this.setState({
      letter: value,
    })
  }


  //Obsluga przycisku Restart
  handleRestart = (e) => {
    e.preventDefault();
    let word = [];
    word = getRandomWord();
    //Nowa wersja na slowo ze spacja tez
    let guess = [];
    let wordArray = [...word]
    //podobne dzialanie jak w DidMount
    wordArray.forEach((item, index) => {
      if (item === " ") {
        guess[index] = " ";
      } else if (item === ".") { //dla przypadku z wordnika gdyby byl przyklad ze jest kropka
        guess[index] = ".";
      } else {
        guess[index] = '-';
      }
    })

    //umieszczone wyzej, jak bede mial nizej fails i points gdzie zakomentowane to jak nacisne enter to fails i points sie nie wyzeruja
    this.fails = 0; //liczba porazek zostaje wyzerowana
    this.points = 0;
    this.setState({ //guess: guess
      attempts: 0,
      guess,
      restart: false,
      word: word,
      wrongLetters: [],
    })
    /*     this.fails = 0; //liczba porazek zostaje wyzerowana
        this.points = 0; */
  }

  //Bbsluga klawisza enter
  handleEnter = (e) => {
    if (e.keyCode === 13 && this.state.restart === true) { //ma dzialac wtedy gdy pojawi sie przycisk restart i zostanie nacisniety klawisz enter
      this.handleRestart(e);
    }
    else if (e.keyCode === 13 && this.state.start === true) { //jesli wcisne klawisz enter i gra nie jest jeszcze zaczeta, czyli istnieje przycisk start, aby zaczac, to wtedy uruchom funkcje handleStart
      this.handleStart();
    }
  }

  //obsluga przycisku start, jesli klikne w przycisk zmien start na false, wtedy bedzie to oznaczalo, ze gra sie zaczela
  handleStart = newStartValue => { //newStartValue to wartosc z handleStart w StartGame
    this.setState({
      start: newStartValue,
    })
  }


  render() {
    return (
      <div className="App row min-vh-100 no-gutters ">

        {/* Jesli stan startu jest true, wtedy pojawia sie okienko zeby wystartowac gre, a jesli nie, czyli juz przycisk musial zostac klikniety, wiec gra sie rozpoczela, wtedy wyswietl wszystko zwiazane z rozgrywka*/}
        {this.state.start ?
          <StartGame handleStart={this.handleStart} />
          :
          <>
            <div id="result" className="col-6 col-md-12 order-2 order-md-1 row">
              <Result results={this.state} points={this.points} pointsOverall={this.pointsOverall} handleRestart={this.handleRestart} />
            </div>
            <div id="hangman" className="col-6 col-md-4 order-1 order-md-2">
              <Hangman attempts={this.state.attempts} />
            </div>
            <div className="restartPanel col-md-4 order-md-3">
            </div>
            <div id="keyboard" className="col-12 col-md-4 order-3 order-md-4">
              <KeyBoard handleButton={this.handleButton} cLetter={this.state.letter} guess={this.state.guess} wrongLetters={this.state.wrongLetters} word={this.state.word} restart={this.state.restart} />
            </div>
          </>
        }
      </div>

    );
  }
}

export default App;
