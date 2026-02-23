# CETA – Montagens e Projetos | Site Institucional

Site estático moderno e responsivo para a empresa CETA de engenharia, desenvolvido com **HTML + CSS + JavaScript puro**.

## 📋 Características

- ✅ **4 Páginas**: Home, Quem Somos, Portfólio, Entre em Contato
- ✅ **Design Dark Premium**: Inspirado em gcventures.vc, com cores corporativas CETA
- ✅ **Portfólio Dinâmico**: Carregado de arquivo JSON, sem necessidade de editar código
- ✅ **Formulário de Contato**: Validação frontend + integração com EmailJS (pronto para configurar)
- ✅ **Responsivo**: Mobile-first, breakpoints em 480px, 768px e 1440px+
- ✅ **Performance**: Sem frameworks pesados, carregamento rápido
- ✅ **Acessibilidade**: Semântica HTML, labels em formulários, contraste adequado

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Rodar Servidor Local (Desenvolvimento)

```bash
npm run dev
```

O site abrirá em `http://localhost:3000`.

**Alternativa**: Abra `index.html` diretamente no navegador (funciona sem servidor).

### 3. Build para Produção

```bash
npm run build
```

O site é estático e pronto para upload em qualquer hospedagem (GitHub Pages, Netlify, etc).

---

## 📁 Estrutura do Projeto

```
site/
├── index.html                    # Home
├── about.html                    # Quem Somos
├── portfolio.html                # Portfólio
├── contact.html                  # Entre em Contato
├── assets/
│   └── images/
│       └── ceta-logo.png        # Logo da marca
├── src/
│   ├── styles/
│   │   └── main.css             # Estilos globais + design system
│   ├── js/
│   │   ├── main.js              # Nav, header, smooth scroll
│   │   ├── portfolio.js         # Carrega e renderiza portfólio
│   │   └── contact.js           # Validação de formulário + EmailJS
│   └── data/
│       ├── portfolio.json       # Projetos (EDITAR AQUI)
│       └── about.json           # Textos Quem Somos (EDITAR AQUI)
├── brand_assets/
│   ├── ceta-logo-04.png        # Logo original
│   └── gcventures.vc__ref=onepagelove.png  # Referência visual
├── package.json
├── CLAUDE.md                     # Instruções do projeto
└── README.md                     # Este arquivo
```

---

## 🎨 Design System

### Cores CETA

| Nome          | Valor       | Uso                        |
|---------------|-------------|----------------------------|
| Background    | `#0d0d0d`   | Fundo principal (quase preto) |
| Texto         | `#ffffff`   | Texto principal            |
| Laranja CETA  | `#F7941D`   | Acento primário (botões, highlights) |
| Texto Muted   | `rgba(255,255,255,0.5)` | Texto secundário |
| Card BG       | `#1a1a1a`   | Fundo de cards             |
| Alt BG        | `#111111`   | Seções alternadas          |

### Tipografia

- **Fonte**: Space Grotesk (Google Fonts)
- **Peso**: 500 padrão, 600 headings
- **Letter-spacing**: -0.03em (compacted)
- **Tipografia Fluid**: Escalável com viewport via `clamp()`

---

## ✏️ Como Editar Conteúdo

### 1. Adicionar/Editar Projetos no Portfólio

**Arquivo**: `src/data/portfolio.json`

Basta adicionar um novo objeto ao array JSON:

```json
{
  "id": 6,
  "title": "Nome do Novo Projeto",
  "description": "Breve descrição do projeto.",
  "category": "Estrutural",
  "location": "Cidade, Estado",
  "year": 2024,
  "highlight": true,
  "image": ""
}
```

**Categorias disponíveis**:
- `Estrutural`
- `Civil`
- `Elétrico`
- `Industrial`

O portfólio aparecerá automaticamente na página sem necessidade de editar código HTML.

### 2. Editar Textos de "Quem Somos"

**Arquivo**: `src/data/about.json`

Substitua os placeholders `[TEXTO A DEFINIR]` pelos textos reais:

```json
{
  "story": "Sua história aqui...",
  "mission": "Sua missão aqui...",
  "vision": "Sua visão aqui...",
  "values": [
    {
      "title": "Qualidade",
      "description": "Descrição do valor..."
    },
    ...
  ]
}
```

### 3. Editar Textos nas Páginas HTML

Abra os arquivos `.html` diretamente e procure por:
- **Contato**: Email, telefone e endereço em `contact.html` (linhas 70-85)
- **Footer**: Links e info em todas as páginas

---

## 📧 Configurar Formulário de Contato

O formulário está pronto para **EmailJS** (serviço gratuito que envia emails).

### Passo 1: Criar Conta EmailJS

1. Acesse [emailjs.com](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Adicione um "Service" (ex: Gmail)
4. Crie um "Template" para receber emails

### Passo 2: Configurar Chaves

**Arquivo**: `src/js/contact.js` (linhas 8-10)

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123...';   // De emailjs.com
const EMAILJS_TEMPLATE_ID = 'template_xyz789...'; // De emailjs.com
const EMAILJS_PUBLIC_KEY = 'abc123_def456...';    // De emailjs.com
```

### Passo 3: Descomente o SDK EmailJS

**Arquivo**: `contact.html` (linha 9)

Descomente a linha:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

### Passo 4: Configurar Email Destino

**Arquivo**: `src/js/contact.js` (linha 67)

```javascript
to_email: 'seu-email@empresa.com', // Seu email aqui
```

**Pronto!** O formulário agora enviará emails para você.

---

## 🛠️ Customização Avançada

### Mudar Cores da Marca

**Arquivo**: `src/styles/main.css` (linhas 22-29)

```css
:root {
  --c0: #0d0d0d;     /* Altere aqui */
  --c1: #ffffff;
  --c2: #F7941D;     /* Altere a cor laranja */
  /* ... */
}
```

### Adicionar Nova Página

1. Crie `nova-pagina.html` com o mesmo template das outras
2. Adicione link no `<nav>` de todas as páginas
3. Use as mesmas classes CSS para consistência

### Customizar Tipografia

Mude a URL do Google Fonts em `src/styles/main.css` (linha 2).

---

## 🔍 Verificação do Site

### Checklist Pré-Lançamento

- [ ] Abra cada página em navegador desktop, tablet e mobile
- [ ] Clique em todos os links do navegação
- [ ] Teste os filtros do portfólio
- [ ] Preencha e submeta o formulário de contato
- [ ] Verifique que o email foi recebido
- [ ] Teste responsividade em 480px, 768px, 1440px
- [ ] Verifique contraste de cores (acessibilidade)
- [ ] Atualize links de email, telefone e redes sociais reais

---

## 🚢 Deploy

### GitHub Pages

1. Fazer upload do repositório para GitHub
2. Ir em **Settings > Pages**
3. Selecionar `main` branch como source
4. Site fica em `https://seu-usuario.github.io/seu-repo`

### Netlify

1. Conecte seu repositório GitHub
2. Build command: (deixe em branco)
3. Publish directory: `.` (raiz)
4. Deploy automático!

### Hospedagem Tradicional

Faça upload de todos os arquivos via FTP/SFTP para seu servidor.

---

## 📝 Notas Importantes

- **Sem banco de dados**: O site é 100% estático, dados vêm de JSON
- **Sem framework**: HTML + CSS + JS puro = performance máxima
- **Sem build process**: Não precisa compilar, edite e pronto
- **Responsivo**: Mobile-first, funciona em qualquer tamanho
- **Acessível**: WCAG 2.1 Level AA (contraste, semântica, labels)

---

## 🤝 Suporte

Para dúvidas sobre:
- **Estrutura**: Ver `CLAUDE.md`
- **Estilos**: Ver `src/styles/main.css`
- **JavaScript**: Ver arquivos em `src/js/`
- **EmailJS**: Consulte [emailjs.com/docs](https://www.emailjs.com/docs/)

---

## 📄 Licença

MIT © 2024 CETA Montagens e Projetos
