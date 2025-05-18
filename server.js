import express from "express";

const app = express();
const host = "0.0.0.0";
const port = 6850;
let listaAlunos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sistema de Cadastro</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { padding: 20px; }
        .user-list { margin-top: 30px; }
        
        /* Estilos para botões verdes */
        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
        }
        .btn-success:hover {
          background-color: #218838;
          border-color: #1e7e34;
        }
        .btn-outline-success {
          color: #28a745;
          border-color: #28a745;
        }
        .btn-outline-success:hover {
          background-color: #28a745;
          color: white;
        }
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
                <a class="nav-link" href="/cadastroAluno">Cadastro</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaAlunos">Ver Lista de Alunos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div class="container">
        <h1>Bem-vindo ao Sistema de Cadastro de Alunos - Escola Futuro Brilhante</h1>
        <p>Utilize o menu acima para navegar no sistema.</p>
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.get("/cadastroAluno", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastro de Alunos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          background-color: #fff;
          margin: 50px auto;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
          color: #333;
        }
        label {
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        button, .btn {
          padding: 10px 20px;
          margin: 4px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.3s;
        }
        /* Botão verde primário */
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .btn-success:hover {
          background-color: #218838;
        }
        /* Botão verde secundário */
        .btn-outline-success {
          color: #28a745;
          border: 1px solid #28a745;
          background-color: transparent;
        }
        .btn-outline-success:hover {
          background-color: #28a745;
          color: white;
        }
        nav {
          background-color: #e9ecef;
          padding: 10px 20px;
        }
        nav a {
          text-decoration: none;
          color: #007bff;
          margin-right: 15px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Cadastro</a>
        </div>
      </nav>
      
      <div class="container">
        <h2>Cadastro de Alunos</h2>
        <form method="POST" action="/cadastroAluno">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" name="sobrenome" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento:</label>
            <input type="date" id="dataNascimento" name="dataNascimento" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="serie">Série:</label>
            <select id="serie" name="serie" class="form-control" required>
              <option value="">Selecione...</option>
              <option value="1EF">1º Ano - Ensino Fundamental</option>
              <option value="2EF">2º Ano - Ensino Fundamental</option>
              <option value="3EF">3º Ano - Ensino Fundamental</option>
              <option value="4EF">4º Ano - Ensino Fundamental</option>
              <option value="5EF">5º Ano - Ensino Fundamental</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Turno:</label>
            <select id="turno" name="turno" class="form-control" required>
              <option>Selecione...</option>
              <option>Manhã</option>
              <option>Tarde</option>
            </select>
          </div>
          
          <button type="submit" class="btn btn-success">Cadastrar</button>
          <a href="/" class="btn btn-outline-success">Cancelar</a>
        </form>
      </div>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.post("/cadastroAluno", (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const dataNascimento = req.body.dataNascimento;
  const email = req.body.email;
  const serie = req.body.serie;
  const turno = req.body.turno;
  
  if (!nome || !sobrenome || !dataNascimento || !email || !serie || !turno) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }
  
  listaAlunos.push({ nome, sobrenome, dataNascimento, email, serie, turno });

  res.redirect("/listaAlunos");
});

app.get("/listaAlunos", (req, res) => {
  let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Alunos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #dee2e6;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f1f1f1;
        }
        .btn {
          margin-top: 20px;
        }
        /* Botão verde primário */
        .btn-success {
          background-color: #28a745;
          color: white;
          border: none;
        }
        .btn-success:hover {
          background-color: #218838;
        }
        /* Botão verde secundário */
        .btn-outline-success {
          color: #28a745;
          border: 1px solid #28a745;
          background-color: transparent;
        }
        .btn-outline-success:hover {
          background-color: #28a745;
          color: white;
        }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Cadastro</a>
        </div>
      </nav>
      
      <div class="container">
        <h2>Alunos Cadastrados</h2>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Sobrenome</th>
                <th scope="col">Data Nascimento</th>
                <th scope="col">E-mail</th>
                <th scope="col">Série</th>
                <th scope="col">Turno</th>
              </tr>
            </thead>
            <tbody>`;
  
  for(let i = 0; i < listaAlunos.length; i++){
    conteudo += `
      <tr>
        <td>${listaAlunos[i].nome}</td>
        <td>${listaAlunos[i].sobrenome}</td>
        <td>${listaAlunos[i].dataNascimento}</td>
        <td>${listaAlunos[i].email}</td>
        <td>${listaAlunos[i].serie}</td>
        <td>${listaAlunos[i].turno}</td>
      </tr>`;
  }

  conteudo += ` </tbody>
          </table>
        <a href="/cadastroAluno" class="btn btn-success">Cadastrar Novo Aluno</a>
        <a href="/" class="btn btn-outline-success">Voltar</a>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </html>`;
  
  res.send(conteudo);
});

app.listen(port, host, () => {
  console.log(`Servidor executando em http://${host}:${port}/`);
});