// ==========================================================================
// BLIND RANKING - Categorias (fonte: quizei.com)
// Imagens via CDN do quizei (estaveis, identicas para os dois jogadores).
//   type "img"        = imagem + rotulo (crop esconde o titulo turco do topo)
//   type "imgnolabel" = so imagem (rankeia pela foto, sem rotulo)
//   type "text"       = so texto (sem imagem)
// crop = fracao do topo escondida via CSS (.blind-image-frame).
// ==========================================================================

function quizeiImage(gameId, sel) {
  return `https://cdn.quizei.com/game/${gameId}/game-selections/${sel}/image/original/image.webp`;
}

const quizeiCategories = [
  {
    id: "breakup_reasons", gameId: "6820adb11dafdc3f020db980", emoji: "💔", type: "img", crop: 0.0,
    title: { pt: "Motivo pra Terminar?", en: "A Reason to Break Up?" },
    items: [
      { sel: "6820ae061dafdc3f020db9b9", crop: 0.24, en: "Sleeping over at an old crush's place", pt: "Dormir na casa de uma antiga paquera" },
      { sel: "6820ae051dafdc3f020db9b3", crop: 0.23, en: "Secretly texting their ex", pt: "Trocar mensagens com o ex escondido" },
      { sel: "6820ae041dafdc3f020db9aa", crop: 0.24, en: "Flirting with the bartender for free drinks", pt: "Flertar com o barman por drinks grátis" },
      { sel: "6820ade81dafdc3f020db98f", crop: 0.24, en: "Introducing you as just a friend", pt: "Te apresentar só como amigo(a)" },
      { sel: "6820adff1dafdc3f020db998", crop: 0.24, en: "Hiding their phone when a text comes in", pt: "Esconder o celular quando chega mensagem" },
      { sel: "6820ae0b1dafdc3f020db9d7", crop: 0.24, en: "Being close friends with someone who hates you", pt: "Ser amigo(a) íntimo(a) de quem te odeia" },
      { sel: "6820ae031dafdc3f020db9a1", crop: 0.35, en: "Finishing your show without you", pt: "Terminar a série de vocês sem você" },
      { sel: "6820ae091dafdc3f020db9c5", crop: 0.23, en: "Dancing with someone else at a party", pt: "Dançar com outra pessoa na festa" },
      { sel: "6820ae0b1dafdc3f020db9ce", crop: 0.17, en: "Following Instagram models", pt: "Seguir modelos no Instagram" },
      { sel: "6820ae0b1dafdc3f020db9dd", crop: 0.17, en: "Using Snapchat WAY too much", pt: "Usar MUITO o Snapchat" },
    ]
  },
  {
    id: "bestie_photos", gameId: "683781707b43498f4f3cbe91", emoji: "💑", type: "imgnolabel", crop: 0.0,
    title: { pt: "Amor & Melhor Amigo(a)?", en: "Partner & Their Bestie?" },
    items: [
      { sel: "68383896efb45396073c921e" },
      { sel: "68383895efb45396073c9206" },
      { sel: "683781727b43498f4f3cbee4" },
      { sel: "68383896efb45396073c9258" },
      { sel: "683781727b43498f4f3cbee0" },
      { sel: "683781727b43498f4f3cbee2" },
      { sel: "68383895efb45396073c9218" },
      { sel: "68383896efb45396073c925a" },
      { sel: "683781717b43498f4f3cbe9d" },
      { sel: "68383896efb45396073c9272" },
    ]
  },
  {
    id: "jealousy3", gameId: "6824972b658a9283274b5168", emoji: "👀", type: "img", crop: 0.27,
    title: { pt: "Teste de Ciúmes #3", en: "Jealousy Test #3" },
    items: [
      { sel: "6824976e658a9283274b51c4", en: "Having a wandering eye", pt: "Ficar de olho em outras pessoas" },
      { sel: "6824976b658a9283274b51a9", en: "Being friends with an old crush", pt: "Ser amigo(a) de uma antiga paquera" },
      { sel: "68249749658a9283274b5173", en: "Fire-reacting other people's stories", pt: "Mandar fogo nos stories dos outros" },
      { sel: "6824976d658a9283274b51bb", en: "Always talking about someone else", pt: "Falar sempre de outra pessoa" },
      { sel: "68249761658a9283274b517c", en: "Dressing very revealingly", pt: "Se vestir muito provocante" },
      { sel: "68249767658a9283274b518e", en: "Posting risqué photos online", pt: "Postar fotos ousadas nas redes" },
      { sel: "68249767658a9283274b5194", en: "Getting EXTRA dolled up for events without you", pt: "Se arrumar MUITO pra eventos sem você" },
      { sel: "6824976b658a9283274b51a0", en: "Coming home very late", pt: "Chegar em casa muito tarde" },
      { sel: "68249762658a9283274b5185", en: "Being super happy doing things without you", pt: "Ser super feliz em coisas sem você" },
      { sel: "6824976c658a9283274b51b2", en: "Having very ATTRACTIVE coworkers", pt: "Ter colegas de trabalho muito ATRAENTES" },
    ]
  },
  {
    id: "rejection", emoji: "🙅", type: "text",
    title: { pt: "Formas de Ser Rejeitado(a)", en: "Ways to Get Rejected" },
    items: [
      { en: "You're not my type", pt: "Você não faz meu tipo" },
      { en: "You're like family to me", pt: "Você é como da família" },
      { en: "I think we're better as friends", pt: "Acho melhor a gente ser só amigos" },
      { en: "I can't see you that way", pt: "Não consigo te ver assim" },
      { en: "I'm seeing someone", pt: "Estou saindo com alguém" },
      { en: "I don't want to give false hope", pt: "Não quero te dar esperança" },
      { en: "I'm swamped with work", pt: "Estou atolado(a) de trabalho" },
      { en: "I need time for myself", pt: "Preciso de um tempo pra mim" },
      { en: "I'm focusing on my career", pt: "Estou focando na carreira" },
      { en: "I don't date coworkers", pt: "Não saio com ninguém do trabalho" },
    ]
  },
  {
    id: "cheating1", gameId: "68225939387866eedd3605e8", emoji: "🕵️", type: "img", crop: 0.3,
    title: { pt: "Suspeitas de Traição", en: "Cheating Suspicions" },
    items: [
      { sel: "68225980387866eedd360627", en: "Your relationship started as an affair", pt: "O namoro começou com uma traição" },
      { sel: "68225973387866eedd3605fc", en: "Deleting their WhatsApp chats", pt: "Apagar as conversas do WhatsApp" },
      { sel: "68225980387866eedd360622", en: "Being WAY too close with people online", pt: "Ser íntimo(a) DEMAIS com gente online" },
      { sel: "6822597a387866eedd360605", en: "A gut feeling you can't explain", pt: "Uma desconfiança sem explicação" },
      { sel: "68225980387866eedd360635", en: "Accusing YOU of cheating", pt: "Te acusar de traição" },
      { sel: "68225980387866eedd36060e", en: "Smelling of a different perfume", pt: "Cheirar a outro perfume" },
      { sel: "68225980387866eedd36062c", en: "Never letting their phone out of sight", pt: "Nunca largar o celular" },
      { sel: "68225980387866eedd360614", en: "Always busy when you call", pt: "Sempre ocupado(a) quando você liga" },
      { sel: "68225969387866eedd3605f3", en: "Unexplained expenses", pt: "Gastos que não sabe explicar" },
      { sel: "68225980387866eedd36061a", en: "Trying new things in bed", pt: "Tentar coisas novas na cama" },
    ]
  },
  {
    id: "jealousy2", gameId: "681f47db8b8961b5b5d5ea22", emoji: "😶‍🌫️", type: "imgnolabel", crop: 0.0,
    title: { pt: "Teste de Ciúmes #2", en: "Jealousy Test #2" },
    items: [
      { sel: "681f48e58b8961b5b5d5ea6f" },
      { sel: "681f48f18b8961b5b5d5eaae" },
      { sel: "681f48f58b8961b5b5d5eac6" },
      { sel: "681f48d98b8961b5b5d5ea3f" },
      { sel: "681f48ef8b8961b5b5d5ea99" },
      { sel: "681f48eb8b8961b5b5d5ea87" },
      { sel: "681f48f18b8961b5b5d5eab1" },
      { sel: "681f48e28b8961b5b5d5ea51" },
      { sel: "681f48e58b8961b5b5d5ea63" },
      { sel: "681f48e38b8961b5b5d5ea5a" },
    ]
  },
  {
    id: "annoying", gameId: "69cd6d033bad152cae7fad54", emoji: "😤", type: "img", crop: 0.35,
    title: { pt: "O Que Mais Incomoda no Namoro", en: "Most Annoying in a Relationship" },
    items: [
      { sel: "69cd6d113bad152cae7fadd4", en: "Enjoying it when someone hits on them", pt: "Gostar quando dão em cima e não impedir" },
      { sel: "69cd6d113bad152cae7fadd6", en: "Too close with a friend, calling them 'babe'", pt: "Íntimo(a) demais com amigo(a), chamando de 'amor'" },
      { sel: "69cd6d113bad152cae7fadd5", en: "Still keeping gifts from their ex", pt: "Guardar presentes do ex em casa" },
      { sel: "69cd6d113bad152cae7fadd2", en: "Always the same name in their search history", pt: "Sempre o mesmo nome no histórico de busca" },
      { sel: "69cd6d113bad152cae7fadcc", en: "Sharing your private photos to mock you", pt: "Mandar suas fotos íntimas pros amigos zoarem" },
      { sel: "69cd6d113bad152cae7fadd7", en: "Catching them staring at someone else", pt: "Pegar olhando fixo pra outra pessoa" },
      { sel: "69cd6d113bad152cae7fadd3", en: "Having a secret social media account", pt: "Ter uma conta secreta nas redes" },
      { sel: "69cd6d113bad152cae7fadd0", en: "Telling everyone everything about you two", pt: "Contar tudo de vocês pros outros" },
      { sel: "69cd6d113bad152cae7fadcf", en: "Being indifferent when you're excited", pt: "Ser indiferente quando você se empolga" },
      { sel: "69cd6d113bad152cae7fadda", en: "Forgetting to text you for hours while out", pt: "Esquecer de te responder por horas na night" },
    ]
  },
  {
    id: "redflags2", emoji: "🚩", type: "text",
    title: { pt: "Red Flags, Parte 2", en: "Red Flags, Part 2" },
    items: [
      { en: "Often comparing you to their ex", pt: "Te comparar com o ex toda hora" },
      { en: "Not respecting your boundaries", pt: "Não respeitar seus limites" },
      { en: "Belittling things you love", pt: "Menosprezar o que você gosta" },
      { en: "Saying they avoid emotional intimacy", pt: "Dizer que foge de intimidade emocional" },
      { en: "Only ever talking about themselves", pt: "Só falar de si e nunca perguntar de você" },
      { en: "Brushing off everything you say with 'hmm'", pt: "Responder tudo que você diz com 'hmm'" },
      { en: "On bad terms with everyone in your life", pt: "Estar de mal com todo mundo da sua vida" },
      { en: "Avoiding eye contact, always on their phone", pt: "Desviar o olhar e ficar no celular" },
      { en: "Treating jealousy as a virtue", pt: "Achar que ciúme é qualidade" },
      { en: "Having stalked you excessively", pt: "Ter te stalkeado demais" },
    ]
  },
  {
    id: "petnames", emoji: "🥰", type: "text",
    title: { pt: "Apelidos Carinhosos", en: "Terms of Endearment" },
    items: [
      { en: "Beautiful", pt: "Linda(o)" },
      { en: "My love", pt: "Meu amor" },
      { en: "Baby", pt: "Nenê" },
      { en: "My one and only", pt: "Meu bem" },
      { en: "Honey", pt: "Mel" },
      { en: "Meaning of my life", pt: "Sentido da minha vida" },
      { en: "My rose", pt: "Minha flor" },
      { en: "My little flower", pt: "Florzinha" },
      { en: "Babe", pt: "Bebê" },
      { en: "Lovey", pt: "Amorzinho" },
    ]
  },
  {
    id: "breakup2", gameId: "68268ef485357a5ebd16136c", emoji: "💔", type: "img", crop: 0.25,
    title: { pt: "Motivo pra Terminar? #2", en: "A Reason to Break Up? #2" },
    items: [
      { sel: "68268f9985357a5ebd1613a6", en: "Cheating", pt: "Trair" },
      { sel: "68268f9285357a5ebd16139d", en: "Acting on what others say", pt: "Agir pelo que os outros dizem" },
      { sel: "68268f9a85357a5ebd1613af", en: "Not listening to you", pt: "Não te ouvir" },
      { sel: "68268f9a85357a5ebd1613b5", en: "Going on vacation without you", pt: "Viajar sem você" },
      { sel: "68268f9e85357a5ebd1613ca", en: "No physical chemistry", pt: "Falta de química" },
      { sel: "68268f9b85357a5ebd1613c1", en: "Not controlling their temper", pt: "Não controlar a raiva" },
      { sel: "68268f8f85357a5ebd161394", en: "Jealousy", pt: "Ciúme" },
      { sel: "68268f8e85357a5ebd161382", en: "Long distance", pt: "Relação à distância" },
      { sel: "68268f9f85357a5ebd1613dc", en: "Not getting along with your family", pt: "Não se dar com sua família" },
      { sel: "68268f9f85357a5ebd1613d0", en: "Being overly clingy", pt: "Ser grudento(a) demais" },
    ]
  },
  {
    id: "breakup3", gameId: "68559fcc8c336fa0e5f360af", emoji: "💔", type: "img", crop: 0.27,
    title: { pt: "Motivo pra Terminar? #3", en: "A Reason to Break Up? #3" },
    items: [
      { sel: "6855a0988c336fa0e5f360d2", en: "Secretly giving out their number", pt: "Passar o número escondido" },
      { sel: "6855a09e8c336fa0e5f36114", en: "Netflix and chill (with someone else)", pt: "Netflix and chill (com outra pessoa)" },
      { sel: "6855a0978c336fa0e5f360c4", en: "Wearing their ex's gift", pt: "Usar o presente do ex" },
      { sel: "6855a09d8c336fa0e5f360fc", en: "Fire-reacting one person's stories", pt: "Mandar fogo no story de uma pessoa específica" },
      { sel: "6855a09d8c336fa0e5f36105", en: "Serenading someone", pt: "Fazer serenata pra alguém" },
      { sel: "6855a0988c336fa0e5f360d0", en: "Intense eye contact ;)", pt: "Trocar olhares intensos ;)" },
      { sel: "6855a0978c336fa0e5f360bc", en: "Gaming with someone else instead of you", pt: "Jogar com outra pessoa no seu lugar" },
      { sel: "6855a09c8c336fa0e5f360ec", en: "Giving or getting a jacket", pt: "Dar ou ganhar uma jaqueta" },
      { sel: "6855a0978c336fa0e5f360c6", en: "Setting someone as their wallpaper", pt: "Pôr foto de alguém no papel de parede" },
      { sel: "6855a09c8c336fa0e5f360f5", en: "Very intimate birthday messages", pt: "Mensagem de aniversário íntima demais" },
    ]
  },
  {
    id: "worstdate", gameId: "69b7356d11b2308d1293ea48", emoji: "📅", type: "img", crop: 0.0,
    title: { pt: "O Pior Encontro", en: "Worst Date Ever" },
    items: [
      { sel: "69b7356e11b2308d1293ea63", en: "Started flirting with someone else at the table", pt: "Começou a flertar com outra pessoa na mesa" },
      { sel: "69b7356e11b2308d1293ea57", en: "Asked for my friend's number afterwards", pt: "No fim, pediu o número da minha amiga" },
      { sel: "69b7356e11b2308d1293ea66", en: "Talked about their ex all night", pt: "Falou do ex a noite toda" },
      { sel: "69b7356e11b2308d1293ea64", en: "Showed up with their mom", pt: "Apareceu com a mãe" },
      { sel: "69b7356e11b2308d1293ea5f", en: "Said 'I didn't even want to come' mid-meal", pt: "No meio do jantar disse 'nem queria ter vindo'" },
      { sel: "69b7356e11b2308d1293ea5e", en: "Was incredibly rude to the waiter", pt: "Foi super grosso(a) com o garçom" },
      { sel: "69b7356e11b2308d1293ea60", en: "Mixed me up with someone else", pt: "Me confundiu com outra pessoa" },
      { sel: "69b7356e11b2308d1293ea62", en: "On their phone all night", pt: "Ficou no celular a noite toda" },
      { sel: "69b7356e11b2308d1293ea65", en: "Vanished when the bill came", pt: "Sumiu na hora da conta" },
      { sel: "69b7356e11b2308d1293ea5a", en: "Kept looking at the next table, not me", pt: "Ficou olhando a mesa do lado, não eu" },
    ]
  },
  {
    id: "supermarket", gameId: "69ba4f6d57d1eb5e0bd65f79", emoji: "🛒", type: "img", crop: 0.0,
    title: { pt: "Trancado(a) no Mercado", en: "Locked in a Supermarket" },
    items: [
      { sel: "69ba4f7057d1eb5e0bd66061", en: "Grilled meatballs & pasta", pt: "Almôndegas grelhadas & macarrão" },
      { sel: "69ba4f7057d1eb5e0bd66129", en: "Chicken skewers & bulgur", pt: "Espetinho de frango & bulgur" },
      { sel: "69ba4f7057d1eb5e0bd66071", en: "Mozzarella & beef-ham sandwich", pt: "Sanduíche de muçarela e presunto" },
      { sel: "69ba4f7057d1eb5e0bd66078", en: "Potato bake & spaghetti", pt: "Batata gratinada & espaguete" },
      { sel: "69ba4f7057d1eb5e0bd65f93", en: "Stuffed grape leaves", pt: "Charuto de folha de uva" },
      { sel: "69ba4f7057d1eb5e0bd66126", en: "Chicken döner wrap", pt: "Wrap de frango (döner)" },
      { sel: "69ba4f7057d1eb5e0bd66060", en: "Lamb over eggplant purée", pt: "Cordeiro com purê de berinjela" },
      { sel: "69ba4f7057d1eb5e0bd6607d", en: "Beef döner", pt: "Döner de carne" },
      { sel: "69ba4f7057d1eb5e0bd65fb3", en: "Crispy chicken wrap", pt: "Wrap de frango crocante" },
      { sel: "69ba4f7057d1eb5e0bd65fb0", en: "Çiğ köfte wrap (spiced bulgur)", pt: "Wrap de çiğ köfte (bulgur apimentado)" },
    ]
  },
  {
    id: "nuts", gameId: "6960c55de9b5bf6fa6dc3e1c", emoji: "🥜", type: "img", crop: 0.0,
    title: { pt: "Qual Petisco Primeiro?", en: "Which Snack First?" },
    items: [
      { sel: "6960c55ee9b5bf6fa6dc3e33", en: "Cashew", pt: "Castanha de caju" },
      { sel: "6960c55ee9b5bf6fa6dc3e2c", en: "Pistachio", pt: "Pistache" },
      { sel: "6960c55ee9b5bf6fa6dc3e2d", en: "Almond", pt: "Amêndoa" },
      { sel: "6960c55ee9b5bf6fa6dc3e30", en: "Hazelnut", pt: "Avelã" },
      { sel: "6960c55ee9b5bf6fa6dc3e35", en: "Black sunflower seeds", pt: "Semente de girassol preta" },
      { sel: "6960c55ee9b5bf6fa6dc3e31", en: "Peanut", pt: "Amendoim" },
      { sel: "6960c55ee9b5bf6fa6dc3e34", en: "Corn nuts", pt: "Milho torrado" },
      { sel: "6960c55ee9b5bf6fa6dc3e2e", en: "White sunflower seeds", pt: "Semente de girassol branca" },
      { sel: "6960c55ee9b5bf6fa6dc3e32", en: "Pumpkin seeds", pt: "Semente de abóbora" },
      { sel: "6960c55ee9b5bf6fa6dc3e2f", en: "Roasted chickpeas", pt: "Grão-de-bico torrado" },
    ]
  },
  {
    id: "pixar", gameId: "67b378ac05802cc2cf874c9a", emoji: "🎬", type: "img", crop: 0.0,
    title: { pt: "Melhor Filme da Pixar", en: "Best Pixar Movie" },
    items: [
      { sel: "67b378ae05802cc2cf874d0e", en: "Cars", pt: "Carros" },
      { sel: "67b378ae05802cc2cf874cf7", en: "Up", pt: "Up: Altas Aventuras" },
      { sel: "67b378b105802cc2cf874d3e", en: "Ratatouille", pt: "Ratatouille" },
      { sel: "67b378ae05802cc2cf874cd4", en: "WALL-E", pt: "WALL-E" },
      { sel: "67b378af05802cc2cf874d2c", en: "Toy Story", pt: "Toy Story" },
      { sel: "67b378ad05802cc2cf874cc8", en: "Monsters, Inc.", pt: "Monstros S.A." },
      { sel: "67b378b205802cc2cf874d5d", en: "Cars 2", pt: "Carros 2" },
      { sel: "67b378ae05802cc2cf874d14", en: "Coco", pt: "Viva: A Vida é uma Festa" },
      { sel: "67b378ae05802cc2cf874d06", en: "The Incredibles", pt: "Os Incríveis" },
      { sel: "67b378ad05802cc2cf874cc3", en: "Toy Story 3", pt: "Toy Story 3" },
    ]
  },
  {
    id: "guest", gameId: "6a12495360eff1170319f05a", emoji: "🙄", type: "img", crop: 0.33,
    title: { pt: "O Que Faz Expulsar a Visita?", en: "What Gets a Guest Kicked Out?" },
    items: [
      { sel: "6a1249cc60eff1170319f0b9", en: "Smearing greasy food everywhere", pt: "Comer algo gorduroso e lambuzar tudo" },
      { sel: "6a1249cc60eff1170319f0ba", en: "Throwing trash on the floor", pt: "Jogar lixo no chão" },
      { sel: "6a1249cc60eff1170319f0ae", en: "Smelling bad", pt: "Estar fedendo" },
      { sel: "6a1249cc60eff1170319f0c8", en: "Forgetting to flush", pt: "Esquecer de dar descarga" },
      { sel: "6a1249cc60eff1170319f0aa", en: "Fighting your neighbors while in the wrong", pt: "Brigar com seus vizinhos mesmo errado(a)" },
      { sel: "6a1249cc60eff1170319f0bc", en: "Snooping on your computer", pt: "Mexer no seu computador" },
      { sel: "6a1249cc60eff1170319f0c7", en: "Rummaging through your closet", pt: "Vasculhar seu guarda-roupa" },
      { sel: "6a1249cc60eff1170319f0be", en: "Commenting on your family photos", pt: "Comentar suas fotos de família" },
      { sel: "6a1249cc60eff1170319f0c4", en: "Smoking indoors without asking", pt: "Fumar dentro de casa sem pedir" },
      { sel: "6a1249cc60eff1170319f0ab", en: "Walking around half-naked", pt: "Andar pela casa seminu(a)" },
    ]
  },
  {
    id: "turnoff", emoji: "🚪", type: "text",
    title: { pt: "O Que Te Afasta na Hora?", en: "What Instantly Turns You Off?" },
    items: [
      { en: "Constantly lying", pt: "Mentir o tempo todo" },
      { en: "Talking down to you", pt: "Falar de forma humilhante" },
      { en: "Not wanting to spend time with you", pt: "Não querer passar tempo com você" },
      { en: "Being disrespectful or cursing", pt: "Ser desrespeitoso(a) ou xingar" },
      { en: "Not caring at all", pt: "Não ligar a mínima" },
      { en: "Showing zero interest", pt: "Não demonstrar interesse" },
      { en: "Always blaming you", pt: "Te culpar por tudo" },
      { en: "Being too flirty", pt: "Ser muito paquerador(a)" },
      { en: "Always bringing up the past", pt: "Viver remoendo o passado" },
      { en: "Constantly criticizing", pt: "Criticar o tempo todo" },
    ]
  },
  {
    id: "breakuptext", emoji: "📱", type: "text",
    title: { pt: "Mensagem de Término", en: "Breakup Text" },
    items: [
      { en: "There's someone else", pt: "Tem outra pessoa" },
      { en: "My spouse found out, don't call me", pt: "Meu cônjuge descobriu, não me liga" },
      { en: "I regret the night I met you", pt: "Me arrependo da noite que te conheci" },
      { en: "You weren't worth it...", pt: "Você não valia a pena..." },
      { en: "I'm bored of you", pt: "Cansei de você" },
      { en: "I tried to love you, it didn't work", pt: "Tentei te amar, não rolou" },
      { en: "We just drain each other", pt: "A gente só se desgasta" },
      { en: "Let's take a break, I need to think", pt: "Vamos dar um tempo, preciso pensar" },
      { en: "Babe, the 'café' was actually my dad", pt: "Amor, o 'café' era meu pai" },
      { en: "You're not worth this, I get it now", pt: "Você não vale isso, entendi agora" },
    ]
  },
  {
    id: "activities", gameId: "68c6c29ccf1ea85684537166", emoji: "💞", type: "img", crop: 0.22,
    title: { pt: "Coisas pra Fazer a Dois", en: "Things to Do Together" },
    items: [
      { sel: "68c6c29ecf1ea8568453717a", en: "Netflix and chill", pt: "Netflix and chill" },
      { sel: "68c6c29ecf1ea85684537172", en: "Beach walk", pt: "Caminhada na praia" },
      { sel: "68c6c29ecf1ea8568453717d", en: "Street food tour", pt: "Tour de comida de rua" },
      { sel: "68c6c29ecf1ea85684537174", en: "Picnic", pt: "Piquenique" },
      { sel: "68c6c29ecf1ea85684537176", en: "Amusement park", pt: "Parque de diversões" },
      { sel: "68c6c29ecf1ea85684537177", en: "Concert", pt: "Show" },
      { sel: "68c6c29ecf1ea8568453717c", en: "Sports event", pt: "Evento esportivo" },
      { sel: "68c6c29ecf1ea85684537175", en: "Movies", pt: "Cinema" },
      { sel: "68c6c29ecf1ea85684537173", en: "Coffee date", pt: "Date no café" },
      { sel: "68c6c29ecf1ea85684537178", en: "Cooking class", pt: "Aula de culinária" },
    ]
  },
  {
    id: "dreamhouse", gameId: "69de41707ce05eb19059b832", emoji: "🏡", type: "imgnolabel", crop: 0.0,
    title: { pt: "Casa dos Sonhos?", en: "Your Dream House?" },
    items: [
      { sel: "69de41747ce05eb19059b851" },
      { sel: "69de41747ce05eb19059b857" },
      { sel: "69de41747ce05eb19059b84a" },
      { sel: "69de41747ce05eb19059b846" },
      { sel: "69de41747ce05eb19059b861" },
      { sel: "69de41747ce05eb19059b85f" },
      { sel: "69de41747ce05eb19059b853" },
      { sel: "69de41747ce05eb19059b860" },
      { sel: "69de41747ce05eb19059b842" },
      { sel: "69de41747ce05eb19059b85e" },
    ]
  },
  {
    id: "jealousy6", gameId: "696689435b27a50f771a6270", emoji: "👀", type: "img", crop: 0.3,
    title: { pt: "Teste de Ciúmes #6", en: "Jealousy Test #6" },
    items: [
      { sel: "696689455b27a50f771a6284", en: "Showering with their bestie (clothed)", pt: "Tomar banho com o(a) melhor amigo(a) (de roupa)" },
      { sel: "696689455b27a50f771a6287", en: "Kissing their guy bestie on the cheek", pt: "Beijar o melhor amigo no rosto" },
      { sel: "696689455b27a50f771a6288", en: "Giving their guy bestie a foot massage", pt: "Fazer massagem nos pés do melhor amigo" },
      { sel: "696689455b27a50f771a6282", en: "Hugging their guy bestie", pt: "Abraçar o melhor amigo" },
      { sel: "696689455b27a50f771a6283", en: "Tickling with their guy bestie", pt: "Fazer cócegas no melhor amigo" },
      { sel: "696689455b27a50f771a6289", en: "Brushing their guy bestie's hair", pt: "Pentear o cabelo do melhor amigo" },
      { sel: "696689455b27a50f771a6285", en: "Their guy bestie giving them a piggyback", pt: "O melhor amigo te carregar nas costas" },
      { sel: "696689455b27a50f771a6286", en: "Watching a movie with their guy bestie", pt: "Assistir filme com o melhor amigo" },
      { sel: "696689455b27a50f771a6280", en: "Giving their guy bestie a massage", pt: "Fazer massagem no melhor amigo" },
      { sel: "696689455b27a50f771a6281", en: "Getting a massage from their guy bestie", pt: "Receber massagem do melhor amigo" },
    ]
  },
  {
    id: "breakupreasons", gameId: "68cdd2552db8aeeb4905a8f2", emoji: "💔", type: "img", crop: 0.35,
    title: { pt: "Motivos de Término", en: "Reasons to Break Up" },
    items: [
      { sel: "68cdd2572db8aeeb4905a909", en: "Still secretly seeing their ex", pt: "Ainda ver o ex escondido" },
      { sel: "68cdd2572db8aeeb4905a903", en: "Finding flirty DMs with someone else", pt: "Achar mensagens de flerte com outra pessoa" },
      { sel: "68cdd2572db8aeeb4905a904", en: "Belittling you in front of friends", pt: "Te criticar na frente dos amigos" },
      { sel: "68cdd2572db8aeeb4905a902", en: "Pulling away instead of supporting you", pt: "Se afastar em vez de te apoiar" },
      { sel: "68cdd2572db8aeeb4905a905", en: "Constantly lying, even small things", pt: "Mentir sempre, mesmo coisas pequenas" },
      { sel: "68cdd2572db8aeeb4905a906", en: "Hiding their phone and changing the password", pt: "Esconder o celular e trocar a senha" },
      { sel: "68cdd2572db8aeeb4905a8fe", en: "Telling others your secret", pt: "Contar um segredo seu pros outros" },
      { sel: "68cdd2572db8aeeb4905a8ff", en: "Smothering you with jealousy fits", pt: "Te sufocar com crises de ciúme" },
      { sel: "68cdd2572db8aeeb4905a907", en: "Siding with their family against you", pt: "Ficar do lado da família contra você" },
      { sel: "68cdd2572db8aeeb4905a901", en: "Taking a job in another city without telling you", pt: "Aceitar emprego em outra cidade sem te contar" },
    ]
  }
];

const blindRankingTopics = (() => {
  const built = { pt: [], en: [] };
  quizeiCategories.forEach(cat => {
    ["pt", "en"].forEach(lang => {
      built[lang].push({
        id: cat.id,
        emoji: cat.emoji,
        type: cat.type,
        title: cat.title[lang],
        items: cat.items.map(it => ({
          name: (cat.type === "imgnolabel") ? "" : (it[lang] || ""),
          image: (cat.type === "text") ? null : quizeiImage(cat.gameId, it.sel),
          crop: (it.crop != null) ? it.crop : (cat.crop != null ? cat.crop : 0.25)
        }))
      });
    });
  });
  return built;
})();
