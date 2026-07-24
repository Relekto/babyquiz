import re

with open('c:/Users/Administrator/Desktop/baby/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace \r\n with \n to make exact string matching easier
code = code.replace('\r\n', '\n')

# 1. Constructor
old1 = """    this.p2Name = "";
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;

    // Estado do Multiplayer P2P"""

new1 = """    this.p2Name = "";
    this.currentQuestionIdx = 0;
    this.p1Answers = [];
    this.p2Answers = [];
    this.matchesCount = 0;

    // Estado Blind Ranking
    this.gameMode = 'quiz';
    this.blindRankingTopic = null;
    this.blindRankingItems = [];
    this.blindFinalRanking = new Array(10).fill(null);
    this.blindAvailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Estado do Multiplayer P2P"""
code = code.replace(old1, new1)

# 2. setupEventListeners
old2 = """  setupEventListeners() {
    // Escolha: Jogar Online (Mostra painel MP)"""
new2 = """  setupEventListeners() {
    // Game Mode Selection
    const btnQuiz = document.getElementById('mode-quiz-btn');
    const btnBlind = document.getElementById('mode-blind-btn');
    if (btnQuiz && btnBlind) {
      btnQuiz.addEventListener('click', () => {
        this.synth.playClickSound();
        this.gameMode = 'quiz';
        btnQuiz.classList.add('active');
        btnBlind.classList.remove('active');
      });
      btnBlind.addEventListener('click', () => {
        this.synth.playClickSound();
        this.gameMode = 'blindRank';
        btnBlind.classList.add('active');
        btnQuiz.classList.remove('active');
      });
    }

    // Escolha: Jogar Online (Mostra painel MP)"""
code = code.replace(old2, new2)

# 3. Host start
old3 = """      if (this.conn && this.conn.open) {
        const pool = coupleQuestionsPool[this.currentLang];
        const indices = [];
        while (indices.length < Math.min(10, pool.length)) {
          const idx = Math.floor(Math.random() * pool.length);
          if (!indices.includes(idx)) {
            indices.push(idx);
          }
        }
        this.activeQuestionsIndices = indices;

        // Gera aleatoriamente o sujeito da pergunta ('p1' ou 'p2')
        const subjects = indices.map(() => Math.random() < 0.5 ? 'p1' : 'p2');
        this.activeQuestionsSubjects = subjects;

        this.conn.send({
          type: 'START_GAME',
          p1Name: this.p1Name,
          p2Name: this.p2Name,
          questionIndices: indices,
          questionSubjects: subjects
        });
        this.synth.startAmbientMusic();
        this.startQuiz();
      }"""

new3 = """      if (this.conn && this.conn.open) {
        if (this.gameMode === 'quiz') {
          const pool = coupleQuestionsPool[this.currentLang];
          const indices = [];
          while (indices.length < Math.min(10, pool.length)) {
            const idx = Math.floor(Math.random() * pool.length);
            if (!indices.includes(idx)) {
              indices.push(idx);
            }
          }
          this.activeQuestionsIndices = indices;
          const subjects = indices.map(() => Math.random() < 0.5 ? 'p1' : 'p2');
          this.activeQuestionsSubjects = subjects;
          this.conn.send({
            type: 'START_GAME',
            gameMode: 'quiz',
            p1Name: this.p1Name,
            p2Name: this.p2Name,
            questionIndices: indices,
            questionSubjects: subjects
          });
        } else {
          const topics = blindRankingTopics[this.currentLang];
          const topicKeys = Object.keys(topics);
          this.blindRankingTopic = topicKeys[Math.floor(Math.random() * topicKeys.length)];
          const items = [...topics[this.blindRankingTopic].items];
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
      }"""
code = code.replace(old3, new3)

# 4. handleIncomingData
old4 = """      case 'START_GAME':
        // Guest recebe autorização para iniciar
        this.p1Name = data.p1Name;
        this.p2Name = data.p2Name;
        this.activeQuestionsIndices = data.questionIndices;
        this.activeQuestionsSubjects = data.questionSubjects || [];"""

new4 = """      case 'START_GAME':
        // Guest recebe autorização para iniciar
        this.p1Name = data.p1Name;
        this.p2Name = data.p2Name;
        this.gameMode = data.gameMode || 'quiz';
        if (this.gameMode === 'quiz') {
          this.activeQuestionsIndices = data.questionIndices;
          this.activeQuestionsSubjects = data.questionSubjects || [];
        } else {
          this.activeQuestionsIndices = data.questionIndices;
          this.blindRankingTopic = data.blindRankingTopic;
          this.blindRankingItems = data.blindRankingItems;
        }"""
code = code.replace(old4, new4)


# 5. startQuiz
old5 = """    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    if (!this.isMultiplayer) {"""

new5 = """    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    if (this.gameMode === 'blindRank') {
      this.blindFinalRanking = new Array(10).fill(null);
      this.blindAvailableSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    if (!this.isMultiplayer) {"""
code = code.replace(old5, new5)


# 6. startNewQuestion
old6 = """  startNewQuestion() {
    const langConfig = this.config[this.currentLang];
    const activeQ = this.getActiveQuestions();
    const totalQ = activeQ.length;
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

    if (this.isMultiplayer) {
      this.showQuizStep('p1Turn');

      // Ajusta o título do turno para online
      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.textContent = this.currentLang === 'pt' ? "Sua Escolha 🌐" : "Your Choice 🌐";
      badge.className = "player-indicator p1-badge";

      document.getElementById('lbl-p1-tip').textContent = this.currentLang === 'pt'
        ? "PENSA QUE NEM EUUUU PENSA QUE NEM EUUUUUU"
        : "THINK LIKE MEEE THINK LIKE MEEEE";

      this.renderMultiplayerQuestion();
    } else {
      // Jogo Local Normal
      this.showQuizStep('p1Turn');
      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.innerHTML = `Vez de <span class="p1-name-display">${this.p1Name}</span>`;
      badge.className = "player-indicator p1-badge";
      document.getElementById('lbl-p1-tip').textContent = langConfig.ui.p1Tip;
      this.renderP1Question();
    }
  }"""

new6 = """  startNewQuestion() {
    const langConfig = this.config[this.currentLang];
    const totalQ = this.gameMode === 'quiz' ? this.getActiveQuestions().length : 10;
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

    if (this.gameMode === 'quiz') {
       document.getElementById('p1-question-text').classList.remove('hidden');
       document.getElementById('p1-options').classList.remove('hidden');
       document.getElementById('p1-blind-image-container').classList.add('hidden');
       document.getElementById('p1-blind-options').classList.add('hidden');
    }

    if (this.isMultiplayer) {
      this.showQuizStep('p1Turn');

      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.textContent = this.currentLang === 'pt' ? "Sua Escolha 🌐" : "Your Choice 🌐";
      badge.className = "player-indicator p1-badge";

      document.getElementById('lbl-p1-tip').textContent = this.currentLang === 'pt'
        ? "PENSA QUE NEM EUUUU PENSA QUE NEM EUUUUUU"
        : "THINK LIKE MEEE THINK LIKE MEEEE";

      if (this.gameMode === 'quiz') {
        this.renderMultiplayerQuestion();
      } else {
        this.renderBlindRankMultiplayer();
      }
    } else {
      this.showQuizStep('p1Turn');
      const badge = document.querySelector('#quiz-p1-turn .player-indicator');
      badge.innerHTML = `Vez de <span class="p1-name-display">${this.p1Name}</span>`;
      badge.className = "player-indicator p1-badge";
      document.getElementById('lbl-p1-tip').textContent = langConfig.ui.p1Tip;
      
      if (this.gameMode === 'quiz') {
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
    imgEl.src = item.url;
    
    const container = document.getElementById('p1-blind-options');
    container.innerHTML = "";
    
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement('button');
      btn.className = "option-btn rank-btn";
      btn.textContent = i;
      
      if (!this.blindAvailableSlots.includes(i)) {
        btn.classList.add('slot-taken');
      }
      
      btn.addEventListener('click', () => this.handleBlindRankSelection(i));
      container.appendChild(btn);
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

    const revealIcon = document.getElementById('reveal-animation-container');
    const revealTitle = document.getElementById('reveal-title');
    const revealDesc = document.getElementById('reveal-desc');
    const nextBtn = document.getElementById('btn-next-question');

    let myChoice = this.myChosenIdx;
    let partnerChoice = this.partnerChosenIdx;
    
    document.getElementById('reveal-blind-p1-choice').textContent = this.isHost ? myChoice : partnerChoice;
    document.getElementById('reveal-blind-p2-choice').textContent = this.isHost ? partnerChoice : myChoice;
    
    let avg = (myChoice + partnerChoice) / 2;
    document.getElementById('reveal-blind-avg-choice').textContent = avg;

    let closestSlot = this.blindAvailableSlots.reduce((prev, curr) => {
      const diffCurr = Math.abs(curr - avg);
      const diffPrev = Math.abs(prev - avg);
      if (diffCurr < diffPrev) return curr;
      if (diffCurr === diffPrev) return curr < prev ? curr : prev;
      return prev;
    });

    this.blindFinalRanking[closestSlot - 1] = item;
    this.blindAvailableSlots = this.blindAvailableSlots.filter(s => s !== closestSlot);

    const boardContainer = document.getElementById('ranking-board-mini-list');
    boardContainer.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'ranking-slot-mini';
      const rankNum = document.createElement('span');
      rankNum.className = 'rank-num-mini';
      rankNum.textContent = i + 1;
      slotDiv.appendChild(rankNum);
      
      if (this.blindFinalRanking[i]) {
        const img = document.createElement('img');
        img.src = this.blindFinalRanking[i].url;
        img.className = 'rank-img-mini';
        slotDiv.appendChild(img);
        
        if (i + 1 === closestSlot) {
            slotDiv.classList.add('highlight-slot');
        }
      }
      boardContainer.appendChild(slotDiv);
    }

    revealIcon.textContent = "⭐";
    revealIcon.className = "reveal-status-icon bounce-animation";
    revealTitle.innerHTML = `Rank #${closestSlot}`;
    revealDesc.textContent = this.currentLang === 'pt' ? "Ocupou a vaga mais próxima da média!" : "Took the closest slot to the average!";

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
  }"""
code = code.replace(old6, new6)

# 7. revealMatchMultiplayer
old7 = """  revealMatchMultiplayer() {
    this.showQuizStep('reveal');
    const langConfig = this.config[this.currentLang];
    const q = this.getActiveQuestions()[this.currentQuestionIdx];"""

new7 = """  revealMatchMultiplayer() {
    this.showQuizStep('reveal');
    const langConfig = this.config[this.currentLang];

    if (this.gameMode === 'blindRank') {
      this.revealBlindRankMultiplayer();
      return;
    }

    document.getElementById('reveal-quiz-choices').classList.remove('hidden');
    document.getElementById('reveal-blind-container').classList.add('hidden');

    const q = this.getActiveQuestions()[this.currentQuestionIdx];"""
code = code.replace(old7, new7)

# 8. nextQuestionMultiplayer
old8 = """  nextQuestionMultiplayer() {
    this.currentQuestionIdx++;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    // Libera botão do guest
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';

    if (this.currentQuestionIdx < this.getActiveQuestions().length) {"""

new8 = """  nextQuestionMultiplayer() {
    this.currentQuestionIdx++;
    this.myChosenIdx = null;
    this.partnerChosenIdx = null;

    // Libera botão do guest
    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1.0';

    const totalQ = this.gameMode === 'quiz' ? this.getActiveQuestions().length : 10;

    if (this.currentQuestionIdx < totalQ) {"""
code = code.replace(old8, new8)

# 9. goToResults
old9 = """  goToResults() {
    this.switchScreen('results');
    this.synth.playFanfareSound();

    const langConfig = this.config[this.currentLang];
    const totalQ = this.getActiveQuestions().length;"""

new9 = """  goToResults() {
    this.switchScreen('results');
    this.synth.playFanfareSound();

    if (this.gameMode === 'blindRank') {
      document.getElementById('results-quiz-container').classList.add('hidden');
      document.getElementById('results-blind-container').classList.remove('hidden');
      
      const boardContainer = document.getElementById('ranking-board-full-list');
      boardContainer.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'ranking-slot-full';
        const rankNum = document.createElement('span');
        rankNum.className = 'rank-num-full';
        rankNum.textContent = `#${i + 1}`;
        slotDiv.appendChild(rankNum);
        
        if (this.blindFinalRanking[i]) {
          const img = document.createElement('img');
          img.src = this.blindFinalRanking[i].url;
          img.className = 'rank-img-full';
          slotDiv.appendChild(img);
        }
        boardContainer.appendChild(slotDiv);
      }
      return;
    }

    document.getElementById('results-quiz-container').classList.remove('hidden');
    document.getElementById('results-blind-container').classList.add('hidden');

    const langConfig = this.config[this.currentLang];
    const totalQ = this.getActiveQuestions().length;"""
code = code.replace(old9, new9)

with open('c:/Users/Administrator/Desktop/baby/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Replacement successful")
