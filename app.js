/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;
newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. random number
    dice = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    // 3. update the round score if the rolled number was NOT 1
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // change the player
        nextPlayer();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add current score to total score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Check if player won the game
    if (scores[activePlayer] >= 100) {
        document.querySelector('#score-' + activePlayer).textContent = 'WINS!';
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
    // Change the player
    nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
}

function newGame() {
     // Reset scores
     scores = [0,0];
     roundScore = 0;
     activePlayer = 0;
     // Show controls & hide the dice
     document.querySelector('.btn-roll').style.display = 'block';
     document.querySelector('.btn-hold').style.display = 'block';
     document.querySelector('.dice').style.display = 'none';
     // Update UI
     document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}





// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;







