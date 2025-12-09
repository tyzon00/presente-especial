// ==============================================
// MÚSICA DE FUNDO - VERSÃO CORRIGIDA E SIMPLES
// ==============================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Configura a música
    const musica = document.getElementById('musicaFundo');
    const btnMusica = document.getElementById('btnMusica');
    
    if (musica) {
        // Configurações iniciais
        musica.volume = 0.3;
        musica.loop = true;
        
        console.log("🎵 Música configurada (volume: 0.3, loop: ativo)");
        
        // SOMENTE inicia a música quando o usuário clicar no botão específico
        if (btnMusica) {
            btnMusica.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (musica.paused) {
                    musica.play()
                        .then(() => {
                            console.log('🎵 Música iniciada pelo botão!');
                            this.innerHTML = '<i class="fas fa-volume-up"></i>';
                            this.style.background = 'rgba(255, 107, 149, 0.9)';
                        })
                        .catch(err => {
                            console.log('❌ Erro ao iniciar música:', err);
                        });
                } else {
                    musica.pause();
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    this.style.background = 'rgba(100, 100, 100, 0.7)';
                }
            });
        }
    } else {
        console.log("❌ Elemento de música não encontrado");
    }
});

/* ==================== VARIÁVEIS GLOBAIS E CONFIGURAÇÕES ==================== */

// Configurações de imagens (SUBSTITUA COM SUAS PRÓPRIAS IMAGENS)
const configImagens = {
    momentos: [
        "https://media.discordapp.net/attachments/1306702378971566112/1447851153059741698/IMG_2322.jpg?ex=69391ff6&is=6937ce76&hm=8395046be5bd8dc2fe38b51f6a641d1f317e9a4b65e8cc056e06692688703c94&=&format=webp&width=517&height=919",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851154053664860/2B994FDC-64EE-4BEE-A972-B35BE4039900.jpg?ex=69391ff6&is=6937ce76&hm=74821c2f016c46be6e6979b72b05ea7c202d7295a9010c610dbd976cfac966ce&=&format=webp&width=518&height=920",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851154976407622/IMG_1941.jpg?ex=69391ff7&is=6937ce77&hm=de73ff7d5e5e6ebcdefe091d2f8fcc6c07f840b3747378ad377be487d664e98b&=&format=webp&width=1227&height=920",
        "https://media.discordapp.net/attachments/1306702378971566112/1447851340587073578/image.jpg?ex=69392023&is=6937cea3&hm=d66a7b51a907b2dd2c4e450425678dfb20f835fd56f8ef2169ee2c04d5200045&=&format=webp&width=473&height=1024"
    ],
    gostos: [
        "https://i.pinimg.com/1200x/c0/09/e3/c009e3432f53b1e0ff06de3c7b99f6fd.jpg",
        "https://media.discordapp.net/attachments/1306702378971566112/1447849089239875725/IMG_2459.png?ex=69391e0a&is=6937cc8a&hm=1e71baffae219e3f230c4844f52a66c6d19549842d79d526ee833bfa556b4ab4&=&format=webp&quality=lossless&width=199&height=350",
        "https://i.pinimg.com/736x/de/74/f1/de74f121fa90f0d8cd6b47d59c5c8590.jpg",
        "https://i.pinimg.com/1200x/5d/78/85/5d788520ba606cecc27f7a1a70c153e9.jpg",
        "https://i.pinimg.com/736x/af/40/08/af4008b714477e737c9f35d613e7ac17.jpg",
        "https://i.pinimg.com/736x/e9/39/ba/e939ba2d9e812b3dfc93bb987f14ac6c.jpg"
    ],
    joey: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
};

// Variáveis globais
let backgroundMusic;
let isPlaying = false;
let dataConhecimento = new Date('2022-03-15');

/* ==================== FUNÇÕES DE INICIALIZAÇÃO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Força a página para começar no topo
    window.scrollTo(0, 0);
    document.body.classList.add('start-at-top');
    
    // Remove classe quando a experiência começar
    document.getElementById('btn-iniciar')?.addEventListener('click', function() {
        document.body.classList.remove('start-at-top');
    });
    
    // Inicializa componentes
    inicializarParticlesJS();
    carregarImagens();
    iniciarContagemRegressiva();
    inicializarCoracoesFlutuantes();
    
    console.log("🎁 Site especial carregado com sucesso!");
    console.log("💝 Pronto para começar a experiência!");
});

/* ==================== PARTICLES.JS ==================== */

function inicializarParticlesJS() {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: { value: "#ff6b6b" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
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
                bounce: false
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

/* ==================== GERENCIAMENTO DE IMAGENS ==================== */

function carregarImagens() {
    // Carrega imagens do carrossel
    for (let i = 0; i < configImagens.momentos.length; i++) {
        const imgElement = document.getElementById(`slide-image-${i+1}`);
        if (imgElement) {
            imgElement.style.backgroundImage = `url('${configImagens.momentos[i]}')`;
        }
    }
    
    // Carrega imagens dos gostos
    for (let i = 0; i < configImagens.gostos.length; i++) {
        const cardElement = document.getElementById(`gosto-${i+1}`);
        if (cardElement) {
            cardElement.style.backgroundImage = `url('${configImagens.gostos[i]}')`;
        }
    }
    
    // Carrega imagem do Joey
    const joeyImage = document.getElementById('joey-image');
    if (joeyImage && configImagens.joey) {
        joeyImage.style.backgroundImage = `url('${configImagens.joey}')`;
    }
}

/* ==================== CONTAGEM REGRESSIVA INICIAL ==================== */

function iniciarContagemRegressiva() {
    const surpresaSection = document.getElementById('surpresa');
    const contadorElement = document.getElementById('contador');
    let contador = 3;
    
    const intervaloContador = setInterval(() => {
        contador--;
        contadorElement.textContent = contador;
        
        // Efeito visual
        contadorElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            contadorElement.style.transform = 'scale(1)';
        }, 200);
        
        if (contador <= 0) {
            clearInterval(intervaloContador);
            mostrarTelaBoasVindas();
        }
    }, 1000);
}

/* ==================== TRANSIÇÕES DE TELA ==================== */

function mostrarTelaBoasVindas() {
    console.log("🔄 Mostrando tela de boas-vindas...");
    
    const surpresaSection = document.getElementById('surpresa');
    surpresaSection.style.opacity = '0';
    surpresaSection.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        surpresaSection.style.display = 'none';
        const boasVindasSection = document.getElementById('boas-vindas');
        boasVindasSection.style.display = 'flex';
        
        setTimeout(() => {
            boasVindasSection.style.opacity = '1';
            iniciarEfeitosBoasVindas();
        }, 50);
    }, 1000);
}

function iniciarTransicao() {
    console.log("✨ Iniciando transição...");
    
    const boasVindasSection = document.getElementById('boas-vindas');
    boasVindasSection.style.opacity = '0';
    boasVindasSection.style.transition = 'opacity 0.5s ease';
    
    const transicaoSection = document.getElementById('transicao');
    transicaoSection.style.display = 'flex';
    
    setTimeout(() => {
        transicaoSection.style.opacity = '1';
        criarParticulasTransicao();
        
        setTimeout(() => {
            mostrarPlayerMusica();
        }, 3000);
    }, 500);
}

/* ==================== TELA DE BOAS-VINDAS ==================== */

function iniciarEfeitosBoasVindas() {
    console.log("🎉 Iniciando efeitos de boas-vindas...");
    
    // Efeito nos elementos interativos
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
    
    // Botão de iniciar
    const btnIniciar = document.getElementById('btn-iniciar');
    btnIniciar.addEventListener('click', function() {
        console.log("🚀 Iniciando experiência...");
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            iniciarTransicao();
        }, 300);
    });
}

function tocarNota(nota) {
    console.log(`🎵 Tocando nota: ${nota}`);
    
    const notasMusicais = document.querySelector('.notas-musicais');
    const novaNota = document.createElement('div');
    novaNota.className = 'nota';
    novaNota.innerHTML = '<i class="fas fa-music"></i>';
    novaNota.style.left = `${Math.random() * 100}%`;
    novaNota.style.top = `${Math.random() * 100}%`;
    notasMusicais.appendChild(novaNota);
    
    setTimeout(() => {
        novaNota.remove();
    }, 4000);
}

function criarParticulasTransicao() {
    const particulasContainer = document.querySelector('.particulas-transicao');
    
    for (let i = 0; i < 30; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.width = `${Math.random() * 10 + 5}px`;
        particula.style.height = particula.style.width;
        particula.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particula.style.borderRadius = '50%';
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        particula.style.opacity = '0.7';
        particula.style.animation = `float ${Math.random() * 3 + 2}s infinite ease-in-out`;
        
        particulasContainer.appendChild(particula);
    }
}

/* ==================== PLAYER DE MÚSICA ==================== */

function mostrarPlayerMusica() {
    console.log("🎵 Mostrando player de música...");
    
    const transicaoSection = document.getElementById('transicao');
    transicaoSection.style.opacity = '0';
    transicaoSection.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        transicaoSection.style.display = 'none';
        const playerSection = document.getElementById('player-spotify');
        playerSection.style.display = 'flex';
        
        setTimeout(() => {
            playerSection.style.opacity = '1';
            setupSimpleMusicPlayer();
            
            setTimeout(() => {
                mostrarCarrosselFotos();
            }, 8000);
        }, 50);
    }, 500);
}

function setupSimpleMusicPlayer() {
    console.log("🎵 Configurando player de música simples...");
    
    backgroundMusic = new Audio();
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    
    // CAMINHO CORRETO PARA SUA ESTRUTURA
    const musicFile = 'musica1.mp3'; // ← ARQUIVO NA MESMA PASTA QUE index.html
    
    backgroundMusic.src = musicFile;
    console.log("🎶 Carregando sua música:", musicFile);
    console.log("📁 Caminho atual:", window.location.href);
    
    // Configura controles
    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    const nextBtn = document.getElementById('next-music');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => playMusic());
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => pauseMusic());
    }
    
    // No seu caso, o botão "next" deve apenas reiniciar a música
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (backgroundMusic) {
                backgroundMusic.currentTime = 0;
                if (!isPlaying) {
                    playMusic();
                }
            }
        });
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (backgroundMusic) {
                backgroundMusic.volume = volume;
                console.log("🔊 Volume ajustado para:", volume);
            }
        });
        
        // Define volume inicial
        backgroundMusic.volume = volumeSlider.value / 100;
    }
    
    // Configura animação do vinil
    const vinyl = document.querySelector('.vinyl-record');
    if (vinyl) {
        vinyl.style.animationPlayState = 'paused';
    }
    
    // Remove qualquer autoplay automático
    // A música só tocará quando o usuário clicar em "Play"
}

function playMusic() {
    if (!backgroundMusic) {
        console.log("❌ Player de música não inicializado");
        showMusicError("Player de música não inicializado");
        return;
    }
    
    // Verifica se a música foi carregada
    if (backgroundMusic.error) {
        console.log("❌ Erro na fonte de áudio");
        showMusicError("Erro ao carregar a música. Verifique o arquivo.");
        return;
    }
    
    backgroundMusic.play()
        .then(() => {
            isPlaying = true;
            console.log("✅ Sua música está tocando!");
            
            const vinyl = document.querySelector('.vinyl-record');
            if (vinyl) {
                vinyl.style.animationPlayState = 'running';
            }
            
            updatePlayButton(true);
        })
        .catch(e => {
            console.log("❌ Erro ao tocar música:", e.name, e.message);
            
            if (e.name === 'NotAllowedError') {
                showMusicPermissionMessage();
            } else {
                showMusicError("Não foi possível tocar a música: " + e.message);
            }
        });
}

function pauseMusic() {
    if (!backgroundMusic) return;
    
    backgroundMusic.pause();
    isPlaying = false;
    console.log("⏸️ Música pausada");
    
    const vinyl = document.querySelector('.vinyl-record');
    if (vinyl) {
        vinyl.style.animationPlayState = 'paused';
    }
    
    updatePlayButton(false);
}

function showMusicError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: fadeIn 0.5s;
    `;
    errorDiv.innerHTML = `
        <strong>⚠️ Problema com a Música</strong>
        <p style="margin: 5px 0; font-size: 0.9em;">${message}</p>
        <p style="margin: 5px 0; font-size: 0.8em;">Verifique se o arquivo "musica1.mp3" está na pasta "musicas"</p>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'fadeOut 0.5s';
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

function showMusicPermissionMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: fadeIn 0.5s;
    `;
    message.innerHTML = `
        <strong>🎵 Permissão necessária</strong>
        <p>Clique no botão "Play" para ativar a música de fundo!</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s';
        setTimeout(() => message.remove(), 500);
    }, 5000);
}

function updatePlayButton(playing) {
    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    
    if (playing) {
        if (playBtn) playBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'flex';
    } else {
        if (playBtn) playBtn.style.display = 'flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
    }
}

/* ==================== CARROSSEL DE FOTOS ==================== */

function mostrarCarrosselFotos() {
    console.log("📸 Mostrando carrossel de fotos...");
    
    const playerSection = document.getElementById('player-spotify');
    playerSection.style.opacity = '0';
    playerSection.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        playerSection.style.display = 'none';
        const carrosselSection = document.getElementById('carrossel-fotos');
        carrosselSection.style.display = 'flex';
        
        setTimeout(() => {
            carrosselSection.style.opacity = '1';
            inicializarCarrossel();
        }, 50);
    }, 500);
}

function inicializarCarrossel() {
    console.log("🔄 Inicializando carrossel...");
    
    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carrossel-btn.prev-btn');
    const nextBtn = document.querySelector('.carrossel-btn.next-btn');
    let slideAtual = 0;
    
    if (!track || !slides.length) {
        console.error("❌ Elementos do carrossel não encontrados!");
        return;
    }
    
    function atualizarCarrossel() {
        track.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        // Atualizar slides ativos
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideAtual);
        });
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideAtual);
        });
        
        console.log(`📸 Slide atual: ${slideAtual + 1}/${slides.length}`);
    }
    
    // Função para próximo slide
    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        atualizarCarrossel();
    }
    
    // Função para slide anterior
    function slideAnterior() {
        slideAtual = (slideAtual - 1 + slides.length) % slides.length;
        atualizarCarrossel();
    }
    
    // Configurar botão NEXT
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("👉 Botão próximo clicado");
            proximoSlide();
        });
    } else {
        console.error("❌ Botão next não encontrado!");
    }
    
    // Configurar botão PREV (AGORA FUNCIONANDO)
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("👈 Botão anterior clicado");
            slideAnterior();
        });
    } else {
        console.error("❌ Botão prev não encontrado!");
    }
    
    // Configurar dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideAtual = index;
            atualizarCarrossel();
        });
    });
    
    // Auto-play
    let intervaloCarrossel = setInterval(() => {
        proximoSlide();
    }, 5000);
    
    // Pausar auto-play ao interagir
    const carrosselContainer = document.querySelector('.carrossel-container');
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', () => {
            clearInterval(intervaloCarrossel);
            console.log("⏸️ Auto-play pausado");
        });
        
        carrosselContainer.addEventListener('mouseleave', () => {
            intervaloCarrossel = setInterval(() => {
                proximoSlide();
            }, 5000);
            console.log("▶️ Auto-play retomado");
        });
    }
    
    // Adicionar navegação por touch/swipe
    let startX = 0;
    let endX = 0;
    
    if (track) {
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Limite de swipe
                if (diff > 0) {
                    proximoSlide(); // Swipe para esquerda
                } else {
                    slideAnterior(); // Swipe para direita
                }
            }
        }, { passive: true });
    }
    
    // Inicializar primeiro slide
    atualizarCarrossel();
    
    setTimeout(() => {
        mostrarGostos();
    }, 12000);
}

/* ==================== SEÇÃO DE GOSTOS ==================== */

function mostrarGostos() {
    console.log("❤️ Mostrando seção de gostos...");
    
    const carrosselSection = document.getElementById('carrossel-fotos');
    carrosselSection.style.opacity = '0';
    carrosselSection.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        carrosselSection.style.display = 'none';
        const gostosSection = document.getElementById('gostos');
        gostosSection.style.display = 'flex';
        
        setTimeout(() => {
            gostosSection.style.opacity = '1';
            inicializarGostos();
        }, 50);
    }, 500);
}

function inicializarGostos() {
    console.log("🎸 Inicializando seção de gostos...");
    
    // Modal do Joey Jordison
    const btnJoey = document.getElementById('btn-joey');
    const modalJoey = document.getElementById('joey-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (btnJoey && modalJoey) {
        btnJoey.addEventListener('click', () => {
            modalJoey.style.display = 'flex';
            setTimeout(() => {
                modalJoey.style.opacity = '1';
            }, 50);
        });
    }
    
    if (closeModal && modalJoey) {
        closeModal.addEventListener('click', () => {
            modalJoey.style.opacity = '0';
            setTimeout(() => {
                modalJoey.style.display = 'none';
            }, 500);
        });
    }
    
    if (modalJoey) {
        modalJoey.addEventListener('click', (e) => {
            if (e.target === modalJoey) {
                modalJoey.style.opacity = '0';
                setTimeout(() => {
                    modalJoey.style.display = 'none';
                }, 500);
            }
        });
    }
    
    setTimeout(() => {
        mostrarEstatisticas();
    }, 15000);
}

/* ==================== ESTATÍSTICAS DO TEMPO ==================== */

function mostrarEstatisticas() {
    console.log("📊 Mostrando estatísticas...");
    
    const gostosSection = document.getElementById('gostos');
    gostosSection.style.opacity = '0';
    gostosSection.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        gostosSection.style.display = 'none';
        const estatisticasSection = document.getElementById('estatisticas');
        estatisticasSection.style.display = 'flex';
        
        setTimeout(() => {
            estatisticasSection.style.opacity = '1';
            inicializarEstatisticas();
        }, 50);
    }, 500);
}

function inicializarEstatisticas() {
    console.log("⏰ Inicializando estatísticas...");
    
    const dataDisplay = document.getElementById('data-conhecimento');
    const diaInput = document.getElementById('dia-input');
    const mesInput = document.getElementById('mes-input');
    const anoInput = document.getElementById('ano-input');
    const salvarDataBtn = document.getElementById('salvar-data');
    
    // Tenta carregar data salva
    const dataSalva = localStorage.getItem('dataConhecimento');
    if (dataSalva) {
        dataConhecimento = new Date(parseInt(dataSalva));
        
        if (diaInput && mesInput && anoInput) {
            diaInput.value = dataConhecimento.getDate();
            mesInput.value = dataConhecimento.getMonth() + 1;
            anoInput.value = dataConhecimento.getFullYear();
        }
    }
    
    // Botão salvar data
    if (salvarDataBtn) {
        salvarDataBtn.addEventListener('click', function() {
            const dia = parseInt(diaInput.value) || 15;
            const mes = parseInt(mesInput.value) || 3;
            const ano = parseInt(anoInput.value) || 2022;
            
            if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 2000 || ano > new Date().getFullYear()) {
                alert("Por favor, insira uma data válida!");
                return;
            }
            
            dataConhecimento = new Date(ano, mes - 1, dia);
            localStorage.setItem('dataConhecimento', dataConhecimento.getTime());
            
            atualizarDataDisplay();
            
            this.textContent = "Data Salva!";
            this.style.background = "linear-gradient(45deg, #1DB954, #1ed760)";
            
            setTimeout(() => {
                this.textContent = "Salvar Data";
                this.style.background = "linear-gradient(45deg, #ff6b6b, #ff9a76)";
            }, 2000);
        });
    }
    
    function atualizarDataDisplay() {
        if (dataDisplay) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dataDisplay.textContent = dataConhecimento.toLocaleDateString('pt-BR', options);
        }
    }
    
    atualizarDataDisplay();
    
    function atualizarContador() {
        const agora = new Date();
        const diferenca = agora - dataConhecimento;
        
        const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
        const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('anos').textContent = anos;
        document.getElementById('meses').textContent = meses;
        document.getElementById('dias').textContent = dias;
        document.getElementById('horas').textContent = horas;
        
        const contadores = document.querySelectorAll('.contador-valor');
        contadores.forEach(contador => {
            contador.style.transform = 'scale(1.1)';
            setTimeout(() => {
                contador.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    atualizarContador();
    setInterval(atualizarContador, 1000);
    
    setTimeout(() => {
        mostrarMensagens();
    }, 12000);
}

/* ==================== MENSAGENS BONITAS ==================== */

function mostrarMensagens() {
    console.log("💌 Mostrando mensagens...");
    
    const estatisticasSection = document.getElementById('estatisticas');
    estatisticasSection.style.opacity = '0';
    estatisticasSection.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        estatisticasSection.style.display = 'none';
        const mensagensSection = document.getElementById('mensagens');
        mensagensSection.style.display = 'flex';
        
        setTimeout(() => {
            mensagensSection.style.opacity = '1';
            inicializarMensagens();
        }, 50);
    }, 500);
}

function inicializarMensagens() {
    console.log("✨ Inicializando mensagens...");
    
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
    
    setTimeout(() => {
        mostrarRoleta();
    }, 12000);
}

/* ==================== ROLETA ==================== */

function mostrarRoleta() {
    console.log("🎡 Mostrando roleta...");
    
    const mensagensSection = document.getElementById('mensagens');
    if (mensagensSection) {
        mensagensSection.style.opacity = '0';
        mensagensSection.style.transition = 'opacity 0.5s ease';
    }
    
    setTimeout(() => {
        if (mensagensSection) {
            mensagensSection.style.display = 'none';
        }
        
        const roletaSection = document.getElementById('roleta');
        if (roletaSection) {
            roletaSection.style.display = 'flex';
            roletaSection.style.visibility = 'visible';
            roletaSection.offsetHeight;
            
            setTimeout(() => {
                roletaSection.style.opacity = '1';
                console.log("✅ Roleta carregada");
                roletaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                inicializarRoleta();
            }, 100);
        }
    }, 500);
}

function inicializarRoleta() {
    console.log("🔄 Inicializando roleta...");
    
    const roleta = document.getElementById('roleta');
    const btnGirar = document.getElementById('girar-roleta');
    const resultadoRoleta = document.getElementById('resultado-roleta');
    let estaGirando = false;
    
    const opcoesRoleta = {
        'cinema': "Que tal assistirmos um filme juntos?",
        'parque': "Um passeio no parque para respirar ar puro e conversar sobre tudo.",
        'cafe': "Vamos tomar um café e comer algo gostoso enquanto conversamos.",
        'restaurante': "Vamo a um restaurante á sua escolha!",
        'barrock': "Vamos a um BAR ROCK! Escolha um bar que você adore.",
        'andar': "Vamos andar por ai, e conhecer novos lugares.",
        'escolha': "Vamos em um lugar á sua escolha, pode escolher qualquer um!",
        'surpresa': "Deixe comigo! Vou planejar uma surpresa especial para você."
    };
    
    if (btnGirar) {
        btnGirar.addEventListener('click', function() {
            if (estaGirando) return;
            
            estaGirando = true;
            this.disabled = true;
            this.style.opacity = '0.7';
            
            const giros = 5 + Math.random() * 3;
            const anguloFinal = giros * 360 + Math.floor(Math.random() * 360);
            
            roleta.style.transform = `rotate(${anguloFinal}deg)`;
            roleta.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.21, 0.99)';
            
            setTimeout(() => {
                const anguloNormalizado = anguloFinal % 360;
                const setor = 45;
                const opcaoIndex = Math.floor((360 - anguloNormalizado) / setor) % 8;
                const opcoes = Array.from(document.querySelectorAll('.roleta-item'));
                const opcaoSelecionada = opcoes[opcaoIndex].getAttribute('data-value');
                const mensagem = opcoesRoleta[opcaoSelecionada];
                
                if (resultadoRoleta) {
                    resultadoRoleta.innerHTML = `
                        <h3>${opcoes[opcaoIndex].querySelector('span').textContent}</h3>
                        <p>${mensagem}</p>
                    `;
                }
                
                estaGirando = false;
                btnGirar.disabled = false;
                btnGirar.style.opacity = '1';
                
                setTimeout(() => {
                    mostrarFinal();
                }, 10000);
            }, 4000);
        });
    }
}

/* ==================== SEÇÃO FINAL ==================== */

function mostrarFinal() {
    console.log("🌟 Mostrando final...");
    
    const roletaSection = document.getElementById('roleta');
    if (roletaSection) {
        roletaSection.style.opacity = '0';
        roletaSection.style.transition = 'opacity 0.5s ease';
    }
    
    setTimeout(() => {
        if (roletaSection) {
            roletaSection.style.display = 'none';
        }
        
        const finalSection = document.getElementById('final');
        if (finalSection) {
            finalSection.style.display = 'flex';
            finalSection.style.visibility = 'visible';
            finalSection.offsetHeight;
            
            setTimeout(() => {
                finalSection.style.opacity = '1';
                console.log("✅ Final carregado");
                finalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                inicializarFinal();
            }, 100);
        }
    }, 500);
}

function inicializarFinal() {
    console.log("🎉 Inicializando final...");
    
    const btnFinal = document.getElementById('btn-final');
    const confetes = document.querySelectorAll('.confete');
    const floresFinais = document.querySelectorAll('.flor-final');
    
    if (btnFinal) {
        btnFinal.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            
            confetes.forEach(confete => {
                confete.style.opacity = '1';
            });
            
            setTimeout(() => {
                alert("Obrigado por existir do seu jeito único. Guarde isso: você é amada e sua importância é real. Que este espaço reflita sempre o tanto que você significa para quem te conhece. ❤️");
                
                setTimeout(() => {
                    confetes.forEach(confete => {
                        confete.style.opacity = '0';
                    });
                }, 3000);
            }, 1000);
        });
    }
    
    if (floresFinais.length > 0) {
        setInterval(() => {
            floresFinais.forEach(flor => {
                flor.style.left = `${Math.random() * 100}%`;
            });
        }, 5000);
    }
}

/* ==================== CORAÇÕES FLUTUANTES ==================== */

function inicializarCoracoesFlutuantes() {
    const container = document.querySelector('.coracoes-flutuantes');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            criarCoracaoFlutuante(container);
        }, i * 300);
    }
}

function criarCoracaoFlutuante(container) {
    const coracao = document.createElement('div');
    coracao.className = 'coracao-flutuante';
    coracao.innerHTML = '❤️';
    coracao.style.left = `${Math.random() * 100}%`;
    coracao.style.fontSize = `${Math.random() * 20 + 10}px`;
    coracao.style.opacity = `${Math.random() * 0.5 + 0.3}`;
    
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    coracao.style.animation = `coracao-voar ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(coracao);
    
    setTimeout(() => {
        if (coracao.parentNode === container) {
            container.removeChild(coracao);
        }
    }, (duration + delay) * 1000);
}

// Inicia corações flutuantes periodicamente
setTimeout(inicializarCoracoesFlutuantes, 2000);
setInterval(() => {
    inicializarCoracoesFlutuantes();
}, 15000);

/* ==================== API PÚBLICA PARA SUBSTITUIR IMAGENS ==================== */

window.substituirImagens = function(novasImagens) {
    if (novasImagens.momentos && Array.isArray(novasImagens.momentos)) {
        configImagens.momentos = novasImagens.momentos;
    }
    
    if (novasImagens.gostos && Array.isArray(novasImagens.gostos)) {
        configImagens.gostos = novasImagens.gostos;
    }
    
    if (novasImagens.joey) {
        configImagens.joey = novasImagens.joey;
    }
    
    carregarImagens();
    console.log("✅ Imagens substituídas com sucesso!");
};

/* 
Exemplo de uso (descomente para testar):

substituirImagens({
    momentos: [
        "URL_DA_FOTO_1",
        "URL_DA_FOTO_2",
        "URL_DA_FOTO_3",
        "URL_DA_FOTO_4"
    ],
    gostos: [
        "URL_SLIPKNOT",
        "URL_GATO_PRETO",
        "URL_JAZZ",
        "URL_MORANGO",
        "URL_DODGE",
        "URL_VERMELHO"
    ],
    joey: "URL_JOEY"
});
*/
