var AMOUNT_DIAMONDS = 35;
var score = 0;
var scoreText;
var nombreText;

GamePlayManager = {
    diamondsCollected: 0 ,

    init:function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  // ajusta la imagen a la pantalla
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        this.flagFirstMouseDown = false;
    },
    preload:function(){
        game.load.image('background', 'assets/images/background.png'); //carga la imagen
        game.load.spritesheet('horse', 'assets/images/horse.png', 84, 156, 2);
        game.load.spritesheet('diamonds', 'assets/images/zanahorias.png', 81, 84, 4);
    },
    create:function(){
        game.add.sprite(0, 0, 'background'); //pone la imagen en el lienzo
        this.horse = game.add.sprite(0, 0, 'horse');
        this.horse.frame = 0;
        this.horse.x = game.width/2;
        this.horse.y = game.height/2;
        nombreText= this.add.text(16, 16, 'Roxana Constantin Esparraguera', { fontSize: '20px', fill: '#111' });
        scoreText = this.add.text(16, 35, 'score: 0', { fontSize: '32px', fill: '#000' });

        game.input.onDown.add(this.onTap, this);
        
        this.diamonds = [];
        for(var i=0; i<AMOUNT_DIAMONDS; i++){
            var diamond = game.add.sprite(100,100, 'diamonds'); 
            diamond.frame = game.rnd.integerInRange(0,3);
            diamond.scale.setTo(0.30 + game.rnd.frac());
            diamond.anchor.setTo(0.5);
            diamond.x = game.rnd.integerInRange(50, 1050);
            diamond.y = game.rnd.integerInRange(50, 600);
            this.diamonds.push(diamond); // Añade cada diamante al array
        }
    },
    onTap:function(){
        this.flagFirstMouseDown = true;
    },
    update:function(){
        //this.horse.angle += 1; 
        if(this.flagFirstMouseDown){
            var pointerX = game.input.x;
            var pointerY = game.input.y;
    
            var distX = pointerX - this.horse.x;
            var distY = pointerY - this.horse.y;
    
            if(distX > 0){
                this.horse.scale.setTo(1,1);
            }else{
                this.horse.scale.setTo(-1,1);
            }
            
            this.horse.x += distX * 0.02;
            this.horse.y += distY * 0.02;
            this.diamonds.forEach(function(diamond) {
            var boundsA = this.horse.getBounds();
            var boundsB = diamond.getBounds();
    
            if(Phaser.Rectangle.intersects(boundsA, boundsB)){
                    diamond.kill(); // Desaparecer la zanahoria
                    this.diamondsCollected++; // Incrementa el contador
                    score += 1;
                    scoreText.setText('Score: ' + score);
                    
                    

                    // Verifica si todas las zanahorias han sido recogidas
                    

                }
            if(this.diamondsCollected == AMOUNT_DIAMONDS){  
                    var winText = game.add.text(game.world.centerX, game.world.centerY, '¡Has ganado!', { font: '40px Arial', fill: '#1A3193' });
                     winText.anchor.setTo(0.5, 0.5);

                    
                }

            }, this); 
        }
    },
      
    }


var game = new Phaser.Game(1136, 640, Phaser.CANVAS);

//game.state.add("gameplay", GamePlayManager);
game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');

