import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fakechatbot',
  templateUrl: './fakechatbot.component.html',
  styleUrls: ['./fakechatbot.component.css']
})
export class FakechatbotComponent implements OnInit {
  showChat: boolean = false;
  response: string | null = null;
  untouched: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.untouched = false;
    }, 10000);
  }

  toggleChat() {
    this.showChat = !this.showChat;
    this.untouched = false;
  }

  sendMessage(message: string) {
    switch (message) {
      case '1':
        this.response = 'Cycle Lab é uma aplicação interna para laboratórios que permite gerenciar amostras, cadastrar exames, gerenciar usuários e muito mais. Ela é projetada para simplificar as operações diárias em um laboratório.';
        break;
      case '2':
        this.response = 'Para navegar na aplicação Cycle Lab, primeiro realize o login/cadastro, depois você pode usar o menu de navegação. Ele contém diferentes opções, como "Amostras", "Usuários" etc. Clique em uma das opções para acessar as funcionalidades relacionadas.';
        break;
      case '3':
        this.response = 'A equipe de suporte do Cycle Lab está disponível de segunda a sexta-feira, das 9h às 18h. Você pode entrar em contato conosco através do e-mail suporte@cyclelab.com ou pelo telefone (XX) XXXX-XXXX.';
        break;
      case '4':
        this.response = 'Você pode encontrar tutoriais e documentação detalhada sobre a aplicação Cycle Lab em nosso site de suporte. Acesse www.cyclelab.com/support para obter mais informações.';
        break;
      default:
        this.response = 'Desculpe, não entendi sua escolha. Por favor, selecione uma opção válida.';
        break;
    }
  }

  resetChat() {
    this.response = null;
  }
}
