class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
    this.wrongGuessCount = 0;
  }

  /**
   * This function takes a difficulty string as a parameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://it3049c-hangman.fly.dev?difficulty=easy
   * To get an medium word: https://it3049c-hangman.fly.dev?difficulty=medium
   * To get an hard word: https://it3049c-hangman.fly.dev?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://it3049c-hangman.fly.dev?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is received from the API.
   */
  start(difficulty, next) {
    this.getRandomWord(difficulty,(word) =>{
    this.word = word;
    });
    this.clearCanvas();
    this.drawBase();
    this.guesses = [];
    this.isOver = false;
    this.didWin = false;
    if (next){
    next();
    }
    }
    // get word and set it to the class's this.word
    // clear canvas
    // draw base
    // reset this.guesses to empty array
    // reset this.isOver to false
    // reset this.didWin to false

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {

    if(letter === ' '){
    throw new Error("Error. You need to enter a letter.");
    }
    if (!/^[a-zA-Z]$/.test(letter)){
    throw new Error ("Error. You may only enter letters.")
    }
    if (letter.length !==1){
    throw new Error ("Error. You may only enter one letter at a time.");
    }

    letter = letter.toLowerCase();

    if(this.guesses.includes(letter)){
    throw new Error ("Error. You have already guessed this letter")
    }

    this.guesses.push(letter);

    if (this.word.includes(letter)){
    this.checkWin();
    } else {
    this.onWrongGuess();
    }
    }
    // Check if nothing was provided and throw an error if so
    // Check for invalid cases (numbers, symbols, ...) throw an error if it is
    // Check if more than one letter was provided. throw an error if it is.
    // if it's a letter, convert it to lower case for consistency.
    // check if this.guesses includes the letter. Throw an error if it has been guessed already.
    // add the new letter to the guesses array.
    // check if the word includes the guessed letter:
    //    if it's is call checkWin()
    //    if it's not call onWrongGuess()

  checkWin() {
  const unknowns =this.word.split('').every(letter => this.guesses.includes(letter));
  if(unknowns === 0){
  this.didWin=true;
  this.isOver=true;
  }
  }
    // using the word and the guesses array, figure out how many remaining unknowns.
    // if zero, set both didWin, and isOver to true


  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
  this.wrongGuessCount++;

  if(this.wrongGuessCount === 0){
     this.drawBase();
  }
  if(this.wrongGuessCount === 1){
     this.drawHead();
  }
  if(this.wrongGuessCount === 2){
     this.drawBody();
    }
  if(this.wrongGuessCount === 3){
     this.drawRightArm();
  }
  if(this.wrongGuessCount === 4){
     this.drawLeftArm();
  }
  if(this.wrongGuessCount === 5){
     this.drawRightLeg();
  }
  if(this.wrongGuessCount === 6){
     this.drawLeftLeg();
     this.isOver=true;
     this.didWin=false;
  }
  }



  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the un-guessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
  const placeholder = [];

  for(const letter of this.word){
    if(this.guesses.includes(letter)){
    placeholder.push(letter);
    } else {
        placeholder.push('_');
    }
  }
    return placeholder.join(' ');
  }

  /**
   * This function returns a string of all the previous guesses, separated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return ``;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {}

  drawBody() {}

  drawLeftArm() {}

  drawRightArm() {}

  drawLeftLeg() {}

  drawRightLeg() {}
}
