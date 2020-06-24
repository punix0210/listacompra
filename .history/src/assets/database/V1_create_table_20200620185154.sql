create table if not exists Usuario(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nmLogin TEXT,
    nmUsuario TEXT,
    senha TEXT
)

create table if not exists Grupo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT
)

create table if not exists Unidade(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    sigla TEXT
);

create table if not exists Produto(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    un TEXT,
    vlPreco REAL,
    grupoId INTEGER,
    FOREIGN KEY (grupoId) REFERENCES Grupo(id)
);

create table if not exists ListaDespesa(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT,
    data TEXT,
    vlPrevisto REAL
);

create table if not exists ListaDespesaItem(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    listaId INTEGER,
    produtoId INTEGER,
    quantidade REAL,
    vlUnitario REAL,
    vlItem REAL,
    FOREIGN KEY(produtoId) REFERENCES Produto(id),
    FOREIGN KEY(listaId) REFERENCES ListaDespesa(id)
);