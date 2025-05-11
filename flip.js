let hex = ["#86453f", "#985f69", "#cce6ff", "#003366", "#0066cc", "#f5dad7", "#ed1845", "#d0878e", "#d5cdcb"];

const random = () => Math.floor(Math.random() * hex.length);

const colorforblock = ()=>{
    let color="#"
let hexacolor="0123456789ABCDEF"
for (let i = 0; i < 6; i++) {
  color+=hexacolor[Math.floor(Math.random()*16)];
    
}
return color;
};
let mesg = document.querySelector('.message');
let findcolor = document.querySelector('.findcolor');
let blocks = document.querySelectorAll('.block');
let restartBtn = document.querySelector('.restart');
let overlay=document.querySelector('.overlap');
message=document.querySelector('.message');
emoji=document.querySelector('.emoji');
let gameOver = false;
let numOfFlips = 0;
let targetColor = hex[random()];
findcolor.style.backgroundColor = targetColor;

const winnerIndex = Math.floor(Math.random() * blocks.length);
blocks[winnerIndex].dataset.winning = "true"; 


blocks.forEach(block => {
    block.addEventListener("click", () => {
        if (gameOver) return;
        block.classList.toggle('flip');
        block.innerText = "";

        if (block.dataset.winning === "true") {
            clickedColor = targetColor;
        } 
        else {
            clickedColor = colorforblock();
        }
        block.style.backgroundColor = clickedColor;
        block.style.pointerEvents = 'none';

        if (clickedColor === targetColor) {
            overlay.style.backgroundColor= clickedColor;
            emoji.innerText="🎉"
            message.innerText=" That’s a win! "
                overlay.classList.add('show');
            gameOver = true;
            blocks.forEach(b => b.style.pointerEvents = 'none');
        } else {
            numOfFlips++;
            if (numOfFlips === 5) {
                emoji.innerText="❌";
                 message.innerText="Wrong guess!"
                 overlay.style.backgroundColor= "";
                overlay.classList.add('show');
                gameOver = true;
                blocks.forEach(b => b.style.pointerEvents = 'none');
            }
        }
    });
});

// Restart handler
restartBtn.addEventListener("click", () => {
    targetColor = hex[random()];
    findcolor.style.backgroundColor = targetColor;
    gameOver = false;
    numOfFlips = 0;
     emoji.innerText="";
     message.innerText=""
    overlay.style.backgroundColor= "";
    overlay.classList.remove('show');
    blocks.forEach(block => {
        
        block.innerText = "FLIP";
        block.style.backgroundColor = '';
        block.classList.remove('flip');
        block.style.pointerEvents = 'auto';
    });
});



