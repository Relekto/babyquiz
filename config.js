// Configuração do Teste de Afinidade - Dia dos Namorados (Bilingue - UI e Títulos 💖)
const coupleConfig = {
  pt: {
    defaultPlayer1Name: "Bebê 1",
    defaultPlayer2Name: "Bebê 2",

    // Rótulos da Interface (UI)
    ui: {
      welcomeTitle: "Um teste com meu bebê lindoo ",
      welcomeSubtitle: "Dia dos Namorados",
      welcomeIntro: "Vamos ver o quanto a gente pensa igual :) 💖",
      labelP1Name: "Seu Nome (Meu Amor) 💖",
      labelP2Name: "Nome do Parceiro 💖",
      placeholderP1: "Digite seu nome...",
      placeholderP2: "Digite o nome...",
      btnStart: "Começar o Teste 💖",

      // Multiplayer UI
      btnPlayLocal: "Jogar Local 📱",
      btnPlayOnline: "Jogar 🚀",
      btnCreateRoom: "Criar Sala 🏠",
      btnShowJoin: "Entrar em Sala 🔑",
      lblMpRoomCodeTitle: "Código da Sala:",
      lblMpWaitingPartner: "Aguardando seu amor entrar... ⏳",
      lblMpWaitingHost: "Aguardando o host iniciar o teste... 🚀",
      lblMpWaitingNext: "Aguardando o host avançar... ⏳",
      lblMpConnected: "Amor Conectado! ❤️",
      btnHostStart: "Iniciar Teste 🚀",
      lblMpJoinCodeLabel: "Código da Sala",
      placeholderJoinCode: "Digite o código (ex: 4512)",
      btnGuestJoin: "Conectar ao Amor 🔗",
      lblMpGuestConnecting: "Conectando ao seu amor... ⏳",
      btnMpCancel: "⬅️ Cancelar",
      lblMpConnectedStatus: "Online 🟢",
      lblMpDisconnectedStatus: "Offline 🔴",
      lblMpConnectingStatus: "Conectando... 🟡",
      lblMpReconnecting: "Reconectando... 🔄",
      lblMpWaitingChoice: "Aguardando a escolha do seu amor... ⏳",
      lblP1NameOnline: "Seu Nome 💖",

      questionHeader: "Questão {num} de {total}",
      scoreHeader: "Em Sintonia: {score}%",
      p1Tip: "Esconda a tela e faça sua escolha! Sem espiar! 🤫",
      p2Tip: "Sua vez! O que descreve melhor vocês dois?",
      choiceSaved: "Escolha Salva!",
      transitionMsg: "Agora, passe o aparelho para <strong>{name}</strong> fazer a escolha dele(a).",
      btnTransition: "Estou Pronto! 🚀",

      revealProcessing: "Processando...",
      revealSyncing: "Sincronizando as escolhas do amor...",
      revealMatchTitle: "Deu Match EU TÔ MUITO ORGULHOSOOOO! 😍",
      revealMatchDesc: "SIIIIIIIIIIIIIIIM",
      revealMismatchTitle: "Foda-se isso...💔",
      revealMismatchDesc: "Você me odeia...",
      btnNext: "Próxima Questão ➡️",
      btnFinish: "Ver Resultados Finais 🏆",

      // Seleção de Jogo (Welcome)
      gameModeTitle: "Escolha o Jogo:",
      modeQuiz: "Afinidade",
      modeBlind: "Blind Ranking",
      categoryTitle: "Escolha a Categoria:",
      btnBackToLobby: "Voltar ao Lobby 🏠",

      // Multiplayer (turno)
      mpYourChoice: "Sua Escolha 🌐",
      mpThinkTip: "PENSA QUE NEM EUUUU PENSA QUE NEM EUUUUUU",

      // Blind Ranking
      liveRankingTitle: "Ranking Atual",
      blindMathLabel: "Média:",
      blindSlotLabel: "Slot:",
      blindRevealDesc: "Ocupou a vaga mais próxima da média!",
      rankingFinalTitle: "Ranking Final",

      resultsTitle: "Resultados do teste de afinidadeee ",
      resultsSubtitle: "PARABÉNSSSSSSS",
      resultsSyncLabel: "Em Sintonia",
      btnRestart: "Refazer Teste 🔄",

      // Duo Battle
      modeBattle: "Duo Battle",
      battleTip: "Escolham IGUAL para atacar o chefe! 🗡️",
      battleEnemyName: "Rei Demônio 👹",
      battleCoupleName: "💞 Nós Dois",
      battleHitTitle: "ACERTO CRÍTICO! -{dmg} ❤️ do chefe ⚔️",
      battleHitDesc: "Vocês pensaram igual e atacaram juntinhos!",
      battleMissTitle: "O chefe contra-atacou! -{dmg} ❤️ 💥",
      battleMissDesc: "Respostas diferentes deixaram vocês na defensiva...",
      battleNext: "Próximo Ataque ⚔️",
      battleRoundsLabel: "Rodadas",
      battleHitsLabel: "Acertos",
      victoryTitle: "VITÓRIA! 🏆",
      victoryDesc: "Vocês derrotaram o Rei Demônio com o poder da sintonia! 💖",
      defeatTitle: "Derrota... 💀",
      defeatDesc: "O chefe venceu dessa vez. Conheçam-se melhor e tentem a revanche! 🔁",
      victoryResultsTitle: "Chefe Derrotado!",
      victoryResultsSubtitle: "Que dupla! 💞",
      defeatResultsTitle: "Fim de Jogo",
      defeatResultsSubtitle: "Revanche? ⚔️"
    },

    // Títulos de afinidade
    affinityTitles: [
      {
        min: 0,
        max: 30,
        title: "WTF ?? ? ?",
        description: "Foi o lag ? Ou você me odeia ou algo assim ? O que é isso ? ?? ?? ? ? ? ?"
      },
      {
        min: 40,
        max: 60,
        title: "Conexão Linda 💫❤️",
        description: "AH acho que o duman mexeu no meu mouse e clicou na errada desculpaaaaaa."
      },
      {
        min: 70,
        max: 90,
        title: "Conexão de Alma 💖✨",
        description: "A gente leu alguma pergunta errado ? Deve ser isso né ? "
      },
      {
        min: 100,
        max: 100,
        title: "Almas Gêmeas Perfeitas! 👑❤️",
        description: "SIIIM BEBÊ NÓS SOMOS PERFEITOSSSSSSS UM PARA O OUTROOOO EU TÔ TÃO FELIZZZZ"
      }
    ]
  },

  en: {
    defaultPlayer1Name: "Baby 1",
    defaultPlayer2Name: "Baby 2",

    // UI Labels in English
    ui: {
      welcomeTitle: "A test with my cute babbyy ",
      welcomeSubtitle: "Brazilian Valentine's Day",
      welcomeIntro: "Lets see how much we think the same way :) 💖",
      labelP1Name: "Your Name (My Love) 💖",
      labelP2Name: "Partner's Name 💖",
      placeholderP1: "Enter your name...",
      placeholderP2: "Enter name...",
      btnStart: "Start the Test 💖",

      // Multiplayer UI
      btnPlayLocal: "Play Local 📱",
      btnPlayOnline: "Play 🚀",
      btnCreateRoom: "Create Room 🏠",
      btnShowJoin: "Join Room 🔑",
      lblMpRoomCodeTitle: "Room Code:",
      lblMpWaitingPartner: "Waiting for your love to join... ⏳",
      lblMpWaitingHost: "Waiting for the host to start the test... 🚀",
      lblMpWaitingNext: "Waiting for the host to proceed... ⏳",
      lblMpConnected: "Love Connected! ❤️",
      btnHostStart: "Start Test 🚀",
      lblMpJoinCodeLabel: "Room Code",
      placeholderJoinCode: "Enter code (e.g. 4512)",
      btnGuestJoin: "Connect to Love 🔗",
      lblMpGuestConnecting: "Connecting to your love... ⏳",
      btnMpCancel: "⬅️ Cancel",
      lblMpConnectedStatus: "Online 🟢",
      lblMpDisconnectedStatus: "Offline 🔴",
      lblMpConnectingStatus: "Connecting... 🟡",
      lblMpReconnecting: "Reconnecting... 🔄",
      lblMpWaitingChoice: "Waiting for your love's choice... ⏳",
      lblP1NameOnline: "Your Name 💖",

      questionHeader: "Question {num} of {total}",
      scoreHeader: "In Sync: {score}%",
      p1Tip: "Hide the screen and make your choice! No peeking! 🤫",
      p2Tip: "Your turn! What describes the two of you best?",
      choiceSaved: "Choice Saved!",
      transitionMsg: "Now, pass the device to <strong>{name}</strong> to make their choice.",
      btnTransition: "I'm Ready! 🚀",

      revealProcessing: "Processing...",
      revealSyncing: "Syncing the love's choices...",
      revealMatchTitle: "It's a Match I AM SO PROUDDDD! 😍",
      revealMatchDesc: "YESSSSSSSSSSSSSS",
      revealMismatchTitle: "Fck this...💔",
      revealMismatchDesc: "You h me...",
      btnNext: "Next Question ➡️",
      btnFinish: "See Final Results 🏆",

      // Game Selection (Welcome)
      gameModeTitle: "Choose the Game:",
      modeQuiz: "Affinity",
      modeBlind: "Blind Ranking",
      categoryTitle: "Choose the Category:",
      btnBackToLobby: "Back to Lobby 🏠",

      // Multiplayer (turn)
      mpYourChoice: "Your Choice 🌐",
      mpThinkTip: "THINK LIKE MEEE THINK LIKE MEEEE",

      // Blind Ranking
      liveRankingTitle: "Current Ranking",
      blindMathLabel: "Average:",
      blindSlotLabel: "Slot:",
      blindRevealDesc: "Took the closest slot to the average!",
      rankingFinalTitle: "Final Ranking",

      resultsTitle: "Affinity test resultsss ",
      resultsSubtitle: "CONGRATZZZZZZZ",
      resultsSyncLabel: "In Sync",
      btnRestart: "Retake Test 🔄",

      // Duo Battle
      modeBattle: "Duo Battle",
      battleTip: "Match your answers to attack the boss! 🗡️",
      battleEnemyName: "Demon King 👹",
      battleCoupleName: "💞 Us",
      battleHitTitle: "CRITICAL HIT! -{dmg} boss ❤️ ⚔️",
      battleHitDesc: "You thought alike and struck together!",
      battleMissTitle: "The boss struck back! -{dmg} ❤️ 💥",
      battleMissDesc: "Different answers left you off-guard...",
      battleNext: "Next Attack ⚔️",
      battleRoundsLabel: "Rounds",
      battleHitsLabel: "Hits",
      victoryTitle: "VICTORY! 🏆",
      victoryDesc: "You defeated the Demon King with the power of being in sync! 💖",
      defeatTitle: "Defeat... 💀",
      defeatDesc: "The boss won this time. Get to know each other better and rematch! 🔁",
      victoryResultsTitle: "Boss Defeated!",
      victoryResultsSubtitle: "What a duo! 💞",
      defeatResultsTitle: "Game Over",
      defeatResultsSubtitle: "Rematch? ⚔️"
    },

    // Affinity Titles in English
    affinityTitles: [
      {
        min: 0,
        max: 30,
        title: "WTF ?? ? ?",
        description: "Is it the lag ? Or do you h me or smt ? Whats this ? ?? ?? ? ? ? ?"
      },
      {
        min: 40,
        max: 60,
        title: "Beautiful Connection 💫❤️",
        description: "OH I think duman moved my mouse and clicked the wrong one sorrryyyyy."
      },
      {
        min: 70,
        max: 90,
        title: "Soul Connection 💖✨",
        description: "Did we miss read a question ? That must be it right ? "
      },
      {
        min: 100,
        max: 100,
        title: "Perfect Soulmates! 👑❤️",
        description: "YESSS BABBBY WE ARE PERFECTTTTTTTT FOR EACH OTHERRRR I AM SO HAPPPYY"
      }
    ]
  }
};