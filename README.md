# VINCI — TDE

Implementação acadêmica de **Nicollas Pereira**, desenvolvida em HTML5, CSS3 e JavaScript a partir do [projeto VINCI no Figma](https://www.figma.com/design/1TjOD1uztwrOtFkDywi2il/PROJETO-VINCI?node-id=1-28).

As páginas reproduzem a Home, a apresentação do veículo e o megamenu do arquivo original, utilizando suas imagens, cores e tipografias. O layout também se adapta a telas menores.

## Executar localmente

Com o Node.js instalado, execute na pasta do projeto:

```sh
node scripts/serve.mjs
```

Abra [http://localhost:4173/](http://localhost:4173/). Não é necessário instalar dependências ou executar uma compilação.

## Funcionalidades

- Navegação entre a Home e a página do veículo.
- Megamenu de modelos, perguntas frequentes e detalhes interativos.
- Diálogos de modelos, informações e unidades demonstrativas.
- Formulário de test drive com validação e armazenamento local, incluindo a opção de apagar os dados salvos.

O formulário é uma demonstração acadêmica: nenhum agendamento real é feito e nenhum dado é enviado. A marca, o catálogo e as unidades são apresentados para fins de estudo; não há lojas, ofertas ou serviços comerciais reais.

## Publicação

O projeto é estático e compatível com GitHub Pages, com publicação a partir da raiz do repositório. Para a entrega, deve ser utilizado somente o link público da aplicação, contendo o nome e o sobrenome do aluno, após verificar seu funcionamento em uma janela anônima.

As fontes Genos e Host Grotesk são distribuídas sob a licença SIL Open Font License. Os textos das licenças estão em `assets/fonts/`.
