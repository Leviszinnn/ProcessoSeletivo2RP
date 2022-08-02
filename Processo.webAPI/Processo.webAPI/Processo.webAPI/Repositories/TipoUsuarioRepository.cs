using Processo.webAPI.Contexts;
using Processo.webAPI.Domains;
using Processo.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly ProcessoContext ctx;

        public TipoUsuarioRepository(ProcessoContext appContext)
        {
            ctx = appContext;
        }

        public void Alterar(int id, TipoUsuario tipoUserAtt)
        {
            TipoUsuario tipoBuscado = ctx.TipoUsuarios.Find(id);

            if (tipoUserAtt.TipoUser != null)
            {
                tipoBuscado.TipoUser = tipoUserAtt.TipoUser;
            }

            ctx.TipoUsuarios.Update(tipoBuscado);
            ctx.SaveChanges();
        }

        public TipoUsuario BuscarPorID(int id)
        {
            return ctx.TipoUsuarios
                .Select(u => new TipoUsuario()
                {
                    IdTipo = u.IdTipo,
                    TipoUser = u.TipoUser
                })
                .FirstOrDefault(u => u.IdTipo == id);
        }

        public void Cadastrar(TipoUsuario tipoUsuario)
        {
            ctx.TipoUsuarios.Add(tipoUsuario);
            ctx.SaveChanges();
        }

        public void Excluir(int id)
        {
            TipoUsuario tipoBuscado = BuscarPorID(id);

            ctx.TipoUsuarios.Remove(tipoBuscado);

            ctx.SaveChanges();
        }

        public IEnumerable<TipoUsuario> Listar()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
