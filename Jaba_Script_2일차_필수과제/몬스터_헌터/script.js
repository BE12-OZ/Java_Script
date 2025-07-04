const monsterHpSpan = document.getElementById('monster-hp');
const playerHpSpan = document.getElementById('player-hp');
const attackBtn = document.getElementById('attack-btn');
const skillBtn = document.getElementById('skill-btn');
const runBtn = document.getElementById('run-btn');
const skillMenu = document.getElementById('skill-menu');
const skillButtons = document.querySelectorAll('.skill');
const logDiv = document.getElementById('log');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startGameBtn = document.getElementById('start-game-btn');
const gameOverScreen = document.getElementById('game-over-screen');
const gameOverMessage = document.getElementById('game-over-message');
const restartGameBtn = document.getElementById('restart-game-btn');

let playerHp = 100;
let monsterHp = 100;

function attack() {
    const playerDamage = Math.floor(Math.random() * 10) + 1;
    monsterHp -= playerDamage;
    addLog(`플레이어가 몬스터에게 ${playerDamage}의 데미지를 입혔습니다.`);

    if (monsterHp <= 0) {
        monsterHp = 0;
        endGame(true);
        return;
    }

    const monsterDamage = Math.floor(Math.random() * 15) + 1;
    playerHp -= monsterDamage;
    addLog(`몬스터가 플레이어에게 ${monsterDamage}의 데미지를 입혔습니다.`);

    if (playerHp <= 0) {
        playerHp = 0;
        endGame(false);
        return;
    }

    updateHp();
}

function strongAttack() {
    const playerDamage = Math.floor(Math.random() * 20) + 10;
    monsterHp -= playerDamage;
    addLog(`플레이어가 몬스터에게 강력한 공격으로 ${playerDamage}의 데미지를 입혔습니다.`);

    if (monsterHp <= 0) {
        monsterHp = 0;
        endGame(true);
        return;
    }

    const monsterDamage = Math.floor(Math.random() * 15) + 1;
    playerHp -= monsterDamage;
    addLog(`몬스터가 플레이어에게 ${monsterDamage}의 데미지를 입혔습니다.`);

    if (playerHp <= 0) {
        playerHp = 0;
        endGame(false);
        return;
    }

    updateHp();
}

function heal() {
    const healAmount = Math.floor(Math.random() * 10) + 5;
    playerHp += healAmount;
    if (playerHp > 100) {
        playerHp = 100;
    }
    addLog(`플레이어가 ${healAmount}만큼 회복했습니다.`);
    updateHp();
}

function run() {
    addLog('플레이어가 도망쳤습니다!');
    endGame(false);
}

function toggleSkillMenu() {
    skillMenu.classList.toggle('hidden');
}

function addLog(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function updateHp() {
    playerHpSpan.textContent = playerHp;
    monsterHpSpan.textContent = monsterHp;
}

function endGame(playerWon) {
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    if (playerWon) {
        gameOverMessage.textContent = '몬스터를 물리쳤습니다! 플레이어 승리!';
    } else {
        gameOverMessage.textContent = '게임 오버. 몬스터에게 패배했습니다.';
    }
}

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    playerHp = 100;
    monsterHp = 100;
    logDiv.innerHTML = '<p>게임 시작!</p>';
    attackBtn.disabled = false;
    skillBtn.disabled = false;
    runBtn.disabled = false;
    updateHp();
}

function restartGame() {
    gameOverScreen.classList.add('hidden');
    startGame();
}

attackBtn.addEventListener('click', attack);
skillBtn.addEventListener('click', toggleSkillMenu);
startGameBtn.addEventListener('click', startGame);
restartGameBtn.addEventListener('click', restartGame);

skillButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const skill = event.target.dataset.skill;
        if (skill === 'heal') {
            heal();
        } else if (skill === 'strongAttack') {
            strongAttack();
        }
        toggleSkillMenu(); 
    });
});

runBtn.addEventListener('click', run);