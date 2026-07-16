// App de Afinidade de Casal - Dia dos Namorados

// Global error logging for debugging
window.onerror = function (message, source, lineno, colno, error) {
  alert("Runtime Error:\n" + message + "\nLine: " + lineno + "\nError: " + error);
  return false;
};

// Bandeiras em SVG para compatibilidade (ex: Windows)
const FLAG_BR = `<svg viewBox="0 0 720 504" class="flag-icon" width="24" height="24" style="border-radius: 4px; vertical-align: middle;"><rect width="720" height="504" fill="#009c3b"/><polygon points="360,60 636,252 360,444 84,252" fill="#ffdf00"/><circle cx="360" cy="252" r="114" fill="#002776"/><path d="M251.6,268.4 C270,250 330,230 468.4,244 C468.4,244 410,215 300,235 C270,242.5 251.6,268.4 251.6,268.4 Z" fill="#ffffff"/></svg>`;
const FLAG_US = `<svg viewBox="0 0 741 390" class="flag-icon" width="24" height="24" style="border-radius: 4px; vertical-align: middle;"><rect width="741" height="390" fill="#b22234"/><rect y="30" width="741" height="30" fill="#ffffff"/><rect y="90" width="741" height="30" fill="#ffffff"/><rect y="150" width="741" height="30" fill="#ffffff"/><rect y="210" width="741" height="30" fill="#ffffff"/><rect y="270" width="741" height="30" fill="#ffffff"/><rect y="330" width="741" height="30" fill="#ffffff"/><rect width="296.4" height="210" fill="#3c3b6e"/><circle cx="30" cy="25" r="4" fill="#ffffff"/><circle cx="70" cy="25" r="4" fill="#ffffff"/><circle cx="110" cy="25" r="4" fill="#ffffff"/><circle cx="150" cy="25" r="4" fill="#ffffff"/><circle cx="190" cy="25" r="4" fill="#ffffff"/><circle cx="230" cy="25" r="4" fill="#ffffff"/><circle cx="270" cy="25" r="4" fill="#ffffff"/><circle cx="50" cy="55" r="4" fill="#ffffff"/><circle cx="90" cy="55" r="4" fill="#ffffff"/><circle cx="130" cy="55" r="4" fill="#ffffff"/><circle cx="170" cy="55" r="4" fill="#ffffff"/><circle cx="210" cy="55" r="4" fill="#ffffff"/><circle cx="250" cy="55" r="4" fill="#ffffff"/><circle cx="30" cy="85" r="4" fill="#ffffff"/><circle cx="70" cy="85" r="4" fill="#ffffff"/><circle cx="110" cy="85" r="4" fill="#ffffff"/><circle cx="150" cy="85" r="4" fill="#ffffff"/><circle cx="190" cy="85" r="4" fill="#ffffff"/><circle cx="230" cy="85" r="4" fill="#ffffff"/><circle cx="270" cy="85" r="4" fill="#ffffff"/><circle cx="50" cy="115" r="4" fill="#ffffff"/><circle cx="90" cy="115" r="4" fill="#ffffff"/><circle cx="130" cy="115" r="4" fill="#ffffff"/><circle cx="170" cy="115" r="4" fill="#ffffff"/><circle cx="210" cy="115" r="4" fill="#ffffff"/><circle cx="250" cy="115" r="4" fill="#ffffff"/><circle cx="30" cy="145" r="4" fill="#ffffff"/><circle cx="70" cy="145" r="4" fill="#ffffff"/><circle cx="110" cy="145" r="4" fill="#ffffff"/><circle cx="150" cy="145" r="4" fill="#ffffff"/><circle cx="190" cy="145" r="4" fill="#ffffff"/><circle cx="230" cy="145" r="4" fill="#ffffff"/><circle cx="270" cy="145" r="4" fill="#ffffff"/><circle cx="50" cy="185" r="4" fill="#ffffff"/><circle cx="90" cy="185" r="4" fill="#ffffff"/><circle cx="130" cy="185" r="4" fill="#ffffff"/><circle cx="170" cy="185" r="4" fill="#ffffff"/><circle cx="210" cy="185" r="4" fill="#ffffff"/><circle cx="250" cy="185" r="4" fill="#ffffff"/></svg>`;

// ==========================================
// 1. SISTEMA DE PARTÍCULAS (CANVAS DE CORAÇÕES)
// ==========================================
class HeartCanvas {
  constructor() {
    this.canvas = document.getElementById('heart-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawnHeart(x, y, size = null) {
    const rand = Math.random();
    let type = 'heart';
    if (rand < 0.35) {
      type = 'paw';
    } else if (rand < 0.50) {
      type = 'cat';
    }

    this.particles.push({
      x: x || Math.random() * this.canvas.width,
      y: y || this.canvas.height + 20,
      size: size || Math.random() * 15 + 8,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: -(Math.random() * 2 + 1),
      opacity: Math.random() * 0.5 + 0.3,
      sway: Math.random() * 100,
      swaySpeed: Math.random() * 0.02 + 0.01,
      colorHue: Math.random() * 30 + 330, // Tons de rosa/vermelho
      type: type
    });
  }

  spawnBurst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let type = 'heart';
      if (rand < 0.35) {
        type = 'paw';
      } else if (rand < 0.50) {
        type = 'cat';
      }

      this.particles.push({
        x: x,
        y: y,
        size: Math.random() * 18 + 10,
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6 - 2,
        opacity: 1,
        sway: Math.random() * 100,
        swaySpeed: Math.random() * 0.05 + 0.02,
        colorHue: Math.random() * 40 + 320,
        type: type
      });
    }
  }

  drawHeartShape(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    ctx.quadraticCurveTo(x + size, y + size * 2 / 3, x + size / 2, y + size);
    ctx.quadraticCurveTo(x, y + size * 2 / 3, x, y + size / 3);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
  }

  drawPawShape(ctx, cx, cy, size) {
    ctx.beginPath();
    // Central pad
    const padWidth = size * 0.8;
    const padHeight = size * 0.6;
    ctx.ellipse(cx, cy + size * 0.1, padWidth / 2, padHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Toes
    const toeRadius = size * 0.15;
    // Toe 1 (left)
    ctx.beginPath();
    ctx.ellipse(cx - size * 0.35, cy - size * 0.1, toeRadius, toeRadius * 1.3, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Toe 2 (middle left)
    ctx.beginPath();
    ctx.ellipse(cx - size * 0.12, cy - size * 0.3, toeRadius, toeRadius * 1.3, -Math.PI / 12, 0, Math.PI * 2);
    ctx.fill();

    // Toe 3 (middle right)
    ctx.beginPath();
    ctx.ellipse(cx + size * 0.12, cy - size * 0.3, toeRadius, toeRadius * 1.3, Math.PI / 12, 0, Math.PI * 2);
    ctx.fill();

    // Toe 4 (right)
    ctx.beginPath();
    ctx.ellipse(cx + size * 0.35, cy - size * 0.1, toeRadius, toeRadius * 1.3, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
  }

  drawCatFaceShape(ctx, cx, cy, size) {
    ctx.beginPath();
    // Face circle
    ctx.arc(cx, cy, size * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Left ear
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.4, cy - size * 0.15);
    ctx.lineTo(cx - size * 0.5, cy - size * 0.5);
    ctx.lineTo(cx - size * 0.15, cy - size * 0.35);
    ctx.closePath();
    ctx.fill();

    // Right ear
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.4, cy - size * 0.15);
    ctx.lineTo(cx + size * 0.5, cy - size * 0.5);
    ctx.lineTo(cx + size * 0.15, cy - size * 0.35);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    // Adiciona corações espontâneos no fundo
    if (Math.random() < 0.04 && this.particles.length < 60) {
      this.spawnHeart();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.y += p.speedY;

      // Movimento de ziguezague (sway)
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.4;

      // Decaimento de opacidade gradual se subirem muito
      if (p.y < 100) {
        p.opacity -= 0.005;
      }

      // Remove fora da tela ou sumidos
      if (p.y < -50 || p.x < -50 || p.x > this.canvas.width + 50 || p.opacity <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Desenha partícula
      this.ctx.fillStyle = `hsla(${p.colorHue}, 90%, 65%, ${p.opacity})`;
      if (p.type === 'paw') {
        this.drawPawShape(this.ctx, p.x, p.y, p.size);
      } else if (p.type === 'cat') {
        this.drawCatFaceShape(this.ctx, p.x, p.y, p.size);
      } else {
        this.drawHeartShape(this.ctx, p.x, p.y, p.size);
      }
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    requestAnimationFrame(() => this.loop());
  }
}

// ==========================================
// 2. SINTETIZADOR DE MÚSICA & SONS (WEB AUDIO API)
// ==========================================
class RomanticSynth {
  constructor() {
    this.ctx = null;
    this.musicInterval = null;
    this.isMuted = false;
    this.melodyIndex = 0;

    // Progressão harmônica romântica suave
    // Cmaj9 -> Am9 -> Fmaj7 -> G6
    this.chords = [
      [261.63, 329.63, 392.00, 493.88], // C, E, G, B
      [220.00, 261.63, 329.63, 392.00], // A, C, E, G
      [174.61, 220.00, 261.63, 349.23], // F, A, C, F
      [196.00, 246.94, 293.66, 392.00]  // G, B, D, G
    ];
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  playTone(freq, type, duration, volume, slideTo = null) {
    if (this.isMuted || !this.ctx) return;

    // Garante que o contexto está ativo (politica de autoplay)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Efeito de sucesso: Arpejo ascendente alegre
  playMatchSound() {
    this.init();
    const now = this.ctx ? this.ctx.currentTime : 0;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.6, 0.15);
      }, index * 100);
    });
  }

  // Efeito de erro: Queda de tom cômica/suave
  playMismatchSound() {
    this.init();
    this.playTone(196.00, 'triangle', 0.5, 0.2, 110.00);
  }

  // Clique de botão fofo
  playClickSound() {
    this.init();
    this.playTone(440.00, 'sine', 0.1, 0.1, 880.00);
  }

  // Fanfarra de finalização
  playFanfareSound() {
    this.init();
    const chords = [261.63, 329.63, 392.00]; // Dó maior
    chords.forEach(f => this.playTone(f, 'triangle', 1.5, 0.1));
    setTimeout(() => {
      chords.forEach(f => this.playTone(f * 1.5, 'sine', 2.0, 0.1));
    }, 300);
  }

  // Som de mensagem enviada no chat
  playChatSentSound() {
    this.init();
    this.playTone(587.33, 'sine', 0.1, 0.08, 880.00);
  }

  // Som de mensagem recebida no chat
  playChatReceivedSound() {
    this.init();
    this.playTone(880.00, 'sine', 0.08, 0.08);
    setTimeout(() => {
      this.playTone(1046.50, 'sine', 0.12, 0.08);
    }, 60);
  }

  // Photobooth: tique da contagem regressiva (3, 2, 1)
  playCountdownTick() {
    this.init();
    this.playTone(659.25, 'sine', 0.12, 0.15);
  }

  // Photobooth: "vai!" no momento da foto
  playCountdownGo() {
    this.init();
    this.playTone(880.00, 'sine', 0.3, 0.16, 1174.66);
  }

  // Photobooth: clique do obturador (rajada de ruído + estalo)
  playShutterSound() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Rajada curta de ruído branco (som mecânico da câmera)
    const dur = 0.09;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start();

    // Estalo agudo que cai rápido (o "click")
    this.playTone(1400, 'triangle', 0.08, 0.18, 300);
  }

  // Photobooth: foto "revelando" na tirinha
  playDevelopSound() {
    this.init();
    this.playTone(523.25, 'sine', 0.28, 0.1, 783.99);
  }

  // Música de fundo gerada em tempo real
  startAmbientMusic() {
    this.init();
    if (this.musicInterval) return;

    this.isPlayingMusic = true;
    let chordIndex = 0;
    let noteStep = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const currentChord = this.chords[chordIndex];
      const noteFreq = currentChord[noteStep % currentChord.length];

      // Toca uma nota suave
      // Multiplica frequência por 2 ocasionalmente para variar a oitava
      const octave = (noteStep % 5 === 0) ? 2 : 1;
      this.playTone(noteFreq * octave, 'sine', 2.5, 0.04);

      noteStep++;
      if (noteStep % 4 === 0) {
        chordIndex = (chordIndex + 1) % this.chords.length;
      }
    };

    // Toca uma nota a cada 1.2 segundos
    this.musicInterval = setInterval(playNextNote, 1200);
    playNextNote();
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
    return this.isMuted;
  }
}

// ==========================================
// 3. MÁQUINA DE ESTADO DO JOGO & MULTIPLAYER P2P
// ==========================================
class AffinityApp {
  constructor() {
    this.config = coupleConfig;
    this.canvas = new HeartCanvas();
    this.synth = new RomanticSynth();

    // Idioma Ativo
    this.currentLang = localStorage.getItem('namorados_lang') || 'pt';

    // Estado Geral do Jogo
    this.p1Name = "";
    this.p2Name = "";
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;

    // Estado Blind Ranking
    this.gameMode = 'quiz';
    this.selectedCategoryIdx = 0;
    this.blindRankingTopic = null;
    this.blindRankingItems = [];
    this.blindFinalRanking = new Array(10).fill(null);
    this.blindAvailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Estado Duo Battle (Boss Fight)
    // Tuning: 6 acertos derrubam o chefe, 5 erros derrubam o casal.
    this.BATTLE = { enemyMaxHp: 120, coupleMaxHp: 100, hitDamage: 20, enemyDamage: 20, questionCount: 40 };
    this.enemyMaxHp = this.BATTLE.enemyMaxHp;
    this.enemyHp = this.BATTLE.enemyMaxHp;
    this.coupleMaxHp = this.BATTLE.coupleMaxHp;
    this.coupleHp = this.BATTLE.coupleMaxHp;
    this.battleOver = false;
    this.battleWon = false;
    this.battleRounds = 0;
    this.battleHits = 0;

    // Estado do Photobooth 📸
    this.PB_TOTAL_SHOTS = 5;
    this.pbSubMode = 'together';   // 'together' | 'blind'
    this.pbFilter = 'none';        // 'none' | 'vintage' | 'pink' | 'bw'
    this.pbPromptIndices = [];
    this.pbSeed = 1;
    this.pbPhase = 'idle';         // idle | setup | shoot | caption | reveal
    this.pbShotIdx = 0;
    this.pbMyShots = [];
    this.pbTheirShots = [];
    this.pbMyReady = false;
    this.pbPartnerReady = false;
    this.pbMyCaption = null;       // null = ainda não enviado; "" = pulou
    this.pbTheirCaption = null;
    this.pbLocalStream = null;
    this.pbMediaCall = null;
    this.pbPendingCall = null;     // chamada recebida antes da câmera liberar
    this.pbShotTimers = [];
    this.pbAdvanceTimer = null;
    this.pbShotTimeoutTimer = null;
    this.pbStripCanvas = null;
    this.pbBuildingStrip = false;
    this.pbRevealTimers = [];
    this.pbFrame = 'classic';      // 'classic' | 'kitties' | 'night' | 'film'
    this.pbImgCache = null;        // fotos decodificadas (evita re-decodificar ao trocar moldura)

    // Estado do Multiplayer P2P
    this.isMultiplayer = false;
    this.isHost = false;
    this.peer = null;
    this.conn = null;
    this.roomCode = "";
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;
    this.activeQuestionsIndices = [];
    this.activeQuestionsSubjects = [];
    this.unreadCount = 0;

    // Resiliência da conexão (reconexão automática + keepalive)
    this.intentionalDisconnect = false;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.heartbeatTimer = null;
    this.myName = "";
    this.MAX_RECONNECT_ATTEMPTS = 10;
    // STUN (Google) + TURN público (Open Relay) — TURN é o que salva em rede
    // móvel/NAT restrito, onde a maioria das quedas acontece.
    this.PEER_CONFIG = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
        { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
        { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" }
      ]
    };

    // Elementos DOM
    this.screens = {
      welcome: document.getElementById('screen-welcome'),
      quiz: document.getElementById('screen-quiz'),
      results: document.getElementById('screen-results'),
      photobooth: document.getElementById('screen-photobooth')
    };

    this.quizSteps = {
      p1Turn: document.getElementById('quiz-p1-turn'),
      transition: document.getElementById('quiz-transition'),
      p2Turn: document.getElementById('quiz-p2-turn'),
      reveal: document.getElementById('quiz-reveal')
    };

    this.pbSteps = {
      setup: document.getElementById('pb-step-setup'),
      shoot: document.getElementById('pb-step-shoot'),
      caption: document.getElementById('pb-step-caption'),
      reveal: document.getElementById('pb-step-reveal')
    };

    this.setupEventListeners();
    this.updateLanguage();
    this.checkUrlParams();
  }

  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get('room');

    if (roomFromUrl) {
      // Abre o painel multiplayer automaticamente na aba de entrar
      this.synth.playClickSound();

      // Ajusta layout
      document.getElementById('play-mode-selection').classList.add('hidden');
      document.getElementById('multiplayer-panel').classList.remove('hidden');
      document.getElementById('mp-guest-block').classList.remove('hidden');
      document.getElementById('mp-lobby-actions').classList.add('hidden');

      document.getElementById('join-room-code').value = roomFromUrl;

      // Ajusta placeholders de nomes para multiplayer
      const langConfig = this.config[this.currentLang];
      document.getElementById('lbl-player1-name').textContent = langConfig.ui.lblP1NameOnline;
    }
  }

  setupEventListeners() {
    // Game Mode Selection
    const modeButtons = {
      quiz: document.getElementById('mode-quiz-btn'),
      blindRank: document.getElementById('mode-blind-btn'),
      duoBattle: document.getElementById('mode-battle-btn'),
      photobooth: document.getElementById('mode-photobooth-btn')
    };
    Object.entries(modeButtons).forEach(([mode, btn]) => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        this.synth.playClickSound();
        this.setGameMode(mode);
      });
    });

    // Renderiza o seletor de categoria inicial
    this.renderCategoryPicker();
    this.updateCategoryPickerVisibility();

    // Photobooth: sub-modo (Juntinhos / Surpresa)
    document.querySelectorAll('.pb-submode-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.synth.playClickSound();
        this.pbSubMode = btn.dataset.pbmode;
        document.querySelectorAll('.pb-submode-option').forEach(b => {
          b.classList.toggle('active', b === btn);
        });
      });
    });

    // Photobooth: filtro + demais controles
    this.renderPbFilterPicker();
    this.updatePbPickerVisibility();

    document.getElementById('pb-btn-ready').addEventListener('click', () => {
      this.synth.playClickSound();
      this.onPbReadyClick();
    });

    document.getElementById('pb-btn-retry-cam').addEventListener('click', () => {
      this.synth.playClickSound();
      this.initPbCamera();
    });

    document.getElementById('pb-btn-caption-done').addEventListener('click', () => {
      this.synth.playClickSound();
      const text = document.getElementById('pb-caption-input').value.trim();
      this.submitPbCaption(text);
    });

    document.getElementById('pb-btn-caption-skip').addEventListener('click', () => {
      this.synth.playClickSound();
      this.submitPbCaption("");
    });

    document.getElementById('pb-caption-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitPbCaption(e.target.value.trim());
      }
    });

    document.getElementById('pb-btn-download').addEventListener('click', () => {
      this.synth.playClickSound();
      this.downloadPbStrip();
    });

    document.getElementById('pb-btn-again').addEventListener('click', () => {
      this.synth.playClickSound();
      this.restartPhotobooth();
    });

    document.getElementById('pb-btn-lobby').addEventListener('click', () => {
      this.synth.playClickSound();
      if (this.conn && this.conn.open) {
        this.conn.send({ type: 'BACK_TO_LOBBY' });
      }
      this.returnToLobby();
    });

    // Escolha: Jogar Online (Mostra painel MP)
    document.getElementById('btn-play-online').addEventListener('click', () => {
      this.synth.playClickSound();

      const p1Input = document.getElementById('player1-name');
      this.p1Name = p1Input.value.trim();

      if (!this.p1Name) {
        // Força preencher o primeiro nome
        p1Input.focus();
        p1Input.classList.add('shake-animation');
        setTimeout(() => p1Input.classList.remove('shake-animation'), 500);
        return;
      }

      // Ajusta labels do formulário
      const langConfig = this.config[this.currentLang];
      document.getElementById('lbl-player1-name').textContent = langConfig.ui.lblP1NameOnline;
      document.getElementById('play-mode-selection').classList.add('hidden');
      document.getElementById('multiplayer-panel').classList.remove('hidden');
    });

    // Criar Sala (Host)
    document.getElementById('btn-create-room').addEventListener('click', () => {
      this.synth.playClickSound();
      this.isHost = true;
      this.isMultiplayer = true;

      // Gera código aleatório
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      this.roomCode = code;

      document.getElementById('mp-lobby-actions').classList.add('hidden');
      document.getElementById('mp-host-block').classList.remove('hidden');
      document.getElementById('room-code-val').textContent = code;

      this.initPeer(true, code);
    });

    // Exibir Caixa para Entrar na Sala (Guest)
    document.getElementById('btn-show-join').addEventListener('click', () => {
      this.synth.playClickSound();
      document.getElementById('mp-lobby-actions').classList.add('hidden');
      document.getElementById('mp-guest-block').classList.remove('hidden');
    });

    // Conectar ao Amor (Guest clicks join)
    document.getElementById('btn-guest-join').addEventListener('click', () => {
      this.synth.playClickSound();
      const codeInput = document.getElementById('join-room-code');
      const code = codeInput.value.trim();

      if (!code) {
        codeInput.focus();
        return;
      }

      this.isHost = false;
      this.isMultiplayer = true;
      this.roomCode = code;

      document.getElementById('lbl-mp-guest-connecting').classList.remove('hidden');
      this.initPeer(false, code);
    });

    // Copiar código / link da sala
    document.getElementById('btn-copy-code').addEventListener('click', () => {
      this.synth.playClickSound();

      const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text);
        } else {
          return new Promise((resolve, reject) => {
            try {
              const textArea = document.createElement("textarea");
              textArea.value = text;
              textArea.style.top = "0";
              textArea.style.left = "0";
              textArea.style.position = "fixed";
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              const successful = document.execCommand('copy');
              document.body.removeChild(textArea);
              if (successful) resolve();
              else reject(new Error("fallback copy failed"));
            } catch (err) {
              reject(err);
            }
          });
        }
      };

      copyToClipboard(this.roomCode).then(() => {
        const btn = document.getElementById('btn-copy-code');
        btn.textContent = "✅";
        setTimeout(() => btn.textContent = "📋", 2000);
      }).catch(err => {
        console.error("Failed to copy:", err);
      });
    });

    // Cancelar Multiplayer Panel
    document.getElementById('btn-mp-cancel').addEventListener('click', () => {
      this.synth.playClickSound();
      this.disconnectPeer();

      const langConfig = this.config[this.currentLang];
      document.getElementById('lbl-player1-name').textContent = langConfig.ui.labelP1Name;
      document.getElementById('play-mode-selection').classList.remove('hidden');

      // Oculta blocos multiplayer
      document.getElementById('multiplayer-panel').classList.add('hidden');
      document.getElementById('mp-host-block').classList.add('hidden');
      document.getElementById('mp-guest-block').classList.add('hidden');
      document.getElementById('mp-lobby-actions').classList.remove('hidden');
      document.getElementById('lbl-mp-guest-connecting').classList.add('hidden');
      document.getElementById('mp-host-start-container').classList.add('hidden');
      document.getElementById('lbl-mp-waiting-partner').classList.remove('hidden');
    });

    // Host inicia o teste multiplayer
    document.getElementById('btn-host-start').addEventListener('click', () => {
      this.synth.playClickSound();
      if (this.conn && this.conn.open) {
        if (this.gameMode === 'quiz' || this.gameMode === 'duoBattle') {
          const count = this.gameMode === 'duoBattle' ? this.BATTLE.questionCount : 10;
          const indices = this.pickQuestionIndices(count);
          this.activeQuestionsIndices = indices;
          const subjects = indices.map(() => Math.random() < 0.5 ? 'p1' : 'p2');
          this.activeQuestionsSubjects = subjects;
          this.conn.send({
            type: 'START_GAME',
            gameMode: this.gameMode,
            p1Name: this.p1Name,
            p2Name: this.p2Name,
            questionIndices: indices,
            questionSubjects: subjects
          });
        } else if (this.gameMode === 'photobooth') {
          this.pbPromptIndices = this.pickPbPromptIndices(this.PB_TOTAL_SHOTS);
          this.pbSeed = Math.floor(Math.random() * 1e9) + 1;
          this.conn.send({
            type: 'START_GAME',
            gameMode: 'photobooth',
            p1Name: this.p1Name,
            p2Name: this.p2Name,
            pbSubMode: this.pbSubMode,
            pbFilter: this.pbFilter,
            pbPromptIndices: this.pbPromptIndices,
            pbSeed: this.pbSeed
          });
          this.synth.startAmbientMusic();
          this.startPhotobooth();
          return;
        } else {
          const topics = blindRankingTopics[this.currentLang];
          this.blindRankingTopic = this.selectedCategoryIdx;
          const items = topics[this.selectedCategoryIdx].items.map((it, idx) => ({ ...it, idx }));
          items.sort(() => Math.random() - 0.5);
          this.blindRankingItems = items.slice(0, 10);
          this.activeQuestionsIndices = new Array(10).fill(0);
          this.conn.send({
            type: 'START_GAME',
            gameMode: 'blindRank',
            p1Name: this.p1Name,
            p2Name: this.p2Name,
            blindRankingTopic: this.blindRankingTopic,
            blindRankingItems: this.blindRankingItems,
            questionIndices: this.activeQuestionsIndices
          });
        }
        this.synth.startAmbientMusic();
        this.startQuiz();
      }
    });

    // Clique na Tela de Transição (Local Mode)
    document.getElementById('btn-continue-p2').addEventListener('click', () => {
      this.synth.playClickSound();
      this.showQuizStep('p2Turn');
      this.renderP2Question();
    });

    // Avançar da Tela de Revelação
    document.getElementById('btn-next-question').addEventListener('click', () => {
      this.synth.playClickSound();

      if (this.isMultiplayer) {
        if (this.isHost) {
          this.conn.send({ type: 'NEXT_QUESTION' });
          this.nextQuestionMultiplayer();
        }
      } else if (this.gameMode === 'duoBattle') {
        if (this.battleOver) {
          this.goToResults();
        } else {
          this.currentQuestionIdx++;
          if (this.currentQuestionIdx < this.getActiveQuestions().length) {
            this.startNewQuestion();
          } else {
            // Sem perguntas restantes: decide pelo HP atual.
            this.battleOver = true;
            this.battleWon = this.enemyHp <= this.coupleHp;
            this.goToResults();
          }
        }
      } else {
        this.currentQuestionIdx++;
        if (this.currentQuestionIdx < this.getActiveQuestions().length) {
          this.startNewQuestion();
        } else {
          this.goToResults();
        }
      }
    });

    // Reiniciar Quiz
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.synth.playClickSound();

      // Blind Ranking: o jogo termina ao revelar o último ranking. Voltar ao lobby
      // (mantendo a conexão) para poder jogar outra categoria.
      if (this.isMultiplayer && this.gameMode === 'blindRank') {
        if (this.isHost && this.conn && this.conn.open) {
          this.conn.send({ type: 'BACK_TO_LOBBY' });
        }
        this.returnToLobby();
        return;
      }

      if (this.isMultiplayer) {
        if (this.isHost && this.conn && this.conn.open) {
          const count = this.gameMode === 'duoBattle' ? this.BATTLE.questionCount : 10;
          const indices = this.pickQuestionIndices(count);
          this.activeQuestionsIndices = indices;

          // Gera aleatoriamente o sujeito da pergunta ('p1' ou 'p2')
          const subjects = indices.map(() => Math.random() < 0.5 ? 'p1' : 'p2');
          this.activeQuestionsSubjects = subjects;

          this.conn.send({
            type: 'RESTART',
            questionIndices: indices,
            questionSubjects: subjects
          });
        }
        this.resetQuizMultiplayer();
      } else {
        this.resetQuiz();
        this.switchScreen('welcome');
      }
    });

    // Áudio Toggle
    const btnAudio = document.getElementById('btn-audio-toggle');
    btnAudio.addEventListener('click', () => {
      const isMuted = this.synth.toggleMute();
      if (isMuted) {
        btnAudio.classList.add('muted');
        btnAudio.style.opacity = '0.5';
      } else {
        btnAudio.classList.remove('muted');
        btnAudio.style.opacity = '1.0';
      }
    });

    // Alternar Idioma (Flag Toggle)
    const btnLang = document.getElementById('btn-lang-toggle');
    btnLang.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('namorados_lang', this.currentLang);
      this.synth.playClickSound();
      this.updateLanguage();

      // Recarrega telas ativas se estiver no meio do quiz
      if (this.screens.quiz.classList.contains('active')) {
        const langConfig = this.config[this.currentLang];
        const totalQ = this.getActiveQuestions().length;
        document.getElementById('question-number').textContent = langConfig.ui.questionHeader
          .replace('{num}', this.currentQuestionIdx + 1)
          .replace('{total}', totalQ);

        const currentScorePercent = this.currentQuestionIdx > 0
          ? Math.round((this.matchesCount / this.currentQuestionIdx) * 100)
          : 0;
        document.getElementById('affinity-score-preview').textContent = langConfig.ui.scoreHeader.replace('{score}', currentScorePercent);

        if (this.gameMode === 'duoBattle') this.renderBattleHud();

        if (this.isMultiplayer) {
          if (this.gameMode === 'blindRank') {
            // Blind ranking: updateLanguage() already refreshed the topic title,
            // item name and reveal text. Just refresh the live ranking board.
            // Re-rendering options here would wipe an already-made selection.
            this.updateBlindLiveRanking();
          } else if (this.gameMode === 'duoBattle') {
            // Só re-renderiza a pergunta se ainda estiver escolhendo (sem escolha feita),
            // para nunca reexecutar applyBattleOutcome e duplicar o dano.
            if (this.quizSteps.p1Turn.classList.contains('active') && this.myChosenIdx === null) {
              this.renderMultiplayerQuestion();
            }
          } else {
            this.renderMultiplayerQuestion();
          }
        } else {
          if (this.quizSteps.p1Turn.classList.contains('active')) {
            this.renderP1Question();
          } else if (this.quizSteps.p2Turn.classList.contains('active')) {
            this.renderP2Question();
          } else if (this.quizSteps.reveal.classList.contains('active')) {
            // Em batalha, não reexecutamos revealMatch (reaplicaria dano).
            if (this.gameMode !== 'duoBattle') this.revealMatch();
          }
        }
      } else if (this.screens.results.classList.contains('active')) {
        if (this.gameMode === 'duoBattle') {
          this.renderBattleResults(true); // re-traduz textos sem repetir efeitos
          return;
        }
        const langConfig = this.config[this.currentLang];
        const totalQ = this.getActiveQuestions().length;
        const finalPercent = Math.round((this.matchesCount / totalQ) * 100);
        let rank = langConfig.affinityTitles[0];
        for (const titleObj of langConfig.affinityTitles) {
          if (finalPercent >= titleObj.min && finalPercent <= titleObj.max) {
            rank = titleObj;
            break;
          }
        }
        document.getElementById('affinity-rank-title').textContent = rank.title;
        document.getElementById('affinity-rank-desc').textContent = rank.description;
      }
    });

    // Chat Toggle: Expand
    document.getElementById('btn-chat-toggle-collapsed').addEventListener('click', () => {
      this.synth.playClickSound();
      const chatContainer = document.getElementById('mp-chat-container');
      chatContainer.classList.remove('collapsed');
      this.unreadCount = 0;
      this.updateChatBadge();
      // Scroll to bottom when opening
      setTimeout(() => {
        const msgs = document.getElementById('chat-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      }, 100);
    });

    // Chat Toggle: Collapse
    document.getElementById('btn-chat-close').addEventListener('click', () => {
      this.synth.playClickSound();
      document.getElementById('mp-chat-container').classList.add('collapsed');
    });

    // Chat Send Form
    document.getElementById('chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendChatMessage();
    });

    // Ao voltar o foco (ex.: celular saiu do background), reconecta na hora.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      if (!this.isMultiplayer || this.intentionalDisconnect) return;
      if (this.conn && this.conn.open) return;
      if (this.reconnecting) {
        // Acelera: dispara uma tentativa imediata em vez de esperar o backoff.
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        this.reconnectLoop();
      } else {
        this.handleConnectionLost();
      }
    });

    // Captura cliques na tela para explodir corações interativos
    window.addEventListener('click', (e) => {
      // Ignora cliques em botões para não sobrepor
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('.option-btn')) {
        this.canvas.spawnHeart(e.clientX - 10, e.clientY - 10, Math.random() * 20 + 10);
      }
    });
  }

  // ==========================================
  // MULTIPLAYER CONTROLLER (PEERJS)
  // ==========================================
  initPeer(isHost, code) {
    const statusDot = document.getElementById('conn-status-dot');
    const statusText = document.getElementById('conn-status-text');
    const statusContainer = document.getElementById('conn-status-container');
    const langConfig = this.config[this.currentLang];

    statusContainer.classList.remove('hidden');
    statusDot.className = "status-dot connecting";
    statusText.textContent = langConfig.ui.lblMpConnectingStatus;

    this.intentionalDisconnect = false;
    // Guarda o próprio nome (imutável) para sincronização idempotente em reconexões.
    this.myName = this.p1Name;

    // Conecta ao servidor sinalizador do PeerJS (com STUN/TURN para NAT móvel)
    if (isHost) {
      this.peer = new Peer(`namorados-love-${code}`, { config: this.PEER_CONFIG });

      this.peer.on('open', () => {
        console.log("Sala criada com ID:", this.peer.id);
      });

      this.peer.on('connection', (conn) => {
        // Nova conexão do guest (inclui reconexões). Substitui a anterior.
        this.conn = conn;
        this.setupConnectionCallbacks();
      });

      this.peer.on('call', (call) => this.handleIncomingMediaCall(call));

      this.peer.on('disconnected', () => this.handlePeerDisconnected());
      this.peer.on('error', (err) => {
        console.error("Erro no Host Peer:", err);
        if (err.type === 'unavailable-id') {
          // Tenta novamente com outro código
          const newCode = Math.floor(1000 + Math.random() * 9000).toString();
          this.roomCode = newCode;
          document.getElementById('room-code-val').textContent = newCode;
          this.initPeer(true, newCode);
        } else if (err.type !== 'peer-unavailable' && err.type !== 'network') {
          this.handleConnectionLost();
        }
      });
    } else {
      this.peer = new Peer(undefined, { config: this.PEER_CONFIG });

      this.peer.on('open', () => {
        console.log("Guest conectado ao sinalizador, conectando à sala:", code);
        this.conn = this.peer.connect(`namorados-love-${code}`, { reliable: true });
        this.setupConnectionCallbacks();
      });

      this.peer.on('call', (call) => this.handleIncomingMediaCall(call));

      this.peer.on('disconnected', () => this.handlePeerDisconnected());
      this.peer.on('error', (err) => {
        console.error("Erro no Guest Peer:", err);
        // peer-unavailable acontece quando o host ainda não re-registrou:
        // não desistimos, deixamos a lógica de reconexão tentar de novo.
        if (err.type !== 'peer-unavailable' && err.type !== 'network') {
          this.handleConnectionLost();
        }
      });
    }
  }

  // O peer perdeu o servidor sinalizador (broker). Reconecta mantendo o mesmo ID.
  handlePeerDisconnected() {
    if (this.intentionalDisconnect || !this.peer || this.peer.destroyed) return;
    console.log("Peer desconectado do broker — reconectando...");
    this.showReconnectingStatus();
    try { this.peer.reconnect(); } catch (e) { /* já reconectando */ }
  }

  setupConnectionCallbacks() {
    const statusDot = document.getElementById('conn-status-dot');
    const statusText = document.getElementById('conn-status-text');
    const langConfig = this.config[this.currentLang];

    this.conn.on('open', () => {
      statusDot.className = "status-dot online";
      statusText.textContent = langConfig.ui.lblMpConnectedStatus;

      // Reconexão bem-sucedida: encerra o laço e retoma o keepalive.
      const wasReconnecting = this.reconnecting;
      this.reconnecting = false;
      this.reconnectAttempts = 0;
      if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
      this.startHeartbeat();
      if (!wasReconnecting) this.synth.playMatchSound();

      // Mostra o container de chat e recolhe por padrão
      const chatContainer = document.getElementById('mp-chat-container');
      if (chatContainer) {
        chatContainer.classList.remove('hidden');
        chatContainer.classList.add('collapsed');
        this.unreadCount = 0;
        this.updateChatBadge();
        // Limpa mensagens anteriores
        const msgs = document.getElementById('chat-messages');
        if (msgs) msgs.innerHTML = "";
      }

      // Sempre envia o PRÓPRIO nome (this.myName nunca é mutado), pra que a
      // re-sincronização numa reconexão não embaralhe os nomes.
      this.conn.send({
        type: 'SYNC_NAME',
        role: this.isHost ? 'host' : 'guest',
        name: this.myName
      });

      // Photobooth "Juntinhos": se a conexão voltou no meio da sessão,
      // o host reabre a chamada de vídeo.
      if (this.isHost && this.gameMode === 'photobooth' && this.pbPhase !== 'idle') {
        setTimeout(() => this.ensurePbMediaCall(), 800);
      }
    });

    this.conn.on('data', (data) => {
      // Keepalive: ignora pings/pongs, só servem pra manter o canal vivo.
      if (data && (data.type === 'PING' || data.type === 'PONG')) return;
      this.handleIncomingData(data);
    });

    this.conn.on('close', () => {
      this.handleConnectionLost();
    });

    this.conn.on('error', (err) => {
      console.error("Erro na conexão:", err);
      this.handleConnectionLost();
    });
  }

  // ==========================================
  // RESILIÊNCIA: keepalive + reconexão automática
  // ==========================================
  startHeartbeat() {
    this.stopHeartbeat();
    // Ping periódico evita que o NAT/celular derrube o canal por inatividade.
    this.heartbeatTimer = setInterval(() => {
      if (this.conn && this.conn.open) {
        try { this.conn.send({ type: 'PING' }); } catch (e) { /* canal fechando */ }
      }
    }, 12000);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) { clearInterval(this.heartbeatTimer); this.heartbeatTimer = null; }
  }

  showReconnectingStatus() {
    const statusDot = document.getElementById('conn-status-dot');
    const statusText = document.getElementById('conn-status-text');
    if (statusDot) statusDot.className = "status-dot connecting";
    if (statusText) statusText.textContent = this.config[this.currentLang].ui.lblMpReconnecting;
  }

  // Queda do canal/broker. Em vez de derrubar o jogo, inicia um laço de
  // reconexão mantendo o estado da partida em memória.
  handleConnectionLost() {
    if (this.intentionalDisconnect) return;
    // Evento atrasado de uma conexão antiga, mas a atual está saudável: ignora.
    if (this.conn && this.conn.open) return;
    if (this.reconnecting) return; // laço já em andamento
    this.reconnecting = true;
    this.reconnectAttempts = 0;
    this.stopHeartbeat();
    this.showReconnectingStatus();
    this.reconnectLoop();
  }

  reconnectLoop() {
    if (this.intentionalDisconnect || !this.reconnecting) return;

    this.reconnectAttempts++;
    if (this.reconnectAttempts > this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnecting = false;
      this.handleDisconnect(); // desiste: avisa e volta ao lobby
      return;
    }

    this.doReconnectAttempt();

    // Backoff curto e crescente (2s..8s). O sucesso (conn 'open') encerra o laço.
    const delay = Math.min(2000 + this.reconnectAttempts * 1000, 8000);
    this.reconnectTimer = setTimeout(() => this.reconnectLoop(), delay);
  }

  doReconnectAttempt() {
    if (this.intentionalDisconnect) return;

    if (!this.peer || this.peer.destroyed) {
      // Peer morreu de vez: recria do zero (guest reconecta sozinho no 'open').
      this.initPeer(this.isHost, this.roomCode);
      return;
    }
    if (this.peer.disconnected) {
      // Broker caiu: reconecta ao sinalizador mantendo o ID.
      try { this.peer.reconnect(); } catch (e) {}
    }
    if (!this.isHost) {
      // Guest reabre o canal de dados com o host.
      try {
        if (this.conn) { try { this.conn.close(); } catch (e) {} }
        this.conn = this.peer.connect(`namorados-love-${this.roomCode}`, { reliable: true });
        this.setupConnectionCallbacks();
      } catch (e) {
        console.error("Falha ao reconectar:", e);
      }
    }
    // Host apenas espera: o guest reabre via peer.on('connection').
  }

  handleIncomingData(data) {
    const langConfig = this.config[this.currentLang];

    switch (data.type) {
      case 'SYNC_NAME':
        // Idempotente: o host é sempre P1, o guest é sempre P2 (usa this.myName,
        // que nunca muda) — assim re-sincronizar numa reconexão não embaralha nada.
        if (this.isHost) {
          this.p1Name = this.myName;
          this.p2Name = data.name;
          document.getElementById('lbl-mp-waiting-partner').classList.add('hidden');
          document.getElementById('mp-host-start-container').classList.remove('hidden');
          this.synth.playMatchSound();
        } else {
          this.p1Name = data.name;   // host = P1
          this.p2Name = this.myName; // guest = P2

          // Responde com o próprio nome para o host fechar a sincronização
          this.conn.send({
            type: 'SYNC_NAME',
            role: 'guest',
            name: this.myName
          });

          // Mostra tela de aguardo para o guest
          document.getElementById('mp-guest-block').innerHTML = `
            <div class="mp-status-card">
              <p class="mp-success-text">${langConfig.ui.lblMpConnected}</p>
              <p class="mp-waiting-text">${langConfig.ui.lblMpWaitingHost}</p>
            </div>
          `;
          this.synth.playMatchSound();
        }
        document.querySelectorAll('.p1-name-display').forEach(el => el.textContent = this.p1Name);
        document.querySelectorAll('.p2-name-display').forEach(el => el.textContent = this.p2Name);
        break;

      case 'START_GAME':
        // Guest recebe autorização para iniciar
        this.p1Name = data.p1Name;
        this.p2Name = data.p2Name;
        this.gameMode = data.gameMode || 'quiz';
        document.querySelectorAll('.p1-name-display').forEach(el => el.textContent = this.p1Name);
        document.querySelectorAll('.p2-name-display').forEach(el => el.textContent = this.p2Name);

        if (this.gameMode === 'photobooth') {
          this.pbSubMode = data.pbSubMode || 'together';
          this.pbFilter = data.pbFilter || 'none';
          this.pbPromptIndices = data.pbPromptIndices || [];
          this.pbSeed = data.pbSeed || 1;
          this.synth.startAmbientMusic();
          this.startPhotobooth();
          break;
        }

        if (this.gameMode === 'quiz' || this.gameMode === 'duoBattle') {
          this.activeQuestionsIndices = data.questionIndices;
          this.activeQuestionsSubjects = data.questionSubjects || [];
        } else {
          this.activeQuestionsIndices = data.questionIndices;
          this.blindRankingTopic = data.blindRankingTopic;
          this.blindRankingItems = data.blindRankingItems;
        }

        this.synth.startAmbientMusic();
        this.startQuiz();
        break;

      case 'CHOICE':
        this.partnerChosenIdx = data.choiceIdx;
        if (this.myChosenIdx !== null) {
          this.revealMatchMultiplayer();
        }
        break;

      case 'NEXT_QUESTION':
        this.nextQuestionMultiplayer();
        break;

      case 'BACK_TO_LOBBY':
        this.returnToLobby();
        break;

      case 'RESTART':
        if (!this.isHost) {
          this.activeQuestionsIndices = data.questionIndices;
          this.activeQuestionsSubjects = data.questionSubjects || [];
        }
        this.resetQuizMultiplayer();
        break;

      // ========== PHOTOBOOTH ==========
      case 'PB_READY':
        this.pbPartnerReady = true;
        this.checkPbBothReady();
        break;

      case 'PB_BEGIN':
        // Host avisou: os dois estão prontos, começa a sessão
        this.enterPbShootPhase();
        break;

      case 'PB_SHOT':
        // Host disparou a contagem da foto N
        this.runPbShot(data.shotIdx);
        break;

      case 'PB_PHOTO':
        if (typeof data.shotIdx === 'number' && data.shotIdx >= 0 && data.shotIdx < this.PB_TOTAL_SHOTS) {
          this.pbTheirShots[data.shotIdx] = data.img;
          this.updatePbThumb(data.shotIdx);
          if (this.isHost) this.maybeAdvancePbShot();
        }
        break;

      case 'PB_CAPTION':
        this.pbTheirCaption = (typeof data.text === 'string') ? data.text : "";
        this.maybePbReveal();
        break;

      case 'PB_RESTART':
        this.pbPromptIndices = data.pbPromptIndices || this.pbPromptIndices;
        this.pbSeed = data.pbSeed || this.pbSeed;
        this.resetPbRound();
        this.enterPbShootPhase();
        break;

      case 'CHAT_MSG':
        this.appendChatMessage(data.sender, data.text, false);

        // Abre o chat automaticamente se estiver fechado
        const chatContainer = document.getElementById('mp-chat-container');
        if (chatContainer && chatContainer.classList.contains('collapsed')) {
          chatContainer.classList.remove('collapsed');
          this.unreadCount = 0;
          this.updateChatBadge();

          setTimeout(() => {
            const msgs = document.getElementById('chat-messages');
            if (msgs) msgs.scrollTop = msgs.scrollHeight;
          }, 100);
        }

        // Toca som de mensagem recebida
        this.synth.playChatReceivedSound();
        break;
    }
  }

  handleDisconnect() {
    const statusDot = document.getElementById('conn-status-dot');
    const statusText = document.getElementById('conn-status-text');
    const langConfig = this.config[this.currentLang];

    this.stopHeartbeat();
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
    this.reconnectAttempts = 0;
    this.reconnecting = false;

    statusDot.className = "status-dot offline";
    statusText.textContent = langConfig.ui.lblMpDisconnectedStatus;
    this.synth.playMismatchSound();

    // Oculta chat
    const chatContainer = document.getElementById('mp-chat-container');
    if (chatContainer) {
      chatContainer.classList.add('hidden');
    }

    if (this.screens.quiz.classList.contains('active')) {
      alert(this.currentLang === 'pt' ? "Conexão com seu amor perdida! 💔" : "Connection with your partner lost! 💔");
      this.resetQuiz();
      this.switchScreen('welcome');
    } else if (this.screens.photobooth.classList.contains('active')) {
      alert(this.currentLang === 'pt' ? "Conexão com seu amor perdida! 💔" : "Connection with your partner lost! 💔");
      this.stopPhotoboothMedia();
      this.pbPhase = 'idle';
      this.switchScreen('welcome');
    }
  }

  disconnectPeer() {
    this.intentionalDisconnect = true;
    this.stopPhotoboothMedia();
    this.pbPhase = 'idle';
    this.stopHeartbeat();
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
    this.reconnectAttempts = 0;
    this.reconnecting = false;

    if (this.conn) {
      this.conn.close();
      this.conn = null;
    }
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    document.getElementById('conn-status-container').classList.add('hidden');
    this.isMultiplayer = false;

    // Oculta chat
    const chatContainer = document.getElementById('mp-chat-container');
    if (chatContainer) {
      chatContainer.classList.add('hidden');
    }
  }

  // ==========================================
  // JOGO: QUIZ BILINGUE / MULTIPLAYER
  // ==========================================
  updateLanguage() {
    const langConfig = this.config[this.currentLang];

    // Atualiza a bandeira
    const btnLang = document.getElementById('btn-lang-toggle');
    btnLang.innerHTML = this.currentLang === 'pt' ? FLAG_BR : FLAG_US;

    // Welcome screen translation
    document.getElementById('lbl-welcome-title').textContent = langConfig.ui.welcomeTitle;
    document.getElementById('lbl-welcome-subtitle').textContent = langConfig.ui.welcomeSubtitle;
    document.getElementById('lbl-welcome-intro').textContent = langConfig.ui.welcomeIntro;
    document.getElementById('lbl-player1-name').textContent = this.isMultiplayer ? langConfig.ui.lblP1NameOnline : langConfig.ui.labelP1Name;
    document.getElementById('player1-name').placeholder = langConfig.ui.placeholderP1;

    // Game mode selection
    document.getElementById('lbl-game-mode-title').textContent = langConfig.ui.gameModeTitle;
    document.getElementById('lbl-mode-quiz').textContent = langConfig.ui.modeQuiz;
    document.getElementById('lbl-mode-blind').textContent = langConfig.ui.modeBlind;
    const lblModeBattle = document.getElementById('lbl-mode-battle');
    if (lblModeBattle) lblModeBattle.textContent = langConfig.ui.modeBattle;
    document.getElementById('lbl-category-title').textContent = langConfig.ui.categoryTitle;
    this.renderCategoryPicker();

    // Photobooth (seletores + telas)
    this.updatePhotoboothTexts();

    // Welcome actions
    document.getElementById('btn-play-online').textContent = langConfig.ui.btnPlayOnline;

    // Multiplayer Panel
    document.getElementById('btn-create-room').textContent = langConfig.ui.btnCreateRoom;
    document.getElementById('btn-show-join').textContent = langConfig.ui.btnShowJoin;
    document.getElementById('lbl-mp-room-code-title').textContent = langConfig.ui.lblMpRoomCodeTitle;
    document.getElementById('lbl-mp-waiting-partner').textContent = langConfig.ui.lblMpWaitingPartner;
    document.getElementById('lbl-mp-connected').textContent = langConfig.ui.lblMpConnected;
    document.getElementById('btn-host-start').textContent = langConfig.ui.btnHostStart;
    document.getElementById('lbl-mp-join-code-label').textContent = langConfig.ui.lblMpJoinCodeLabel;
    document.getElementById('join-room-code').placeholder = langConfig.ui.placeholderJoinCode;
    document.getElementById('btn-guest-join').textContent = langConfig.ui.btnGuestJoin;
    document.getElementById('lbl-mp-guest-connecting').textContent = langConfig.ui.lblMpGuestConnecting;
    document.getElementById('btn-mp-cancel').textContent = langConfig.ui.btnMpCancel;

    // Connection Status
    const statusText = document.getElementById('conn-status-text');
    const statusDot = document.getElementById('conn-status-dot');
    if (statusDot) {
      if (statusDot.classList.contains('online')) {
        statusText.textContent = langConfig.ui.lblMpConnectedStatus;
      } else if (statusDot.classList.contains('connecting')) {
        statusText.textContent = langConfig.ui.lblMpConnectingStatus;
      } else {
        statusText.textContent = langConfig.ui.lblMpDisconnectedStatus;
      }
    }

    // Quiz and Transition translation
    document.getElementById('lbl-p1-tip').textContent = langConfig.ui.p1Tip;
    document.getElementById('lbl-transition-title').textContent = langConfig.ui.choiceSaved;
    document.getElementById('lbl-transition-desc').innerHTML = langConfig.ui.transitionMsg.replace('{name}', this.p2Name || (this.currentLang === 'pt' ? 'Amor 2' : 'Love 2'));
    document.getElementById('btn-continue-p2').textContent = langConfig.ui.btnTransition;
    document.getElementById('lbl-p2-tip').textContent = langConfig.ui.p2Tip;

    // Results screen translation
    document.getElementById('lbl-results-title').textContent = langConfig.ui.resultsTitle;
    document.getElementById('lbl-results-subtitle').textContent = langConfig.ui.resultsSubtitle;
    document.getElementById('lbl-results-sync-label').textContent = langConfig.ui.resultsSyncLabel;
    document.getElementById('lbl-ranking-final-title').textContent = langConfig.ui.rankingFinalTitle;
    const onBlindResults = this.gameMode === 'blindRank' && this.screens.results.classList.contains('active');
    document.getElementById('btn-restart').textContent = onBlindResults ? langConfig.ui.btnBackToLobby : langConfig.ui.btnRestart;

    // Blind Ranking live texts
    document.getElementById('lbl-live-ranking-title').textContent = langConfig.ui.liveRankingTitle;
    document.getElementById('lbl-blind-math').textContent = langConfig.ui.blindMathLabel;
    document.getElementById('lbl-blind-slot').textContent = langConfig.ui.blindSlotLabel;

    // Update in-progress blind question text (title + localized item name) without
    // touching the rank buttons or selection state.
    if (this.gameMode === 'blindRank' && this.blindRankingTopic !== null) {
      const topicData = blindRankingTopics[this.currentLang][this.blindRankingTopic];
      const titleEl = document.getElementById('blind-p1-topic-title');
      if (titleEl && topicData) titleEl.textContent = topicData.title;

      const item = this.blindRankingItems[this.currentQuestionIdx];
      const nameEl = document.getElementById('p1-blind-name');
      if (nameEl && item) nameEl.textContent = this.getBlindItemName(item);

      // If the blind reveal is showing, refresh its description in the new language.
      const blindReveal = document.getElementById('reveal-blind-container');
      if (blindReveal && !blindReveal.classList.contains('hidden')) {
        document.getElementById('reveal-desc').textContent = langConfig.ui.blindRevealDesc;
      }
    }

    // Multiplayer turn badge / tip (refresh if currently on the choosing step)
    if (this.isMultiplayer && this.quizSteps.p1Turn.classList.contains('active')) {
      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      if (badge) badge.textContent = langConfig.ui.mpYourChoice;
      document.getElementById('lbl-p1-tip').textContent = langConfig.ui.mpThinkTip;
    }

    // Chat translation
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.placeholder = this.currentLang === 'pt' ? "Escreva uma mensagem..." : "Type a message...";
    }
  }

  switchScreen(screenName) {
    Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
    this.screens[screenName].classList.add('active');
    if (screenName !== 'quiz') {
      this.showBlindLiveRanking(false);
    }
  }

  showQuizStep(stepName) {
    Object.values(this.quizSteps).forEach(step => step.classList.remove('active'));
    this.quizSteps[stepName].classList.add('active');
  }

  getActiveQuestions() {
    return this.activeQuestionsIndices.map(idx => coupleQuestionsPool[this.currentLang][idx]);
  }

  startQuiz() {
    // Atualiza displays de nomes na tela do HTML
    document.querySelectorAll('.p1-name-display').forEach(el => el.textContent = this.p1Name);
    document.querySelectorAll('.p2-name-display').forEach(el => el.textContent = this.p2Name);

    // Ajusta o texto da transição com o nome do parceiro
    const langConfig = this.config[this.currentLang];
    document.getElementById('lbl-transition-desc').innerHTML = langConfig.ui.transitionMsg.replace('{name}', this.p2Name);

    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    if (this.gameMode === 'blindRank') {
      this.blindFinalRanking = new Array(10).fill(null);
      this.blindAvailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    if (this.gameMode === 'duoBattle') {
      this.initBattle();
    }

    if (!this.isMultiplayer) {
      const count = this.gameMode === 'duoBattle' ? this.BATTLE.questionCount : 10;
      const indices = this.pickQuestionIndices(count);
      this.activeQuestionsIndices = indices;
      this.activeQuestionsSubjects = indices.map(() => Math.random() < 0.5 ? 'p1' : 'p2');
    }

    this.switchScreen('quiz');
    this.startNewQuestion();
  }

  startNewQuestion() {
    const langConfig = this.config[this.currentLang];
    const isBattle = this.gameMode === 'duoBattle';
    const totalQ = this.gameMode === 'blindRank' ? 10 : this.getActiveQuestions().length;
    const progressPercent = ((this.currentQuestionIdx) / totalQ) * 100;

    document.getElementById('progress-bar-fill').style.width = `${progressPercent || 5}%`;
    document.getElementById('question-number').textContent = langConfig.ui.questionHeader
      .replace('{num}', this.currentQuestionIdx + 1)
      .replace('{total}', totalQ);

    // Atualiza pontuação parcial
    const currentScorePercent = this.currentQuestionIdx > 0
      ? Math.round((this.matchesCount / this.currentQuestionIdx) * 100)
      : 0;
    document.getElementById('affinity-score-preview').textContent = langConfig.ui.scoreHeader.replace('{score}', currentScorePercent);

    // Alterna entre o cabeçalho de progresso (quiz/blind) e o HUD de batalha.
    const progEl = document.querySelector('.quiz-progress-container');
    if (progEl) progEl.classList.toggle('hidden', isBattle);
    const hudEl = document.getElementById('battle-hud');
    if (hudEl) hudEl.classList.toggle('hidden', !isBattle);
    if (isBattle) this.renderBattleHud();

    if (this.gameMode === 'quiz' || isBattle) {
       document.getElementById('p1-question-text').classList.remove('hidden');
       document.getElementById('p1-options').classList.remove('hidden');
       document.getElementById('p1-blind-image-container').classList.add('hidden');
       document.getElementById('p1-blind-options').classList.add('hidden');
    }

    if (this.isMultiplayer) {
      this.showQuizStep('p1Turn');

      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.textContent = langConfig.ui.mpYourChoice;
      badge.className = "player-indicator p1-badge";

      document.getElementById('lbl-p1-tip').textContent = isBattle ? langConfig.ui.battleTip : langConfig.ui.mpThinkTip;
      if (isBattle) badge.textContent = langConfig.ui.modeBattle;

      if (this.gameMode === 'quiz' || isBattle) {
        this.showBlindLiveRanking(false);
        this.renderMultiplayerQuestion();
      } else {
        this.renderBlindRankMultiplayer();
      }
    } else {
      this.showQuizStep('p1Turn');
      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.innerHTML = isBattle
        ? langConfig.ui.modeBattle
        : `Vez de <span class="p1-name-display">${this.p1Name}</span>`;
      badge.className = "player-indicator p1-badge";
      document.getElementById('lbl-p1-tip').textContent = isBattle ? langConfig.ui.battleTip : langConfig.ui.p1Tip;
      this.showBlindLiveRanking(false);

      if (this.gameMode === 'quiz' || isBattle) {
        this.renderP1Question();
      } else {
        // We only support blindRank multiplayer for now
      }
    }
  }

  // ==========================================
  // BLIND RANKING LOGIC
  // ==========================================
  renderBlindRankMultiplayer() {
    const item = this.blindRankingItems[this.currentQuestionIdx];
    
    // Hide quiz UI, show blind rank UI
    document.getElementById('p1-question-text').classList.add('hidden');
    document.getElementById('p1-options').classList.add('hidden');
    document.getElementById('p1-blind-image-container').classList.remove('hidden');
    document.getElementById('p1-blind-options').classList.remove('hidden');

    const topicData = blindRankingTopics[this.currentLang][this.blindRankingTopic];
    document.getElementById('blind-p1-topic-title').textContent = topicData.title;

    const imgEl = document.getElementById('p1-blind-image');
    const frame = imgEl.closest('.blind-image-frame');
    const nameEl = document.getElementById('p1-blind-name');

    if (item.image) {
      // Imagem (com ou sem rótulo). Corta o topo (título turco embutido).
      if (frame) frame.style.display = '';
      imgEl.src = item.image;
      imgEl.style.marginTop = `-${Math.round((item.crop != null ? item.crop : 0.25) * 100)}%`;
    } else if (frame) {
      // Categoria só-texto: sem imagem.
      frame.style.display = 'none';
    }

    const itemName = this.getBlindItemName(item);
    nameEl.textContent = itemName;
    nameEl.style.display = itemName ? '' : 'none';        // imgnolabel: sem rótulo
    nameEl.classList.toggle('text-item-big', !item.image); // texto puro: maior

    const container = document.getElementById('p1-blind-options');
    container.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement('button');
      btn.className = "option-btn rank-btn";
      btn.textContent = i;

      if (this.blindAvailableSlots.includes(i)) {
        btn.addEventListener('click', () => this.handleBlindRankSelection(i));
      } else {
        // Slot já preenchido: não pode ser selecionado
        btn.classList.add('slot-taken');
        btn.disabled = true;
      }

      container.appendChild(btn);
    }

    // Mostra o painel de ranking ao vivo e o atualiza
    this.showBlindLiveRanking(true);
    this.updateBlindLiveRanking();
  }

  // Resolve o nome do item no idioma atual (imagens são compartilhadas entre idiomas)
  getBlindItemName(item) {
    if (item && typeof item.idx === 'number' && this.blindRankingTopic !== null) {
      const topic = blindRankingTopics[this.currentLang][this.blindRankingTopic];
      if (topic && topic.items[item.idx]) {
        return topic.items[item.idx].name;
      }
    }
    return item ? item.name : "";
  }

  showBlindLiveRanking(show) {
    const panel = document.getElementById('blind-live-ranking');
    if (!panel) return;
    panel.classList.toggle('hidden', !show);
  }

  updateBlindLiveRanking(highlightSlot) {
    const list = document.getElementById('blind-live-list');
    if (!list) return;

    const titleEl = document.getElementById('lbl-live-ranking-title');
    if (titleEl) titleEl.textContent = this.config[this.currentLang].ui.liveRankingTitle;

    list.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'live-rank-slot';

      const rankNum = document.createElement('span');
      rankNum.className = 'live-rank-num';
      rankNum.textContent = i + 1;
      slotDiv.appendChild(rankNum);

      const entry = this.blindFinalRanking[i];
      if (entry) {
        slotDiv.classList.add('filled');
        if (entry.image) {
          const img = document.createElement('img');
          img.src = entry.image;
          img.alt = this.getBlindItemName(entry);
          img.className = 'live-rank-img';
          slotDiv.appendChild(img);
        } else {
          // Categoria só-texto: mostra um rótulo curto no slot.
          const txt = document.createElement('span');
          txt.className = 'live-rank-text';
          txt.textContent = this.getBlindItemName(entry);
          slotDiv.appendChild(txt);
        }
        if (i + 1 === highlightSlot) {
          slotDiv.classList.add('highlight-slot');
        }
      } else {
        const empty = document.createElement('span');
        empty.className = 'live-rank-empty';
        empty.textContent = "—";
        slotDiv.appendChild(empty);
      }
      list.appendChild(slotDiv);
    }
  }

  // Seletor de categoria (welcome screen)
  renderCategoryPicker() {
    const container = document.getElementById('category-options');
    if (!container) return;

    const topics = blindRankingTopics[this.currentLang];
    if (this.selectedCategoryIdx >= topics.length) this.selectedCategoryIdx = 0;

    // Ordem alfabética pelo título no idioma atual (mantém o índice real para a seleção).
    const order = topics.map((_, i) => i)
      .sort((a, b) => topics[a].title.localeCompare(topics[b].title, this.currentLang, { sensitivity: 'base' }));

    container.innerHTML = "";
    order.forEach((idx) => {
      const topic = topics[idx];
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'category-chip' + (idx === this.selectedCategoryIdx ? ' active' : '');
      chip.innerHTML = `<span class="category-emoji">${topic.emoji}</span><span class="category-label">${topic.title}</span>`;
      chip.addEventListener('click', () => {
        this.synth.playClickSound();
        this.selectedCategoryIdx = idx;
        [...container.children].forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
      container.appendChild(chip);
    });

    const lbl = document.getElementById('lbl-category-title');
    if (lbl) lbl.textContent = this.config[this.currentLang].ui.categoryTitle;
  }

  updateCategoryPickerVisibility() {
    const picker = document.getElementById('blind-category-picker');
    if (!picker) return;
    picker.classList.toggle('hidden', this.gameMode !== 'blindRank');
  }

  // ==========================================
  // DUO BATTLE (BOSS FIGHT)
  // ==========================================
  setGameMode(mode) {
    this.gameMode = mode;
    const ids = { quiz: 'mode-quiz-btn', blindRank: 'mode-blind-btn', duoBattle: 'mode-battle-btn', photobooth: 'mode-photobooth-btn' };
    Object.entries(ids).forEach(([m, id]) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', m === mode);
    });
    this.updateCategoryPickerVisibility();
    this.updatePbPickerVisibility();
    if (mode === 'blindRank') this.renderCategoryPicker();
  }

  // Sorteia índices de perguntas únicas do pool atual.
  pickQuestionIndices(count) {
    const pool = coupleQuestionsPool[this.currentLang];
    const n = Math.min(count, pool.length);
    const indices = [];
    while (indices.length < n) {
      const idx = Math.floor(Math.random() * pool.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices;
  }

  initBattle() {
    this.enemyMaxHp = this.BATTLE.enemyMaxHp;
    this.enemyHp = this.BATTLE.enemyMaxHp;
    this.coupleMaxHp = this.BATTLE.coupleMaxHp;
    this.coupleHp = this.BATTLE.coupleMaxHp;
    this.battleOver = false;
    this.battleWon = false;
    this.battleRounds = 0;
    this.battleHits = 0;
  }

  renderBattleHud() {
    const langConfig = this.config[this.currentLang];
    const enemyPct = Math.max(0, Math.round((this.enemyHp / this.enemyMaxHp) * 100));
    const couplePct = Math.max(0, Math.round((this.coupleHp / this.coupleMaxHp) * 100));

    document.getElementById('battle-enemy-hp-fill').style.width = enemyPct + '%';
    document.getElementById('battle-couple-hp-fill').style.width = couplePct + '%';
    document.getElementById('battle-enemy-hp-text').textContent = `${this.enemyHp}/${this.enemyMaxHp}`;
    document.getElementById('battle-couple-hp-text').textContent = `${this.coupleHp}/${this.coupleMaxHp}`;
    document.getElementById('battle-enemy-name').textContent = langConfig.ui.battleEnemyName;

    const coupleName = (this.p1Name && this.p2Name)
      ? `${this.p1Name} 💞 ${this.p2Name}`
      : langConfig.ui.battleCoupleName;
    document.getElementById('battle-couple-name').textContent = coupleName;
  }

  // Pisca/treme o avatar atingido para dar feedback de dano.
  flashBattle(who) {
    const id = who === 'enemy' ? 'battle-enemy-avatar' : 'battle-couple-avatar';
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('battle-shake');
    void el.offsetWidth; // força reinício da animação
    el.classList.add('battle-shake');
  }

  // Aplica o resultado de uma rodada de batalha e atualiza o HUD/estado.
  applyBattleOutcome(isMatch, revealIcon, revealTitle, revealDesc) {
    const langConfig = this.config[this.currentLang];
    this.battleRounds++;

    if (isMatch) {
      this.battleHits++;
      this.enemyHp = Math.max(0, this.enemyHp - this.BATTLE.hitDamage);
      revealIcon.textContent = "⚔️";
      revealIcon.className = "reveal-status-icon bounce-animation";
      revealTitle.innerHTML = langConfig.ui.battleHitTitle.replace('{dmg}', this.BATTLE.hitDamage);
      revealDesc.textContent = langConfig.ui.battleHitDesc;
      this.synth.playMatchSound();
      this.flashBattle('enemy');
    } else {
      this.coupleHp = Math.max(0, this.coupleHp - this.BATTLE.enemyDamage);
      revealIcon.textContent = "🛡️";
      revealIcon.className = "reveal-status-icon shake-animation";
      revealTitle.innerHTML = langConfig.ui.battleMissTitle.replace('{dmg}', this.BATTLE.enemyDamage);
      revealDesc.textContent = langConfig.ui.battleMissDesc;
      this.synth.playMismatchSound();
      this.flashBattle('couple');
    }

    this.renderBattleHud();

    if (this.enemyHp <= 0) {
      this.battleOver = true;
      this.battleWon = true;
    } else if (this.coupleHp <= 0) {
      this.battleOver = true;
      this.battleWon = false;
    }
  }

  renderBattleResults(skipEffects) {
    const langConfig = this.config[this.currentLang];
    document.getElementById('results-quiz-container').classList.add('hidden');
    document.getElementById('results-blind-container').classList.add('hidden');
    document.getElementById('results-battle-container').classList.remove('hidden');

    document.getElementById('lbl-results-title').textContent = this.battleWon
      ? langConfig.ui.victoryResultsTitle : langConfig.ui.defeatResultsTitle;
    document.getElementById('lbl-results-subtitle').textContent = this.battleWon
      ? langConfig.ui.victoryResultsSubtitle : langConfig.ui.defeatResultsSubtitle;

    document.getElementById('battle-result-icon').textContent = this.battleWon ? "🏆" : "💀";
    document.getElementById('battle-result-title').textContent = this.battleWon
      ? langConfig.ui.victoryTitle : langConfig.ui.defeatTitle;
    document.getElementById('battle-result-desc').textContent = this.battleWon
      ? langConfig.ui.victoryDesc : langConfig.ui.defeatDesc;

    document.getElementById('lbl-battle-rounds').textContent = langConfig.ui.battleRoundsLabel;
    document.getElementById('lbl-battle-hits').textContent = langConfig.ui.battleHitsLabel;
    document.getElementById('battle-stat-rounds').textContent = this.battleRounds;
    document.getElementById('battle-stat-hits').textContent = this.battleHits;

    document.getElementById('btn-restart').textContent = langConfig.ui.btnRestart;

    if (skipEffects) return;
    if (this.battleWon) {
      this.synth.playFanfareSound();
      setTimeout(() => this.canvas.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 70), 300);
    } else {
      this.synth.playMismatchSound();
    }
  }

  handleBlindRankSelection(rankNumber) {
    this.myChosenIdx = rankNumber;
    this.synth.playTone(523.25, 'sine', 0.15, 0.1);

    if (this.conn && this.conn.open) {
      this.conn.send({
        type: 'CHOICE',
        choiceIdx: rankNumber
      });
    }

    const container = document.getElementById('p1-blind-options');
    container.innerHTML = `
      <div class="mp-status-card" style="margin-top: 0px;">
        <p class="mp-waiting-text">${this.config[this.currentLang].ui.lblMpWaitingChoice}</p>
      </div>
    `;

    if (this.partnerChosenIdx !== null) {
      this.revealMatchMultiplayer();
    }
  }

  revealBlindRankMultiplayer() {
    const langConfig = this.config[this.currentLang];
    const item = this.blindRankingItems[this.currentQuestionIdx];
    
    document.getElementById('reveal-quiz-choices').classList.add('hidden');
    document.getElementById('reveal-blind-container').classList.remove('hidden');

    document.getElementById('lbl-blind-math').textContent = langConfig.ui.blindMathLabel;
    document.getElementById('lbl-blind-slot').textContent = langConfig.ui.blindSlotLabel;

    const revealIcon = document.getElementById('reveal-animation-container');
    const revealTitle = document.getElementById('reveal-title');
    const revealDesc = document.getElementById('reveal-desc');
    const nextBtn = document.getElementById('btn-next-question');

    let myChoice = this.myChosenIdx;
    let partnerChoice = this.partnerChosenIdx;
    
    document.getElementById('blind-p1-rank').textContent = this.isHost ? myChoice : partnerChoice;
    document.getElementById('blind-p2-rank').textContent = this.isHost ? partnerChoice : myChoice;
    
    let avg = (myChoice + partnerChoice) / 2;
    document.getElementById('blind-avg').textContent = avg;

    let closestSlot = this.blindAvailableSlots.reduce((prev, curr) => {
      const diffCurr = Math.abs(curr - avg);
      const diffPrev = Math.abs(prev - avg);
      if (diffCurr < diffPrev) return curr;
      if (diffCurr === diffPrev) return curr < prev ? curr : prev;
      return prev;
    });

    document.getElementById('blind-final-slot').textContent = closestSlot;

    this.blindFinalRanking[closestSlot - 1] = item;
    this.blindAvailableSlots = this.blindAvailableSlots.filter(s => s !== closestSlot);

    // Atualiza o painel de ranking ao vivo (substitui o mini-board da revelação)
    this.updateBlindLiveRanking(closestSlot);

    revealIcon.textContent = "⭐";
    revealIcon.className = "reveal-status-icon bounce-animation";
    revealTitle.innerHTML = `Rank #${closestSlot}`;
    revealDesc.textContent = langConfig.ui.blindRevealDesc;

    this.synth.playMatchSound();

    const isLastQ = this.currentQuestionIdx === 9;
    if (this.isHost) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = isLastQ ? langConfig.ui.btnFinish : langConfig.ui.btnNext;
      nextBtn.disabled = false;
    } else {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = langConfig.ui.lblMpWaitingNext;
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.6';
    }
  }

  renderP1Question() {
    const q = this.getActiveQuestions()[this.currentQuestionIdx];
    document.getElementById('p1-question-text').textContent = this.getQuestionText(q, this.currentQuestionIdx);

    const container = document.getElementById('p1-options');
    container.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleP1Selection(idx));
      container.appendChild(btn);
    });
  }

  handleP1Selection(optionIdx) {
    this.p1Answers.push(optionIdx);
    this.synth.playTone(523.25, 'sine', 0.15, 0.1);
    this.showQuizStep('transition');
  }

  renderP2Question() {
    const q = this.getActiveQuestions()[this.currentQuestionIdx];
    document.getElementById('p2-question-text').textContent = this.getQuestionText(q, this.currentQuestionIdx);

    const container = document.getElementById('p2-options');
    container.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleP2Selection(idx));
      container.appendChild(btn);
    });
  }

  handleP2Selection(optionIdx) {
    this.p2Answers.push(optionIdx);
    this.synth.playTone(587.33, 'sine', 0.15, 0.1);
    this.revealMatch();
  }

  // ==========================================
  // MULTIPLAYER GAMEPLAY LOGIC
  // ==========================================
  renderMultiplayerQuestion() {
    const q = this.getActiveQuestions()[this.currentQuestionIdx];
    document.getElementById('p1-question-text').textContent = this.getQuestionText(q, this.currentQuestionIdx);

    const container = document.getElementById('p1-options');
    container.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.addEventListener('click', () => this.handleMultiplayerSelection(idx));
      container.appendChild(btn);
    });
  }

  handleMultiplayerSelection(optionIdx) {
    this.myChosenIdx = optionIdx;
    this.synth.playTone(523.25, 'sine', 0.15, 0.1);

    // Envia resposta para o parceiro
    if (this.conn && this.conn.open) {
      this.conn.send({
        type: 'CHOICE',
        choiceIdx: optionIdx
      });
    }

    // Mostra tela de espera local
    const container = document.getElementById('p1-options');
    container.innerHTML = `
      <div class="mp-status-card" style="margin-top: 0px;">
        <p class="mp-waiting-text">${this.config[this.currentLang].ui.lblMpWaitingChoice}</p>
      </div>
    `;

    // Verifica se parceiro já escolheu
    if (this.partnerChosenIdx !== null) {
      this.revealMatchMultiplayer();
    }
  }

  revealMatchMultiplayer() {
    this.showQuizStep('reveal');
    const langConfig = this.config[this.currentLang];

    if (this.gameMode === 'blindRank') {
      this.revealBlindRankMultiplayer();
      return;
    }

    document.getElementById('reveal-quiz-choices').classList.remove('hidden');
    document.getElementById('reveal-blind-container').classList.add('hidden');

    const q = this.getActiveQuestions()[this.currentQuestionIdx];

    // Mapeia quem escolheu o quê
    let myChoiceText = q.options[this.myChosenIdx];
    let partnerChoiceText = q.options[this.partnerChosenIdx];

    const p1Box = document.querySelector('.p1-choice-box');
    const p2Box = document.querySelector('.p2-choice-box');
    const revealIcon = document.getElementById('reveal-animation-container');
    const revealTitle = document.getElementById('reveal-title');
    const revealDesc = document.getElementById('reveal-desc');
    const nextBtn = document.getElementById('btn-next-question');

    p1Box.className = "reveal-choice-box p1-choice-box";
    p2Box.className = "reveal-choice-box p2-choice-box";
    revealIcon.className = "reveal-status-icon";

    // Host é P1, Guest é P2 na tela de resultados. Ajusta labels correspondentes
    if (this.isHost) {
      document.getElementById('reveal-p1-choice-text').textContent = myChoiceText;
      document.getElementById('reveal-p2-choice-text').textContent = partnerChoiceText;
    } else {
      document.getElementById('reveal-p1-choice-text').textContent = partnerChoiceText;
      document.getElementById('reveal-p2-choice-text').textContent = myChoiceText;
    }

    const p1ChoiceIdx = this.isHost ? this.myChosenIdx : this.partnerChosenIdx;
    const p2ChoiceIdx = this.isHost ? this.partnerChosenIdx : this.myChosenIdx;

    let isMatch = false;
    const isRelative = (q.options[0] === "Eu" || q.options[0] === "Me") && 
                       (q.options[1] === "Você" || q.options[1] === "You");

    if (isRelative) {
      if (p1ChoiceIdx === 0 && p2ChoiceIdx === 1) {
        isMatch = true;
      } else if (p1ChoiceIdx === 1 && p2ChoiceIdx === 0) {
        isMatch = true;
      } else if (p1ChoiceIdx === 2 && p2ChoiceIdx === 2) {
        isMatch = true;
      } else if (p1ChoiceIdx === 3 && p2ChoiceIdx === 3) {
        isMatch = true;
      }
    } else {
      isMatch = p1ChoiceIdx === p2ChoiceIdx;
    }

    if (isMatch) {
      this.matchesCount++;
      p1Box.classList.add('match-reveal');
      p2Box.classList.add('match-reveal');
      if (this.gameMode === 'duoBattle') {
        this.applyBattleOutcome(true, revealIcon, revealTitle, revealDesc);
      } else {
        revealIcon.textContent = "💖";
        revealIcon.classList.add('bounce-animation');
        revealTitle.innerHTML = langConfig.ui.revealMatchTitle;
        revealDesc.textContent = langConfig.ui.revealMatchDesc;
        this.synth.playMatchSound();
      }
      const rect = revealIcon.getBoundingClientRect();
      this.canvas.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    } else {
      p1Box.classList.add('mismatch-reveal');
      p2Box.classList.add('mismatch-reveal');
      if (this.gameMode === 'duoBattle') {
        this.applyBattleOutcome(false, revealIcon, revealTitle, revealDesc);
      } else {
        revealIcon.textContent = "💔";
        revealIcon.classList.add('shake-animation');
        revealTitle.innerHTML = langConfig.ui.revealMismatchTitle;
        revealDesc.textContent = langConfig.ui.revealMismatchDesc;
        this.synth.playMismatchSound();
      }
    }

    // Configura botões de controle de tela
    const isLastQ = this.gameMode === 'duoBattle'
      ? this.battleOver
      : this.currentQuestionIdx === this.getActiveQuestions().length - 1;
    const nextLabel = this.gameMode === 'duoBattle' ? langConfig.ui.battleNext : langConfig.ui.btnNext;

    if (this.isHost) {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = isLastQ ? langConfig.ui.btnFinish : nextLabel;
      nextBtn.disabled = false;
    } else {
      // Guest apenas aguarda o Host avançar
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = langConfig.ui.lblMpWaitingNext;
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.6';
    }
  }

  nextQuestionMultiplayer() {
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    // Libera botão do guest
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';

    if (this.gameMode === 'duoBattle') {
      if (this.battleOver) {
        this.goToResults();
        return;
      }
      this.currentQuestionIdx++;
      if (this.currentQuestionIdx < this.getActiveQuestions().length) {
        this.startNewQuestion();
      } else {
        // Sem perguntas restantes: decide pelo HP atual.
        this.battleOver = true;
        this.battleWon = this.enemyHp <= this.coupleHp;
        this.goToResults();
      }
      return;
    }

    this.currentQuestionIdx++;
    const totalQ = this.gameMode === 'quiz' ? this.getActiveQuestions().length : 10;

    if (this.currentQuestionIdx < totalQ) {
      this.startNewQuestion();
    } else {
      this.goToResults();
    }
  }

  revealMatch() {
    this.showQuizStep('reveal');
    const langConfig = this.config[this.currentLang];
    const activeQ = this.getActiveQuestions();
    const q = activeQ[this.currentQuestionIdx];
    const p1ChoiceIdx = this.p1Answers[this.currentQuestionIdx];
    const p2ChoiceIdx = this.p2Answers[this.currentQuestionIdx];

    const p1ChoiceText = q.options[p1ChoiceIdx];
    const p2ChoiceText = q.options[p2ChoiceIdx];

    const p1Box = document.querySelector('.p1-choice-box');
    const p2Box = document.querySelector('.p2-choice-box');
    const revealIcon = document.getElementById('reveal-animation-container');
    const revealTitle = document.getElementById('reveal-title');
    const revealDesc = document.getElementById('reveal-desc');
    const nextBtn = document.getElementById('btn-next-question');

    p1Box.className = "reveal-choice-box p1-choice-box";
    p2Box.className = "reveal-choice-box p2-choice-box";
    revealIcon.className = "reveal-status-icon";

    document.getElementById('reveal-p1-choice-text').textContent = p1ChoiceText;
    document.getElementById('reveal-p2-choice-text').textContent = p2ChoiceText;

    let isMatch = false;
    const isRelative = (q.options[0] === "Eu" || q.options[0] === "Me") && 
                       (q.options[1] === "Você" || q.options[1] === "You");

    if (isRelative) {
      if (p1ChoiceIdx === 0 && p2ChoiceIdx === 1) {
        isMatch = true;
      } else if (p1ChoiceIdx === 1 && p2ChoiceIdx === 0) {
        isMatch = true;
      } else if (p1ChoiceIdx === 2 && p2ChoiceIdx === 2) {
        isMatch = true;
      } else if (p1ChoiceIdx === 3 && p2ChoiceIdx === 3) {
        isMatch = true;
      }
    } else {
      isMatch = p1ChoiceIdx === p2ChoiceIdx;
    }

    if (isMatch) {
      this.matchesCount++;
      p1Box.classList.add('match-reveal');
      p2Box.classList.add('match-reveal');
      if (this.gameMode === 'duoBattle') {
        this.applyBattleOutcome(true, revealIcon, revealTitle, revealDesc);
      } else {
        revealIcon.textContent = "💖";
        revealIcon.classList.add('bounce-animation');
        revealTitle.innerHTML = langConfig.ui.revealMatchTitle;
        revealDesc.textContent = langConfig.ui.revealMatchDesc;
        this.synth.playMatchSound();
      }
      const rect = revealIcon.getBoundingClientRect();
      this.canvas.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    } else {
      p1Box.classList.add('mismatch-reveal');
      p2Box.classList.add('mismatch-reveal');
      if (this.gameMode === 'duoBattle') {
        this.applyBattleOutcome(false, revealIcon, revealTitle, revealDesc);
      } else {
        revealIcon.textContent = "💔";
        revealIcon.classList.add('shake-animation');
        revealTitle.innerHTML = langConfig.ui.revealMismatchTitle;
        revealDesc.textContent = langConfig.ui.revealMismatchDesc;
        this.synth.playMismatchSound();
      }
    }

    if (this.gameMode === 'duoBattle') {
      nextBtn.textContent = this.battleOver ? langConfig.ui.btnFinish : langConfig.ui.battleNext;
    } else if (this.currentQuestionIdx === activeQ.length - 1) {
      nextBtn.textContent = langConfig.ui.btnFinish;
    } else {
      nextBtn.textContent = langConfig.ui.btnNext;
    }
  }

  // ==========================================
  // RESULTADOS
  // ==========================================
  goToResults() {
    this.switchScreen('results');
    this.showBlindLiveRanking(false);

    if (this.gameMode === 'duoBattle') {
      this.renderBattleResults();
      return;
    }

    this.synth.playFanfareSound();

    if (this.gameMode === 'blindRank') {
      document.getElementById('results-quiz-container').classList.add('hidden');
      document.getElementById('results-blind-container').classList.remove('hidden');
      document.getElementById('results-battle-container').classList.add('hidden');
      document.getElementById('lbl-ranking-final-title').textContent = this.config[this.currentLang].ui.rankingFinalTitle;
      // No Blind Ranking, o botão final volta ao lobby em vez de "refazer".
      document.getElementById('btn-restart').textContent = this.config[this.currentLang].ui.btnBackToLobby;

      const boardContainer = document.getElementById('ranking-board-full-list');
      boardContainer.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'ranking-slot-full';
        const rankNum = document.createElement('span');
        rankNum.className = 'rank-num-full';
        rankNum.textContent = `#${i + 1}`;
        slotDiv.appendChild(rankNum);
        
        const entry = this.blindFinalRanking[i];
        if (entry) {
          if (entry.image) {
            const img = document.createElement('img');
            img.src = entry.image;
            img.className = 'rank-img-full';
            slotDiv.appendChild(img);
          } else {
            const txt = document.createElement('span');
            txt.className = 'rank-text-full';
            txt.textContent = this.getBlindItemName(entry);
            slotDiv.appendChild(txt);
          }
        }
        boardContainer.appendChild(slotDiv);
      }
      return;
    }

    document.getElementById('results-quiz-container').classList.remove('hidden');
    document.getElementById('results-blind-container').classList.add('hidden');
    document.getElementById('results-battle-container').classList.add('hidden');

    const langConfig = this.config[this.currentLang];
    const totalQ = this.getActiveQuestions().length;
    const finalPercent = Math.round((this.matchesCount / totalQ) * 100);

    // Anima a barra circular de progresso (Dashoffset total é 283)
    const strokeFill = document.getElementById('score-circle-fill');
    const offset = 283 - (283 * finalPercent) / 100;

    // Animação de contagem numérica
    const scoreVal = document.getElementById('score-percentage');
    let currentCount = 0;
    const countDuration = 1500; // 1.5s
    const startTime = performance.now();

    const animateCount = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / countDuration, 1);

      // Easing out quadratico
      const easeProgress = progress * (2 - progress);
      currentCount = Math.round(easeProgress * finalPercent);
      scoreVal.textContent = `${currentCount}%`;

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);

    setTimeout(() => {
      strokeFill.style.strokeDashoffset = offset;
    }, 100);

    // Determina a mensagem e título de afinidade
    let rank = langConfig.affinityTitles[0];
    for (const titleObj of langConfig.affinityTitles) {
      if (finalPercent >= titleObj.min && finalPercent <= titleObj.max) {
        rank = titleObj;
        break;
      }
    }

    document.getElementById('affinity-rank-title').textContent = rank.title;
    document.getElementById('affinity-rank-desc').textContent = rank.description;

    // Dispara uma explosão especial se for 100%
    if (finalPercent === 100) {
      setTimeout(() => {
        this.canvas.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
      }, 500);
    }
  }



  getQuestionText(q, activeIndex) {
    if (!q) return "";

    // Sujeito da pergunta (P1 ou P2)
    let subjectRole = 'p1';
    if (this.activeQuestionsSubjects && this.activeQuestionsSubjects[activeIndex]) {
      subjectRole = this.activeQuestionsSubjects[activeIndex];
    } else {
      // Fallback local: alterna de acordo com o índice
      subjectRole = (activeIndex % 2 === 0) ? 'p1' : 'p2';
    }

    const p1 = this.p1Name || (this.currentLang === 'pt' ? 'Amor 1' : 'Love 1');
    const p2 = this.p2Name || (this.currentLang === 'pt' ? 'Amor 2' : 'Love 2');

    const player = (subjectRole === 'p1') ? p1 : p2;
    const partner = (subjectRole === 'p1') ? p2 : p1;

    return q.text.replace(/{player}/g, player).replace(/{partner}/g, partner);
  }

  sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    const myName = this.isHost ? this.p1Name : this.p2Name;
    const sender = myName || (this.currentLang === 'pt' ? 'Amor' : 'Love');

    // Envia por P2P
    if (this.conn && this.conn.open) {
      this.conn.send({
        type: 'CHAT_MSG',
        text: text,
        sender: sender
      });
    }

    // Toca som de envio
    this.synth.playChatSentSound();

    // Adiciona na interface
    this.appendChatMessage(sender, text, true);
  }

  appendChatMessage(senderName, text, isSent) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isSent ? 'sent' : 'received'}`;

    const senderSpan = document.createElement('span');
    senderSpan.className = 'chat-msg-sender';
    senderSpan.textContent = senderName;

    const textSpan = document.createElement('span');
    textSpan.className = 'chat-msg-text';
    textSpan.textContent = text;

    msgDiv.appendChild(senderSpan);
    msgDiv.appendChild(textSpan);
    container.appendChild(msgDiv);

    // Scroll para baixo
    container.scrollTop = container.scrollHeight;
  }

  updateChatBadge() {
    const badge = document.getElementById('chat-badge');
    if (!badge) return;

    if (this.unreadCount > 0) {
      badge.textContent = this.unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
      badge.textContent = "0";
    }
  }

  resetQuiz() {
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;
    document.getElementById('player1-name').value = "";

    // Libera botão do guest
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';
  }

  resetQuizMultiplayer() {
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    // Libera botão do guest
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';

    if (this.gameMode === 'duoBattle') this.initBattle();

    this.switchScreen('quiz');
    this.startNewQuestion();
  }

  // ==========================================
  // PHOTOBOOTH 📸🐱 — cabine de fotos do casal
  // ==========================================

  updatePbPickerVisibility() {
    const picker = document.getElementById('pb-options-picker');
    if (!picker) return;
    picker.classList.toggle('hidden', this.gameMode !== 'photobooth');
  }

  renderPbFilterPicker() {
    const container = document.getElementById('pb-filter-options');
    if (!container) return;
    const ui = this.config[this.currentLang].ui;
    const filters = [
      { id: 'none', emoji: '✨', label: ui.pbFilterNone },
      { id: 'vintage', emoji: '🎞️', label: ui.pbFilterVintage },
      { id: 'pink', emoji: '🌸', label: ui.pbFilterPink },
      { id: 'bw', emoji: '🎬', label: ui.pbFilterBw }
    ];
    container.innerHTML = "";
    filters.forEach(f => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'category-chip' + (f.id === this.pbFilter ? ' active' : '');
      chip.innerHTML = `<span class="category-emoji">${f.emoji}</span><span class="category-label">${f.label}</span>`;
      chip.addEventListener('click', () => {
        this.synth.playClickSound();
        this.pbFilter = f.id;
        [...container.children].forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
      container.appendChild(chip);
    });
  }

  // As molduras da tirinha — cada uma redesenha o resultado com outro clima
  getPbFrameSpec() {
    const specs = {
      classic: {
        bg: ['#fdf2f8', '#fce7f3', '#fbcfe8'],
        inkDark: '#9d174d', inkMid: '#be185d',
        cardColor: '#ffffff', cardShadow: 'rgba(157, 23, 77, 0.3)',
        photoStroke: 'rgba(236, 72, 153, 0.35)', promptColor: '#be185d',
        heart: '💖', rotAmp: 0.055,
        confetti: 'pink', confettiColors: ['#ec4899', '#f472b6'],
        corners: 'paws', cornerColor: '#f9a8d4',
        ears: false, film: false, footer: 'cats'
      },
      kitties: {
        bg: ['#fffbeb', '#fef3c7', '#fde68a'],
        inkDark: '#9a3412', inkMid: '#c2410c',
        cardColor: '#ffffff', cardShadow: 'rgba(154, 52, 27, 0.28)',
        photoStroke: 'rgba(249, 115, 22, 0.4)', promptColor: '#c2410c',
        heart: '🧡', rotAmp: 0.055,
        confetti: 'cats', confettiColors: ['#fb923c', '#f472b6'],
        corners: 'cats', cornerColor: '#fb923c',
        ears: true, film: false, footer: 'yarn'
      },
      night: {
        bg: ['#1e1b4b', '#312e81', '#4c1d95'],
        inkDark: '#fbcfe8', inkMid: '#e9d5ff',
        cardColor: '#ffffff', cardShadow: 'rgba(0, 0, 0, 0.55)',
        photoStroke: 'rgba(139, 92, 246, 0.4)', promptColor: '#7e22ce',
        heart: '💜', rotAmp: 0.03,
        confetti: 'stars', confettiColors: ['#fbbf24', '#e9d5ff'],
        corners: 'stars', cornerColor: '#fbbf24',
        ears: false, film: false, footer: 'moon'
      },
      film: {
        bg: ['#18181b', '#27272a', '#18181b'],
        inkDark: '#fafafa', inkMid: '#d4d4d8',
        cardColor: '#0f0f10', cardShadow: 'rgba(0, 0, 0, 0.8)',
        photoStroke: 'rgba(250, 250, 250, 0.75)', promptColor: '#f4f4f5',
        heart: '🤍', rotAmp: 0,
        confetti: 'dust', confettiColors: ['#fafafa', '#a1a1aa'],
        corners: 'none', cornerColor: '#fafafa',
        ears: false, film: true, footer: 'film'
      }
    };
    return specs[this.pbFrame] || specs.classic;
  }

  renderPbFramePicker() {
    const container = document.getElementById('pb-frame-options');
    if (!container) return;
    const ui = this.config[this.currentLang].ui;
    const frames = [
      { id: 'classic', emoji: '🌸', label: ui.pbFrameClassic },
      { id: 'kitties', emoji: '🐱', label: ui.pbFrameKitties },
      { id: 'night', emoji: '🌙', label: ui.pbFrameNight },
      { id: 'film', emoji: '🎞️', label: ui.pbFrameFilm }
    ];
    container.innerHTML = "";
    frames.forEach(f => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'category-chip' + (f.id === this.pbFrame ? ' active' : '');
      chip.innerHTML = `<span class="category-emoji">${f.emoji}</span><span class="category-label">${f.label}</span>`;
      chip.addEventListener('click', () => {
        if (this.pbBuildingStrip || this.pbFrame === f.id) return;
        this.synth.playClickSound();
        this.pbFrame = f.id;
        [...container.children].forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.rebuildPbStrip();
      });
      container.appendChild(chip);
    });
  }

  // Troca a moldura ao vivo: redesenha a tirinha com as mesmas fotos
  async rebuildPbStrip() {
    if (this.pbPhase !== 'reveal') return;
    const img = document.getElementById('pb-strip-img');
    img.classList.add('pb-swapping');
    try {
      await this.buildPbStrip();
      img.src = this.pbStripCanvas.toDataURL('image/jpeg', 0.92);
    } catch (e) {
      console.error("Erro ao trocar a moldura:", e);
    } finally {
      img.classList.remove('pb-swapping');
    }
  }

  showPbFramePicker() {
    const picker = document.getElementById('pb-frame-picker');
    if (!picker) return;
    this.renderPbFramePicker();
    picker.classList.remove('hidden');
  }

  // Sorteia poses únicas (índices válidos nos dois idiomas)
  pickPbPromptIndices(count) {
    const pool = this.config[this.currentLang].pbPrompts;
    const n = Math.min(count, pool.length);
    const indices = [];
    while (indices.length < n) {
      const idx = Math.floor(Math.random() * pool.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices;
  }

  getPbPrompt(poolIdx) {
    const pool = this.config[this.currentLang].pbPrompts;
    return pool[poolIdx] || "";
  }

  showPbStep(stepName) {
    Object.values(this.pbSteps).forEach(step => step.classList.remove('active'));
    this.pbSteps[stepName].classList.add('active');
  }

  // Traduz todos os textos do photobooth (chamado pelo updateLanguage)
  updatePhotoboothTexts() {
    const ui = this.config[this.currentLang].ui;
    const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    // Seletores na tela inicial
    setText('lbl-mode-photobooth', ui.modePhotobooth);
    setText('lbl-pb-submode-title', ui.pbSubModeTitle);
    setText('lbl-pb-mode-together', ui.pbModeTogether);
    setText('lbl-pb-mode-together-desc', ui.pbModeTogetherDesc);
    setText('lbl-pb-mode-blind', ui.pbModeBlind);
    setText('lbl-pb-mode-blind-desc', ui.pbModeBlindDesc);
    setText('lbl-pb-filter-title', ui.pbFilterTitle);
    this.renderPbFilterPicker();

    // Etapa: checagem da câmera
    setText('lbl-pb-setup-title', ui.pbSetupTitle);
    setText('lbl-pb-setup-desc', ui.pbSetupDesc);
    setText('pb-btn-ready', ui.pbBtnReady);
    setText('pb-waiting-ready', ui.pbWaitingPartner);
    setText('lbl-pb-cam-error', ui.pbCamError);
    setText('pb-btn-retry-cam', ui.pbBtnRetryCam);
    setText('lbl-pb-you-setup', ui.pbYouLabel);

    // Etapa: sessão de fotos
    setText('lbl-pb-you', ui.pbYouLabel);
    const partnerName = this.isHost ? this.p2Name : this.p1Name;
    setText('lbl-pb-partner', partnerName ? `${partnerName} 💕` : ui.pbPartnerLabel);
    setText('lbl-pb-partner-hidden', ui.pbPartnerHidden);
    setText('lbl-pb-video-connecting', ui.pbVideoConnecting);
    if (this.pbPhase === 'shoot') {
      setText('pb-shot-progress', ui.pbShotProgress.replace('{num}', this.pbShotIdx + 1).replace('{total}', this.PB_TOTAL_SHOTS));
      const promptEl = document.getElementById('pb-prompt-text');
      if (promptEl) promptEl.textContent = this.getPbPrompt(this.pbPromptIndices[this.pbShotIdx]);
    }

    // Etapa: recadinho
    setText('lbl-pb-caption-title', ui.pbCaptionTitle);
    setText('lbl-pb-caption-desc', ui.pbCaptionDesc);
    const capInput = document.getElementById('pb-caption-input');
    if (capInput) capInput.placeholder = ui.pbCaptionPlaceholder;
    setText('pb-btn-caption-done', ui.pbBtnCaptionDone);
    setText('pb-btn-caption-skip', ui.pbBtnCaptionSkip);
    setText('pb-waiting-caption', ui.pbWaitingCaption);
    setText('lbl-pb-caption-or-pick', ui.pbCaptionOrPick);
    if (this.pbPhase === 'caption' && this.pbMyCaption === null) {
      this.renderPbCaptionSuggestions(); // re-sorteia no idioma novo
    }

    // Etapa: revelação
    const isBlind = this.pbSubMode === 'blind';
    setText('lbl-pb-reveal-title', isBlind ? ui.pbRevealTitleBlind : ui.pbRevealTitle);
    if (this.pbPhase === 'reveal' && this.pbStripCanvas) {
      setText('lbl-pb-reveal-desc', isBlind ? ui.pbRevealDescBlind : ui.pbRevealDesc);
      this.rebuildPbStrip(); // re-desenha poses/textos da tirinha no novo idioma
    }
    setText('lbl-pb-frame-title', ui.pbFrameTitle);
    this.renderPbFramePicker();
    setText('pb-btn-download', ui.pbBtnDownload);
    setText('pb-btn-again', ui.pbBtnAgain);
    setText('pb-btn-lobby', ui.pbBtnLobby);
    setText('pb-guest-wait-note', ui.pbGuestWaitHost);
  }

  // ---------- Ciclo de vida ----------

  startPhotobooth() {
    this.pbPhase = 'setup';
    this.pbMyReady = false;
    this.pbPartnerReady = false;
    this.resetPbShotState();
    this.switchScreen('photobooth');
    this.showPbStep('setup');
    document.getElementById('pb-btn-ready').classList.remove('hidden');
    document.getElementById('pb-waiting-ready').classList.add('hidden');
    this.updatePhotoboothTexts();
    this.applyPbLiveFilterClasses();
    this.initPbCamera();
  }

  resetPbShotState() {
    this.clearPbTimers();
    this.pbShotIdx = 0;
    this.pbMyShots = new Array(this.PB_TOTAL_SHOTS).fill(null);
    this.pbTheirShots = new Array(this.PB_TOTAL_SHOTS).fill(null);
    this.pbMyCaption = null;
    this.pbTheirCaption = null;
    this.pbRevealRetries = 0;
    this.pbStripCanvas = null;
    this.pbBuildingStrip = false;
    this.pbImgCache = null;
    const input = document.getElementById('pb-caption-input');
    if (input) input.value = "";
    document.getElementById('pb-caption-form').classList.remove('hidden');
    document.getElementById('pb-waiting-caption').classList.add('hidden');
    document.getElementById('pb-strip-img').removeAttribute('src');
    document.getElementById('pb-strip-covers').innerHTML = "";
    document.getElementById('pb-frame-picker').classList.add('hidden');
  }

  // Nova rodada (mantém câmera e chamada de vídeo vivas)
  resetPbRound() {
    this.pbPhase = 'between';
    this.resetPbShotState();
  }

  async initPbCamera() {
    const errBox = document.getElementById('pb-cam-error');
    const readyBtn = document.getElementById('pb-btn-ready');
    errBox.classList.add('hidden');
    readyBtn.disabled = true;
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('mediaDevices indisponível (precisa de HTTPS)');
      }
      if (!this.pbLocalStream || !this.pbLocalStream.active) {
        this.pbLocalStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false
        });
      }
      document.getElementById('pb-video-setup').srcObject = this.pbLocalStream;
      document.getElementById('pb-video-self').srcObject = this.pbLocalStream;
      readyBtn.disabled = false;

      // Se o host ligou antes da câmera liberar, atende agora
      if (this.pbPendingCall) {
        const call = this.pbPendingCall;
        this.pbPendingCall = null;
        try {
          call.answer(this.pbLocalStream);
          this.attachPbMediaCall(call);
        } catch (e) { console.error("Falha ao atender vídeo:", e); }
      }
    } catch (e) {
      console.error("Erro de câmera:", e);
      errBox.classList.remove('hidden');
    }
  }

  onPbReadyClick() {
    if (!this.pbLocalStream || this.pbMyReady || this.pbPhase !== 'setup') return;
    this.pbMyReady = true;
    document.getElementById('pb-btn-ready').classList.add('hidden');
    document.getElementById('pb-waiting-ready').classList.remove('hidden');
    if (this.conn && this.conn.open) this.conn.send({ type: 'PB_READY' });
    this.checkPbBothReady();
  }

  checkPbBothReady() {
    if (!this.pbMyReady || !this.pbPartnerReady) return;
    if (this.pbPhase !== 'setup') return;
    if (this.isHost) {
      if (this.conn && this.conn.open) this.conn.send({ type: 'PB_BEGIN' });
      this.enterPbShootPhase();
    }
    // O guest aguarda o PB_BEGIN do host
  }

  enterPbShootPhase() {
    if (this.pbPhase === 'shoot') return;
    this.pbPhase = 'shoot';
    this.showPbStep('shoot');

    const selfVideo = document.getElementById('pb-video-self');
    if (this.pbLocalStream && selfVideo.srcObject !== this.pbLocalStream) {
      selfVideo.srcObject = this.pbLocalStream;
    }
    this.applyPbLiveFilterClasses();
    this.renderPbThumbs();
    this.updatePbStageLayout();
    this.updatePhotoboothTexts();

    if (this.pbSubMode === 'together') this.ensurePbMediaCall();

    // Host dá o pontapé inicial na primeira foto
    if (this.isHost) {
      this.pbShotTimers.push(setTimeout(() => {
        if (this.pbPhase !== 'shoot') return;
        if (this.conn && this.conn.open) this.conn.send({ type: 'PB_SHOT', shotIdx: 0 });
        this.runPbShot(0);
      }, 1500));
    }
  }

  // Ajusta o palco: "Juntinhos" mostra o vídeo do amor, "Surpresa" esconde
  updatePbStageLayout() {
    const remoteVideo = document.getElementById('pb-video-remote');
    const waiting = document.getElementById('pb-video-waiting');
    const hiddenCover = document.getElementById('pb-partner-hidden');
    if (this.pbSubMode === 'blind') {
      remoteVideo.classList.add('hidden');
      waiting.classList.add('hidden');
      hiddenCover.classList.remove('hidden');
    } else {
      remoteVideo.classList.remove('hidden');
      hiddenCover.classList.add('hidden');
      const hasStream = !!remoteVideo.srcObject;
      waiting.classList.toggle('hidden', hasStream);
    }
  }

  // ---------- Chamada de vídeo (modo Juntinhos) ----------

  ensurePbMediaCall() {
    if (this.gameMode !== 'photobooth' || this.pbSubMode !== 'together') return;
    if (!this.isHost) return; // o host disca, o guest atende
    if (!this.pbLocalStream || !this.peer || this.peer.destroyed) return;
    if (this.pbMediaCall && this.pbMediaCall.open) return;
    if (!this.conn || !this.conn.open) return;
    try {
      const call = this.peer.call(this.conn.peer, this.pbLocalStream);
      this.attachPbMediaCall(call);
    } catch (e) {
      console.error("Falha ao ligar o vídeo:", e);
    }
  }

  handleIncomingMediaCall(call) {
    // Só atende chamadas durante o photobooth "Juntinhos"
    if (this.gameMode !== 'photobooth' || this.pbSubMode !== 'together') {
      try { call.close(); } catch (e) {}
      return;
    }
    if (this.pbLocalStream) {
      try {
        call.answer(this.pbLocalStream);
        this.attachPbMediaCall(call);
      } catch (e) { console.error("Falha ao atender vídeo:", e); }
    } else {
      // Câmera ainda não liberou: guarda pra atender depois
      this.pbPendingCall = call;
    }
  }

  attachPbMediaCall(call) {
    if (this.pbMediaCall && this.pbMediaCall !== call) {
      try { this.pbMediaCall.close(); } catch (e) {}
    }
    this.pbMediaCall = call;

    call.on('stream', (remoteStream) => {
      const v = document.getElementById('pb-video-remote');
      v.srcObject = remoteStream;
      if (v.play) v.play().catch(() => {});
      if (this.pbSubMode === 'together') {
        document.getElementById('pb-video-waiting').classList.add('hidden');
      }
    });

    call.on('close', () => {
      if (this.pbMediaCall !== call) return;
      if (this.gameMode === 'photobooth' && this.pbSubMode === 'together' && this.pbPhase !== 'idle') {
        document.getElementById('pb-video-waiting').classList.remove('hidden');
        if (this.isHost) setTimeout(() => this.ensurePbMediaCall(), 1500);
      }
    });

    call.on('error', (err) => {
      console.error("Erro na chamada de vídeo:", err);
    });
  }

  // ---------- Sequência de fotos ----------

  runPbShot(shotIdx) {
    if (this.pbPhase !== 'shoot') return;
    if (shotIdx < 0 || shotIdx >= this.PB_TOTAL_SHOTS) return;
    this.pbShotIdx = shotIdx;
    const ui = this.config[this.currentLang].ui;

    document.getElementById('pb-shot-progress').textContent =
      ui.pbShotProgress.replace('{num}', shotIdx + 1).replace('{total}', this.PB_TOTAL_SHOTS);
    document.getElementById('pb-prompt-text').textContent = this.getPbPrompt(this.pbPromptIndices[shotIdx]);

    this.clearPbShotTimers();
    const seq = [
      { t: 1800, run: () => this.showPbCount('3', false) },
      { t: 2600, run: () => this.showPbCount('2', false) },
      { t: 3400, run: () => this.showPbCount('1', false) },
      { t: 4200, run: () => {
          this.showPbCount(ui.pbSmile, true);
          this.firePbFlash();
          this.capturePbPhoto(shotIdx);
        } }
    ];
    seq.forEach(s => this.pbShotTimers.push(setTimeout(s.run, s.t)));
  }

  showPbCount(text, isGo) {
    const el = document.getElementById('pb-countdown');
    el.textContent = text;
    el.style.fontSize = isGo ? '2.4rem' : '';
    el.classList.remove('hidden');
    el.classList.remove('pop');
    void el.offsetWidth; // reinicia a animação
    el.classList.add('pop');
    if (isGo) this.synth.playCountdownGo();
    else this.synth.playCountdownTick();
  }

  firePbFlash() {
    const flash = document.getElementById('pb-flash');
    flash.classList.remove('on');
    void flash.offsetWidth;
    flash.classList.add('on');
  }

  capturePbPhoto(shotIdx) {
    this.synth.playShutterSound();
    let dataUrl = null;
    try {
      const video = document.getElementById('pb-video-self');
      const vw = video.videoWidth, vh = video.videoHeight;
      if (vw > 0 && vh > 0) {
        // Recorte quadrado central, espelhado (igual ao preview)
        const side = Math.min(vw, vh);
        const sx = (vw - side) / 2, sy = (vh - side) / 2;
        const out = Math.min(side, 800);
        const c = document.createElement('canvas');
        c.width = out; c.height = out;
        const ctx = c.getContext('2d');
        ctx.translate(out, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, sx, sy, side, side, 0, 0, out, out);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.applyPbPixelFilter(ctx, out, out);
        dataUrl = c.toDataURL('image/jpeg', 0.85);
      }
    } catch (e) {
      console.error("Falha na captura:", e);
    }

    this.pbMyShots[shotIdx] = dataUrl;
    this.updatePbThumb(shotIdx);
    if (this.conn && this.conn.open) {
      this.conn.send({ type: 'PB_PHOTO', shotIdx: shotIdx, img: dataUrl });
    }

    const isLast = shotIdx === this.PB_TOTAL_SHOTS - 1;
    if (isLast) {
      this.pbShotTimers.push(setTimeout(() => this.enterPbCaptionPhase(), 1700));
    } else if (this.isHost) {
      // Aguarda a foto do parceiro chegar (com timeout de segurança)
      this.clearPbShotTimeout();
      this.pbShotTimeoutTimer = setTimeout(() => this.advancePbShot(), 12000);
      this.maybeAdvancePbShot();
    }
  }

  // Filtro aplicado pixel a pixel (mesmo resultado em qualquer navegador)
  applyPbPixelFilter(ctx, w, h) {
    if (this.pbFilter === 'none') return;
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i], g = d[i + 1], b = d[i + 2];
      if (this.pbFilter === 'bw') {
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        const c = (l - 128) * 1.1 + 134;
        r = c; g = c; b = c;
      } else if (this.pbFilter === 'vintage') {
        const sr = 0.393 * r + 0.769 * g + 0.189 * b;
        const sg = 0.349 * r + 0.686 * g + 0.168 * b;
        const sb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = r * 0.38 + sr * 0.62 + 6;
        g = g * 0.38 + sg * 0.62 + 2;
        b = b * 0.38 + sb * 0.62 - 6;
      } else if (this.pbFilter === 'pink') {
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        r = (r * 0.72 + l * 0.28) * 1.08 + 20;
        g = (g * 0.72 + l * 0.28) * 0.97 + 6;
        b = (b * 0.72 + l * 0.28) + 14;
      }
      d[i] = r < 0 ? 0 : r > 255 ? 255 : r;
      d[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      d[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  applyPbLiveFilterClasses() {
    const cls = { vintage: 'pbf-vintage', pink: 'pbf-pink', bw: 'pbf-bw' }[this.pbFilter];
    ['pb-video-setup', 'pb-video-self', 'pb-video-remote'].forEach(id => {
      const v = document.getElementById(id);
      if (!v) return;
      v.classList.remove('pbf-vintage', 'pbf-pink', 'pbf-bw');
      if (cls) v.classList.add(cls);
    });
  }

  renderPbThumbs() {
    const wrap = document.getElementById('pb-thumbs');
    wrap.innerHTML = "";
    for (let i = 0; i < this.PB_TOTAL_SHOTS; i++) {
      const d = document.createElement('div');
      d.className = 'pb-thumb';
      d.id = `pb-thumb-${i}`;
      d.textContent = '🐾';
      wrap.appendChild(d);
    }
  }

  updatePbThumb(i) {
    const d = document.getElementById(`pb-thumb-${i}`);
    if (!d) return;
    const mine = this.pbMyShots[i];
    if (mine && !d.querySelector('img')) {
      d.textContent = "";
      const img = document.createElement('img');
      img.src = mine;
      d.appendChild(img);
      d.classList.add('filled');
    }
    let badge = d.querySelector('.pb-thumb-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'pb-thumb-badge';
      d.appendChild(badge);
    }
    if (this.pbSubMode === 'blind') {
      badge.textContent = this.pbTheirShots[i] ? '🙈' : '';
    } else {
      badge.textContent = this.pbTheirShots[i] ? '💖' : (mine ? '⏳' : '');
    }
  }

  // Host: avança quando as duas fotos da rodada chegaram
  maybeAdvancePbShot() {
    if (!this.isHost || this.pbPhase !== 'shoot') return;
    const i = this.pbShotIdx;
    if (i >= this.PB_TOTAL_SHOTS - 1) return;
    if (!this.pbMyShots[i] || !this.pbTheirShots[i]) return;
    if (this.pbAdvanceTimer) return;
    this.clearPbShotTimeout();
    this.pbAdvanceTimer = setTimeout(() => {
      this.pbAdvanceTimer = null;
      this.advancePbShot();
    }, 1300);
  }

  advancePbShot() {
    if (!this.isHost || this.pbPhase !== 'shoot') return;
    this.clearPbShotTimeout();
    if (this.pbAdvanceTimer) { clearTimeout(this.pbAdvanceTimer); this.pbAdvanceTimer = null; }
    const next = this.pbShotIdx + 1;
    if (next >= this.PB_TOTAL_SHOTS) return;
    if (this.conn && this.conn.open) this.conn.send({ type: 'PB_SHOT', shotIdx: next });
    this.runPbShot(next);
  }

  // ---------- Recadinho ----------

  enterPbCaptionPhase() {
    if (this.pbPhase !== 'shoot') return;
    this.pbPhase = 'caption';
    this.showPbStep('caption');
    // Sem foco automático: no celular o teclado cobriria as sugestões prontas
    this.renderPbCaptionSuggestions();
  }

  // Sorteia 4 recadinhos prontos + botão de embaralhar
  renderPbCaptionSuggestions() {
    const container = document.getElementById('pb-caption-suggestions');
    if (!container) return;
    const ui = this.config[this.currentLang].ui;
    const pool = this.config[this.currentLang].pbCaptionSuggestions || [];
    const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, 4);

    container.innerHTML = "";
    picks.forEach(text => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'pb-caption-chip';
      chip.textContent = text;
      chip.addEventListener('click', () => {
        this.synth.playClickSound();
        const input = document.getElementById('pb-caption-input');
        if (input) input.value = text.slice(0, 50);
      });
      container.appendChild(chip);
    });

    const shuffle = document.createElement('button');
    shuffle.type = 'button';
    shuffle.className = 'pb-caption-chip pb-caption-shuffle';
    shuffle.textContent = ui.pbCaptionShuffle;
    shuffle.addEventListener('click', () => {
      this.synth.playClickSound();
      this.renderPbCaptionSuggestions();
    });
    container.appendChild(shuffle);
  }

  submitPbCaption(text) {
    if (this.pbPhase !== 'caption' || this.pbMyCaption !== null) return;
    this.pbMyCaption = (text || "").slice(0, 50);
    if (this.conn && this.conn.open) {
      this.conn.send({ type: 'PB_CAPTION', text: this.pbMyCaption });
    }
    document.getElementById('pb-caption-form').classList.add('hidden');
    document.getElementById('pb-waiting-caption').classList.remove('hidden');
    this.maybePbReveal();
  }

  maybePbReveal() {
    if (this.pbPhase !== 'caption') return;
    if (this.pbMyCaption === null || this.pbTheirCaption === null) return;
    // Alguma foto do amor ainda em trânsito? Espera um tiquinho.
    const missing = this.pbTheirShots.some(s => !s);
    if (missing && this.pbRevealRetries < 5) {
      this.pbRevealRetries++;
      setTimeout(() => this.maybePbReveal(), 1400);
      return;
    }
    this.enterPbRevealPhase();
  }

  // ---------- Revelação da tirinha ----------

  async enterPbRevealPhase() {
    if (this.pbPhase === 'reveal') return;
    this.pbPhase = 'reveal';
    const ui = this.config[this.currentLang].ui;
    const isBlind = this.pbSubMode === 'blind';

    this.showPbStep('reveal');
    document.getElementById('lbl-pb-reveal-title').textContent = isBlind ? ui.pbRevealTitleBlind : ui.pbRevealTitle;
    document.getElementById('lbl-pb-reveal-desc').textContent = ui.pbLoadingStrip;
    document.getElementById('pb-btn-again').classList.toggle('hidden', !this.isHost);
    document.getElementById('pb-guest-wait-note').classList.toggle('hidden', this.isHost);

    try {
      await this.buildPbStrip();
      document.getElementById('pb-strip-img').src = this.pbStripCanvas.toDataURL('image/jpeg', 0.92);
      document.getElementById('lbl-pb-reveal-desc').textContent = isBlind ? ui.pbRevealDescBlind : ui.pbRevealDesc;

      if (isBlind) {
        this.setupPbStripCovers();
        setTimeout(() => this.playPbRevealAnimation(), 700);
      } else {
        document.getElementById('pb-strip-covers').innerHTML = "";
        this.showPbFramePicker();
        this.synth.playFanfareSound();
        this.canvas.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
      }
    } catch (e) {
      console.error("Erro ao montar a tirinha:", e);
      document.getElementById('lbl-pb-reveal-desc').textContent = "😿 " + (e && e.message ? e.message : "erro");
    }
  }

  // RNG com semente (mulberry32) — a tirinha sai IGUAL nos dois lados
  pbRandom(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  loadPbImage(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  drawPbHeartShape(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    ctx.quadraticCurveTo(x + size, y + size * 2 / 3, x + size / 2, y + size);
    ctx.quadraticCurveTo(x, y + size * 2 / 3, x, y + size / 3);
    ctx.closePath();
    ctx.fill();
  }

  drawPbPaw(ctx, cx, cy, size, rot = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, size * 0.1, size * 0.4, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    const toe = size * 0.15;
    [[-size * 0.35, -size * 0.1, -Math.PI / 6],
     [-size * 0.12, -size * 0.3, -Math.PI / 12],
     [size * 0.12, -size * 0.3, Math.PI / 12],
     [size * 0.35, -size * 0.1, Math.PI / 6]].forEach(([tx, ty, tr]) => {
      ctx.beginPath();
      ctx.ellipse(tx, ty, toe, toe * 1.3, tr, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  drawPbCatFace(ctx, cx, cy, size) {
    // Orelhas
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.42, cy - size * 0.1);
    ctx.lineTo(cx - size * 0.55, cy - size * 0.55);
    ctx.lineTo(cx - size * 0.12, cy - size * 0.38);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.42, cy - size * 0.1);
    ctx.lineTo(cx + size * 0.55, cy - size * 0.55);
    ctx.lineTo(cx + size * 0.12, cy - size * 0.38);
    ctx.closePath();
    ctx.fill();
    // Rosto
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
    // Olhinhos fechados felizes
    ctx.strokeStyle = '#831843';
    ctx.lineWidth = Math.max(2, size * 0.06);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.26, cy - size * 0.02);
    ctx.quadraticCurveTo(cx - size * 0.16, cy + size * 0.1, cx - size * 0.06, cy - size * 0.02);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.06, cy - size * 0.02);
    ctx.quadraticCurveTo(cx + size * 0.16, cy + size * 0.1, cx + size * 0.26, cy - size * 0.02);
    ctx.stroke();
    // Nariz
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.16);
    ctx.lineTo(cx - size * 0.07, cy + size * 0.06);
    ctx.lineTo(cx + size * 0.07, cy + size * 0.06);
    ctx.closePath();
    ctx.fill();
  }

  // Estrelinha de 4 pontas (moldura Noturna)
  drawPbStar(ctx, cx, cy, size) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.quadraticCurveTo(cx + size * 0.18, cy - size * 0.18, cx + size, cy);
    ctx.quadraticCurveTo(cx + size * 0.18, cy + size * 0.18, cx, cy + size);
    ctx.quadraticCurveTo(cx - size * 0.18, cy + size * 0.18, cx - size, cy);
    ctx.quadraticCurveTo(cx - size * 0.18, cy - size * 0.18, cx, cy - size);
    ctx.closePath();
    ctx.fill();
  }

  // Lua crescente (moldura Noturna)
  drawPbMoon(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI * 0.15, Math.PI * 1.85, false);
    ctx.arc(cx + r * 0.75, cy, r * 0.72, Math.PI * 1.7, Math.PI * 0.3, true);
    ctx.closePath();
    ctx.fill();
  }

  // Novelo de lã (moldura Gatinhos)
  drawPbYarn(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = Math.max(1.5, r * 0.16);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.6, 0.35, Math.PI + 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.62, Math.PI * 1.3, Math.PI * 2.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + r, cy);
    ctx.quadraticCurveTo(cx + r * 1.9, cy + r * 0.45, cx + r * 2.4, cy - r * 0.25);
    ctx.stroke();
  }

  drawPbPhoto(ctx, img, x, y, size, strokeColor) {
    ctx.save();
    this.roundRectPath(ctx, x, y, size, size, 14);
    ctx.clip();
    if (img) {
      ctx.drawImage(img, x, y, size, size);
    } else {
      ctx.fillStyle = '#fce7f3';
      ctx.fillRect(x, y, size, size);
      ctx.font = '110px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🙈', x + size / 2, y + size / 2 + 40);
    }
    ctx.restore();
    ctx.strokeStyle = strokeColor || 'rgba(236, 72, 153, 0.35)';
    ctx.lineWidth = 3;
    this.roundRectPath(ctx, x, y, size, size, 14);
    ctx.stroke();
  }

  getPbDateStr() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  async buildPbStrip() {
    if (this.pbBuildingStrip) return;
    this.pbBuildingStrip = true;
    try {
      const W = 1000, headerH = 190, rowH = 560, footerH = 300;
      const N = this.PB_TOTAL_SHOTS;
      const H = headerH + N * rowH + footerH;
      this.pbStripGeom = { W, H, headerH, rowH };

      const rng = this.pbRandom(this.pbSeed);
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // Garante as fontes fofas no canvas
      try {
        await Promise.race([
          Promise.all([
            document.fonts.load('700 74px "Dancing Script"'),
            document.fonts.load('700 46px "Dancing Script"'),
            document.fonts.load('800 26px "Outfit"'),
            document.fonts.load('italic 600 27px "Outfit"')
          ]),
          new Promise(r => setTimeout(r, 1600))
        ]);
      } catch (e) { /* segue com a fonte padrão */ }

      const F = this.getPbFrameSpec();

      // Fundo degradê da moldura
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, F.bg[0]);
      bg.addColorStop(0.5, F.bg[1]);
      bg.addColorStop(1, F.bg[2]);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Moldura "Filme": faixa escura com furinhos de rolo nas laterais
      if (F.film) {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(18, 0, W - 36, H);
        ctx.fillStyle = F.bg[0];
        for (let y = 40; y < H - 30; y += 70) {
          this.roundRectPath(ctx, 27, y, 26, 20, 5);
          ctx.fill();
          this.roundRectPath(ctx, W - 53, y, 26, 20, 5);
          ctx.fill();
        }
      }

      // Confete de fundo (semeado = igual nos dois lados)
      for (let i = 0; i < 60; i++) {
        const x = rng() * W, y = rng() * H, s = 14 + rng() * 22;
        ctx.globalAlpha = 0.07 + rng() * 0.09;
        ctx.fillStyle = rng() < 0.5 ? F.confettiColors[0] : F.confettiColors[1];
        const kind = rng();
        if (F.confetti === 'stars') {
          if (kind < 0.55) this.drawPbStar(ctx, x, y, s * 0.55);
          else { ctx.beginPath(); ctx.arc(x, y, s * 0.14, 0, Math.PI * 2); ctx.fill(); }
        } else if (F.confetti === 'cats') {
          if (kind < 0.45) this.drawPbCatFace(ctx, x, y, s);
          else this.drawPbPaw(ctx, x, y, s, rng() * Math.PI * 2);
        } else if (F.confetti === 'dust') {
          ctx.beginPath(); ctx.arc(x, y, 1 + s * 0.09, 0, Math.PI * 2); ctx.fill();
        } else {
          if (kind < 0.45) this.drawPbPaw(ctx, x, y, s, rng() * Math.PI * 2);
          else this.drawPbHeartShape(ctx, x, y, s);
        }
      }
      ctx.globalAlpha = 1;

      // Cabeçalho com os nomes
      const p1 = this.p1Name || 'Amor 1';
      const p2 = this.p2Name || 'Amor 2';
      ctx.textAlign = 'center';
      ctx.fillStyle = F.inkDark;
      ctx.font = '700 74px "Dancing Script", cursive';
      ctx.fillText(`${p1} ${F.heart} ${p2}`, W / 2, 106, 940);
      ctx.font = '800 26px "Outfit", sans-serif';
      ctx.fillStyle = F.inkMid;
      ctx.fillText(`· ${this.getPbDateStr()} ·`, W / 2, 154);

      // Fotos: host (P1) sempre à esquerda, guest (P2) à direita.
      // Decodifica uma vez só e guarda — trocar de moldura fica instantâneo.
      if (!this.pbImgCache) {
        const leftShots = this.isHost ? this.pbMyShots : this.pbTheirShots;
        const rightShots = this.isHost ? this.pbTheirShots : this.pbMyShots;
        this.pbImgCache = {
          left: await Promise.all(leftShots.map(s => this.loadPbImage(s))),
          right: await Promise.all(rightShots.map(s => this.loadPbImage(s)))
        };
      }
      const leftImgs = this.pbImgCache.left;
      const rightImgs = this.pbImgCache.right;

      for (let i = 0; i < N; i++) {
        const cy = headerH + i * rowH + rowH / 2;
        const rot = (rng() - 0.5) * F.rotAmp;
        ctx.save();
        ctx.translate(W / 2, cy);
        ctx.rotate(rot);

        // Orelhinhas de gato saindo do topo do cartão (moldura Gatinhos)
        if (F.ears) {
          ctx.fillStyle = '#fb923c';
          ctx.beginPath();
          ctx.moveTo(-360, -244); ctx.lineTo(-310, -300); ctx.lineTo(-260, -244);
          ctx.closePath(); ctx.fill();
          ctx.beginPath();
          ctx.moveTo(260, -244); ctx.lineTo(310, -300); ctx.lineTo(360, -244);
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.moveTo(-340, -248); ctx.lineTo(-310, -284); ctx.lineTo(-280, -248);
          ctx.closePath(); ctx.fill();
          ctx.beginPath();
          ctx.moveTo(280, -248); ctx.lineTo(310, -284); ctx.lineTo(340, -248);
          ctx.closePath(); ctx.fill();
        }

        // Cartão estilo polaroid
        ctx.shadowColor = F.cardShadow;
        ctx.shadowBlur = 26;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = F.cardColor;
        this.roundRectPath(ctx, -440, -250, 880, 500, 20);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // As duas fotos, lado a lado
        this.drawPbPhoto(ctx, leftImgs[i], -415, -225, 400, F.photoStroke);
        this.drawPbPhoto(ctx, rightImgs[i], 15, -225, 400, F.photoStroke);

        // Coraçãozinho entre as fotos
        ctx.font = '42px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(F.heart, 0, -10);

        // A pose da rodada
        ctx.font = 'italic 600 27px "Outfit", sans-serif';
        ctx.fillStyle = F.promptColor;
        ctx.fillText(this.getPbPrompt(this.pbPromptIndices[i]), 0, 232, 820);

        // Enfeites nos cantos do cartão
        if (F.corners === 'paws') {
          ctx.fillStyle = F.cornerColor;
          this.drawPbPaw(ctx, -406, 218, 22, -0.4);
          this.drawPbPaw(ctx, 406, 218, 22, 0.4);
        } else if (F.corners === 'cats') {
          ctx.fillStyle = F.cornerColor;
          this.drawPbCatFace(ctx, -404, 220, 34);
          ctx.fillStyle = F.cornerColor;
          this.drawPbCatFace(ctx, 404, 220, 34);
        } else if (F.corners === 'stars') {
          ctx.fillStyle = F.cornerColor;
          this.drawPbStar(ctx, -406, 218, 16);
          this.drawPbStar(ctx, 406, 218, 16);
        }

        ctx.restore();
      }

      // Rodapé: recadinhos + enfeites da moldura
      let fy = headerH + N * rowH + 48;
      ctx.textAlign = 'center';
      const capLeft = this.isHost ? this.pbMyCaption : this.pbTheirCaption;
      const capRight = this.isHost ? this.pbTheirCaption : this.pbMyCaption;
      const capLines = [];
      if (capLeft) capLines.push({ text: capLeft, name: p1 });
      if (capRight) capLines.push({ text: capRight, name: p2 });
      ctx.fillStyle = F.inkDark;
      ctx.font = '700 46px "Dancing Script", cursive';
      for (const line of capLines) {
        ctx.fillText(`“${line.text}” — ${line.name}`, W / 2, fy, 920);
        fy += 62;
      }

      const catY = H - 96;
      if (F.footer === 'yarn') {
        ctx.fillStyle = '#fb923c';
        this.drawPbCatFace(ctx, 110, catY, 56);
        ctx.fillStyle = '#fb923c';
        this.drawPbCatFace(ctx, W - 110, catY, 56);
        let k = 0;
        for (let px = 220; px <= W - 220; px += 84) {
          if (k % 2 === 0) {
            ctx.fillStyle = '#f472b6';
            this.drawPbPaw(ctx, px, catY + (k % 4 ? -8 : 10), 15, (k % 5) * 0.2);
          } else {
            ctx.fillStyle = '#fb923c';
            this.drawPbYarn(ctx, px, catY + (k % 4 ? 8 : -6), 13);
          }
          k++;
        }
      } else if (F.footer === 'moon') {
        ctx.fillStyle = '#fbbf24';
        this.drawPbMoon(ctx, 110, catY, 36);
        ctx.fillStyle = '#f472b6';
        this.drawPbCatFace(ctx, W - 110, catY, 56);
        ctx.fillStyle = '#fbbf24';
        let k = 0;
        for (let px = 220; px <= W - 220; px += 72) {
          this.drawPbStar(ctx, px, catY + (k % 2 ? -8 : 10), k % 3 ? 9 : 14);
          k++;
        }
      } else if (F.footer === 'film') {
        ctx.fillStyle = '#f472b6';
        this.drawPbCatFace(ctx, 110, catY, 56);
        ctx.fillStyle = '#f472b6';
        this.drawPbCatFace(ctx, W - 110, catY, 56);
        ctx.fillStyle = 'rgba(250, 250, 250, 0.85)';
        for (let px = 220; px <= W - 220; px += 72) {
          this.drawPbPaw(ctx, px, catY + ((px / 72) % 2 ? -8 : 10), 15, ((px / 72) % 5) * 0.2);
        }
      } else {
        ctx.fillStyle = '#ec4899';
        this.drawPbCatFace(ctx, 110, catY, 56);
        ctx.fillStyle = '#ec4899';
        this.drawPbCatFace(ctx, W - 110, catY, 56);
        ctx.fillStyle = '#f472b6';
        for (let px = 220; px <= W - 220; px += 72) {
          this.drawPbPaw(ctx, px, catY + ((px / 72) % 2 ? -8 : 10), 15, ((px / 72) % 5) * 0.2);
        }
      }

      ctx.fillStyle = F.inkMid;
      ctx.font = '800 22px "Outfit", sans-serif';
      const branding = `😺 ${this.config[this.currentLang].ui.pbStripBranding} 😺`;
      ctx.fillText(branding.toUpperCase(), W / 2, H - 24);

      this.pbStripCanvas = canvas;
    } finally {
      this.pbBuildingStrip = false;
    }
  }

  // Cobre cada fileira com um "🙈" que levanta na revelação (modo Surpresa)
  setupPbStripCovers() {
    const covers = document.getElementById('pb-strip-covers');
    covers.innerHTML = "";
    const g = this.pbStripGeom;
    if (!g) return;
    for (let i = 0; i < this.PB_TOTAL_SHOTS; i++) {
      const d = document.createElement('div');
      d.className = 'pb-cover';
      d.style.top = ((g.headerH + i * g.rowH + 14) / g.H * 100) + '%';
      d.style.height = ((g.rowH - 28) / g.H * 100) + '%';
      d.textContent = '🙈';
      covers.appendChild(d);
    }
  }

  playPbRevealAnimation() {
    const wrap = document.getElementById('pb-strip-wrap');
    const covers = [...document.querySelectorAll('#pb-strip-covers .pb-cover')];
    covers.forEach((cover, i) => {
      this.pbRevealTimers.push(setTimeout(() => {
        // Acompanha a revelação rolando a tirinha
        try { wrap.scrollTo({ top: Math.max(0, cover.offsetTop - 60), behavior: 'smooth' }); } catch (e) {}
        cover.classList.add('lifted');
        this.synth.playDevelopSound();
        if (i === covers.length - 1) {
          this.pbRevealTimers.push(setTimeout(() => {
            this.synth.playFanfareSound();
            this.canvas.spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
            this.showPbFramePicker();
            try { wrap.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
          }, 900));
        }
      }, 900 + i * 1000));
    });
  }

  downloadPbStrip() {
    if (!this.pbStripCanvas) return;
    const clean = (s) => (s || 'amor').replace(/[^\p{L}\p{N}]+/gu, '-');
    const fileName = `photobooth-${clean(this.p1Name)}-${clean(this.p2Name)}-${this.getPbDateStr().replace(/\./g, '-')}.jpg`;
    this.pbStripCanvas.toBlob(async (blob) => {
      if (!blob) return;
      // No celular, a folha de compartilhar salva direto na galeria
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          return;
        } catch (e) { /* cancelou → cai no download normal */ }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, 'image/jpeg', 0.92);
  }

  // Host: nova rodada com novas poses (mantém câmera ligada)
  restartPhotobooth() {
    if (!this.isHost) return;
    this.pbPromptIndices = this.pickPbPromptIndices(this.PB_TOTAL_SHOTS);
    this.pbSeed = Math.floor(Math.random() * 1e9) + 1;
    if (this.conn && this.conn.open) {
      this.conn.send({ type: 'PB_RESTART', pbPromptIndices: this.pbPromptIndices, pbSeed: this.pbSeed });
    }
    this.resetPbRound();
    this.enterPbShootPhase();
  }

  // ---------- Limpeza ----------

  clearPbShotTimers() {
    this.pbShotTimers.forEach(t => clearTimeout(t));
    this.pbShotTimers = [];
  }

  clearPbShotTimeout() {
    if (this.pbShotTimeoutTimer) {
      clearTimeout(this.pbShotTimeoutTimer);
      this.pbShotTimeoutTimer = null;
    }
  }

  clearPbTimers() {
    this.clearPbShotTimers();
    this.clearPbShotTimeout();
    if (this.pbAdvanceTimer) { clearTimeout(this.pbAdvanceTimer); this.pbAdvanceTimer = null; }
    this.pbRevealTimers.forEach(t => clearTimeout(t));
    this.pbRevealTimers = [];
  }

  stopPhotoboothMedia() {
    this.clearPbTimers();
    if (this.pbMediaCall) {
      try { this.pbMediaCall.close(); } catch (e) {}
      this.pbMediaCall = null;
    }
    if (this.pbPendingCall) {
      try { this.pbPendingCall.close(); } catch (e) {}
      this.pbPendingCall = null;
    }
    if (this.pbLocalStream) {
      this.pbLocalStream.getTracks().forEach(t => { try { t.stop(); } catch (e) {} });
      this.pbLocalStream = null;
    }
    ['pb-video-setup', 'pb-video-self', 'pb-video-remote'].forEach(id => {
      const v = document.getElementById(id);
      if (v) v.srcObject = null;
    });
    this.pbMyReady = false;
    this.pbPartnerReady = false;
  }

  // Volta ambos os jogadores ao lobby conectado (sem derrubar a conexão),
  // permitindo escolher outra categoria e jogar novamente.
  returnToLobby() {
    const langConfig = this.config[this.currentLang];

    // Encerra qualquer sessão de photobooth (câmera, chamada, timers)
    this.stopPhotoboothMedia();
    this.pbPhase = 'idle';

    // Reseta estado de jogo
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;
    this.blindFinalRanking = new Array(10).fill(null);
    this.blindAvailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';

    this.showBlindLiveRanking(false);
    this.switchScreen('welcome');

    // Reexibe o painel multiplayer no estado "conectado"
    document.getElementById('play-mode-selection').classList.add('hidden');
    document.getElementById('multiplayer-panel').classList.remove('hidden');
    document.getElementById('mp-lobby-actions').classList.add('hidden');

    if (this.isHost) {
      document.getElementById('mp-guest-block').classList.add('hidden');
      document.getElementById('mp-host-block').classList.remove('hidden');
      document.getElementById('lbl-mp-waiting-partner').classList.add('hidden');
      document.getElementById('mp-host-start-container').classList.remove('hidden');
    } else {
      document.getElementById('mp-host-block').classList.add('hidden');
      const guestBlock = document.getElementById('mp-guest-block');
      guestBlock.classList.remove('hidden');
      guestBlock.innerHTML = `
        <div class="mp-status-card">
          <p class="mp-success-text">${langConfig.ui.lblMpConnected}</p>
          <p class="mp-waiting-text">${langConfig.ui.lblMpWaitingHost}</p>
        </div>
      `;
    }

    // Os seletores refletem o modo atual (Blind Ranking / Photobooth)
    this.updateCategoryPickerVisibility();
    this.renderCategoryPicker();
    this.updatePbPickerVisibility();
  }
}

// Inicializa a aplicação quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AffinityApp();
});
