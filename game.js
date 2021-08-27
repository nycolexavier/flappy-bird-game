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
    y: cvs.height - 204,

    desenha() {
        ctx.fillStyle = '#70c5ce';
        ctx.fillStyle (0, 0, cvs.width, cvs.height);

        ctx.drawImage(
            sprite,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
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
    // chama a função que esta dentro da variável fllapyBird
    flappyBird.desenha();

    // ajudar a reproduzir os quadros do jogo
    requestAnimationFrame(loop);
}

loop();
