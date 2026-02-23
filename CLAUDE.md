# CLAUDE.md – Site de Engenharia

Você é o assistente de desenvolvimento deste projeto de site institucional de engenharia.
Siga as regras abaixo sempre que trabalhar neste repositório.

## Objetivo do projeto

- Criar um site estático de uma empresa de **engenharia**, moderno e responsivo.
- Páginas obrigatórias:
  - Home (apresentação geral, serviços/áreas de atuação).
  - Quem Somos (texto será definido depois; usar conteúdo placeholder claro).
  - Portfólio (lista de projetos de engenharia, fácil de manter por não-desenvolvedores).
  - Entre em Contato (formulário que envia e-mail para um endereço configurável no futuro).
- Código limpo, simples e fácil de manter.

## Stack e organização sugerida

- Frontend em HTML + CSS + JavaScript puro OU framework leve (por exemplo, React ou Next.js) apenas se explicitamente solicitado.
- Estrutura sugerida (pode ajustar, mas mantenha documentado aqui se mudar):
  - `/public` ou `/assets`: imagens, ícones, logos.
  - `/src`:
    - `/pages`: arquivos das páginas (ex.: `index.html`, `about.html`, `portfolio.html`, `contact.html`) ou componentes de página se usar framework.
    - `/components`: componentes reutilizáveis (header, footer, cards de portfólio).
    - `/styles`: arquivos de estilo (CSS/SCSS).
    - `/data`: arquivo(s) de dados do portfólio.
- Configurar um comando simples de build/serve (por exemplo, `npm run dev` e `npm run build`) e documentar no README.

## Portfólio – regra de manutenção simples

O portfólio deve ser alimentado por um único arquivo de dados, para que uma pessoa sem conhecimento de código consiga adicionar projetos sem quebrar o layout.

- Preferência: arquivo `src/data/portfolio.json` (ou `.yaml` se você explicar claramente no README).
- Estrutura sugerida para cada item:
  - `title`: nome do projeto.
  - `description`: breve descrição.
  - `category`: tipo de projeto (ex.: estrutural, civil, elétrico).
  - `location`: cidade/estado.
  - `year`: ano de execução.
  - `image`: caminho da imagem ilustrativa (opcional).
  - `highlight`: booleano opcional para destacar alguns projetos.
- A página de portfólio deve:
  - Ler esse arquivo de dados.
  - Renderizar os projetos automaticamente.
  - Garantir que, ao adicionar um novo item no arquivo, o layout continue intacto sem qualquer alteração de código.
- Crie exemplos de 3–5 projetos fictícios como seed para demonstrar o formato.

## Página "Quem Somos"

- Criar a página com estrutura completa (seções, títulos, layout), mas com textos claramente marcados como placeholders, ex.:
  - “TEXTO A DEFINIR – HISTÓRIA DA EMPRESA”.
- Não inventar informações reais sobre a empresa.
- Facilitar a edição futura deixando os textos em um único local:
  - ou num arquivo de conteúdo (ex.: `src/data/about.json` ou `about.md`);
  - ou bem documentado no HTML/JS para fácil troca posterior.

## Página "Entre em Contato" (formulário + e-mail)

- Criar página com formulário contendo campos típicos:
  - Nome, E-mail, Telefone (opcional), Assunto, Mensagem.
- O objetivo é que o formulário envie um e-mail para um endereço que definiremos depois.
- Implementar com uma das abordagens abaixo (pode propor a melhor, mas siga estas regras):
  - Preparar um endpoint `POST /api/contact` ou similar, que receba os dados e chame um serviço de envio de e-mail (por exemplo, via serviço terceirizado/SMTP) – deixar o código pronto para receber as credenciais depois.
  - OU, se optarmos por solução estática + serviço externo (Formspree, EmailJS, etc.), deixe o HTML preparado para integração, com comentários explicando onde inserir as chaves/URLs.
- Sempre:
  - Validar dados no frontend (campos obrigatórios, formato de e-mail).
  - Prever um estado de sucesso/erro amigável para o usuário.
  - Isolar lógica de envio em um único arquivo de backend ou função, para facilitar manutenção.

## Identidade Visual e Design System

### Marca CETA – Montagens e Projetos

A identidade visual da marca é baseada no logotipo fornecido em `brand_assets/ceta-logo-04.png`. O site deve refletir essa identidade através de:

- **Cores primárias**:
  - `#0d0d0d` – fundo principal (quase preto)
  - `#F7941D` – laranja CETA (acento primário, usado em botões, destaques e hover)
  - `#ffffff` – branco (texto principal)

- **Cores complementares**:
  - `rgba(255,255,255,0.5)` – texto secundário (muted)
  - `#1a1a1a` – cards e seções alternadas
  - `#111111` – seções de contraste suave

### Tipografia e Espaçamento

- **Fonte**: Space Grotesk (Google Fonts) – substituta gratuita de PPNeueMontreal, com mesma pegada moderna/geométrica
- **Peso**: 500 (padrão)
- **Letter-spacing**: -0.03em (compacted, elegante)
- **Tipografia Fluid**: usar `clamp()` para escalabilidade responsiva, ex:
  - Heading XL: `clamp(40px, 5.5vw, 72px)`
  - Body: `clamp(14px, 1.4vw, 18px)`
- **Estrutura CSS**: variáveis custom properties (`--c0..--c5`, `--f-s, --f-b, --f-xl`, etc.)

### Referência de Design

O site segue a estética do site `brand_assets/gcventures.vc__ref=onepagelove.png`:
- **Layout**: dark theme (fundo escuro), cards em seções claras
- **Hierarquia**: tipografia bold e compacta, contraste laranja sobre escuro
- **Componentes**: cards com hover effect, botões com acento, grid layouts
- **Espaçamento**: gaps generosos, margem lateral responsiva, max-width contenha porém não sufoque

### Decisões Técnicas

- **Framework**: nenhum – HTML + CSS + JavaScript puro
- **Build**: scripts npm simples (`dev`, `build`)
- **Email**: EmailJS (serviço externo, chaves em `src/js/contact.js`, prontas para substituir)
- **Responsividade**: breakpoints 480px (mobile), 768px (tablet), 1440px+ (desktop)

---

## Design e skill de frontend

Use um skill de design de frontend baseado em imagem como referência de estilo, tipografia, cores e layout.

- Sempre que for criar ou refatorar layout, chame explicitamente o skill `frontend-design` (ou equivalente) com instruções do tipo:
  - “Use o skill de design de frontend carregando a imagem de referência fornecida pelo usuário para guiar tipografia, paleta de cores, espaçamentos e componentes.”
- Objetivo visual:
  - Site limpo, profissional e confiável, adequado a uma empresa de engenharia.
  - Evitar aparência genérica de template; trazer uma identidade visual clara (tipografia, cores, hierarquia).
  - Garantir bom contraste e acessibilidade básica (tamanhos de fonte legíveis, contraste adequado, labels em inputs).

## Acessibilidade e responsividade

- Layout totalmente responsivo (mobile-first ou desktop-first com breakpoints bem definidos).
- Boas práticas mínimas:
  - Uso adequado de tags semânticas (`header`, `main`, `section`, `footer`).
  - Textos alternativos em imagens importantes.
  - Campos de formulário com `label` associados.
  - Navegação clara (menu fixo ou facilmente acessível em mobile).

## Boas práticas de código

- Manter o código simples, direto e bem organizado.
- Nomes de arquivos, componentes e funções descritivos.
- Comentários só onde realmente ajudam; evitar comentários redundantes.
- Não gerar arquivos ou dependências desnecessárias.
- Se usar Node/npm:
  - Criar scripts básicos no `package.json` (ex.: `dev`, `build`, `start`).
  - Evitar bibliotecas pesadas quando uma solução simples resolve.

## Como colaborar com este projeto

Quando fizer alterações substanciais, você deve:

1. Atualizar este `CLAUDE.md` se:
   - A estrutura de pastas mudar.
   - A forma de manter o portfólio mudar.
   - A lógica de envio de contato mudar.
2. Atualizar o `README.md` com:
   - Como rodar o projeto localmente.
   - Como buildar/deployar.
   - Como editar o portfólio e os textos de “Quem Somos”.

Mantenha este arquivo conciso e útil; se ficar muito grande, simplifique e remova regras que não são mais necessárias.
