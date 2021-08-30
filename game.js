// ctx === contexto

let frames = 0;
const somDe_HIT = new Audio;
somDe_HIT.src = "efeitos/efeitos_hit.wav";

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

// Chao
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
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            // console.log('[chao.x]', chao.x);    
            // console.log('[repeteEm]', repeteEm);
            // console.log('[movimentacao]', movimentacao % repeteEm);

            chao.x = movimentacao % repeteEm;

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

function fazColisao(flappyBird, chao) {
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
        pula() {
            console.log('Devo pular');
            console.log('[antes]', flappyBird.velocidade)
            flappyBird.velocidade = -flappyBird.pulo;
            console.log('[depois]', flappyBird.velocidade)
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                console.log('Fez colisao')
                somDe_HIT.play();

                mudaParaTela(Telas.GAME_OVER)
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            // console.log(flappyBird.velocidade)
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // asa pra cima
            { spriteX: 0, spriteY: 26, }, // asa no meio
            { spriteX: 0, spriteY: 52, }, // asa pra baixo
            { spriteX: 0, spriteY: 26, }, // asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                // asa do bird
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;


                // console.log('[incremento]', incremento);    
                // console.log('[baseRepeticao]', baseRepeticao);
                // console.log('[frame]', incremento % baseRepeticao);

            }

        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            // faz desenhar a parte da imagem que queremos
            contexto.drawImage(
                sprites,
                spriteX, spriteY,// Srpite x, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y, // posição X e Y dentro do canva
                flappyBird.largura, flappyBird.altura,
            );
        }
    }
    return flappyBird;
}

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

// MensagemGameOver
const mensagemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY,
            mensagemGameOver.largura, mensagemGameOver.altura,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura,
        )
    }
}


// [criaCanos]
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {

            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;


                // [Cano do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                // [Cano do Chão]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappyBird(par) {

            const cabecaDoFlappyBird = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                console.log('Flappy Bird')

                if(cabecaDoFlappyBird <= par.canoCeu.y) {
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y) {
                    return true;
                }
            }
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                console.log('Passou 100 Frames')
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }

            canos.pares.forEach(function(par){
               par.x = par.x - 2;

               if(canos.temColisaoComOFlappyBird(par)) {
                console.log('Perdeu :(');
                somDe_HIT.play();
                mudaParaTela(Telas.GAME_OVER)
               }

               if(par.x + canos.largura <= 0) {
                canos.pares.shift();
               }
            })

        }
    }
    return canos;
}

// Placar
function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        },
        atualiza() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
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
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
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
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        // chama a função que esta dentro da variável fllapyBird
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
}

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {},
    click(){
        mudaParaTela(Telas.inicio);
    }
}


// ajudar a reproduzir os quadros do jogo
function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;

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
