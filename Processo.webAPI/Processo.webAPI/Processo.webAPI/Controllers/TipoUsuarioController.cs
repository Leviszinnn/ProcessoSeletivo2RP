using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Processo.webAPI.Domains;
using Processo.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Processo.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase
    {
        private readonly ITipoUsuarioRepository _tipouserRepository;

        public TipoUsuarioController(ITipoUsuarioRepository context)
        {
            _tipouserRepository = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_tipouserRepository.Listar());
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        [HttpGet("{id}")]
        public IActionResult BuscarId(int id)
        {
            try
            {
                return Ok(_tipouserRepository.BuscarPorID(id));
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, TipoUsuario tipo)
        {
            try
            {
                _tipouserRepository.Alterar(id, tipo);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [HttpPost]
        public IActionResult PostUsuario(TipoUsuario tipo)
        {
            try
            {
                _tipouserRepository.Cadastrar(tipo);

                return StatusCode(201);

            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteObjeto(int id)
        {
            try
            {
                _tipouserRepository.Excluir(id);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
