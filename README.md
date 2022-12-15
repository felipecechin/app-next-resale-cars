## Aplicação Front-end para gerenciamento de uma revenda de carros

Para a construção da aplicação, foram utilizadas as seguintes tecnologias:
- Next.js;
- React;
- Typescript.

Para estilização, foram utilizadas as bibliotecas:
- Tailwind;
- DaisyUI.

### Telas
1. Login/cadastro de usuário (`/auth`);
2. Dashboard (`/`);
3. Carros (`/cars`);
4. Histórico de ações (`/history`).

### Aplicação back-end
A aplicação back-end utilizada está descrita [aqui](https://github.com/felipecechin/app-backend-resale-cars).

### Como executar aplicação?
Supondo que o back-end está rodando na máquina local na porta `http://localhost:3333/` e supondo também que o Node v16+, NPM e Yarn estão corretamente instalados, faça os seguintes passos:

1. Criar arquivo `.env.local` e definir URL da API: `NEXT_PUBLIC_HOST_API=http://localhost:3333`;
2. Executar comando `yarn` para instalar dependências;
3. Executar comando `yarn dev` para executar aplicação.
