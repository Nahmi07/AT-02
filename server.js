import express from "express";

const app = express();
const host = "localhost";
const port = 3000;
let listaUsuarios = [];


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sistema de Cadastro</title>
      <style>
        body { padding: 20px; }
        .user-list { margin-top: 30px; }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Cadastro</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/cadastroUsuario">Cadastrar Usuário</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaUsuarios">Ver Usuários</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div class="container">
        <h1>Bem-vindo ao Sistema de Cadastro</h1>
        <p>Utilize o menu acima para navegar no sistema.</p>
      </div>
    </body>
    </html>
  `);
});


app.get("/cadastroUsuario", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Usuário</title>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Cadastro</a>
        </div>
      </nav>
      
      <div class="container">
        <h2>Cadastro de Usuário</h2>
        <form method="POST" action="/cadastroUsuario">
          <div class="mb-3">
            <label for="nome" class="form-label">Nome:</label>
            <input type="text" class="form-control" id="nome" name="nome" required>
          </div>
          <div class="mb-3">
            <label for="sobrenome" class="form-label">Sobrenome:</label>
            <input type="text" class="form-control" id="sobrenome" name="sobrenome" required>
          </div>
          <div class="mb-3">
            <label for="nomeUsuario" class="form-label">Nome de Usuário:</label>
            <input type="text" class="form-control" id="nomeUsuario" name="nomeUsuario" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail:</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
          <a href="/" class="btn btn-secondary">Cancelar</a>
        </form>
      </div>
    
    </body>
    </html>
  `);
});


app.post("/cadastroUsuario", (req, res) => {
  const { nome, sobrenome, nomeUsuario, email } = req.body;
  
  
  if (!nome || !sobrenome || !nomeUsuario || !email) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }
  
  
  if (listaUsuarios.some(user => user.nomeUsuario === nomeUsuario)) {
    return res.status(400).send("Nome de usuário já está em uso");
  }
  
  
  listaUsuarios.push({ nome, sobrenome, nomeUsuario, email });
  
  
  res.redirect("/listaUsuarios");
});


app.get("/listaUsuarios", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Usuários</title>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Cadastro</a>
        </div>
      </nav>
      
      <div class="container">
        <h2>Usuários Cadastrados</h2>
        ${listaUsuarios.length > 0 ? `
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Nome de Usuário</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              ${listaUsuarios.map(user => `
                <tr>
                  <td>${user.nome}</td>
                  <td>${user.sobrenome}</td>
                  <td>${user.nomeUsuario}</td>
                  <td>${user.email}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p>Nenhum usuário cadastrado ainda.</p>'}
        <a href="/cadastroUsuario" class="btn btn-primary">Cadastrar Novo Usuário</a>
        <a href="/" class="btn btn-secondary">Voltar</a>
      </div>
    </body>
    </html>
  `);
});


app.listen(port, host, () => {
  console.log(`Servidor executando em http://${host}:${port}/`);
});