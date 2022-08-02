using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Utils
{
    public class Criptografia
    {
        public static string GerarHash(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        public static bool Comparar(string senha, string senhaBanco)
        {
            return BCrypt.Net.BCrypt.Verify(senha, senhaBanco);
        }
    }
}
