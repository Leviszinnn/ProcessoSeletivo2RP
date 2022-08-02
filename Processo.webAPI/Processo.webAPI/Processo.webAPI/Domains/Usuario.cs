using System;
using System.Collections.Generic;

#nullable disable

namespace Processo.webAPI.Domains
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public int? IdTipo { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
        public string Email { get; set; }
        public bool? Status { get; set; }

        public virtual TipoUsuario IdTipoNavigation { get; set; }
    }
}
