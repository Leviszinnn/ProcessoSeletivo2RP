import { Component } from "react"
import { db } from '../../services/Api'
import { parseJwt, usuarioAutenticado } from "../../services/Auth"

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

        this.setState({erroMensagem: '', isLoading: true});

        db.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        })
        .then(resposta => {
            if(resposta.status === 200) {
                localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });

                    let base64 = localStorage.getItem('usuario-login').split('.')[1];
                    console.log(base64);

                    this.props.history.push('/home');
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
        this.setState({[campo.target.name]: campo.target.value})
    };

    render() {
        return(
            <main className="login_page">
                
            </main>
        )
    }
}
