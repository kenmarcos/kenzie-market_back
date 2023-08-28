<!-- CABEÇALHO -->
<div id="readme-top" align="center">
    <h1>
       🏪 Kenzie Market 🏪
    </h1>
    <p>
        <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o Projeto</a> •
        <a href="#-endpoints">Endpoints</a> •
        <a href="#%EF%B8%8F-instalação">Instalação</a> •
        <a href="#-utilização">Utilização</a> •
        <a href="#%EF%B8%8F-tecnologias">Tecnologias</a> •
        <a href="#-autor">Autor</a>
    </p>
</div>

<!-- SOBRE O PROJETO -->

## 🖥️ Sobre o Projeto

> Projeto desenvolvido como parte das atividades do curso da Kenzie Academy Brasil.

Esse projeto consiste em uma aplicação back-end de um marketplace.

O objetivo do desenvolvimento desse projeto era praticar e aprimorar as habilidades em Node.js, Express.js e TypeORM.

Esse serviço possui uma API REST integrada a um banco de dados PostegreSQL.

Algumas funcionalidades dessa aplicação são:

- Usuário administrador pode:
    - [x]  Cadastrar e gerenciar o estoque de produtos
    - [x]  Vender produtos na plataforma
    - [x]  Fazer o acompanhamento de vendas
- Usuário cliente pode:
    - [x]  Registrar-se na plataforma
    - [x]  Fazer um carrinho de compras
    - [x]  Receber um e-mail com os itens e valores comprados
    - [x]  Recuperar sua senha de acesso

<!-- ENDPOINTS -->

## 💡 Endpoints

| Método | Endpoint | Responsabilidade | Regras de Negócio  |
| ------ | -------- | ---------------- | ------------------ |
| POST | /user | Cria um usuário | Um usuário pode ser do tipo cliente ou do tipo administrador. Use uma propriedade booleana que faça essa diferenciação |
| GET | /user/\<userId> | Seleciona um determinado usuário pelo id | Usuários do tipo cliente são restritos as suas próprias informações. Ou seja: um cliente não pode selecionar outro usuário além dele mesmo, mas um administrador pode selecionar qualquer usuário do sistema |
| GET | /user | Seleciona todos os usuários | Apenas os administradores podem fazer essa ação |
| POST | /login | Gera um toke de autenticação | Login via e-mail e password |
| POST | /product | Cadastra um único produto | Apenas usuário do tipo administrador pode realizar essa asção |
| GET | /product/\<productId> | Seleciona um determinado produto pelo id | Qualquer usuário pode realizar essa ação |
| GET | /product | Seleciona todos os produtos cadastrados | Qualquer usuário pode realizar essa ação |
| POST | /cart | Adiciona um produto no carrinho | Apenas usuários logados devem adicionar o produto no carrinho |
| GET | /cart/\<cartId> | Seleciona o carrinho do usuário | Usuários do tipo cliente são restritos as suas próprias informações. Ou seja: um cliente não pode selecionar o carrinho de outro usuário, mas um administrador pode selecionar qualquer carrinho do sistema |
| GET | /cart | Seleciona todos os carrinhos | Apenas os administradores podem realizar essa ação |
| DELETE | /cart/\<productId> | Deleta um produto do carrinho | Apenas o usuário dono do carrinho e o administrador pode realizar essa ação |
| POST | /buy | Realiza compra dos produtos do carrinho | Apenas o dono do carrinho pode finalizar uma compra e após a sua finalização um email com os dados da compra deve ser disparado para o usuário |
| GET | /buy/\<orderId> | Seleciona uma compra já realizada | Apenas o usuário dono da compra e o administrador pode realizar essa ação |
| GET | /buy | Seleciona todas as compras já realizadas | Apenas o administrador pode realizar essa ação |
| POST | /email | Envia um email qualquer para um determinado usuário | Caso o administrador queira mandar alguma mensagem para um usuário qualquer. Apenas o administrador pode realizar essa ação |
| POST | /recover | Envia um código de validação para o email do usuário | O sistema deverá gerar um código validador qualquer na qual será usado para a recuperação de senha |
| POST | /change_password | Altera a senha do usuário | A partir do código validador que o usuário recebe em seu email, o usuário pode alterar a senha mandando no body da requisição o codigo, a nova senha e sua confirmação |

<!-- INSTALAÇÃO -->

## ⚙️ Instalação

> Este projeto requer que o [Git](https://git-scm.com/), o [Node.js](https://nodejs.org/en/) e o [Docker](https://www.docker.com/) estejam instalados em sua máquina.

- Faça o fork desse repositório.

- Abra o terminal e clone o repositório:

```Bash
$ git clone git@github.com:<your_user>/kenzie-market_back.git
```

- Entre no diretório do projeto:

```Bash
$ cd kenzie-market_back
```

- Instale as dependências:

```Bash
$ yarn install
```

- Adicione o arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente seguindo o modelo do arquivo `.env.example`):

```dotenv
JWT_SECRET=JWT secret key for generate token JWT
DATABASE_URL=URL for database connection after deploy
GMAIL_EMAIL=E-mail of gmail account to send emails
GMAIL_PASSWORD=Password of gmail account to send emails
POSTGRES_USER=Database user
POSTGRES_PASSWORD=Password for database
POSTGRES_DB=Database
```

>Se você usa a verificação em duas etapas na sua conta do Google, habilite uma senha de app [aqui](https://myaccount.google.com/apppasswords) e a insira como valor da variável GMAIL_PASSWORD

- Inicie o contêiner docker referente ao banco de dados PostgreSQL de acordo com as configurações do arquivo `docker-compose.yml`:

```Bash
$ docker-compose up
```

- Execute as _migrations_ para criar as tabelas no banco de dados:

```Bash
$ yarn typeorm migration:run
```

- Execute a aplicação:

```Bash
$ yarn dev
```

Pronto! A aplicação, agora, estará sendo executada em http://localhost:3000/.


<!-- UTILIZAÇÃO -->

## 🚀 Utilização

> Para utilizar a aplicação, é necessário o uso de uma API Client, como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download).

Acesse e siga a documentação em http://localhost:3000/api-documentation e faça as requisições na aplicação utilizando uma API Client.

<!-- TECNOLOGIAS -->

## 🛠️ Tecnologias

Para o desenvolvimento desse projeto, as seguintes ferramentas foram utilizadas:

- **[Node.js](https://nodejs.org/)**
- **[Express.js](https://expressjs.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[TypeORM](https://typeorm.io/)**
- **[Docker](https://www.docker.com/)**
- **[Nodemailer](https://nodemailer.com/)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)**
- **[Yup](https://www.npmjs.com/package/yup)**

## 👨‍💻 Autor

<img style="border-radius: 15%;" src="https://gitlab.com/uploads/-/system/user/avatar/8603970/avatar.png?width=400" width=70 alt="author-profile-picture"/>

Marcos Kenji Kuribayashi

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/marcos-kuribayashi/) [![Gmail Badge](https://img.shields.io/badge/-marcosken13@gmail.com-c14438?style=flat&logo=Gmail&logoColor=white)](mailto:marcosken13@gmail.com)

---

Desenvolvido por Marcos Kenji Kuribayashi 😉
