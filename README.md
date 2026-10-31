# VINCI — TDE

Implementação acadêmica de **Nicollas Pereira**, desenvolvida com **Vue 3, HTML5, CSS3 e JavaScript**, utilizando Vite, a partir do [projeto VINCI no Figma](https://www.figma.com/design/1TjOD1uztwrOtFkDywi2il/PROJETO-VINCI?node-id=1-28).

As páginas reproduzem a Home, a apresentação do veículo e o megamenu do arquivo original, utilizando suas imagens, cores e tipografias. O layout também se adapta a telas menores.

## Executar localmente

Com Node.js 24 e npm instalados, execute na pasta do projeto:

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite. Para testar a compilação de produção:

```sh
npm run build
npm run preview
```

A prévia de produção fica em [http://localhost:4173/](http://localhost:4173/).

## Componentes Vue

`src/App.vue` coordena o estado da aplicação. Os componentes em `src/components/` implementam o cabeçalho, o rodapé, o megamenu, as telas Home e Carro e os diálogos. Listas usam `v-for`, os formulários usam `v-model` e os controles usam eventos Vue e estado reativo. Os estilos estão em `src/styles/` e os arquivos originais do Figma em `public/assets/`.

## Funcionalidades

- Navegação entre a Home e a página do veículo.
- Megamenu de modelos, perguntas frequentes e detalhes interativos.
- Diálogos de modelos, informações e unidades demonstrativas.
- Formulário de test drive com validação e armazenamento local, incluindo a opção de apagar os dados salvos.

O formulário é uma demonstração acadêmica: nenhum agendamento real é feito e nenhum dado é enviado. A marca, o catálogo e as unidades são apresentados para fins de estudo; não há lojas, ofertas ou serviços comerciais reais.

## Publicação

O GitHub Actions instala as dependências, executa a compilação do Vue com Vite e publica a pasta `dist/` no GitHub Pages a cada atualização da branch `master`. As duas entradas, `index.html` e `carro.html`, preservam os endereços das telas. Para a entrega, deve ser utilizado somente o link público da aplicação, contendo o nome e o sobrenome do aluno, após verificar seu funcionamento em uma janela anônima.

As fontes Genos e Host Grotesk são distribuídas sob a licença SIL Open Font License. Os textos das licenças estão em `public/assets/fonts/`.
