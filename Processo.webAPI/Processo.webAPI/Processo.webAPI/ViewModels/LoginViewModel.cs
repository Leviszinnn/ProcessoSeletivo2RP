using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "informe o email!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "informe a senha!")]
        public string Senha { get; set; }
    }
}
