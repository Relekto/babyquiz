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

    // Elementos DOM
    this.screens = {
      welcome: document.getElementById('screen-welcome'),
      quiz: document.getElementById('screen-quiz'),
      results: document.getElementById('screen-results')
    };

    this.quizSteps = {
      p1Turn: document.getElementById('quiz-p1-turn'),
      transition: document.getElementById('quiz-transition'),
      p2Turn: document.getElementById('quiz-p2-turn'),
      reveal: document.getElementById('quiz-reveal')
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
      duoBattle: document.getElementById('mode-battle-btn')
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

    // Conecta ao servidor sinalizador gratuito do PeerJS
    if (isHost) {
      this.peer = new Peer(`namorados-love-${code}`);

      this.peer.on('open', () => {
        console.log("Sala criada com ID:", this.peer.id);
      });

      this.peer.on('connection', (conn) => {
        this.conn = conn;
        this.setupConnectionCallbacks();
      });

      this.peer.on('error', (err) => {
        console.error("Erro no Host Peer:", err);
        if (err.type === 'unavailable-id') {
          // Tenta novamente com outro código
          const newCode = Math.floor(1000 + Math.random() * 9000).toString();
          this.roomCode = newCode;
          document.getElementById('room-code-val').textContent = newCode;
          this.initPeer(true, newCode);
        } else {
          this.handleDisconnect();
        }
      });
    } else {
      this.peer = new Peer();

      this.peer.on('open', () => {
        console.log("Guest conectado ao sinalizador, conectando à sala:", code);
        this.conn = this.peer.connect(`namorados-love-${code}`);
        this.setupConnectionCallbacks();
      });

      this.peer.on('error', (err) => {
        console.error("Erro no Guest Peer:", err);
        this.handleDisconnect();
      });
    }
  }

  setupConnectionCallbacks() {
    const statusDot = document.getElementById('conn-status-dot');
    const statusText = document.getElementById('conn-status-text');
    const langConfig = this.config[this.currentLang];

    this.conn.on('open', () => {
      statusDot.className = "status-dot online";
      statusText.textContent = langConfig.ui.lblMpConnectedStatus;
      this.synth.playMatchSound();

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

      if (this.isHost) {
        // Envia nome do host
        this.conn.send({
          type: 'SYNC_NAME',
          role: 'host',
          name: this.p1Name
        });
      } else {
        // Envia nome do guest
        this.conn.send({
          type: 'SYNC_NAME',
          role: 'guest',
          name: this.p1Name // Nome do guest estava no input player1-name
        });
      }
    });

    this.conn.on('data', (data) => {
      this.handleIncomingData(data);
    });

    this.conn.on('close', () => {
      this.handleDisconnect();
    });

    this.conn.on('error', (err) => {
      console.error("Erro na conexão:", err);
      this.handleDisconnect();
    });
  }

  handleIncomingData(data) {
    const langConfig = this.config[this.currentLang];

    switch (data.type) {
      case 'SYNC_NAME':
        if (this.isHost) {
          // Recebe nome do guest
          this.p2Name = data.name;
          document.getElementById('lbl-mp-waiting-partner').classList.add('hidden');
          document.getElementById('mp-host-start-container').classList.remove('hidden');
          this.synth.playMatchSound();
        } else {
          // Guest sincroniza nomes: Host passa a ser P1, Guest passa a ser P2
          this.p2Name = this.p1Name; // Salva meu nome em P2
          this.p1Name = data.name;   // Salva nome do parceiro em P1

          // Envia de volta o nome do Guest para o Host fechar a sincronização
          this.conn.send({
            type: 'SYNC_NAME',
            role: 'guest',
            name: this.p2Name
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
        break;

      case 'START_GAME':
        // Guest recebe autorização para iniciar
        this.p1Name = data.p1Name;
        this.p2Name = data.p2Name;
        this.gameMode = data.gameMode || 'quiz';
        if (this.gameMode === 'quiz' || this.gameMode === 'duoBattle') {
          this.activeQuestionsIndices = data.questionIndices;
          this.activeQuestionsSubjects = data.questionSubjects || [];
        } else {
          this.activeQuestionsIndices = data.questionIndices;
          this.blindRankingTopic = data.blindRankingTopic;
          this.blindRankingItems = data.blindRankingItems;
        }
        document.querySelectorAll('.p1-name-display').forEach(el => el.textContent = this.p1Name);
        document.querySelectorAll('.p2-name-display').forEach(el => el.textContent = this.p2Name);

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
    }
  }

  disconnectPeer() {
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

    container.innerHTML = "";
    topics.forEach((topic, idx) => {
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
    const ids = { quiz: 'mode-quiz-btn', blindRank: 'mode-blind-btn', duoBattle: 'mode-battle-btn' };
    Object.entries(ids).forEach(([m, id]) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', m === mode);
    });
    this.updateCategoryPickerVisibility();
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

  // Volta ambos os jogadores ao lobby conectado (sem derrubar a conexão),
  // permitindo escolher outra categoria e jogar novamente.
  returnToLobby() {
    const langConfig = this.config[this.currentLang];

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

    // O seletor de categoria reflete o modo atual (Blind Ranking)
    this.updateCategoryPickerVisibility();
    this.renderCategoryPicker();
  }
}

// Inicializa a aplicação quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AffinityApp();
});
