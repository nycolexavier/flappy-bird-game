// ctx === contexto


// carregar nossa imagem
const sprites = new Image();
sprites.src = 'assets/cenario/sprites.png';

// definir 2d
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// background 
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

// Chão
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    // altura total do canva e subtrai 112
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        
        //preencher todo o quadro
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    },

};

// nosso personagem
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade : 0,
    atualiza () {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        // console.log(flappyBird.velocidade)
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    desenha () {
        // faz desenhar a parte da imagem que queremos
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,// Srpite x, Sprite Y
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, // posição X e Y dentro do canva
            flappyBird.largura, flappyBird.altura,
        );
    }
}

// ajudar a reproduzir os quadros do jogo
function loop () {
    flappyBird.atualiza();
    planoDeFundo.desenha();
    chao.desenha();
    // chama a função que esta dentro da variável fllapyBird
    flappyBird.desenha();
    
    

    // ajudar a reproduzir os quadros do jogo
    requestAnimationFrame(loop);
}

loop();
