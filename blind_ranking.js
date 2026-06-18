// ==========================================================================
// BLIND RANKING — Categorias / Categories
// --------------------------------------------------------------------------
// As categorias vêm do quizei.com. As imagens são servidas pela CDN do quizei
// (estáveis e IDÊNTICAS para os dois jogadores), então cada item sempre mostra
// a MESMA foto temática — sem mais imagens aleatórias/divergentes.
//
// As ilustrações do quizei têm um título em turco "queimado" no topo da imagem;
// nós cortamos esse topo via CSS (.blind-image-frame) e mostramos apenas os
// rótulos traduzidos (EN/PT) abaixo.
//
// Para adicionar uma categoria nova: pegue o ID do jogo (gameId) e, para cada
// item, o ID da seleção (sel) + as traduções. A URL da imagem é derivada disso.
//   API: https://api-prod.quizei.com/v1/games/<gameId>
//        https://api-prod.quizei.com/v1/selections?gameId=<gameId>
// ==========================================================================

function quizeiImage(gameId, sel) {
  return `https://cdn.quizei.com/game/${gameId}/game-selections/${sel}/image/original/image.webp`;
}

const quizeiCategories = [
  {
    id: "breakup_reasons",
    gameId: "6820adb11dafdc3f020db980", // "Ne Kadar Ayrılma Sebebi?? #1"
    emoji: "💔",
    title: { pt: "Motivo pra Terminar?", en: "A Reason to Break Up?" },
    // crop = fração do topo da imagem a esconder (remove o título turco embutido).
    items: [
      { sel: "6820ae061dafdc3f020db9b9", crop: 0.24, en: "Sleeping over at an old crush's place", pt: "Dormir na casa de uma antiga paquera" },
      { sel: "6820ae051dafdc3f020db9b3", crop: 0.23, en: "Secretly texting their ex",            pt: "Trocar mensagens com o ex escondido" },
      { sel: "6820ae041dafdc3f020db9aa", crop: 0.24, en: "Flirting with the bartender for free drinks", pt: "Flertar com o barman por drinks grátis" },
      { sel: "6820ade81dafdc3f020db98f", crop: 0.24, en: "Introducing you as just a friend",     pt: "Te apresentar só como amigo(a)" },
      { sel: "6820adff1dafdc3f020db998", crop: 0.24, en: "Hiding their phone when a text comes in", pt: "Esconder o celular quando chega mensagem" },
      { sel: "6820ae0b1dafdc3f020db9d7", crop: 0.24, en: "Being close friends with someone who hates you", pt: "Ser amigo(a) íntimo(a) de quem te odeia" },
      { sel: "6820ae031dafdc3f020db9a1", crop: 0.35, en: "Finishing your show without you",      pt: "Terminar a série de vocês sem você" },
      { sel: "6820ae091dafdc3f020db9c5", crop: 0.23, en: "Dancing with someone else at a party", pt: "Dançar com outra pessoa na festa" },
      { sel: "6820ae0b1dafdc3f020db9ce", crop: 0.17, en: "Following Instagram models",           pt: "Seguir modelos no Instagram" },
      { sel: "6820ae0b1dafdc3f020db9dd", crop: 0.17, en: "Using Snapchat WAY too much",           pt: "Usar MUITO o Snapchat" }
    ]
  }
];

// Constrói a estrutura bilíngue que o app consome: { pt: [...], en: [...] }.
const blindRankingTopics = (() => {
  const built = { pt: [], en: [] };
  quizeiCategories.forEach(cat => {
    ["pt", "en"].forEach(lang => {
      built[lang].push({
        id: cat.id,
        emoji: cat.emoji,
        title: cat.title[lang],
        items: cat.items.map(it => ({
          name: it[lang],
          image: quizeiImage(cat.gameId, it.sel),
          crop: it.crop != null ? it.crop : 0.25
        }))
      });
    });
  });
  return built;
})();
