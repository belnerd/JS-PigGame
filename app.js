/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 extra challenges

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so they can change the predefined
score of 100. 
3. Add another dice to the game so that there are two dices now. The player looses his current score if one of them is a 1.
*/

var scores, roundScore, activePlayer, previousRoll, dice, maxScore;
newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. random number
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice[0] + '.png';
    diceDOM = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice[1] + '.png';
    
    // 3. update the round score if the rolled number was NOT 1
    if (dice[0] !== 1 && dice[1] !== 1) {
        // Check for two sixes in a row which causes the current player to lose all points
        if ((dice[0] == 6 || dice[1] == 6) && (previousRoll[activePlayer] == 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            document.getElementById('message-' + activePlayer).textContent = 'Rolled two sixes';
            nextPlayer();
        } else if (dice[0] == 6 || dice[1] == 6) {
            previousRoll[activePlayer] = 6;
            roundScore = roundScore + dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
        // add score
        previousRoll[activePlayer] = 0;
        roundScore = roundScore + dice[0] + dice[1];
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    } else {
        // change the player
        previousRoll[activePlayer] = 0;
        document.getElementById('message-' + activePlayer).textContent = 'Rolled a one';
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add current score to total score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Check if player won the game
    if (scores[activePlayer] >= maxScore) {
        document.querySelector('#score-' + activePlayer).textContent = 'WINS!';
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
    // Change the player
    nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function setMaxScore() {
    x = document.getElementById('goal');
    maxScore = x.value;
}

function nextPlayer() {
    // previousRoll[activePlayer] = dice;
    // console.log(previousRoll[activePlayer]);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.getElementById('message-' + activePlayer).textContent = ' ';
}

function newGame() {
     // Reset scores
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = [0,0];
    dice = [0,0];
    setMaxScore();
    // Show controls & hide the dice
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    // Update UI
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('message-0').textContent = ' ';
    document.getElementById('message-1').textContent = ' ';
    
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}








