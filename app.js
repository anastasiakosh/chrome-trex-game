document.addEventListener('DOMContentLoaded', function() {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const scoreElement = document.getElementById('score');
    let gravity = 0.9;
    let isJumping = false;
    let position = 51; // Dino's starting position (51px from the bottom)
    let isGameOver = false;
    let score = 0;

    function control(e) {
        if (e.code === 'Space' && !isJumping) {
            isJumping = true;
            jump();
        }
    }

    function jump() {
        let count = 0;
        let upTimerId = setInterval(function () {
            // Move up
            if (count === 15) {  // Limit the jump height
                clearInterval(upTimerId);
                let downTimerId = setInterval(function () {
                    // Move down
                    if (position <= 51) {  // Ensure the Dino returns to the starting position
                        clearInterval(downTimerId);
                        isJumping = false;
                        position = 51;  // Reset position to the starting ground level
                        dino.style.bottom = position + 'px';
                    } else {
                        position -= 5;
                        position = Math.max(position, 51); // Make sure position never goes below 51
                        dino.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 30;
                count++;
                position = position * gravity;
                dino.style.bottom = position + 'px';
            }
        }, 20);
    }

    function generateObstacles() {
        if (!isGameOver) {
            let obstaclePosition = 1000;
            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            grid.appendChild(obstacle);
            obstacle.style.left = obstaclePosition + 'px';

            let timerId = setInterval(function() {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position <= 111) { // Check collision with dino
                    clearInterval(timerId);
                    isGameOver = true;
                    document.removeEventListener('keydown', control);

                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild);
                    }
                    alert('Game Over');
                }
                obstaclePosition -= 10;
                obstacle.style.left = obstaclePosition + 'px';
            }, 20);

            if (!isGameOver) {
                score++;
                scoreElement.innerText = score;
            }

            setTimeout(generateObstacles, Math.random() * 4000);
        }
    }

    generateObstacles();
    document.addEventListener('keydown', control);
});
