// Configuração do Teste de Afinidade - Dia dos Namorados (Bilingue - UI e Títulos 💖)
const coupleConfig = {
  pt: {
    defaultPlayer1Name: "Amor 1",
    defaultPlayer2Name: "Amor 2",
    
    // Rótulos da Interface (UI)
    ui: {
      welcomeTitle: "Teste de Afinidade de Casal 💖",
      welcomeSubtitle: "Dia dos Namorados",
      welcomeIntro: "Descubram o quanto vocês estão em sintonia com um teste de afinidade super divertido e romântico para jogar juntinhos!",
      labelP1Name: "Seu Nome (Amor) 💖",
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
      lblMpWaitingChoice: "Aguardando a escolha do seu amor... ⏳",
      lblP1NameOnline: "Seu Nome 💖",
      
      questionHeader: "Questão {num} de {total}",
      scoreHeader: "Sintonia: {score}%",
      p1Tip: "Esconda a tela e faça sua escolha sem espiar! 🤫",
      p2Tip: "Sua vez! O que descreve melhor vocês dois?",
      choiceSaved: "Escolha Salva!",
      transitionMsg: "Agora, passe o aparelho para <strong>{name}</strong> fazer a sua escolha.",
      btnTransition: "Estou Pronto! 🚀",
      
      revealProcessing: "Processando...",
      revealSyncing: "Sincronizando as escolhas do casal...",
      revealMatchTitle: "Deu Match! 😍",
      revealMatchDesc: "Vocês pensam iguaizinhos! Sintonia maravilhosa.",
      revealMismatchTitle: "Quase lá... 💔",
      revealMismatchDesc: "Escolhas diferentes, mas tudo bem! O amor continua o mesmo.",
      btnNext: "Próxima Questão ➡️",
      btnFinish: "Ver Resultado Final 🏆",
      
      resultsTitle: "Sintonia do Casal",
      resultsSubtitle: "Parabéns ao Casal!",
      resultsSyncLabel: "Sintonia",
      btnRestart: "Refazer Teste 🔄"
    },

    // Títulos de afinidade
    affinityTitles: [
      {
        min: 0,
        max: 30,
        title: "Par em Aprendizado 🌱💖",
        description: "Vocês ainda estão se descobrindo em alguns detalhes do dia a dia. O que é ótimo, pois significa que vocês têm muitas conversas interessantes e novos momentos para compartilhar pela frente! Que tal conversarem sobre as respostas agora?"
      },
      {
        min: 40,
        max: 60,
        title: "Sintonia em Crescimento 💫❤️",
        description: "Vocês têm uma sintonia muito bonita! Conhecem bem os gostos um do outro e compartilham momentos especiais. Com um pouquinho mais de tempo juntos e conversas sinceras, logo estarão 100% integrados!"
      },
      {
        min: 70,
        max: 90,
        title: "Conexão de Alma 💖✨",
        description: "A conexão de vocês é incrível! Pensam super parecido em quase tudo e a cumplicidade é nítida. Vocês se completam de uma forma muito doce e especial, demonstrando um amor maduro e forte."
      },
      {
        min: 100,
        max: 100,
        title: "Almas Gêmeas Perfeitas! 👑❤️",
        description: "Inacreditável! Sintonia absoluta. Vocês pensam exatamente igual, compartilham o mesmo jeitinho de ver a vida e a conexão de vocês é mágica. Nascidos um para o outro em todos os sentidos. Feliz Dia dos Namorados! ❤️"
      }
    ]
  },

  en: {
    defaultPlayer1Name: "Love 1",
    defaultPlayer2Name: "Love 2",
    
    // UI Labels in English
    ui: {
      welcomeTitle: "Couples Affinity Test 💖",
      welcomeSubtitle: "Valentine's Day",
      welcomeIntro: "Discover how in sync you and your partner are with a fun and romantic affinity test to play together!",
      labelP1Name: "Your Name (Love) 💖",
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
      lblMpWaitingPartner: "Waiting for your partner to join... ⏳",
      lblMpWaitingHost: "Waiting for the host to start the test... 🚀",
      lblMpWaitingNext: "Waiting for the host to proceed... ⏳",
      lblMpConnected: "Love Connected! ❤️",
      btnHostStart: "Start Test 🚀",
      lblMpJoinCodeLabel: "Room Code",
      placeholderJoinCode: "Enter code (e.g. 4512)",
      btnGuestJoin: "Connect to Partner 🔗",
      lblMpGuestConnecting: "Connecting to your partner... ⏳",
      btnMpCancel: "⬅️ Cancel",
      lblMpConnectedStatus: "Online 🟢",
      lblMpDisconnectedStatus: "Offline 🔴",
      lblMpConnectingStatus: "Connecting... 🟡",
      lblMpWaitingChoice: "Waiting for your partner's choice... ⏳",
      lblP1NameOnline: "Your Name 💖",
      
      questionHeader: "Question {num} of {total}",
      scoreHeader: "In Sync: {score}%",
      p1Tip: "Hide the screen and make your choice! No peeking! 🤫",
      p2Tip: "Your turn! What describes the two of you best?",
      choiceSaved: "Choice Saved!",
      transitionMsg: "Now, pass the device to <strong>{name}</strong> to make their choice.",
      btnTransition: "I'm Ready! 🚀",
      
      revealProcessing: "Processing...",
      revealSyncing: "Syncing the couple's choices...",
      revealMatchTitle: "It's a Match! 😍",
      revealMatchDesc: "You think exactly alike! Wonderful connection.",
      revealMismatchTitle: "Almost there... 💔",
      revealMismatchDesc: "Different choices, but that's okay! The love is still the same.",
      btnNext: "Next Question ➡️",
      btnFinish: "See Final Results 🏆",
      
      resultsTitle: "Couples Affinity",
      resultsSubtitle: "Congratulations to the Couple!",
      resultsSyncLabel: "In Sync",
      btnRestart: "Retake Test 🔄"
    },

    // Affinity Titles in English
    affinityTitles: [
      {
        min: 0,
        max: 30,
        title: "Growing Together 🌱💖",
        description: "You're still discovering the little quirks of each other, which is wonderful because it means you have lots of interesting chats and new memories ahead! How about talking about your answers now?"
      },
      {
        min: 40,
        max: 60,
        title: "Beautiful Connection 💫❤️",
        description: "You have a great connection! You know each other's habits well and share lovely moments. With just a little more quality time and sharing, you'll hit 100% in no time!"
      },
      {
        min: 70,
        max: 90,
        title: "Soul Connection 💖✨",
        description: "Your bond is amazing! You think alike on almost everything and your chemistry is clear. You complete each other in a sweet and special way, showing a strong and mature love."
      },
      {
        min: 100,
        max: 100,
        title: "Perfect Soulmates! 👑❤️",
        description: "Unbelievable! Total harmony. You think exactly the same, share the same vibe, and your connection is magical. Truly made for each other in every way. Happy Valentine's Day! ❤️"
      }
    ]
  }
};
