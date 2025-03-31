document.addEventListener('DOMContentLoaded', function () {
    console.log("Starts");
    const currentPlayerDisplay = document.getElementById('current-player');
    const scoreDisplay = document.getElementById('score');
    const resetBtn = document.getElementById('reset-btn');
    const lines = document.querySelectorAll('.horizontal-line, .vertical-line');
    const boxes = document.querySelectorAll('.box');
    const winPY = document.getElementById('winP');

    const BOARD_SIZE = 5; // 5x5 grid of boxes (6x6 dots)
    let currentPlayer = 1;
    let boxCompleted = false;
    let player1Score = 0;
    let player2Score = 0;

    // Function to update the score display
    function updateScore() {
        scoreDisplay.textContent = `Player 1: ${player1Score} - Player 2: ${player2Score}`;
    }

    // Function to reset the game
    function resetGame() {
        // Reset scores
        player1Score = 0;
        player2Score = 0;
        updateScore();

        // Reset current player
        currentPlayer = 1;
        currentPlayerDisplay.textContent = `Player 1 (Blue)`;

        // Reset all lines
        lines.forEach(line => {
            line.classList.remove('player1-line', 'player2-line', 'disabled');
            line.style.cursor = 'pointer';
        });

        // Reset all boxes
        boxes.forEach(box => {
            box.classList.remove('player1-box', 'player2-box');
        });

        console.log("Game reset!");
    }

    // Add click event listener to reset button
    resetBtn.addEventListener('click', resetGame);

    // Function to switch players
    function switchPlayer() {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        currentPlayerDisplay.textContent = `Player ${currentPlayer} (${currentPlayer === 1 ? 'Blue' : 'Red'})`;
        console.log(`Switching to player ${currentPlayer}`);
    }

    lines.forEach((line, index) => {
        line.addEventListener("click", () => {
            if (line.classList.contains('disabled')) {
                return;
            }
            else {
                boxCompleted = false;
                
                // Add line color based on current player
                if (currentPlayer === 1) {
                    line.classList.add('player1-line');
                    console.log("Player 1's turn");
                } else {
                    line.classList.add('player2-line');
                    console.log("Player 2's turn");
                }

                const row = line.getAttribute("data-row");
                const col = line.getAttribute("data-col");
                console.log(`Current player: ${currentPlayer}, Row: ${row}, Col: ${col}`);
                line.classList.add('disabled')
                // line.style.cursor = 'not-allowed';

                // Check and fill boxes after each line is drawn
                checkAndFillCell(row, col, currentPlayer);

                // Switch players if no box was completed
                if (!boxCompleted) {
                    switchPlayer();
                } else {
                    console.log(`Box completed! Player ${currentPlayer} gets another turn`);
                }
            }
        });
    });

    // Function to check if a box is completed and fill it
    function checkAndFillCell(row, col, player) {
        // Convert row and col to numbers
        row = parseInt(row);
        col = parseInt(col);
        let boxesCompleted = 0;
        
        // Check box above the line (for horizontal lines)
        if (row > 0) {
            const boxAbove = document.querySelector(`.box[data-row="${row - 1}"][data-col="${col}"]`);
            if (boxAbove && !boxAbove.classList.contains('player1-box') && !boxAbove.classList.contains('player2-box')) {
                const topLine = document.querySelector(`.horizontal-line[data-row="${row - 1}"][data-col="${col}"]`);
                const bottomLine = document.querySelector(`.horizontal-line[data-row="${row}"][data-col="${col}"]`);
                const leftLine = document.querySelector(`.vertical-line[data-row="${row - 1}"][data-col="${col}"]`);
                const rightLine = document.querySelector(`.vertical-line[data-row="${row - 1}"][data-col="${col + 1}"]`);

                if (topLine && bottomLine && leftLine && rightLine &&
                    topLine.classList.contains('disabled') &&
                    bottomLine.classList.contains('disabled') &&
                    leftLine.classList.contains('disabled') &&
                    rightLine.classList.contains('disabled')) {
                    
                    boxAbove.classList.add(player === 1 ? 'player1-box' : 'player2-box');
                    boxesCompleted++;
                    // Update score
                    if (player === 1) {
                        player1Score++;
                    } else {
                        player2Score++;
                    }
                    updateScore();
                    console.log(`Player ${player} completed a box above!`);
                }
            }
        }

        // Check box below the line (for horizontal lines)
        if (row < BOARD_SIZE) {
            const boxBelow = document.querySelector(`.box[data-row="${row}"][data-col="${col}"]`);
            if (boxBelow && !boxBelow.classList.contains('player1-box') && !boxBelow.classList.contains('player2-box')) {
                const topLine = document.querySelector(`.horizontal-line[data-row="${row}"][data-col="${col}"]`);
                const bottomLine = document.querySelector(`.horizontal-line[data-row="${row + 1}"][data-col="${col}"]`);
                const leftLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col}"]`);
                const rightLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col + 1}"]`);

                if (topLine && bottomLine && leftLine && rightLine &&
                    topLine.classList.contains('disabled') &&
                    bottomLine.classList.contains('disabled') &&
                    leftLine.classList.contains('disabled') &&
                    rightLine.classList.contains('disabled')) {
                    
                    boxBelow.classList.add(player === 1 ? 'player1-box' : 'player2-box');
                    boxesCompleted++;
                    // Update score
                    if (player === 1) {
                        player1Score++;
                    } else {
                        player2Score++;
                    }
                    updateScore();
                    console.log(`Player ${player} completed a box below!`);
                }
            }
        }

        // Check box to the left (for vertical lines)
        if (col > 0) {
            const boxLeft = document.querySelector(`.box[data-row="${row}"][data-col="${col - 1}"]`);
            if (boxLeft && !boxLeft.classList.contains('player1-box') && !boxLeft.classList.contains('player2-box')) {
                const topLine = document.querySelector(`.horizontal-line[data-row="${row}"][data-col="${col - 1}"]`);
                const bottomLine = document.querySelector(`.horizontal-line[data-row="${row + 1}"][data-col="${col - 1}"]`);
                const leftLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col - 1}"]`);
                const rightLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col}"]`);

                if (topLine && bottomLine && leftLine && rightLine &&
                    topLine.classList.contains('disabled') &&
                    bottomLine.classList.contains('disabled') &&
                    leftLine.classList.contains('disabled') &&
                    rightLine.classList.contains('disabled')) {
                    
                    boxLeft.classList.add(player === 1 ? 'player1-box' : 'player2-box');
                    boxesCompleted++;
                    // Update score
                    if (player === 1) {
                        player1Score++;
                    } else {
                        player2Score++;
                    }
                    updateScore();
                    console.log(`Player ${player} completed a box to the left!`);
                }
            }
        }

        // Check box to the right (for vertical lines)
        if (col < BOARD_SIZE) {
            const boxRight = document.querySelector(`.box[data-row="${row}"][data-col="${col}"]`);
            if (boxRight && !boxRight.classList.contains('player1-box') && !boxRight.classList.contains('player2-box')) {
                const topLine = document.querySelector(`.horizontal-line[data-row="${row}"][data-col="${col}"]`);
                const bottomLine = document.querySelector(`.horizontal-line[data-row="${row + 1}"][data-col="${col}"]`);
                const leftLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col}"]`);
                const rightLine = document.querySelector(`.vertical-line[data-row="${row}"][data-col="${col + 1}"]`);

                if (topLine && bottomLine && leftLine && rightLine &&
                    topLine.classList.contains('disabled') &&
                    bottomLine.classList.contains('disabled') &&
                    leftLine.classList.contains('disabled') &&
                    rightLine.classList.contains('disabled')) {
                    
                    boxRight.classList.add(player === 1 ? 'player1-box' : 'player2-box');
                    boxesCompleted++;
                    // Update score
                    if (player === 1) {
                        player1Score++;
                    } else {
                        player2Score++;
                    }
                    updateScore();
                    console.log(`Player ${player} completed a box to the right!`);
                }
            }
        }

        // Set boxCompleted flag if any boxes were completed
        boxCompleted = boxesCompleted > 0;
        console.log(`Total boxes completed in this turn: ${boxesCompleted}`);

        // Check if game is over after updating scores
        checkGameEnd();
    }

    // Function to check if all boxes are filled
    function checkGameEnd() {
        const allBoxes = document.querySelectorAll('.box');
        let filledBoxes = 0;
        
        allBoxes.forEach(box => {
            if (box.classList.contains('player1-box') || box.classList.contains('player2-box')) {
                filledBoxes++;
            }
        });

        // Total boxes in a 5x5 grid is 25
        if (filledBoxes === 25) {
            let winner;
            if (player1Score > player2Score) {
                winner = "Player 1 (Blue)";
            } else if (player2Score > player1Score) {
                winner = "Player 2 (Red)";
            } else {
                winner = "It's a tie!";
            }
            
            // Show winner message
            winPY.innerHTML = (`Game Over! ${winner} wins!\nFinal Score:\nPlayer 1: ${player1Score}\nPlayer 2: ${player2Score}`);
            // alert(`Game Over! ${winner} wins!\nFinal Score:\nPlayer 1: ${player1Score}\nPlayer 2: ${player2Score}`);
            
            // Disable all remaining lines
            lines.forEach(line => {
                if (!line.classList.contains('disabled')) {
                    line.classList.add('disabled');
                    line.style.cursor = 'not-allowed';
                }
            });
        }
    }
});

