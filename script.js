/* ==================== SISTEMA OTIMIZADO PARA CELULAR ==================== */

// Estado da aplicação
const App = {
    currentSection: 'surpresa',
    isTransitioning: false,
    sections: ['surpresa', 'boas-vindas', 'player-spotify', 'carrossel-fotos', 'gostos', 'estatisticas', 'mensagens', 'roleta', 'final'],
    dataConhecimento: new Date('2022-03-15'),
    music: null,
    carrosselInterval: null
};

/* ==================== INICIALIZAÇÃO ==================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Iniciando experiência no celular...");
    
    // Configurar viewport
    setupViewport();
    
    // Inicializar componentes
    initParticles();
    loadImages();
    initMusic();
    initHearts();
    
    // Configurar botões
    setupButtons();
    
    // Iniciar contagem
    startCountdown();
    
    console.log("✅ Pronto para celular!");
});

function setupViewport() {
    // Ajustar altura para mobile
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Prevenir zoom
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Atualizar altura quando necessário
    window.addEventListener('resize', function() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

function setupButtons() {
    // Botão iniciar
    const btnIniciar = document.getElementById('btn-iniciar');
    if (btnIniciar) {
        btnIniciar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("▶️ Iniciando experiência...");
            transitionTo('boas-vindas');
        });
    }
    
    // Botão de música
    const btnMusica = document.getElementById('btnMusica');
    if (btnMusica) {
        btnMusica.addEventListener('click', toggleMusic);
    }
}

/* ==================== TRANSIÇÕES (SIMPLIFICADAS) ==================== */

function transitionTo(nextSection) {
    if (App.isTransitioning) return;
    
    App.isTransitioning = true;
    console.log(`🔄 Indo para: ${nextSection}`);
    
    // 1. Mostrar transição
    showTransition();
    
    // 2. Esconder seção atual (exceto surpresa)
    if (App.currentSection !== 'surpresa') {
        hideSection(App.currentSection);
    }
    
    // 3. Aguardar um pouco
    setTimeout(() => {
        // 4. Mostrar nova seção
        showSection(nextSection);
        
        // 5. Esconder transição
        hideTransition();
        
        // 6. Atualizar estado
        App.currentSection = nextSection;
        App.isTransitioning = false;
        
        // 7. Inicializar seção
        initSection(nextSection);
        
        console.log(`✅ Chegou em: ${nextSection}`);
    }, 1000);
}

function showTransition() {
    const transicao = document.getElementById('transicao');
    if (transicao) {
        transicao.style.display = 'flex';
        transicao.style.opacity = '1';
    }
}

function hideTransition() {
    const transicao = document.getElementById('transicao');
    if (transicao) {
        transicao.style.opacity = '0';
        setTimeout(() => {
            transicao.style.display = 'none';
        }, 500);
    }
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Esconder todas as seções primeiro
        App.sections.forEach(id => {
            const sec = document.getElementById(id);
            if (sec && sec !== section) {
                sec.classList.remove('active');
                sec.style.display = 'none';
            }
        });
        
        // Mostrar esta
        section.classList.add('active');
        section.style.display = 'flex';
        
        // Scroll para topo
        setTimeout(() => {
            section.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 100);
    }
}

function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('active');
        section.style.display = 'none';
    }
}

/* ==================== INICIALIZAÇÃO DAS SEÇÕES ==================== */

function initSection(sectionId) {
    switch(sectionId) {
        case 'boas-vindas':
            initBoasVindas();
            break;
        case 'player-spotify':
            initMusicPlayer();
            setTimeout(() => transitionTo('carrossel-fotos'), 8000);
            break;
        case 'carrossel-fotos':
            initCarrossel();
            setTimeout(() => transitionTo('gostos'), 12000);
            break;
        case 'gostos':
            initGostos();
            setTimeout(() => transitionTo('estatisticas'), 15000);
            break;
        case 'estatisticas':
            initEstatisticas();
            setTimeout(() => transitionTo('mensagens'), 12000);
            break;
        case 'mensagens':
            initMensagens();
            setTimeout(() => transitionTo('roleta'), 12000);
            break;
        case 'roleta':
            initRoleta();
            break;
        case 'final':
            initFinal();
            break;
    }
}

/* ==================== COMPONENTES BÁSICOS ==================== */

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 30 },
                color: { value: "#ff6b6b" },
                opacity: { value: 0.2 },
                size: { value: 2 },
                move: { enable: true, speed: 1 }
            }
        });
    }
}

function loadImages() {
    // Imagens pré-definidas já estão no CSS
    console.log("🖼️ Imagens carregadas");
}

function initMusic() {
    App.music = document.getElementById('musicaFundo');
    if (App.music) {
        App.music.volume = 0.3;
        App.music.loop = true;
    }
}

function toggleMusic() {
    const btn = document.getElementById('btnMusica');
    
    if (!App.music) return;
    
    if (App.music.paused) {
        App.music.play().then(() => {
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
            btn.style.background = 'rgba(255, 107, 149, 0.9)';
        }).catch(e => {
            console.log('Música bloqueada:', e);
        });
    } else {
        App.music.pause();
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btn.style.background = 'rgba(100, 100, 100, 0.7)';
    }
}

function initMusicPlayer() {
    const playBtn = document.getElementById('play-music');
    const pauseBtn = document.getElementById('pause-music');
    
    if (playBtn && App.music) {
        playBtn.addEventListener('click', () => {
            App.music.play();
            playBtn.style.display = 'none';
            if (pauseBtn) pauseBtn.style.display = 'flex';
        });
    }
    
    if (pauseBtn && App.music) {
        pauseBtn.addEventListener('click', () => {
            App.music.pause();
            pauseBtn.style.display = 'none';
            if (playBtn) playBtn.style.display = 'flex';
        });
    }
    
    // Volume
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider && App.music) {
        volumeSlider.addEventListener('input', (e) => {
            App.music.volume = e.target.value / 100;
        });
    }
}

function initCarrossel() {
    const track = document.querySelector('.carrossel-track');
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carrossel-btn.prev-btn');
    const nextBtn = document.querySelector('.carrossel-btn.next-btn');
    let current = 0;
    
    function update() {
        if (track) track.style.transform = `translateX(-${current * 100}%)`;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === current);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }
    
    function next() {
        current = (current + 1) % slides.length;
        update();
    }
    
    function prev() {
        current = (current - 1 + slides.length) % slides.length;
        update();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            update();
        });
    });
    
    // Auto-play
    App.carrosselInterval = setInterval(next, 5000);
    
    // Pausar no touch
    const container = document.querySelector('.carrossel-container');
    if (container) {
        container.addEventListener('touchstart', () => {
            clearInterval(App.carrosselInterval);
        });
        
        container.addEventListener('touchend', () => {
            App.carrosselInterval = setInterval(next, 5000);
        });
    }
    
    update();
}

function initGostos() {
    const btnJoey = document.getElementById('btn-joey');
    const modal = document.getElementById('joey-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (btnJoey && modal) {
        btnJoey.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => modal.style.opacity = '1', 50);
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.style.display = 'none', 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }
}

function initEstatisticas() {
    const diaInput = document.getElementById('dia-input');
    const mesInput = document.getElementById('mes-input');
    const anoInput = document.getElementById('ano-input');
    const salvarBtn = document.getElementById('salvar-data');
    const dataDisplay = document.getElementById('data-conhecimento');
    
    // Carregar data salva
    const saved = localStorage.getItem('dataConhecimento');
    if (saved) {
        App.dataConhecimento = new Date(parseInt(saved));
        if (diaInput && mesInput && anoInput) {
            diaInput.value = App.dataConhecimento.getDate();
            mesInput.value = App.dataConhecimento.getMonth() + 1;
            anoInput.value = App.dataConhecimento.getFullYear();
        }
    }
    
    // Atualizar display
    if (dataDisplay) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dataDisplay.textContent = App.dataConhecimento.toLocaleDateString('pt-BR', options);
    }
    
    // Botão salvar
    if (salvarBtn) {
        salvarBtn.addEventListener('click', function() {
            const dia = parseInt(diaInput.value) || 15;
            const mes = parseInt(mesInput.value) || 3;
            const ano = parseInt(anoInput.value) || 2022;
            
            App.dataConhecimento = new Date(ano, mes - 1, dia);
            localStorage.setItem('dataConhecimento', App.dataConhecimento.getTime());
            
            if (dataDisplay) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                dataDisplay.textContent = App.dataConhecimento.toLocaleDateString('pt-BR', options);
            }
            
            this.textContent = "Salvo!";
            this.style.background = "#1DB954";
            
            setTimeout(() => {
                this.textContent = "Salvar Data";
                this.style.background = "";
            }, 2000);
        });
    }
    
    // Contador
    function updateCounter() {
        const now = new Date();
        const diff = now - App.dataConhecimento;
        
        const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.getElementById('anos').textContent = anos;
        document.getElementById('meses').textContent = meses;
        document.getElementById('dias').textContent = dias;
        document.getElementById('horas').textContent = horas;
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);
}

function initMensagens() {
    // Nada especial necessário
}

function initRoleta() {
    const btnGirar = document.getElementById('girar-roleta');
    const resultado = document.getElementById('resultado-roleta');
    let girando = false;
    
    const opcoes = {
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
            if (girando) return;
            
            girando = true;
            this.disabled = true;
            
            // Animação simples
            const roleta = document.getElementById('roleta');
            const giros = 3 + Math.random() * 2;
            const angulo = giros * 360 + Math.floor(Math.random() * 360);
            
            roleta.style.transform = `rotate(${angulo}deg)`;
            roleta.style.transition = 'transform 3s ease-out';
            
            setTimeout(() => {
                const opcoesEl = document.querySelectorAll('.roleta-item');
                const index = Math.floor(Math.random() * opcoesEl.length);
                const selecionado = opcoesEl[index].getAttribute('data-value');
                
                if (resultado) {
                    resultado.innerHTML = `
                        <h3>${opcoesEl[index].querySelector('span').textContent}</h3>
                        <p>${opcoes[selecionado]}</p>
                    `;
                }
                
                girando = false;
                btnGirar.disabled = false;
                
                // Ir para final
                setTimeout(() => transitionTo('final'), 8000);
            }, 3000);
        });
    }
}

function initFinal() {
    const btnFinal = document.getElementById('btn-final');
    
    if (btnFinal) {
        btnFinal.addEventListener('click', function() {
            // Animação simples
            this.style.transform = 'scale(0.95)';
            
            // Mostrar confetes
            document.querySelectorAll('.confete').forEach(c => {
                c.style.opacity = '1';
            });
            
            setTimeout(() => {
                alert("💖 Obrigado por existir do seu jeito único. Você é especial!");
                
                setTimeout(() => {
                    document.querySelectorAll('.confete').forEach(c => {
                        c.style.opacity = '0';
                    });
                }, 3000);
            }, 500);
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

/* ==================== FUNÇÕES AUXILIARES ==================== */

function startCountdown() {
    const contador = document.getElementById('contador');
    let count = 3;
    
    const interval = setInterval(() => {
        count--;
        contador.textContent = count;
        
        if (count <= 0) {
            clearInterval(interval);
            transitionTo('boas-vindas');
        }
    }, 1000);
}

function initBoasVindas() {
    // Elementos interativos podem ir aqui
    console.log("👋 Boas-vindas!");
}

function initHearts() {
    const container = document.querySelector('.coracoes-flutuantes');
    if (!container) return;
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.5};
            animation: coracao-voar ${Math.random() * 8 + 5}s linear infinite;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, 13000);
    }
    
    // Criar alguns corações
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 500);
    }
    
    // Continuar criando
    setInterval(createHeart, 4000);
}

/* ==================== API PÚBLICA ==================== */

window.substituirImagens = function(novasImagens) {
    console.log("🖼️ Substituindo imagens...");
    // Implementação se necessário
};
