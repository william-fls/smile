    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
        }
     // Removemos as imagens de acerto, caso existam
     let imagemAcerto = divis[i].querySelector('#imagem');
     if (imagemAcerto) {
         imagemAcerto.remove(); // Remove a imagem de acerto (Smile)
     }
     
     // Removemos as imagens de erro, caso existam
     let imagemErro = divis[i].querySelector('#imagem-erro');
     if (imagemErro) {
         imagemErro.remove(); // Remove a imagem de erro
     }
 }
}

    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2024/05/24/nobru-1iyq2cd4iugj9.jpg";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }

    // Função executada quando o jogador erra
function errou(obj) {
  obj.className = "errou"; // Aplica a classe que já muda a aparência da carta

  // Criar uma constante img que armazena um novo objeto imagem
  const img = new Image(100);
  img.id = "imagem-erro"; // Define o ID da imagem
  img.src = "https://s2-techtudo.glbimg.com/x5nv6AsGNCCp4qmfcdS99LNELOU=/0x57:529x420/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/A/i/6jXVTyR0AhxCNdG0Kqlg/screenshot-2020-01-31-piuzinho-piuzinholl-fotos-e-videos-do-instagram.png"; // URL da imagem a ser exibida na escolha errada (substitua com a imagem desejada)

  // Adiciona a imagem dentro da div da opção errada
  obj.appendChild(img);
}


    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
    function verifica(obj) {
      //se jogar é verdadeiro
      if (jogar) {
        //jogar passa a ser false
        jogar = false;
        //incrementa as tentativas
        tentativas++;
        //verifica se jogou 3 vezes
        if (tentativas == 4) {
          //oculta o botao joganovamente alterando a classe css (getElementById e className)
          btnJogarNovamente.className = 'invisivel';
          //mostra o botao reiniciar alterando a classe css (getElementById e className)
          btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 4);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          acertou(obj);
          //incrementa o contador de acertos
          acertos++;
        } else {
          errou(obj); // Mostra a imagem da resposta errada
          const objSorteado = document.getElementById(sorteado);
          acertou(objSorteado); // Mostra onde estava a resposta correta
      }
        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
      } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
      }
    }
    

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);