# Cronograma de Estudos

> Este projeto é uma aplicação web para ajudar a gerenciar e monitorar o progresso dos estudos. A ferramenta permite que você adicione, edite e visualize suas atividades de estudo, além de acompanhar o progresso por meio de gráficos e uma barra de progresso dinâmica.

## Funcionalidades

### 1. **Adicionar Atividades**

Permite adicionar atividades de estudo com data, dia da semana, descrição da atividade, plataforma de estudo e carga horária.
As atividades são automaticamente categorizadas em "Cronograma" (atividades pendentes) e "Concluídos" (atividades já finalizadas).

### 2. **Barra de Progresso Dinâmica**

Uma barra de progresso exibe o percentual de conclusão das atividades do cronograma. A cor da barra muda automaticamente conforme o progresso:

- Verde: **80%** ou mais concluído.
- Amarelo: **60%** a **79%** concluído.
- Laranja: **20%** a **59%** concluído.
- Vermelho: Menos de **20%** concluído.

### 3. **Gráficos Interativos**

**Distribuição de Horas por Plataforma:** Exibe a quantidade de horas estudadas por cada plataforma.
**Tarefas Completas ao Longo do Tempo:** Mostra o progresso das atividades ao longo do tempo, com as datas mais antigas à esquerda e as mais recentes à direita.

### 4. Busca de Atividades

Um campo de busca que permite filtrar as atividades na tabela do cronograma. A pesquisa é feita em tempo real, facilitando a localização de atividades específicas.

### 5. LocalStorage

As atividades e seus estados são armazenados no LocalStorage, garantindo que os dados persistam mesmo após a atualização da página ou o fechamento do navegador.

### 6. Design Responsivo

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela, incluindo dispositivos móveis.

## Melhorias Futuras

### 1. Refinamento do Layout

- Melhorar o espaçamento e margens entre os elementos para criar um visual mais limpo e organizado.
- Unificar as bordas e sombras dos componentes para uma experiência visual mais coesa.
- Revisar os tamanhos das fontes para garantir uma hierarquia visual clara e intuitiva.

### 2. Animações Suaves

Adicionar transições suaves para os elementos interativos, como a barra de progresso e checkboxes, para melhorar a experiência do usuário.

### 3. Personalização dos Gráficos

Adicionar rótulos diretos nos gráficos e personalizar ainda mais o visual para torná-los mais informativos e atraentes.

### 4. Footer Informativo

Enriquecer o footer com informações adicionais, como links para o repositório do GitHub, contato, e uma breve descrição do projeto.

### 5. Notificações de Tarefas

Implementar notificações para lembrar o usuário de tarefas pendentes ou recém-adicionadas, aprimorando o gerenciamento de tempo.

### Como Usar:

**Clone o repositório:**

```bash
git clone https://github.com/anselmotadeu/cronogramaEstudos
```

Abra o arquivo `index.html` em um navegador para acessar a aplicação.

**Adicione suas atividades de estudo e acompanhe seu progresso!**

### Tecnologias Utilizadas

- **HTML5**: Para a estruturação da aplicação.
- **CSS3:** Para a estilização, incluindo a responsividade.
- **JavaScript**: Para a lógica da aplicação, manipulação do DOM, e persistência de dados via LocalStorage.
- **Chart.js:** Para a criação dos gráficos interativos.

### Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar ainda mais este projeto.
