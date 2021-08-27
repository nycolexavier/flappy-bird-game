// carregar nossa imagem
const sprites = new Image();
sprites.src = 'assets/cenario/sprites.png';

// definir 2d
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// nosso personagem
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
}

// ajudar a reproduzir os quadros do jogo
function loop () {
    // faz desenhar a parte da imagem que queremos
    contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY,// Srpite x, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y, // posição X e Y dentro do canva
        flappyBird.largura, flappyBird.altura,
    )

    // ajudar a reproduzir os quadros do jogo
    requestAnimationFrame(loop);
}

loop();
