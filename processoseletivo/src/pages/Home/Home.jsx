import logo from "../../assets/logo.svg";
import lixeira from "../../assets/trash-can-solid.svg"
import { React, useState, useEffect } from 'react';

import { db } from "../../services/Api";
import axios from "axios";
import { usuarioAutenticado } from "../../services/Auth";
import { getAllByRole } from "@testing-library/react";

export default function Home() {

    const [valor, setValor] = useState(0);
    const [listaUser, setListaUser] = useState([]);
    const [listaMeuUser, setlistaMeuUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    const [idUsuario, setidUsuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');
    const [css1, set1] = useState(true);
    const [css2, set2] = useState(false);
    const [css3, set3] = useState(false);


    function switchtelas() {
        switch (valor) {
            case 1:
                return (telaListar())
                break;
            case 2:
                return (telaCadastro())
                break;
            case 3:
                return (telaAtualizar())
                break;
            default:
                setValor(1)
                break;
        }
    }

    function changeScreen(event) {

        buscarUsuarios()
        set1(false)
        set2(false)
        set3(false)

        let num = parseInt(event.target.value)

        switch (num) {
            case 1:
                set1(true);
                break;

            case 2:
                set2(true);
                break;

            case 3:
                set3(true);
                break;

            default:
                break;
        }

        setValor(num)
        carregarUserBuscado()
    }

    const options = [
        { value: 'geral', label: 'Geral' },
        { value: 'admin', label: 'Admin' },
        { value: 'root', label: 'Root' }
    ]

    const optionsAtivo = [
        { value: 'ativo', label: 'Ativo' },
        { value: 'inativo', label: 'inativo' }
    ]

    function telaCadastro() {
        return (
            <div>
                <form className="formcadastro">
                    <div className="titulos">
                        <h1>Cadastrar novo usuário</h1>
                        <span className="spandeerro">{erroMensagem}</span>
                    </div>
                    <div className="inputbotao">
                        <select className="inputform" onChange={e => setTipo(e.target.value)}>
                            <option value="" disabled selected>Selecione o tipo de usuário:</option>
                            <option value="1">Geral</option>
                            <option value="2">Admin</option>
                            <option value="3">Root</option>
                        </select>
                    </div>
                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Insira o nome que será cadastrado:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Insira o email que será cadastrado:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Insira a senha que será cadastrada:"
                        />
                    </div>

                    <div className="inputbotao">
                        <select className="inputform" onChange={e => setStatus(e.target.value)}>
                            <option value="" disabled selected>Selecione o status do usuário:</option>
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>
                    </div>

                    <div className="divbtnatt">
                        <button className="botaocadastro" onClick={cadastrar} type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }

    function cadastrar(event) {
        event.preventDefault();
        setIsLoading(true);

        let usuarioC = {
            idTipo: tipo,
            nome: nome,
            email: email,
            senha: senha,
            status: status
        };


        db.post('/Usuario', usuarioC, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            },
        })
            .then((resposta) => {
                if (resposta.status === 403) {
                    setErroMensagem('Apenas usuários administradores podem alterar informações')
                    setIsLoading(false)
                }
                if (resposta.status === 201) {
                    buscarUsuarios();
                }
            })
            .catch((erro) => {
                console.log(erro)
                setIsLoading(false)
                setErroMensagem('Algo deu errado, tente novamente')
            })
            .then(
                setIsLoading(false),
                setErroMensagem('')
            )
    }

    function telaAtualizar() {
        if (getUser() == "3" || getUser() == "2") {
            return (
                <div className="titulo">
                    <h1>Atualize as informações dos usuários aqui!</h1>

                    <div className="inputbotao">
                        <span className="spandeerro">{erroMensagem}</span>
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="idUsuario"
                            value={idUsuario}
                            onChange={e => setidUsuario(e.target.value)}
                            placeholder="Digite o id do usuário:"
                        />
                    </div>

                    <div className="inputbotao">
                        <select className="inputform" onChange={e => setTipo(e.target.value)}>
                            <option value="" disabled selected>Selecione o tipo de usuário:</option>
                            <option value="1">Geral</option>
                            <option value="2">Admin</option>
                            <option value="3">Root</option>
                        </select>
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Novo nome:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Novo email:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Nova senha:"
                        />
                    </div>

                    <div className="inputbotao">
                        <select className="inputform" onChange={e => setStatus(e.target.value)}>
                            <option value="" disabled selected>Selecione o status do usuário:</option>
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>
                    </div>

                    <div className="divbtn">
                        <button className="botaocadastro" onClick={atualiza} type="submit">Atualizar</button>
                    </div>

                </div>
            )
        } else {
            return (
                <div className="titulo">
                    <h1>Atualize suas informações aqui!</h1>
                    <section className="desculpa_section">
                        <div className="container_table_registro">
                            <table className="table_registro">

                                <thead>
                                    <tr>
                                        <th className="thobjetos">Nome</th>
                                        <th className="thobjetos thobjetos_centro">E-mail</th>
                                        <th className="thobjetos">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        carregarUserBuscado()
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="inputbotao">
                        <span className="spandeerro">{erroMensagem}</span>
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Novo nome:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Novo email:"
                        />
                    </div>

                    <div className="inputbotao">
                        <input
                            required
                            className="inputform"
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Nova senha:"
                        />
                    </div>

                    <div className="divbtnatt">
                        <button className="botaocadastro" onClick={atualizausuariobuscado} type="submit">Atualizar</button>
                    </div>

                </div>
            )
        }
    }

    function atualizausuariobuscado(id) {
        id = getUser()

        let usuarioC = {
            idUsuario: getUser(),
            idTipo: tipo,
            nome: nome,
            email: email,
            senha: senha,
            status: status
        };

        db.put('/Usuario/' + id, usuarioC, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    buscarUsuarios();
                    carregarUserBuscado();
                }
            })
            .catch((erro) => {
                console.log(erro)
                setIsLoading(false)
                setErroMensagem('Algo deu errado, tente novamente')
            })
            .then(
                setIsLoading(false),
                setErroMensagem(''),
                carregarUserBuscado()
            )

        carregarUserBuscado()
    }

    function atualiza(id) {
        id = idUsuario
        let usuarioC = {
            idUsuario: idUsuario,
            idTipo: tipo,
            nome: nome,
            email: email,
            senha: senha,
            status: status
        };

        db.put('/Usuario/' + id, usuarioC, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 403) {
                    setErroMensagem('Apenas usuários de tipo root podem alterar informações')
                    setIsLoading(false)
                }
                if (resposta.status === 204) {
                    buscarUsuarios();
                    carregarUserBuscado();
                }
            })
            .catch((erro) => {
                console.log(erro)
                setIsLoading(false)
                setErroMensagem('Algo deu errado, tente novamente')
            })
            .then(
                setIsLoading(false),
                setErroMensagem('')
            )
    }

    function carregarUserBuscado() {

        if (listaMeuUser.status == true) {
            var status = "Ativo";
        }
        else if (listaMeuUser.status == false) {
            var status = "Inativo"
        }

        return (
            <tr>
                <td className="tdobjetos">{listaMeuUser.nome}</td>
                <td className="tdobjetos">{listaMeuUser.email}</td>
                <td className="tdobjetos">{status}</td>
            </tr>
        )
    }

    function searchbyID(id) {
        id = getUser()
        db.get('/buscar/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log(resposta.data)
                    setlistaMeuUser(resposta.data)
                }
            })
            .catch(erro => console.log(erro));
    }
    useEffect(searchbyID, []);


    function getUser() {
        let base64 = localStorage.getItem('usuario-login').split('.')[1];
        let decoded = window.atob(base64);
        let decodeddata = JSON.parse(decoded);

        console.log(decodeddata.role)
        return decodeddata.role
    }

    function telaListar() {
        return (
            <section className="desculpa_section">
                <div className="container_table_registro">
                    <table className="table_registro">

                        <thead>
                            <tr>
                                <th className="thobjetos">Nome</th>
                                <th className="thobjetos thobjetos_centro">E-mail</th>
                                <th className="thobjetos">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carregarUser()
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }

    function carregarUser() {
        return (
            listaUser.map((user) => {
                if (user.status == true) {
                    var status = "Ativo";
                }
                else if (user.status == false) {
                    var status = "Inativo"
                }

                if (getUser() == "3") {
                    return (
                        <tr>
                            <td className="tdobjetos">{user.nome}</td>
                            <td className="tdobjetos">{user.email}</td>
                            <td className="tdobjetos">{status}</td>
                            <td>
                                <button onClick={(e) => excluir(user.idUsuario, e)} className="lixeira"><img className="botaolixo" src={lixeira} /></button>
                            </td>
                        </tr>
                    )
                } else {
                    return (
                        <tr>
                            <td className="tdobjetos">{user.nome}</td>
                            <td className="tdobjetos">{user.email}</td>
                            <td className="tdobjetos">{status}</td>
                        </tr>
                    )
                }
            })
        )
    }

    function excluir(id) {
        db.delete('/Usuario/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    buscarUsuarios();
                    carregarUser();
                }
            })
            .catch(erro => console.log(erro));
    }
    useEffect(excluir, []);


    function buscarUsuarios() {
        db.get('/Usuario')
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUser(resposta.data)
                }
            })
            .catch(erro => console.log(erro));
    };

    useEffect(buscarUsuarios, []);

    var btn_1 = css1 ? "marcado" : "";
    var btn_2 = css2 ? "marcado" : "";
    var btn_3 = css3 ? "marcado" : "";

    return (
        <main className="mainhome">
            <div className="pagina">
                <div className="divnav">
                    <nav className="pages">
                        <button onClick={changeScreen} id={btn_1} value={1}>Usuarios</button>
                        <button onClick={changeScreen} id={btn_2} value={2}>Cadastrar</button>
                        <button onClick={changeScreen} id={btn_3} value={3}>Informações</button>
                    </nav>
                </div>
                <div className="conteudo">
                    {
                        switchtelas()
                    }
                </div>
            </div>
        </main>
    )
}