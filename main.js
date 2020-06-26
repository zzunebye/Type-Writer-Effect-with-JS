const TypeWriter = function (txtElement, words, wait = 3000) { // words <- data-words, wait <- data-wait
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10)
  this.type();
  this.isDeleting = false;
}


/* -------------------------------------------------------------------------- */
/*        Type Method -> add a method to TypeWriter by using prototype        */
/* -------------------------------------------------------------------------- */

TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fulltxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fulltxt.substring(0, this.txt.length - 1)
  } else {
    // Add char
    this.txt = fulltxt.substring(0, this.txt.length + 1)
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fulltxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set isDeleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') { // after delete is completed
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
}


/* -------------------------------------------------------------------------- */
/*                        Event & Event function (init)                       */
/* -------------------------------------------------------------------------- */


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words')); // get custom attrubutes
  const wait = txtElement.getAttribute('data-wait');

  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}