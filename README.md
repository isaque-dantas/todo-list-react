# Lista de tarefas (to-do list) com React

O objetivo deste projeto é, por meio do desenvolvimento de uma lista de tarefas virtual, aplicar conceitos de formulários, validações e fluxos de dados, simulando um ambiente próximo do real.

## Tecnologias utilizadas

- React.
- React Router.
- React Hook Form.
- Zod.
- RadixUi.
- Vite.

## Principais funcionalidades

1. Grupos de tarefas e, para cada um deles, tarefas.
2. Possibilidade de marcar as atividades concluídas.
3. Edição dinâmica das propriedades, sem necessidade de uma segunda tela.
4. Validação automática de unicidade para nome do grupo de tarefas (`groups.[index].name`) e para o conteúdo da tarefa (`groups.[index].items.[index].content`).
5. Mensagens de erro personalizadas que fazem sentido para o usuário.
6. Sistema de foco automático quando o usuário adiciona uma tarefa ou um grupo de tarefas.

## Instalação e uso

Acesse pelo link: https://todo-list-hazel-five-25.vercel.app/.

É preciso executar a API `json-server` localmente. O arquivo `/db.example.json5` contém entidades que servem como exemplo.
Siga os passos:

1. Clone este repositório: `git clone https://github.com/isaque-dantas/todo-list-react`.
2. Mude o diretório para o repositório: `cd todo-list-react`.
3. Instale o `json-server`: `npm i json-server`.
4. Execute: `json-server db.json5`.

Para executar a aplicação front-end localmente, você precisa do Node 22.0 ou superior.

1. Clone este repositório: `git clone https://github.com/isaque-dantas/todo-list-react`.
2. Mude o diretório para o repositório: `cd todo-list-react`.
3. Instale as dependências: `npm i`.
4. Execute a aplicação: `npm run dev`.
