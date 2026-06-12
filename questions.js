// Pool de Perguntas para o Teste de Afinidade (50 Perguntas - Bilingue 💖)
const coupleQuestionsPool = {
  pt: [
    {
      id: 1,
      text: "Quem cozinha melhor?",
      options: ["Eu", "Você", "Nós dois mandamos bem", "A gente só sobrevive de delivery"]
    },
    {
      id: 2,
      text: "Quem gasta mais dinheiro com besteira?",
      options: ["Eu", "Você", "Os dois gastam igual", "Nenhum, somos pão-duros"]
    },
    {
      id: 3,
      text: "Quem pede desculpa primeiro depois de uma briga?",
      options: ["Eu", "Você", "Quem estiver errado", "A gente finge que não aconteceu"]
    },
    {
      id: 4,
      text: "Quem é mais teimoso?",
      options: ["Eu", "Você", "É um empate", "Depende totalmente do assunto"]
    },
    {
      id: 5,
      text: "Qual é o tipo de comida favorito de {player}?",
      options: ["Pizza e Hambúrguer", "Sushi e comida asiática", "Comida caseira", "Comida chique"]
    },
    {
      id: 6,
      text: "Qual é o fim de semana ideal de {player}?",
      options: ["Ficar na cama vendo filme", "Sair e ir pra festa", "Explorar um lugar novo", "Ficar com amigos/família"]
    },
    {
      id: 7,
      text: "Quem é o bagunceiro da relação?",
      options: ["Eu", "Você", "Nós dois somos bagunceiros", "Nós dois somos maníacos por limpeza"]
    },
    {
      id: 8,
      text: "Qual frase nos descreve melhor?",
      options: ["Os opostos se atraem", "Almas gêmeas (somos muito parecidos)", "Sempre rindo juntos", "Parceiros no crime"]
    },
    {
      id: 9,
      text: "Qual é a cor favorita de {player} para vestir?",
      options: ["Preto e cores neutras", "Cores vivas e chamativas", "Azul e tons frios", "Tons terrosos"]
    },
    {
      id: 10,
      text: "Como {player} fica quando está com fome?",
      options: ["Irritado e estressado (hangry)", "Muito quieto", "Chorão e dramático", "Normal, só come"]
    },
    {
      id: 11,
      text: "Quem é mais romântico?",
      options: ["Eu", "Você", "Ambos", "Nenhum de nós é meloso"]
    },
    {
      id: 12,
      text: "Se {player} pudesse beber só uma coisa para sempre, o que seria?",
      options: ["Café ou Chá", "Refrigerante", "Cerveja, Vinho ou Drinks", "Só água"]
    },
    {
      id: 13,
      text: "Quem tem mais chance de se atrasar?",
      options: ["Eu", "Você", "A gente sempre se atrasa junto", "Nós sempre somos pontuais"]
    },
    {
      id: 14,
      text: "Qual é o gênero de filme favorito de {player}?",
      options: ["Ação e Ficção Científica", "Comédia", "Terror e Suspense", "Romance e Drama"]
    },
    {
      id: 15,
      text: "Quem dorme primeiro vendo filme?",
      options: ["Eu", "Você", "É 50% de chance pra cada um", "Nós dois ficamos acordados"]
    },
    {
      id: 16,
      text: "Qual animal representa {player} melhor?",
      options: ["Um gato preguiçoso", "Um cachorro leal e agitado", "Um macaco doido", "Uma coruja sábia e quieta"]
    },
    {
      id: 17,
      text: "Qual é o pior hábito de {player}?",
      options: ["Deixar as coisas jogadas pela casa", "Ficar muito no celular", "Pensar demais nas coisas", "Interromper os outros"]
    },
    {
      id: 18,
      text: "Qual foi a primeira impressão que {player} teve de {partner}?",
      options: ["Achei hilário(a)", "Achei muito atraente", "Achei um pouco estranho(a)/doido(a)", "Fiquei com um pouco de medo"]
    },
    {
      id: 19,
      text: "Quem disse \"Eu te amo\" primeiro?",
      options: ["Eu", "Você", "Falamos praticamente juntos", "Sinceramente, não lembro"]
    },
    {
      id: 20,
      text: "O que mais irrita {player} nas pessoas?",
      options: ["Pessoas lerdas andando ou dirigindo", "Mastigação barulhenta", "Pessoas atrasadas", "Bagunça ou falta de higiene"]
    },
    {
      id: 21,
      text: "Se ganhássemos na loteria, o que faríamos primeiro?",
      options: ["Viajar pelo mundo", "Comprar uma mansão", "Investir com responsabilidade", "Comprar coisas idiotas e divertidas"]
    },
    {
      id: 22,
      text: "Quem é o palhaço da relação?",
      options: ["Eu", "Você", "Nós temos nossas piadas internas", "Nenhum, somos muito sérios"]
    },
    {
      id: 23,
      text: "O que {player} mais ama em {partner}?",
      options: ["Sua aparência física", "Seu senso de humor", "Sua bondade e coração", "Sua inteligência/mente"]
    },
    {
      id: 24,
      text: "Qual é a viagem dos sonhos de {player}?",
      options: ["Um resort relaxante na praia", "Uma cidade grande e movimentada", "Uma cabana nas montanhas", "Fazer mochilão e aventura"]
    },
    {
      id: 25,
      text: "Quem demora mais no banho?",
      options: ["Eu", "Você", "O mesmo tempo", "Quem for lavar o cabelo no dia"]
    },
    {
      id: 26,
      text: "Qual é o fast food de lei de {player}?",
      options: ["McDonald's ou Burger King", "Pizza", "Tacos ou comida mexicana", "Frango frito"]
    },
    {
      id: 27,
      text: "Quem é mais dramático?",
      options: ["Eu", "Você", "Nós dois fazemos drama", "Nós somos 100% de boa"]
    },
    {
      id: 28,
      text: "Qual é a nossa melhor memória juntos?",
      options: ["Nosso primeiro encontro", "Nossa primeira viagem juntos", "Um momento engraçado e aleatório", "Uma comemoração ou aniversário"]
    },
    {
      id: 29,
      text: "Quem mexe mais no celular?",
      options: ["Eu", "Você", "Nós dois somos viciados", "A gente quase não encosta no celular juntos"]
    },
    {
      id: 30,
      text: "Se {player} tivesse um superpoder, qual seria?",
      options: ["Voar", "Ficar invisível", "Ler mentes", "Teletransporte"]
    },
    {
      id: 31,
      text: "Quem dirige melhor?",
      options: ["Eu", "Você", "Nós dois dirigimos feito loucos", "Nós dois dirigimos igual velhinhos"]
    },
    {
      id: 32,
      text: "Qual é a sobremesa favorita de {player}?",
      options: ["Qualquer coisa com chocolate", "Sorvete", "Bolo ou torta", "Prefiro salgado do que doce"]
    },
    {
      id: 33,
      text: "Quem tem mais chance de começar a dançar no meio da rua?",
      options: ["Eu", "Você", "Com certeza faríamos isso juntos", "Absolutamente nenhum de nós dois"]
    },
    {
      id: 34,
      text: "Qual é o tamanho do sapato de {player}?",
      options: ["35 - 37", "38 - 40", "41 - 43", "44+ (Pé Grande)"]
    },
    {
      id: 35,
      text: "Quem é mais competitivo?",
      options: ["Eu", "Você", "A gente briga jogando Banco Imobiliário", "A gente não liga pra ganhar"]
    },
    {
      id: 36,
      text: "Como {player} prefere mandar mensagem?",
      options: ["Várias mensagens curtas", "Textão", "Áudios de voz", "Prefiro ligar logo"]
    },
    {
      id: 37,
      text: "Que tipo de música {player} mais escuta?",
      options: ["Pop e Hits do momento", "Rock e Indie", "Hip Hop, Rap ou Funk", "Sertanejo ou Acústico"]
    },
    {
      id: 38,
      text: "Quem tem mais chance de sobreviver a um apocalipse zumbi?",
      options: ["Eu", "Você", "Faríamos uma equipe incrível", "Morreríamos no primeiro dia"]
    },
    {
      id: 39,
      text: "Qual é o maior medo de {player}?",
      options: ["Aranhas e insetos", "Altura", "Perder a família ou você", "Fracassar"]
    },
    {
      id: 40,
      text: "Quem planeja os rolês na relação?",
      options: ["Eu", "Você", "Nós dividimos por igual", "A gente só vai na sorte, sem plano"]
    },
    {
      id: 41,
      text: "Qual é a estação do ano favorita de {player}?",
      options: ["Verão", "Inverno", "Primavera", "Outono"]
    },
    {
      id: 42,
      text: "Quem é mais sociável numa festa?",
      options: ["Eu", "Você", "Nós dois falamos com todo mundo", "A gente só conversa um com o outro no canto"]
    },
    {
      id: 43,
      text: "Se a gente tivesse um dia livre, o que faríamos?",
      options: ["Dormir e relaxar", "Fazer um passeio ao ar livre", "Fazer compras e comer fora", "Jogar ou ver filme em casa"]
    },
    {
      id: 44,
      text: "Quem tira mais fotos?",
      options: ["Eu", "Você", "Tiramos a mesma quantidade", "A gente sempre esquece de tirar foto"]
    },
    {
      id: 45,
      text: "Qual é a parte favorita do corpo de {partner} na opinião de {player}?",
      options: ["Olhos e Rosto", "Sorriso e Boca", "Bunda ou Peito", "Braços ou Costas"]
    },
    {
      id: 46,
      text: "Quem tem mais chance de trazer um bicho de rua pra casa?",
      options: ["Eu", "Você", "A gente já fez isso", "A gente nunca faria isso"]
    },
    {
      id: 47,
      text: "Como é a rotina de manhã de {player}?",
      options: ["Acorda cedo e cheio de energia", "Aperta o soneca 5 vezes", "Preciso de café antes de qualquer coisa", "Sempre na correria de atraso"]
    },
    {
      id: 48,
      text: "Quem dá os melhores presentes?",
      options: ["Eu", "Você", "Nós dois mandamos muito bem", "Preferimos viver experiências"]
    },
    {
      id: 49,
      text: "Qual seria o título do nosso filme?",
      options: ["Uma comédia romântica", "Uma aventura maluca", "Um drama com final feliz", "Uma série de comédia estilo Friends"]
    },
    {
      id: 50,
      text: "Quando {player} soube que {partner} era \"a pessoa certa\"?",
      options: ["Logo que nos conhecemos", "Depois da nossa primeira viagem juntos", "Durante um momento aleatório do dia a dia", "Ainda estou avaliando (brincadeira!)"]
    }
  ],

  en: [
    {
      id: 1,
      text: "Who is the better cook?",
      options: ["Me", "You", "We’re both pros", "We just survive on takeout"]
    },
    {
      id: 2,
      text: "Who spends more money on random stuff?",
      options: ["Me", "You", "Equally guilty", "Neither, we save"]
    },
    {
      id: 3,
      text: "Who apologizes first after a fight?",
      options: ["Me", "You", "Whoever is wrong", "We just pretend it never happened"]
    },
    {
      id: 4,
      text: "Who is more stubborn?",
      options: ["Me", "You", "It's a dead tie", "Depends entirely on the topic"]
    },
    {
      id: 5,
      text: "What's {player}'s favorite type of food?",
      options: ["Pizza & Burgers", "Sushi & Asian", "Traditional home-cooked", "Fancy stuff"]
    },
    {
      id: 6,
      text: "What's {player}'s ideal weekend?",
      options: ["Staying in bed watching movies", "Going out and partying", "Exploring somewhere new", "Hanging out with friends/family"]
    },
    {
      id: 7,
      text: "Who is the messy one?",
      options: ["Me", "You", "We're both a mess", "We're both clean freaks"]
    },
    {
      id: 8,
      text: "Which sentence describes us best?",
      options: ["Opposites attract", "Two peas in a pod", "Always laughing together", "Partners in crime"]
    },
    {
      id: 9,
      text: "What is {player}'s favorite color to wear?",
      options: ["Black & Neutrals", "Bright, loud colors", "Blue & Cool tones", "Earth tones"]
    },
    {
      id: 10,
      text: "How does {player} act when they are hungry?",
      options: ["Angry (Hangry!)", "Super quiet", "Whiny and dramatic", "Normal, they just eat"]
    },
    {
      id: 11,
      text: "Who is more romantic?",
      options: ["Me", "You", "Both of us", "Neither of us is cheesy"]
    },
    {
      id: 12,
      text: "If {player} could drink one thing forever, what is it?",
      options: ["Coffee or Tea", "Soda", "Beer, Wine or Cocktails", "Just water"]
    },
    {
      id: 13,
      text: "Who is more likely to be late?",
      options: ["Me", "You", "We're always late together", "We are always on time"]
    },
    {
      id: 14,
      text: "What's {player}'s favorite movie genre?",
      options: ["Action & Sci-Fi", "Comedy", "Horror & Thriller", "Romance & Drama"]
    },
    {
      id: 15,
      text: "Who falls asleep first while watching a movie?",
      options: ["Me", "You", "It’s a 50/50 chance", "We both stay awake"]
    },
    {
      id: 16,
      text: "What animal represents {player} best?",
      options: ["A lazy cat", "A loyal, energetic dog", "A wild monkey", "A wise, quiet owl"]
    },
    {
      id: 17,
      text: "What's {player}'s worst habit?",
      options: ["Leaving things around", "Being on their phone too much", "Overthinking everything", "Interrupting people"]
    },
    {
      id: 18,
      text: "What was {player}'s first impression of {partner}?",
      options: ["You were hilarious", "You were super attractive", "You were a bit weird/crazy", "You were intimidating"]
    },
    {
      id: 19,
      text: "Who said \"I love you\" first?",
      options: ["Me", "You", "We basically said it together", "Honestly, I don't remember"]
    },
    {
      id: 20,
      text: "What is {player}'s biggest pet peeve?",
      options: ["Slow walkers or bad drivers", "Loud chewing", "People being late", "Messiness or bad hygiene"]
    },
    {
      id: 21,
      text: "If we won the lottery, what would we do first?",
      options: ["Travel the world", "Buy a huge house", "Invest it responsibly", "Buy stupid, fun stuff"]
    },
    {
      id: 22,
      text: "Who is the funny one in the relationship?",
      options: ["Me", "You", "We have our own inside jokes", "Neither, we take ourselves too seriously"]
    },
    {
      id: 23,
      text: "What does {player} love most about {partner}?",
      options: ["Your looks", "Your sense of humor", "Your kindness and heart", "Your brain/intelligence"]
    },
    {
      id: 24,
      text: "What is {player}'s dream vacation?",
      options: ["A relaxing beach resort", "A big, busy city", "Cabins and mountains", "Backpacking and adventure"]
    },
    {
      id: 25,
      text: "Who takes the longest in the shower?",
      options: ["Me", "You", "Exact same amount of time", "Whoever is washing their hair"]
    },
    {
      id: 26,
      text: "What is {player}'s go-to fast food?",
      options: ["McDonald's or Burger King", "Pizza", "Tacos / Mexican food", "Fried Chicken"]
    },
    {
      id: 27,
      text: "Who is more dramatic?",
      options: ["Me", "You", "Both of us make a scene", "We are super chill"]
    },
    {
      id: 28,
      text: "What’s our best shared memory?",
      options: ["Our first date", "Our first trip together", "A random, hilarious moment", "A special anniversary/celebration"]
    },
    {
      id: 29,
      text: "Who uses their phone the most?",
      options: ["Me", "You", "We are both addicted", "We barely touch them when we're together"]
    },
    {
      id: 30,
      text: "If {player} had a superpower, what would it be?",
      options: ["Flying", "Invisibility", "Reading minds", "Teleportation"]
    },
    {
      id: 31,
      text: "Who is the better driver?",
      options: ["Me", "You", "We both drive like crazy", "We both drive like grandpas/grandmas"]
    },
    {
      id: 32,
      text: "What is {player}'s favorite dessert?",
      options: ["Chocolate anything", "Ice cream", "Cake or pie", "I prefer salty food over sweets"]
    },
    {
      id: 33,
      text: "Who is more likely to start dancing in public?",
      options: ["Me", "You", "We’d definitely do it together", "Absolutely neither of us"]
    },
    {
      id: 34,
      text: "What’s {player}'s shoe size?",
      options: ["35 - 37", "38 - 40", "41 - 43", "44+ (Bigfoot)"]
    },
    {
      id: 35,
      text: "Who is more competitive?",
      options: ["Me", "You", "We fight over board games", "We don't care about winning"]
    },
    {
      id: 36,
      text: "How does {player} prefer to text?",
      options: ["Short, quick texts", "Huge paragraphs", "Voice notes", "I'd rather just call"]
    },
    {
      id: 37,
      text: "What kind of music does {player} listen to the most?",
      options: ["Pop & Top Hits", "Rock & Indie", "Hip Hop, Rap or Funk", "Country or Acoustic"]
    },
    {
      id: 38,
      text: "Who is more likely to survive a zombie apocalypse?",
      options: ["Me", "You", "We’d make a badass team", "We’d die on day one"]
    },
    {
      id: 39,
      text: "What is {player}'s biggest fear?",
      options: ["Spiders and bugs", "Heights", "Losing family or you", "Failure"]
    },
    {
      id: 40,
      text: "Who is the \"planner\" in the relationship?",
      options: ["Me", "You", "We split it evenly", "We just wing it"]
    },
    {
      id: 41,
      text: "What’s {player}'s favorite season?",
      options: ["Summer", "Winter", "Spring", "Fall (Autumn)"]
    },
    {
      id: 42,
      text: "Who is more sociable at a party?",
      options: ["Me", "You", "We both talk to everyone", "We just talk to each other in the corner"]
    },
    {
      id: 43,
      text: "If we had a free day together, what would we do?",
      options: ["Sleep and relax", "Go on an adventure outdoors", "Go shopping and eat out", "Play games or watch movies at home"]
    },
    {
      id: 44,
      text: "Who takes more photos?",
      options: ["Me", "You", "We take equal amounts", "We always forget to take pictures"]
    },
    {
      id: 45,
      text: "What is {player}'s favorite physical feature of {partner}?",
      options: ["Eyes and Face", "Smile and Lips", "Booty or Chest", "Arms or Back"]
    },
    {
      id: 46,
      text: "Who is more likely to bring home a stray animal?",
      options: ["Me", "You", "We already did this", "We would never"]
    },
    {
      id: 47,
      text: "What is {player}'s morning routine like?",
      options: ["Wake up early and energized", "Hit snooze 5 times", "Need coffee immediately", "Always rushing because I'm late"]
    },
    {
      id: 48,
      text: "Who gives better gifts?",
      options: ["Me", "You", "We both nail it", "We prefer experiences over gifts"]
    },
    {
      id: 49,
      text: "What would be the title of our movie?",
      options: ["A romantic comedy", "A crazy adventure", "A drama with a happy ending", "A sitcom"]
    },
    {
      id: 50,
      text: "When did {player} know that {partner} was \"the one\"?",
      options: ["Right when we met", "After our first big trip/milestone", "During a random everyday moment", "I'm still figuring it out (joke!)"]
    }
  ]
};
