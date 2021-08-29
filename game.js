// ctx === contexto


const somDe_HIT = new Audio;
somDe_HIT.src = "efeitos/efeitos_hit.wav";

// carregar nossa imagem
const sprites = new Image();
sprites.src = 'assets/cenario/sprites.png';

// definir 2d
const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// mensagem de início
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 154,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        )
    }
}


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
        contexto.fillRect(0, 0, canvas.width, canvas.height);

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

function criaoChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        // altura total do canva e subtrai 112
        y: canvas.height - 112,
        atualiza() {

        },
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
    return chao;

}


function fazColisao(flappyBird,
    chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

function criaFlappyBird() {
    // nosso personagem
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        gravidade: 0.25,
        velocidade: 0,
        pula() {
            console.log('Devo pular');
            flappyBird.velocidade = -flappyBird.pulo;
        },
        atualiza() {
            if (fazColisao(flappyBird, chao)) {
                console.log('Fez colisao')
                somDe_HIT.play();

                setTimeout(() => {
                    mudaParaTela(Telas.inicio)
                }, 500)
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            // console.log(flappyBird.velocidade)
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        desenha() {
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
    return flappyBird;
}



// Telas
const globais = {}
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    inicio: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaoChao();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
}

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        // chama a função que esta dentro da variável fllapyBird
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
}


// ajudar a reproduzir os quadros do jogo
function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    // ajudar a reproduzir os quadros do jogo
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click()
    }
})


mudaParaTela(Telas.inicio);
loop();
