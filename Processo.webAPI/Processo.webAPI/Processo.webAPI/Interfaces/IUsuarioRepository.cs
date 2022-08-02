using Processo.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);

        Usuario BuscarPorId(int id);

        void Cadastrar(Usuario usuario);

        void Alterar(int id, Usuario usuarioAtt);

        void Excluir(int id);

        IEnumerable<Usuario> Listar();
    }
}
