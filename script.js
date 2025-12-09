/* ===========================================================================
   PREVENIR PROBLEMAS DE ORIENTAÇÃO
   =========================================================================== */

// Detectar e prevenir problemas de orientação
function prevenirProblemasOrientacao() {
    console.log('📱 Verificando orientação do dispositivo...');
    
    // Verificar se estamos em mobile
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Prevenir comportamentos padrão que podem causar rotação
        document.addEventListener('touchmove', function(e) {
            // Prevenir zoom com dois dedos
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevenir rotação via JavaScript (remova qualquer lock de orientação)
        if (screen.orientation && screen.orientation.lock) {
            // NÃO travar a orientação - deixe o usuário controlar
            // screen.orientation.lock('portrait').catch(() => {});
        }
        
        // Forçar redimensionamento correto
        window.addEventListener('resize', function() {
            setTimeout(() => {
                // Apenas ajustar visualmente, não forçar rotação
                document.documentElement.style.width = '100%';
                document.body.style.width = '100%';
            }, 100);
        });
    }
}

// Executar ao carregar
document.addEventListener('DOMContentLoaded', function() {
    prevenirProblemasOrientacao();
    
    // Adicionar classe para identificar orientação
    function atualizarOrientacao() {
        if (window.innerHeight > window.innerWidth) {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        } else {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        }
    }
    
    window.addEventListener('resize', atualizarOrientacao);
    window.addEventListener('orientationchange', atualizarOrientacao);
    atualizarOrientacao();
});

/* ===========================================================================
   CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
   =========================================================================== */

// Configuração de imagens (SUBSTITUA COM SUAS IMAGENS)
const CONFIG_IMAGENS = {
    momentos: [
        "imagens/momento1.jpg",
        "imagens/momento2.jpg", 
        "imagens/momento3.jpg",
        "imagens/momento4.jpg"
    ],
    gostos: [
        "https://i.pinimg.com/1200x/c0/09/e3/c009e3432f53b1e0ff06de3c7b99f6fd.jpg",
        "imagens/gosto2.png",
        "https://i.pinimg.com/736x/de/74/f1/de74f121fa90f0d8cd6b47d59c5c8590.jpg",
        "https://i.pinimg.com/1200x/5d/78/85/5d788520ba606cecc27f7a1a70c153e9.jpg",
        "https://i.pinimg.com/736x/af/40/08/af4008b714477e737c9f35d613e7ac17.jpg",
        "https://i.pinimg.com/736x/e9/39/ba/e939ba2d9e812b3dfc93bb987f14ac6c.jpg"
    ],
    joey: "https://i.pinimg.com/736x/15/c9/2e/15c92eeab9b528f75200490aab8b9dfa.jpg"
};

// Estado global da aplicação
const APP_STATE = {
    isMobile: false,
    currentSection: 'surpresa',
    isMusicPlaying: false,
    isTransitioning: false,
    dataConhecimento: new Date('2022-03-15'),
    carrosselInterval: null,
    currentCarrosselSlide: 0,
    roletaSpinning: false
};

// Elementos DOM cacheados
const DOM = {};

/* ===========================================================================
   INICIALIZAÇÃO DA APLICAÇÃO
   =========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Site especial carregando...');
    
    // Detectar dispositivo móvel
    detectarDispositivo();
    
    // Cachear elementos DOM importantes
    cachearElementosDOM();
    
    // Inicializar Particles.js
    inicializarParticlesJS();
    
    // Inicializar contagem regressiva
    iniciarContagemRegressiva();
    
    // Carregar imagens
    carregarImagens();
    
    // Inicializar corações flutuantes
    inicializarCoracoesFlutuantes();
    
    // Adicionar listeners
    adicionarEventListeners();
    
    // Forçar scroll para o topo
    window.scrollTo(0, 0);
    
    console.log('✅ Aplicação inicializada com sucesso!');
});

/* ===========================================================================
   FUNÇÕES DE DETECÇÃO E UTILITÁRIAS
   =========================================================================== */

function detectarDispositivo() {
    const userAgent = navigator.userAgent.toLowerCase();
    APP_STATE.isMobile = /iphone|ipad|ipod|android|webos|blackberry|windows phone/.test(userAgent);
    
    if (APP_STATE.isMobile) {
        document.body.classList.add('mobile');
        console.log('📱 Modo mobile ativado');
    } else {
        console.log('🖥️ Modo desktop ativado');
    }
}

function cachearElementosDOM() {
    // Seções principais
    DOM.sections = {
        surpresa: document.getElementById('surpresa'),
        boasVindas: document.getElementById('boas-vindas'),
        transicao: document.getElementById('transicao'),
        player: document.getElementById('player-spotify'),
        carrossel: document.getElementById('carrossel-fotos'),
        gostos: document.getElementById('gostos'),
        estatisticas: document.getElementById('estatisticas'),
        mensagens: document.getElementById('mensagens'),
        roleta: document.getElementById('roleta'),
        final: document.getElementById('final')
    };
    
    // Botões importantes
    DOM.buttons = {
        iniciar: document.getElementById('btn-iniciar'),
        playMusic: document.getElementById('play-music'),
        pauseMusic: document.getElementById('pause-music'),
        nextMusic: document.getElementById('next-music'),
        btnMusica: document.getElementById('btnMusica'),
        btnJoey: document.getElementById('btn-joey'),
        closeModal: document.querySelector('.close-modal'),
        girarRoleta: document.getElementById('girar-roleta'),
        btnFinal: document.getElementById('btn-final'),
        salvarData: document.getElementById('salvar-data'),
        prevCarrossel: document.querySelector('.carrossel-btn.prev-btn'),
        nextCarrossel: document.querySelector('.carrossel-btn.next-btn')
    };
    
    // Elementos de mídia
    DOM.media = {
        musicaFundo: document.getElementById('musicaFundo'),
        volumeSlider: document.getElementById('volume-slider'),
        vinyl: document.querySelector('.vinyl-record')
    };
    
    // Outros elementos
    DOM.contadorSurpresa = document.getElementById('contador');
    DOM.dataDisplay = document.getElementById('data-conhecimento');
    DOM.roleta = document.getElementById('roleta');
    DOM.resultadoRoleta = document.getElementById('resultado-roleta');
    DOM.modalJoey = document.getElementById('joey-modal');
}

/* ===========================================================================
   PARTICLES.JS
   =========================================================================== */

function inicializarParticlesJS() {
    if (typeof particlesJS !== 'function') {
        console.warn('⚠️ Particles.js não carregado');
        return;
    }
    
    particlesJS("particles-js", {
        particles: {
            number: {
                value: APP_STATE.isMobile ? 40 : 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: { 
                value: ["#ff6b6b", "#ffd166", "#6a11cb", "#2575fc"]
            },
            shape: { 
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ff6b6b",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

/* ===========================================================================
   CARREGAMENTO DE IMAGENS
   =========================================================================== */

function carregarImagens() {
    console.log('🖼️ Carregando imagens...');
    
    // Carregar imagens do carrossel
    CONFIG_IMAGENS.momentos.forEach((url, index) => {
        const slideImage = document.getElementById(`slide-image-${index + 1}`);
        if (slideImage) {
            slideImage.style.backgroundImage = `url('${url}')`;
            
            // Pré-carregar imagens
            const img = new Image();
            img.src = url;
        }
    });
    
    // Carregar imagens dos gostos
    CONFIG_IMAGENS.gostos.forEach((url, index) => {
        const card = document.getElementById(`gosto-${index + 1}`);
        if (card) {
            card.style.backgroundImage = `url('${url}')`;
            
            // Pré-carregar imagens
            const img = new Image();
            img.src = url;
        }
    });
    
    // Carregar imagem do Joey
    const joeyImage = document.getElementById('joey-image');
    if (joeyImage && CONFIG_IMAGENS.joey) {
        joeyImage.style.backgroundImage = `url('${CONFIG_IMAGENS.joey}')`;
        
        // Pré-carregar imagem
        const img = new Image();
        img.src = CONFIG_IMAGENS.joey;
    }
    
    console.log('✅ Imagens carregadas com sucesso');
}

/* ===========================================================================
   CONTAGEM REGRESSIVA INICIAL
   =========================================================================== */

function iniciarContagemRegressiva() {
    let contador = 3;
    
    const intervalo = setInterval(() => {
        contador--;
        
        if (DOM.contadorSurpresa) {
            DOM.contadorSurpresa.textContent = contador;
            
            // Efeito visual
            DOM.contadorSurpresa.style.transform = 'scale(1.2)';
            setTimeout(() => {
                DOM.contadorSurpresa.style.transform = 'scale(1)';
            }, 150);
        }
        
        if (contador <= 0) {
            clearInterval(intervalo);
            mostrarBoasVindas();
        }
    }, 1000);
}

/* ===========================================================================
   GERENCIAMENTO DE SEÇÕES E TRANSIÇÕES
   =========================================================================== */

function mostrarBoasVindas() {
    console.log('🌟 Mostrando tela de boas-vindas');
    
    esconderSecao('surpresa');
    mostrarSecao('boasVindas');
    
    // Iniciar efeitos da tela de boas-vindas
    setTimeout(() => {
        if (DOM.buttons.iniciar) {
            DOM.buttons.iniciar.classList.add('pulse');
        }
    }, 500);
}

function iniciarExperiencia() {
    console.log('🚀 Iniciando experiência completa');
    
    if (APP_STATE.isTransitioning) return;
    APP_STATE.isTransitioning = true;
    
    // Efeito no botão
    if (DOM.buttons.iniciar) {
        DOM.buttons.iniciar.style.transform = 'scale(0.95)';
        DOM.buttons.iniciar.classList.remove('pulse');
    }
    
    // Transição
    setTimeout(() => {
        esconderSecao('boasVindas');
        mostrarTransicao();
    }, 300);
}

function mostrarTransicao() {
    console.log('🔄 Iniciando transição');
    
    mostrarSecao('transicao');
    criarParticulasTransicao();
    
    // Animação da barra de progresso
    const barra = document.querySelector('.barra');
    if (barra) {
        barra.style.animation = 'loading 2s ease-in-out';
    }
    
    // Avançar após a transição
    setTimeout(() => {
        esconderSecao('transicao');
        mostrarPlayerMusica();
    }, 3000);
}

function mostrarPlayerMusica() {
    console.log('🎵 Mostrando player de música');
    
    mostrarSecao('player');
    inicializarPlayerMusica();
    
    // Auto-avançar após alguns segundos
    setTimeout(() => {
        mostrarCarrossel();
    }, 8000);
}

function mostrarCarrossel() {
    console.log('📸 Mostrando carrossel');
    
    esconderSecao('player');
    mostrarSecao('carrossel');
    inicializarCarrossel();
    
    // Auto-avançar
    setTimeout(() => {
        mostrarGostos();
    }, 12000);
}

function mostrarGostos() {
    console.log('❤️ Mostrando seção de gostos');
    
    esconderSecao('carrossel');
    mostrarSecao('gostos');
    inicializarGostos();
    
    // Auto-avançar
    setTimeout(() => {
        mostrarEstatisticas();
    }, 15000);
}

function mostrarEstatisticas() {
    console.log('📊 Mostrando estatísticas');
    
    esconderSecao('gostos');
    mostrarSecao('estatisticas');
    inicializarEstatisticas();
    
    // Auto-avançar
    setTimeout(() => {
        mostrarMensagens();
    }, 12000);
}

function mostrarMensagens() {
    console.log('💌 Mostrando mensagens');
    
    esconderSecao('estatisticas');
    mostrarSecao('mensagens');
    
    // Auto-avançar
    setTimeout(() => {
        mostrarRoleta();
    }, 12000);
}

function mostrarRoleta() {
    console.log('🎡 Mostrando roleta');
    
    esconderSecao('mensagens');
    mostrarSecao('roleta');
    inicializarRoleta();
    
    // Auto-avançar
    setTimeout(() => {
        mostrarFinal();
    }, 15000);
}

function mostrarFinal() {
    console.log('✨ Mostrando seção final');
    
    esconderSecao('roleta');
    mostrarSecao('final');
    inicializarFinal();
}

function esconderSecao(key) {
    const section = DOM.sections[key];
    if (!section) return;
    
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        section.classList.remove('active');
        APP_STATE.isTransitioning = false;
    }, 500);
}

function mostrarSecao(key) {
    const section = DOM.sections[key];
    if (!section) return;
    
    section.classList.add('active');
    
    setTimeout(() => {
        section.style.opacity = '1';
        
        // Scroll suave para a seção
        if (!APP_STATE.isMobile) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 50);
    
    APP_STATE.currentSection = key;
}

function criarParticulasTransicao() {
    const container = document.querySelector('.particulas-transicao');
    if (!container) return;
    
    // Limpar particulas existentes
    container.innerHTML = '';
    
    // Criar novas partículas
    for (let i = 0; i < 25; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background-color: hsl(${Math.random() * 360}, 100%, 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: float ${Math.random() * 3 + 2}s ease-in-out forwards;
        `;
        
        container.appendChild(particula);
    }
}

/* ===========================================================================
   PLAYER DE MÚSICA
   =========================================================================== */

function inicializarPlayerMusica() {
    console.log('🎶 Inicializando player de música');
    
    // Configurar áudio
    if (DOM.media.musicaFundo) {
        DOM.media.musicaFundo.volume = 0.3;
        DOM.media.musicaFundo.loop = true;
        
        // Adicionar tratamento de erros
        DOM.media.musicaFundo.addEventListener('error', (e) => {
            console.error('❌ Erro ao carregar áudio:', e);
            mostrarErroMusica('Não foi possível carregar a música. Verifique o arquivo.');
        });
    }
    
    // Configurar botão de música flutuante
    if (DOM.buttons.btnMusica) {
        DOM.buttons.btnMusica.addEventListener('click', toggleMusica);
    }
    
    // Configurar controles do player
    if (DOM.buttons.playMusic) {
        DOM.buttons.playMusic.addEventListener('click', playMusica);
    }
    
    if (DOM.buttons.pauseMusic) {
        DOM.buttons.pauseMusic.addEventListener('click', pauseMusica);
    }
    
    if (DOM.buttons.nextMusic) {
        DOM.buttons.nextMusic.addEventListener('click', function() {
            if (DOM.media.musicaFundo) {
                DOM.media.musicaFundo.currentTime = 0;
                if (!APP_STATE.isMusicPlaying) {
                    playMusica();
                }
            }
        });
    }
    
    // Configurar controle de volume
    if (DOM.media.volumeSlider) {
        DOM.media.volumeSlider.addEventListener('input', function(e) {
            const volume = e.target.value / 100;
            if (DOM.media.musicaFundo) {
                DOM.media.musicaFundo.volume = volume;
            }
        });
        
        // Volume inicial
        if (DOM.media.musicaFundo) {
            DOM.media.musicaFundo.volume = DOM.media.volumeSlider.value / 100;
        }
    }
}

function playMusica() {
    if (!DOM.media.musicaFundo) return;
    
    // Tentar reproduzir
    const playPromise = DOM.media.musicaFundo.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('▶️ Música iniciada');
            APP_STATE.isMusicPlaying = true;
            
            // Atualizar UI
            if (DOM.buttons.playMusic) DOM.buttons.playMusic.style.display = 'none';
            if (DOM.buttons.pauseMusic) DOM.buttons.pauseMusic.style.display = 'flex';
            if (DOM.media.vinyl) DOM.media.vinyl.classList.add('playing');
            if (DOM.buttons.btnMusica) {
                DOM.buttons.btnMusica.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            
            // Animar vinil
            if (DOM.media.vinyl) {
                DOM.media.vinyl.style.animationPlayState = 'running';
            }
        }).catch(error => {
            console.error('❌ Erro ao reproduzir música:', error);
            mostrarErroMusica('Clique no botão para ativar o áudio');
            
            // Mostrar instruções
            if (error.name === 'NotAllowedError') {
                mostrarToast('🔇 Clique no botão de música para permitir o áudio');
            }
        });
    }
}

function pauseMusica() {
    if (!DOM.media.musicaFundo) return;
    
    DOM.media.musicaFundo.pause();
    APP_STATE.isMusicPlaying = false;
    console.log('⏸️ Música pausada');
    
    // Atualizar UI
    if (DOM.buttons.playMusic) DOM.buttons.playMusic.style.display = 'flex';
    if (DOM.buttons.pauseMusic) DOM.buttons.pauseMusic.style.display = 'none';
    if (DOM.media.vinyl) DOM.media.vinyl.classList.remove('playing');
    if (DOM.buttons.btnMusica) {
        DOM.buttons.btnMusica.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    
    // Pausar animação do vinil
    if (DOM.media.vinyl) {
        DOM.media.vinyl.style.animationPlayState = 'paused';
    }
}

function toggleMusica() {
    if (APP_STATE.isMusicPlaying) {
        pauseMusica();
    } else {
        playMusica();
    }
}

function mostrarErroMusica(mensagem) {
    console.error('🎵 Erro de música:', mensagem);
    
    // Criar mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        animation: fadeIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    `;
    
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Problema com a música</strong>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 13px; opacity: 0.9;">${mensagem}</p>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

function mostrarToast(mensagem) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 250px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: fadeIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ===========================================================================
   CARROSSEL DE FOTOS
   =========================================================================== */

function inicializarCarrossel() {
    console.log('🔄 Inicializando carrossel');
    
    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || !slides.length) {
        console.error('❌ Elementos do carrossel não encontrados');
        return;
    }
    
    // Configurar navegação por botões
    if (DOM.buttons.prevCarrossel) {
        DOM.buttons.prevCarrossel.addEventListener('click', () => {
            mudarSlideCarrossel(-1);
            resetarAutoPlay();
        });
    }
    
    if (DOM.buttons.nextCarrossel) {
        DOM.buttons.nextCarrossel.addEventListener('click', () => {
            mudarSlideCarrossel(1);
            resetarAutoPlay();
        });
    }
    
    // Configurar navegação por dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            mudarParaSlide(index);
            resetarAutoPlay();
        });
    });
    
    // Suporte para touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                mudarSlideCarrossel(1); // Swipe para esquerda
            } else {
                mudarSlideCarrossel(-1); // Swipe para direita
            }
            resetarAutoPlay();
        }
    }, { passive: true });
    
    // Iniciar auto-play
    iniciarAutoPlay();
}

function mudarSlideCarrossel(direction) {
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remover classe ativa do slide atual
    slides[APP_STATE.currentCarrosselSlide].classList.remove('active');
    dots[APP_STATE.currentCarrosselSlide].classList.remove('active');
    
    // Calcular novo slide
    APP_STATE.currentCarrosselSlide = (APP_STATE.currentCarrosselSlide + direction + slides.length) % slides.length;
    
    // Aplicar classe ativa ao novo slide
    slides[APP_STATE.currentCarrosselSlide].classList.add('active');
    dots[APP_STATE.currentCarrosselSlide].classList.add('active');
    
    // Mover track
    const track = document.querySelector('.carrossel-track');
    if (track) {
        track.style.transform = `translateX(-${APP_STATE.currentCarrosselSlide * 100}%)`;
    }
}

function mudarParaSlide(index) {
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index < 0 || index >= slides.length) return;
    
    // Remover classe ativa do slide atual
    slides[APP_STATE.currentCarrosselSlide].classList.remove('active');
    dots[APP_STATE.currentCarrosselSlide].classList.remove('active');
    
    // Atualizar slide atual
    APP_STATE.currentCarrosselSlide = index;
    
    // Aplicar classe ativa ao novo slide
    slides[APP_STATE.currentCarrosselSlide].classList.add('active');
    dots[APP_STATE.currentCarrosselSlide].classList.add('active');
    
    // Mover track
    const track = document.querySelector('.carrossel-track');
    if (track) {
        track.style.transform = `translateX(-${APP_STATE.currentCarrosselSlide * 100}%)`;
    }
}

function iniciarAutoPlay() {
    if (APP_STATE.carrosselInterval) {
        clearInterval(APP_STATE.carrosselInterval);
    }
    
    APP_STATE.carrosselInterval = setInterval(() => {
        mudarSlideCarrossel(1);
    }, 5000);
}

function resetarAutoPlay() {
    if (APP_STATE.carrosselInterval) {
        clearInterval(APP_STATE.carrosselInterval);
    }
    iniciarAutoPlay();
}

/* ===========================================================================
   SEÇÃO DE GOSTOS
   =========================================================================== */

function inicializarGostos() {
    console.log('🎸 Inicializando seção de gostos');
    
    // Modal do Joey Jordison
    if (DOM.buttons.btnJoey) {
        DOM.buttons.btnJoey.addEventListener('click', () => {
            if (DOM.modalJoey) {
                DOM.modalJoey.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (DOM.buttons.closeModal) {
        DOM.buttons.closeModal.addEventListener('click', () => {
            if (DOM.modalJoey) {
                DOM.modalJoey.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar modal ao clicar fora
    if (DOM.modalJoey) {
        DOM.modalJoey.addEventListener('click', (e) => {
            if (e.target === DOM.modalJoey) {
                DOM.modalJoey.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.modalJoey && DOM.modalJoey.classList.contains('active')) {
            DOM.modalJoey.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===========================================================================
   ESTATÍSTICAS DO TEMPO
   =========================================================================== */

function inicializarEstatisticas() {
    console.log('⏰ Inicializando estatísticas');
    
    // Carregar data salva
    carregarDataSalva();
    
    // Configurar botão salvar data
    if (DOM.buttons.salvarData) {
        DOM.buttons.salvarData.addEventListener('click', salvarData);
    }
    
    // Atualizar contador imediatamente e a cada segundo
    atualizarContadorTempo();
    setInterval(atualizarContadorTempo, 1000);
}

function carregarDataSalva() {
    const dataSalva = localStorage.getItem('dataConhecimentoEspecial');
    
    if (dataSalva) {
        APP_STATE.dataConhecimento = new Date(parseInt(dataSalva));
        
        // Preencher inputs
        const diaInput = document.getElementById('dia-input');
        const mesInput = document.getElementById('mes-input');
        const anoInput = document.getElementById('ano-input');
        
        if (diaInput && mesInput && anoInput) {
            diaInput.value = APP_STATE.dataConhecimento.getDate();
            mesInput.value = APP_STATE.dataConhecimento.getMonth() + 1;
            anoInput.value = APP_STATE.dataConhecimento.getFullYear();
        }
    }
    
    atualizarDataDisplay();
}

function salvarData() {
    const diaInput = document.getElementById('dia-input');
    const mesInput = document.getElementById('mes-input');
    const anoInput = document.getElementById('ano-input');
    
    if (!diaInput || !mesInput || !anoInput) return;
    
    const dia = parseInt(diaInput.value);
    const mes = parseInt(mesInput.value);
    const ano = parseInt(anoInput.value);
    
    // Validação básica
    if (!dia || !mes || !ano) {
        mostrarToast('⚠️ Por favor, preencha todos os campos');
        return;
    }
    
    if (dia < 1 || dia > 31) {
        mostrarToast('⚠️ Dia inválido');
        return;
    }
    
    if (mes < 1 || mes > 12) {
        mostrarToast('⚠️ Mês inválido');
        return;
    }
    
    const anoAtual = new Date().getFullYear();
    if (ano < 2000 || ano > anoAtual) {
        mostrarToast(`⚠️ Ano deve estar entre 2000 e ${anoAtual}`);
        return;
    }
    
    // Criar nova data
    APP_STATE.dataConhecimento = new Date(ano, mes - 1, dia);
    
    // Salvar no localStorage
    localStorage.setItem('dataConhecimentoEspecial', APP_STATE.dataConhecimento.getTime());
    
    // Atualizar display
    atualizarDataDisplay();
    
    // Feedback visual
    if (DOM.buttons.salvarData) {
        DOM.buttons.salvarData.textContent = 'Data Salva!';
        DOM.buttons.salvarData.classList.add('success');
        
        setTimeout(() => {
            DOM.buttons.salvarData.textContent = 'Salvar Data';
            DOM.buttons.salvarData.classList.remove('success');
        }, 2000);
    }
    
    mostrarToast('✅ Data salva com sucesso!');
}

function atualizarDataDisplay() {
    if (!DOM.dataDisplay) return;
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    DOM.dataDisplay.textContent = APP_STATE.dataConhecimento.toLocaleDateString('pt-BR', options);
}

function atualizarContadorTempo() {
    const agora = new Date();
    const diferenca = agora - APP_STATE.dataConhecimento;
    
    // Cálculos
    const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
    const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Atualizar elementos
    document.getElementById('anos').textContent = anos;
    document.getElementById('meses').textContent = meses;
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    
    // Efeito visual nos números
    if (diferenca % 1000 < 100) {
        const contadores = document.querySelectorAll('.contador-valor');
        contadores.forEach(contador => {
            contador.style.transform = 'scale(1.1)';
            setTimeout(() => {
                contador.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

/* ===========================================================================
   ROLETA
   =========================================================================== */

function inicializarRoleta() {
    console.log('🎡 Inicializando roleta');
    
    // Configurações das opções da roleta
    const OPCOES_ROLETA = {
        'cinema': {
            titulo: "Cinema 🎬",
            mensagem: "Que tal assistirmos um filme juntos? Escolha o que quiser ver!"
        },
        'parque': {
            titulo: "Parque 🌳",
            mensagem: "Um passeio no parque para respirar ar puro e conversar sobre tudo."
        },
        'cafe': {
            titulo: "Cafeteria ☕",
            mensagem: "Vamos tomar um café e comer algo gostoso enquanto conversamos."
        },
        'restaurante': {
            titulo: "Restaurante 🍽️",
            mensagem: "Vamo a um restaurante à sua escolha! Qualquer um que você quiser."
        },
        'barrock': {
            titulo: "Bar de Rock 🤘",
            mensagem: "Vamos a um BAR ROCK! Escolha um bar que você adore."
        },
        'andar': {
            titulo: "Andar por aí 🚶‍♀️",
            mensagem: "Vamos andar por ai, e conhecer novos lugares juntos."
        },
        'escolha': {
            titulo: "Sua Escolha 🎯",
            mensagem: "Vamos em um lugar à sua escolha, pode escolher qualquer um!"
        },
        'surpresa': {
            titulo: "Surpresa! 🎁",
            mensagem: "Deixe comigo! Vou planejar uma surpresa especial para você."
        }
    };
    
    // Configurar botão de girar
    if (DOM.buttons.girarRoleta) {
        DOM.buttons.girarRoleta.addEventListener('click', function() {
            if (APP_STATE.roletaSpinning) return;
            
            // Desabilitar botão durante a animação
            APP_STATE.roletaSpinning = true;
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Calcular rotação aleatória
            const giros = 5 + Math.random() * 3;
            const anguloFinal = giros * 360 + Math.floor(Math.random() * 360);
            
            // Aplicar rotação
            if (DOM.roleta) {
                DOM.roleta.style.transform = `rotate(${anguloFinal}deg)`;
                DOM.roleta.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99)';
            }
            
            // Determinar resultado após a rotação
            setTimeout(() => {
                const anguloNormalizado = anguloFinal % 360;
                const setor = 45; // 360 / 8 opções
                const opcaoIndex = Math.floor((360 - anguloNormalizado) / setor) % 8;
                const opcoes = Array.from(document.querySelectorAll('.roleta-item'));
                const opcaoSelecionada = opcoes[opcaoIndex].getAttribute('data-value');
                const resultado = OPCOES_ROLETA[opcaoSelecionada];
                
                // Mostrar resultado
                if (DOM.resultadoRoleta && resultado) {
                    DOM.resultadoRoleta.innerHTML = `
                        <h3>🎉 ${resultado.titulo}</h3>
                        <p>${resultado.mensagem}</p>
                    `;
                    
                    // Efeito visual
                    DOM.resultadoRoleta.style.animation = 'pulse 1s ease';
                    setTimeout(() => {
                        DOM.resultadoRoleta.style.animation = '';
                    }, 1000);
                }
                
                // Reabilitar botão
                APP_STATE.roletaSpinning = false;
                this.disabled = false;
                this.style.opacity = '1';
                
                // Mostrar confetes
                lancarConfetes();
                
                console.log(`🎯 Roleta: ${resultado.titulo}`);
                
            }, 4000);
        });
    }
}

/* ===========================================================================
   SEÇÃO FINAL
   =========================================================================== */

function inicializarFinal() {
    console.log('✨ Inicializando seção final');
    
    if (DOM.buttons.btnFinal) {
        DOM.buttons.btnFinal.addEventListener('click', function() {
            // Efeito no botão
            this.style.transform = 'scale(0.95)';
            
            // Mostrar confetes
            lancarConfetes();
            
            // Mostrar mensagem final
            setTimeout(() => {
                mostrarMensagemFinal();
            }, 500);
            
            // Resetar botão
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

function mostrarMensagemFinal() {
    const mensagem = `
        💝 Obrigado por existir do seu jeito único. 
        
        Guarde isso: você é amada e sua importância é real. 
        
        Que este espaço reflita sempre o tanto que você significa 
        para quem te conhece.
        
        ❤️
    `;
    
    // Criar modal de mensagem final
    const modalFinal = document.createElement('div');
    modalFinal.className = 'modal active';
    modalFinal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header" style="background: linear-gradient(90deg, #ff6b6b, #c0392b);">
                <h2>Uma Última Surpresa 💝</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" style="padding: 30px; text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 20px; color: #ff6b6b;">
                    <i class="fas fa-heart"></i>
                </div>
                <p style="white-space: pre-line; line-height: 1.6; font-size: 1.1rem; color: #333;">
                    ${mensagem}
                </p>
                <button class="btn-joey" style="margin-top: 25px; background: linear-gradient(45deg, #6a11cb, #2575fc);">
                    Fechar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalFinal);
    document.body.style.overflow = 'hidden';
    
    // Configurar fechamento
    const closeBtn = modalFinal.querySelector('.close-modal');
    const closeBtn2 = modalFinal.querySelector('.btn-joey');
    
    const fecharModal = () => {
        modalFinal.classList.remove('active');
        setTimeout(() => {
            modalFinal.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    if (closeBtn) closeBtn.addEventListener('click', fecharModal);
    if (closeBtn2) closeBtn2.addEventListener('click', fecharModal);
    
    modalFinal.addEventListener('click', (e) => {
        if (e.target === modalFinal) fecharModal();
    });
    
    // Fechar com ESC
    const fecharComESC = (e) => {
        if (e.key === 'Escape') fecharModal();
    };
    
    document.addEventListener('keydown', fecharComESC);
    
    // Remover listener quando modal fechar
    setTimeout(() => {
        const checkModal = () => {
            if (!document.body.contains(modalFinal)) {
                document.removeEventListener('keydown', fecharComESC);
            }
        };
        setInterval(checkModal, 1000);
    }, 100);
}

/* ===========================================================================
   CORAÇÕES FLUTUANTES
   =========================================================================== */

function inicializarCoracoesFlutuantes() {
    const container = document.querySelector('.coracoes-flutuantes');
    if (!container) return;
    
    // Criar corações iniciais
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            criarCoracaoFlutuante(container);
        }, i * 300);
    }
    
    // Continuar criando corações periodicamente
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            criarCoracaoFlutuante(container);
        }
    }, 2000);
}

function criarCoracaoFlutuante(container) {
    if (!container) return;
    
    const coracao = document.createElement('div');
    coracao.className = 'coracao-flutuante';
    coracao.innerHTML = '❤️';
    
    // Posição aleatória
    coracao.style.left = `${Math.random() * 100}%`;
    
    // Tamanho aleatório
    const tamanho = Math.random() * 20 + 10;
    coracao.style.fontSize = `${tamanho}px`;
    
    // Opacidade aleatória
    coracao.style.opacity = `${Math.random() * 0.5 + 0.3}`;
    
    // Duração e delay aleatórios
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    coracao.style.animation = `coracao-voar ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(coracao);
    
    // Remover após animação
    setTimeout(() => {
        if (coracao.parentNode === container) {
            container.removeChild(coracao);
        }
    }, (duration + delay) * 1000);
}

/* ===========================================================================
   EFEITOS VISUAIS
   =========================================================================== */

function lancarConfetes() {
    const confetes = document.querySelectorAll('.confete');
    confetes.forEach(confete => {
        confete.style.opacity = '1';
        confete.style.animation = 'confete-cair 3s ease-in-out';
    });
    
    // Resetar após animação
    setTimeout(() => {
        confetes.forEach(confete => {
            confete.style.opacity = '0';
            confete.style.animation = '';
        });
    }, 3000);
}

/* ===========================================================================
   EVENT LISTENERS
   =========================================================================== */

function adicionarEventListeners() {
    console.log('🎮 Configurando event listeners');
    
    // Botão iniciar experiência
    if (DOM.buttons.iniciar) {
        DOM.buttons.iniciar.addEventListener('click', iniciarExperiencia);
        
        // Adicionar feedback tátil para mobile
        if (APP_STATE.isMobile) {
            DOM.buttons.iniciar.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            DOM.buttons.iniciar.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
    }
    
    // Elementos interativos da tela de boas-vindas
    const elementosInterativos = document.querySelectorAll('.elemento-interativo');
    elementosInterativos.forEach(elemento => {
        elemento.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            const nota = this.getAttribute('data-note');
            tocarNota(nota);
        });
    });
    
    // Cards de mensagens
    const mensagemCards = document.querySelectorAll('.mensagem-card');
    mensagemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const efeito = this.querySelector('.efeito-flutuante');
            if (efeito) {
                efeito.style.transform = 'scale(1.5)';
                efeito.style.opacity = '0.3';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const efeito = this.querySelector('.efeito-flutuante');
            if (efeito) {
                efeito.style.transform = 'scale(1)';
                efeito.style.opacity = '0.1';
            }
        });
    });
    
    // Cards de gostos
    const gostoCards = document.querySelectorAll('.gosto-card');
    gostoCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Prevenir comportamento padrão de gestos
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Pausar música quando a página não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && APP_STATE.isMusicPlaying && DOM.media.musicaFundo) {
            pauseMusica();
        }
    });
    
    console.log('✅ Event listeners configurados');
}

/* ===========================================================================
   FUNÇÕES AUXILIARES
   =========================================================================== */

function tocarNota(nota) {
    // Simular som de nota musical (pode ser substituído por Web Audio API)
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    // Mapear nota para frequência
    const frequencias = {
        'C': 261.63,
        'D': 293.66,
        'E': 329.63,
        'F': 349.23,
        'G': 392.00
    };
    
    const frequencia = frequencias[nota] || 440;
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = frequencia;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 1);
}

/* ===========================================================================
   API PÚBLICA PARA PERSONALIZAÇÃO
   =========================================================================== */

// Expor função para substituir imagens
window.substituirImagens = function(novasImagens) {
    if (novasImagens.momentos && Array.isArray(novasImagens.momentos)) {
        CONFIG_IMAGENS.momentos = novasImagens.momentos;
    }
    
    if (novasImagens.gostos && Array.isArray(novasImagens.gostos)) {
        CONFIG_IMAGENS.gostos = novasImagens.gostos;
    }
    
    if (novasImagens.joey) {
        CONFIG_IMAGENS.joey = novasImagens.joey;
    }
    
    carregarImagens();
    console.log('✅ Imagens substituídas com sucesso!');
    
    mostrarToast('🎨 Imagens atualizadas!');
};

// Expor função para definir data
window.definirDataConhecimento = function(ano, mes, dia) {
    const data = new Date(ano, mes - 1, dia);
    APP_STATE.dataConhecimento = data;
    localStorage.setItem('dataConhecimentoEspecial', data.getTime());
    atualizarDataDisplay();
    atualizarContadorTempo();
    
    mostrarToast('📅 Data atualizada!');
};

// Expor função para pular para seção específica
window.pularParaSecao = function(nomeSecao) {
    const secoesValidas = ['boasVindas', 'player', 'carrossel', 'gostos', 'estatisticas', 'mensagens', 'roleta', 'final'];
    
    if (!secoesValidas.includes(nomeSecao)) {
        console.error('❌ Seção inválida');
        return;
    }
    
    // Encontrar e mostrar a seção
    const section = DOM.sections[nomeSecao];
    if (section) {
        // Esconder todas as seções primeiro
        Object.values(DOM.sections).forEach(sec => {
            if (sec && sec !== section) {
                sec.classList.remove('active');
                sec.style.opacity = '0';
            }
        });
        
        // Mostrar seção desejada
        mostrarSecao(nomeSecao);
    }
};

/* ===========================================================================
   SOLUÇÃO PARA PROBLEMAS DE SCROLL E CARROSSEL
   =========================================================================== */

function corrigirScrollMobile() {
    if (!APP_STATE.isMobile) return;
    
    console.log('🔧 Corrigindo problemas de scroll no mobile...');
    
    // Remover classe que impede o scroll
    document.body.classList.remove('start-at-top');
    
    // Habilitar scroll em todas as seções
    document.querySelectorAll('section').forEach(section => {
        section.style.overflowY = 'auto';
        section.style.webkitOverflowScrolling = 'touch';
        section.style.height = '100vh';
    });
    
    // Corrigir altura do viewport
    function ajustarAlturaViewport() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    ajustarAlturaViewport();
    window.addEventListener('resize', ajustarAlturaViewport);
    window.addEventListener('orientationchange', ajustarAlturaViewport);
    
    // Adicionar padding-bottom para iPhone
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
    }
}

function melhorarCarrosselMobile() {
    if (!APP_STATE.isMobile) return;
    
    console.log('📱 Otimizando carrossel para mobile...');
    
    const carrossel = document.querySelector('.carrossel-container');
    if (!carrossel) return;
    
    // Função para detectar orientação e ajustar proporções
    function ajustarProporcaoPorOrientacao() {
        const isPortrait = window.innerHeight > window.innerWidth;
        
        if (isPortrait) {
            // Modo retrato: proporção 9:16
            carrossel.style.aspectRatio = '9/16';
            carrossel.style.maxHeight = '85vh';
        } else {
            // Modo paisagem: proporção mais ampla
            carrossel.style.aspectRatio = '16/9';
            carrossel.style.maxHeight = '90vh';
        }
    }
    
    // Ajustar inicialmente
    ajustarProporcaoPorOrientacao();
    
    // Ajustar quando a orientação mudar
    window.addEventListener('resize', ajustarProporcaoPorOrientacao);
    window.addEventListener('orientationchange', function() {
        setTimeout(ajustarProporcaoPorOrientacao, 100);
    });
    
    // Sistema inteligente para imagens do carrossel
    function otimizarImagensCarrossel() {
        const slides = document.querySelectorAll('.slide-image');
        slides.forEach((slide, index) => {
            // Verificar se a imagem está carregada
            const imgUrl = slide.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            if (!imgUrl) return;
            
            // Criar elemento imagem para detectar proporção
            const img = new Image();
            img.onload = function() {
                const ratio = this.width / this.height;
                
                // Ajustar background-size baseado na proporção
                if (ratio > 1) {
                    // Imagem paisagem
                    slide.style.backgroundSize = 'cover';
                } else {
                    // Imagem retrato
                    slide.style.backgroundSize = 'contain';
                    slide.style.backgroundColor = '#000';
                }
                
                console.log(`🖼️ Slide ${index + 1}: ${ratio > 1 ? 'Paisagem' : 'Retrato'} (${this.width}x${this.height})`);
            };
            img.src = imgUrl;
        });
    }
    
    // Aguardar carregamento das imagens
    setTimeout(otimizarImagensCarrossel, 1000);
}

// Inicializar correções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        corrigirScrollMobile();
        melhorarCarrosselMobile();
    }, 500);
    
    // Reaplicar correções quando mudar de seção
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    setTimeout(() => {
                        melhorarCarrosselMobile();
                    }, 300);
                }
            }
        });
    });
    
    // Observar mudanças nas seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section, { attributes: true });
    });
});

// Função para forçar redimensionamento em iOS
function corrigirViewportIOS() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) return;
    
    console.log('🍎 Aplicando correções específicas para iOS...');
    
    // Prevenir comportamento padrão de zoom
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    // Corrigir altura da viewport
    function setHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.style.height = 'calc(var(--vh, 1vh) * 100)';
    }
    
    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setHeight, 100);
    });
}

// Executar correções iOS
corrigirViewportIOS();

/* ===========================================================================
   ANIMAÇÕES CSS DINÂMICAS
   =========================================================================== */

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);


