import { Component } from "react"
import { db } from '../../services/Api'
import { parseJwt, usuarioAutenticado } from "../../services/Auth"
import logo from "../../assets/logo.svg"

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false,
        };
    }

    efetuaLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        db.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);

                    this.props.history.push('/home');
                    console.log("funfou")
                    console.log(resposta.role)
                }
            })
            .catch(() => {
                this.setState({ isLoading: false });
                this.setState(
                    {
                        erroMensagem: "Login ou Senha inválidos!",
                        isLoading: false,
                    },
                    console.log("deu errado")
                );
            });
    };

    atualizacampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    };

    render() {
        return (
            <main>
                <div className="arruma">
                    <div className="imagem">
                        <img src={logo} className="logo_2rp"></img>
                    </div>
                    <div className="login_page">
                        <form onSubmit={this.efetuaLogin} className="login_form">
                            <h2>Bem Vindo!</h2>
                            <div className="inputs">
                                <span>Informe seu email:</span>
                                <input
                                    className="input__login"
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.atualizacampo}
                                />
                            </div>

                            <div className="inputs">
                                <span>Informe sua senha:</span>
                                <input
                                    className="input__login"
                                    type="password"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizacampo}
                                />
                            </div>

                            <button className="RealizaLogin" typeof="submit">Entrar</button>

                        </form>
                    </div>
                </div>
            </main>
        )
    }
}
