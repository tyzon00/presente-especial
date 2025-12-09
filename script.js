/* ====================================
   CORREÇÃO DE BUGS PARA CELULAR
   ==================================== */

function corrigirCelular() {
    console.log("📱 Aplicando correções para celular...");
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("📱 Dispositivo móvel detectado");

        document.body.style.overflowX = 'hidden';
        document.body.style.width = '100%';

        const btnIniciar = document.getElementById('btn-iniciar');
        if (btnIniciar) {
            btnIniciar.classList.add('btn-iniciar-visible');
        }
    }
}

/* =====================================================
   DOMContentLoaded PRINCIPAL (TUDO JUNTO E ORGANIZADO)
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    corrigirCelular();

    window.scrollTo(0, 0);
    document.body.classList.add('start-at-top');

    document.getElementById('btn-iniciar')?.addEventListener('click', function() {
        document.body.classList.remove('start-at-top');
        console.log("🚀 Botão 'Iniciar Experiência' clicado!");
    });

    inicializarParticlesJS();
    carregarImagens();
    iniciarContagemRegressiva();
    inicializarCoracoesFlutuantes();

    console.log("🎁 Site carregado com correções para celular!");

    iniciarMusicaFundo();
});

/* ============================
   CONFIGURAÇÃO DA MÚSICA
   ============================ */

function iniciarMusicaFundo() {
    const musica = document.getElementById('musicaFundo');
    const btnMusica = document.getElementById('btnMusica');

    if (!musica) return;

    musica.volume = 0.3;
    musica.loop = true;

    if (btnMusica) {
        btnMusica.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (musica.paused) {
                musica.play()
                    .then(() => {
                        this.innerHTML = '<i class="fas fa-volume-up"></i>';
                        this.style.background = 'rgba(255, 107, 149, 0.9)';
                    });
            } else {
                musica.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                this.style.background = 'rgba(100, 100, 100, 0.7)';
            }
        });
    }
}

/* ==================== VARIÁVEIS GLOBAIS ==================== */

const configImagens = {
    momentos: [
        "https://media.discordapp.net/attachments/1306702378971566112/1447851153059741698/IMG_2322.jpg?format=webp",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851154053664860/2B994FDC.jpg?format=webp",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851154976407622/IMG_1941.jpg?format=webp",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851340587073578/image.jpg?format=webp"
    ],
    gostos: [
        "https://i.pinimg.com/1200x/c0/09/e3/c009e3432f53b1e0ff06de3c7b99f6fd.jpg",
        "https://media.discordapp.net/attachments/1306702378971566112/1447849089239875725/IMG_2459.png?format=webp",
        "https://i.pinimg.com/736x/de/74/f1/de74f121fa90f0d8cd6b47d59c5c8590.jpg",
        "https://i.pinimg.com/1200x/5d/78/85/5d788520ba606cecc27f7a1a70c153e9.jpg",
        "https://i.pinimg.com/736x/af/40/08/af4008b714477e737c9f35d613e7ac17.jpg",
        "https://i.pinimg.com/736x/e9/39/ba/e939ba2d9e812b3dfc93bb987f14ac6c.jpg"
    ],
    joey: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=500&q=80"
};

let backgroundMusic;
let isPlaying = false;
let dataConhecimento = new Date('2022-03-15');

/* ==================== PARTICLES ==================== */

function inicializarParticlesJS() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ff6b6b" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ff6b6b",
                opacity: 0.2
            },
            move: {
                enable: true,
                speed: 2,
                random: true,
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
}

/* ==================== IMAGENS ==================== */

function carregarImagens() {
    configImagens.momentos.forEach((url, i) => {
        const img = document.getElementById(`slide-image-${i+1}`);
        if (img) img.style.backgroundImage = `url('${url}')`;
    });

    configImagens.gostos.forEach((url, i) => {
        const card = document.getElementById(`gosto-${i+1}`);
        if (card) card.style.backgroundImage = `url('${url}')`;
    });

    const joey = document.getElementById('joey-image');
    if (joey) joey.style.backgroundImage = `url('${configImagens.joey}')`;
}

/* ==================== CONTAGEM ==================== */

function iniciarContagemRegressiva() {
    const contador = document.getElementById('contador');
    let n = 3;

    const intervalo = setInterval(() => {
        n--;
        contador.textContent = n;
        contador.style.transform = 'scale(1.2)';

        setTimeout(() => contador.style.transform = 'scale(1)', 200);

        if (n <= 0) {
            clearInterval(intervalo);
            mostrarTelaBoasVindas();
        }
    }, 1000);
}

/* ==================== TELAS ==================== */

function mostrarTelaBoasVindas() {
    const surpresa = document.getElementById('surpresa');

    surpresa.style.opacity = '0';

    setTimeout(() => {
        surpresa.style.display = 'none';
        const boas = document.getElementById('boas-vindas');
        boas.style.display = 'flex';
        boas.style.opacity = '1';

        iniciarEfeitosBoasVindas();
    }, 1000);
}

function iniciarEfeitosBoasVindas() {
    const btn = document.getElementById('btn-iniciar');

    if (!btn) return criarBotaoFallback();

    btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => iniciarTransicao(), 300);
    });
}

/* ==================== TRANSIÇÃO ==================== */

function iniciarTransicao() {
    const boas = document.getElementById('boas-vindas');
    boas.style.opacity = '0';

    setTimeout(() => {
        boas.style.display = 'none';

        const transicao = document.getElementById('transicao');
        transicao.style.display = 'flex';
        transicao.style.opacity = '1';

        criarParticulasTransicao();

        setTimeout(() => mostrarPlayerMusica(), 3000);
    }, 500);
}

function criarParticulasTransicao() {
    const container = document.querySelector('.particulas-transicao');

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = `${Math.random() * 10 + 5}px`;
        p.style.height = p.style.width;
        p.style.backgroundColor = `hsl(${Math.random()*360},100%,70%)`;
        p.style.borderRadius = '50%';
        p.style.left = `${Math.random()*100}%`;
        p.style.top = `${Math.random()*100}%`;
        p.style.animation = `float ${Math.random()*3+2}s infinite`;

        container.appendChild(p);
    }
}

/* ==================== PLAYER DE MÚSICA ==================== */

function mostrarPlayerMusica() {
    const transicao = document.getElementById('transicao');

    transicao.style.opacity = '0';

    setTimeout(() => {
        transicao.style.display = 'none';

        const player = document.getElementById('player-spotify');
        player.style.display = 'flex';
        player.style.opacity = '1';

        setupSimpleMusicPlayer();

        setTimeout(() => mostrarCarrosselFotos(), 8000);
    }, 500);
}

function setupSimpleMusicPlayer() {
    backgroundMusic = new Audio('musica1.mp3');
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;

    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    const nextBtn = document.getElementById('next-music');
    const volumeSlider = document.getElementById('volume-slider');

    playBtn?.addEventListener('click', playMusic);
    pauseBtn?.addEventListener('click', pauseMusic);

    nextBtn?.addEventListener('click', () => {
        backgroundMusic.currentTime = 0;
        if (!isPlaying) playMusic();
    });

    volumeSlider?.addEventListener('input', e => {
        backgroundMusic.volume = e.target.value / 100;
    });
}

function playMusic() {
    backgroundMusic.play().then(() => {
        isPlaying = true;
        updatePlayButton(true);
    });
}

function pauseMusic() {
    backgroundMusic.pause();
    isPlaying = false;
    updatePlayButton(false);
}

function updatePlayButton(playing) {
    const play = document.getElementById('play-music');
    const pause = document.getElementById('pause-music');

    play.style.display = playing ? 'none' : 'flex';
    pause.style.display = playing ? 'flex' : 'none';
}

/* ==================== FIM DO ARQUIVO ==================== */
