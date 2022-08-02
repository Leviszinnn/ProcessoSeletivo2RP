using Processo.webAPI.Contexts;
using Processo.webAPI.Domains;
using Processo.webAPI.Interfaces;
using Processo.webAPI.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ProcessoContext ctx;

        public UsuarioRepository(ProcessoContext appContext)
        {
            ctx = appContext;
        }

        public void Alterar(int id, Usuario usuarioAtt)
        {
            Usuario usuarioBuscado = ctx.Usuarios.Find(id);

            if (usuarioAtt.IdTipo != null)
            {
                usuarioBuscado.IdTipo = usuarioAtt.IdTipo;
            }

            if (usuarioAtt.Nome != null)
            {
                usuarioBuscado.Nome = usuarioAtt.Nome;
            }

            if (usuarioAtt.Email != null)
            {
                usuarioBuscado.Email = usuarioAtt.Email;
            }

            if (usuarioAtt.Senha != null)
            {
                usuarioBuscado.Senha = usuarioAtt.Senha;
            }

            if (usuarioAtt.Status != null)
            {
                usuarioBuscado.Status = usuarioAtt.Status;
            }

            ctx.Usuarios.Update(usuarioBuscado);
            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios
                .Select(u => new Usuario()
                {
                    IdUsuario = u.IdUsuario,
                    IdTipo = u.IdTipo,
                    Nome = u.Nome,
                    Email = u.Email,
                    Senha = u.Senha,
                    Status = u.Status
                })
                .FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Cadastrar(Usuario usuario)
        {
            ctx.Usuarios.Add(usuario);
            ctx.SaveChanges();
        }

        public void Excluir(int id)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            ctx.Usuarios.Remove(usuarioBuscado);

            ctx.SaveChanges();
        }

        public IEnumerable<Usuario> Listar()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);
            var usuariofull = ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);

            if (usuariofull != null)
            {
                usuariofull.Senha = Criptografia.GerarHash(senha);
                ctx.Update(usuariofull);
                ctx.SaveChanges();
                return usuariofull;
            }

            if (usuario != null)
            {
                bool comparado = Criptografia.Comparar(senha, usuario.Senha);

                if (comparado)
                    return usuario;
            }
            return null;
        }
    }
}
