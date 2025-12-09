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
let currentSection = 'surpresa';
let sections = ['surpresa', 'boas-vindas', 'player-spotify', 'carrossel-fotos', 'gostos', 'estatisticas', 'mensagens', 'roleta', 'final'];

/* ==================== FUNÇÕES DE INICIALIZAÇÃO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎁 Iniciando experiência especial...");
    
    // Inicializa componentes
    inicializarParticlesJS();
    carregarImagens();
    iniciarContagemRegressiva();
    inicializarCoracoesFlutuantes();
    inicializarMusica();
    
    // Configura evento do botão de música
    const btnMusica = document.getElementById('btnMusica');
    if (btnMusica) {
        btnMusica.addEventListener('click', toggleMusica);
    }
    
    // Configura botão iniciar
    const btnIniciar = document.getElementById('btn-iniciar');
    if (btnIniciar) {
        btnIniciar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🚀 Iniciando experiência...");
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                iniciarTransicao();
            }, 300);
        });
    }
});

/* ==================== GERENCIAMENTO DE SEÇÕES ==================== */

function showSection(sectionId) {
    console.log(`🔄 Mostrando seção: ${sectionId}`);
    
    // Esconde todas as seções
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });
    
    // Mostra a seção atual
    const current = document.getElementById(sectionId);
    if (current) {
        current.classList.add('active');
        current.style.display = 'flex';
        current.style.opacity = '0';
        
        setTimeout(() => {
            current.style.opacity = '1';
        }, 50);
        
        currentSection = sectionId;
        
        // Rolagem suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove o bloqueio de scroll
        document.body.classList.remove('no-scroll');
    }
}

function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('active');
        section.style.opacity = '0';
        
        setTimeout(() => {
            section.style.display = 'none';
        }, 500);
    }
}

/* ==================== PARTICLES.JS ==================== */

function inicializarParticlesJS() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 40 },
                color: { value: "#ff6b6b" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
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
                    onhover: { enable: false },
                    onclick: { enable: false },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

/* ==================== GERENCIAMENTO DE IMAGENS ==================== */

function carregarImagens() {
    // Carrega imagens do carrossel
    for (let i = 0; i < configImagens.momentos.length; i++) {
        const imgElement = document.getElementById(`slide-image-${i+1}`);
        if (imgElement) {
            imgElement.style.backgroundImage = `url('${configImagens.momentos[i]}')`;
            imgElement.style.backgroundSize = 'cover';
            imgElement.style.backgroundPosition = 'center';
        }
    }
    
    // Carrega imagens dos gostos
    for (let i = 0; i < configImagens.gostos.length; i++) {
        const cardElement = document.getElementById(`gosto-${i+1}`);
        if (cardElement) {
            cardElement.style.backgroundImage = `url('${configImagens.gostos[i]}')`;
            cardElement.style.backgroundSize = 'cover';
            cardElement.style.backgroundPosition = 'center';
        }
    }
    
    // Carrega imagem do Joey
    const joeyImage = document.getElementById('joey-image');
    if (joeyImage && configImagens.joey) {
        joeyImage.style.backgroundImage = `url('${configImagens.joey}')`;
        joeyImage.style.backgroundSize = 'cover';
        joeyImage.style.backgroundPosition = 'center';
    }
}

/* ==================== CONTAGEM REGRESSIVA INICIAL ==================== */

function iniciarContagemRegressiva() {
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
            showSection('boas-vindas');
            hideSection('surpresa');
        }
    }, 1000);
}

/* ==================== TRANSIÇÕES ==================== */

function iniciarTransicao() {
    console.log("✨ Iniciando transição...");
    
    // Mostra a transição
    const transicaoSection = document.getElementById('transicao');
    if (transicaoSection) {
        transicaoSection.style.display = 'flex';
        transicaoSection.classList.add('show');
        
        // Cria partículas na transição
        criarParticulasTransicao();
        
        // Esconde a seção atual
        hideSection('boas-vindas');
        
        // Aguarda e mostra o player de música
        setTimeout(() => {
            transicaoSection.classList.remove('show');
            transicaoSection.style.display = 'none';
            
            showSection('player-spotify');
            setupSimpleMusicPlayer();
            
            // Auto-avança depois de alguns segundos
            setTimeout(() => {
                mostrarCarrosselFotos();
            }, 8000);
        }, 3000);
    }
}

function criarParticulasTransicao() {
    const particulasContainer = document.querySelector('.particulas-transicao');
    if (!particulasContainer) return;
    
    // Limpa partículas antigas
    particulasContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background-color: hsl(${Math.random() * 360}, 100%, 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.7;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
        `;
        
        particulasContainer.appendChild(particula);
    }
}

/* ==================== MÚSICA ==================== */

function inicializarMusica() {
    const musica = document.getElementById('musicaFundo');
    if (musica) {
        musica.volume = 0.3;
        musica.loop = true;
        console.log("🎵 Música configurada");
    }
}

function toggleMusica() {
    const musica = document.getElementById('musicaFundo');
    const btnMusica = document.getElementById('btnMusica');
    
    if (!musica) return;
    
    if (musica.paused) {
        musica.play().then(() => {
            console.log('🎵 Música iniciada');
            btnMusica.innerHTML = '<i class="fas fa-volume-up"></i>';
            btnMusica.style.background = 'rgba(255, 107, 149, 0.9)';
        }).catch(err => {
            console.log('❌ Erro ao iniciar música:', err);
        });
    } else {
        musica.pause();
        btnMusica.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btnMusica.style.background = 'rgba(100, 100, 100, 0.7)';
    }
}

/* ==================== PLAYER DE MÚSICA ==================== */

function setupSimpleMusicPlayer() {
    console.log("🎵 Configurando player de música...");
    
    // Configura controles
    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    const nextBtn = document.getElementById('next-music');
    const volumeSlider = document.getElementById('volume-slider');
    const musica = document.getElementById('musicaFundo');
    
    if (playBtn && musica) {
        playBtn.addEventListener('click', () => {
            musica.play().then(() => {
                playBtn.style.display = 'none';
                if (pauseBtn) pauseBtn.style.display = 'flex';
                
                const vinyl = document.querySelector('.vinyl-record');
                if (vinyl) vinyl.style.animationPlayState = 'running';
            });
        });
    }
    
    if (pauseBtn && musica) {
        pauseBtn.addEventListener('click', () => {
            musica.pause();
            pauseBtn.style.display = 'none';
            if (playBtn) playBtn.style.display = 'flex';
            
            const vinyl = document.querySelector('.vinyl-record');
            if (vinyl) vinyl.style.animationPlayState = 'paused';
        });
    }
    
    if (nextBtn && musica) {
        nextBtn.addEventListener('click', () => {
            musica.currentTime = 0;
            if (musica.paused) {
                musica.play();
                if (playBtn) playBtn.style.display = 'none';
                if (pauseBtn) pauseBtn.style.display = 'flex';
                
                const vinyl = document.querySelector('.vinyl-record');
                if (vinyl) vinyl.style.animationPlayState = 'running';
            }
        });
    }
    
    if (volumeSlider && musica) {
        volumeSlider.addEventListener('input', (e) => {
            musica.volume = e.target.value / 100;
        });
    }
}

/* ==================== CARROSSEL DE FOTOS ==================== */

function mostrarCarrosselFotos() {
    hideSection('player-spotify');
    showSection('carrossel-fotos');
    inicializarCarrossel();
    
    // Auto-avança para próxima seção
    setTimeout(() => {
        mostrarGostos();
    }, 12000);
}

function inicializarCarrossel() {
    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carrossel-btn.prev-btn');
    const nextBtn = document.querySelector('.carrossel-btn.next-btn');
    let slideAtual = 0;
    let intervaloCarrossel;
    
    if (!track || !slides.length) return;
    
    function atualizarCarrossel() {
        track.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideAtual);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideAtual);
        });
    }
    
    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        atualizarCarrossel();
    }
    
    function slideAnterior() {
        slideAtual = (slideAtual - 1 + slides.length) % slides.length;
        atualizarCarrossel();
    }
    
    // Botões
    if (nextBtn) nextBtn.addEventListener('click', proximoSlide);
    if (prevBtn) prevBtn.addEventListener('click', slideAnterior);
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideAtual = index;
            atualizarCarrossel();
        });
    });
    
    // Auto-play
    intervaloCarrossel = setInterval(proximoSlide, 5000);
    
    // Pausar auto-play ao interagir
    const carrosselContainer = document.querySelector('.carrossel-container');
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', () => {
            clearInterval(intervaloCarrossel);
        });
        
        carrosselContainer.addEventListener('mouseleave', () => {
            intervaloCarrossel = setInterval(proximoSlide, 5000);
        });
    }
    
    // Inicializar
    atualizarCarrossel();
}

/* ==================== SEÇÃO DE GOSTOS ==================== */

function mostrarGostos() {
    hideSection('carrossel-fotos');
    showSection('gostos');
    inicializarGostos();
    
    setTimeout(() => {
        mostrarEstatisticas();
    }, 15000);
}

function inicializarGostos() {
    // Modal do Joey
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
            }, 300);
        });
    }
    
    if (modalJoey) {
        modalJoey.addEventListener('click', (e) => {
            if (e.target === modalJoey) {
                modalJoey.style.opacity = '0';
                setTimeout(() => {
                    modalJoey.style.display = 'none';
                }, 300);
            }
        });
    }
}

/* ==================== ESTATÍSTICAS ==================== */

function mostrarEstatisticas() {
    hideSection('gostos');
    showSection('estatisticas');
    inicializarEstatisticas();
    
    setTimeout(() => {
        mostrarMensagens();
    }, 12000);
}

function inicializarEstatisticas() {
    const dataDisplay = document.getElementById('data-conhecimento');
    const diaInput = document.getElementById('dia-input');
    const mesInput = document.getElementById('mes-input');
    const anoInput = document.getElementById('ano-input');
    const salvarDataBtn = document.getElementById('salvar-data');
    
    // Carrega data salva
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
            
            dataConhecimento = new Date(ano, mes - 1, dia);
            localStorage.setItem('dataConhecimento', dataConhecimento.getTime());
            
            if (dataDisplay) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                dataDisplay.textContent = dataConhecimento.toLocaleDateString('pt-BR', options);
            }
            
            this.textContent = "Data Salva!";
            this.style.background = "linear-gradient(45deg, #1DB954, #1ed760)";
            
            setTimeout(() => {
                this.textContent = "Salvar Data";
                this.style.background = "linear-gradient(45deg, #ff6b6b, #ff9a76)";
            }, 2000);
        });
    }
    
    // Atualizar contador
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
    }
    
    atualizarContador();
    setInterval(atualizarContador, 1000);
}

/* ==================== MENSAGENS ==================== */

function mostrarMensagens() {
    hideSection('estatisticas');
    showSection('mensagens');
    
    setTimeout(() => {
        mostrarRoleta();
    }, 12000);
}

/* ==================== ROLETA ==================== */

function mostrarRoleta() {
    hideSection('mensagens');
    showSection('roleta');
    inicializarRoleta();
}

function inicializarRoleta() {
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
                
                setTimeout(() => {
                    mostrarFinal();
                }, 10000);
            }, 4000);
        });
    }
}

/* ==================== SEÇÃO FINAL ==================== */

function mostrarFinal() {
    hideSection('roleta');
    showSection('final');
    inicializarFinal();
}

function inicializarFinal() {
    const btnFinal = document.getElementById('btn-final');
    const confetes = document.querySelectorAll('.confete');
    
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
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

/* ==================== CORAÇÕES FLUTUANTES ==================== */

function inicializarCoracoesFlutuantes() {
    const container = document.querySelector('.coracoes-flutuantes');
    if (!container) return;
    
    function criarCoracao() {
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
    
    // Cria alguns corações iniciais
    for (let i = 0; i < 10; i++) {
        setTimeout(criarCoracao, i * 300);
    }
    
    // Cria corações periodicamente
    setInterval(criarCoracao, 3000);
}

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
