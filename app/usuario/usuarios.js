var Usuario = require('./modelo');

var cadastrar = function(usuario, quandoSalvar, quandoDerErro){
  new Usuario(usuario).save(function(err, resultados){
      if(err){
          quandoDerErro(err);
      } else {
          quandoSalvar(resultados);
      }
  });
}

var listar = function(quandoListar, quandoDerErro){
    Usuario.find()
        .select({nome:true, login:true})
        .exec(function(err, usuarios){
            if(err){
                quandoDerErro(err);
            } else {
                quandoListar(usuarios);
            }
        });
}

var autenticar = function(login, senha, quandoEncontrar, quandoDerErro){
    Usuario.findOne({login:login, senha:senha})
        .select({nome:true, login:true})
        .exec(function(err, usuario){
            if(err){
                quandoDerErro(err);
            } else if(usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuario invalido!'));
            }
        });
}

var buscar = function(id, quandoEncontrar, quandoDerErro){
    Usuario.findById(id)
        .select({nome:true, login:true})
        .exec(function(err, usuario){
            if(err){
                quandoDerErro(err);
            } else if(usuario) {
                quandoEncontrar(usuario);
            } else {
                quandoDerErro(new Error('Usuario invalido!'));
            }
        });
}

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.autenticar = autenticar;
exports.buscar = buscar;