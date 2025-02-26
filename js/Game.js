class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  // "/" → banco de dados principal;
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {

      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;

      // loop for-in para dar a posição a cada carro dentro de play();
      for (var plr in allPlayers) {

        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        
        var y = height - allPlayers[plr].positionY; //colocar o jogador na parte inferior da tela;

        //definir a posição para os carros na matriz.

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        //criando um círculo embaixo de cada Carro;
        if(index === player.index){
          stroke(10);
          fill("blue");
          ellipse(x, y, 60,60);

          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
       
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  //adicionar controles ao carro;

  handlePlayerControls() {
    // manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
