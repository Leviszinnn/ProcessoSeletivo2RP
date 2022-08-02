using Processo.webAPI.Domains;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        void Cadastrar(TipoUsuario tipoUsuario);

        void Alterar(int id, TipoUsuario tipoUserAtt);

        void Excluir(int id);

        IEnumerable<TipoUsuario> Listar();

        TipoUsuario BuscarPorID(int id);
    }
}
