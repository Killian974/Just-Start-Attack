// Definition de la zone du jeu dans le navigateur
var game = new Phaser.Game(1080, 700);

// Vitesse du player
var vitesse = 2000;

var JustStart = {
    preload: function() {
        // chargement des images
        game.load.image('plateau', '../img/fond.jpg');
        game.load.image('player', '../img/joueur.png');
        game.load.image('mechant', '../img/mechant.png');
        

    },
    create: function() {
        // setup + affichage
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Ajout + position du plateau du jeu
        game.add.sprite(0,0, 'plateau');

        // Ajout + position du player sur le plateau
        this.player = game.add.sprite(540,600, 'player');
        game.physics.arcade.enable(this.player);

        // Création variable pour utilisation d'une touche de clavier enfoncé
        this.cursors = game.input.keyboard.createCursorKeys();

        // Création du groupe des méchants
        this.mechants = game.add.group();

        // Réglage de la fréquence d'apparition méchant (en ms)
        this.timmer = game.time.events.loop(50, this.ajouterUnMechant, this);

        // Création et font du score
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#fff" })
    },
    update: function() {
        //logique du jeu

        // Fonction qui permet de mourrir quand le player touche un mechant
        game.physics.arcade.overlap(this.player, this.mechants, this.restartGame, null, this);

        // Stop la touche enfoncé pour ne pas bouger infiniment
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        // Fonction de déplacement touche 
        if(this.cursors.left.isDown){
             this.player.body.velocity.x = (vitesse * -1);
        }

        if(this.cursors.right.isDown){
            this.player.body.velocity.x = vitesse;
       }

       if(this.cursors.up.isDown){
        this.player.body.velocity.y = (vitesse * -1);
    }

        if(this.cursors.down.isDown){
            this.player.body.velocity.y = vitesse;
       }
       //Fin fonction touche 

       // Quand sortie de map -> On meurt
       if(this.player.inWorld == false ){
           this.restartGame();
       }

    },

    // Message alert fin de parti pour le score
    restartGame: function(){
        alert("Votre score est de : " + this.score + " !");
        game.state.start('JustStart');
    },

    // Fonction pour determiner position d'appartion des méchants
    ajouterUnMechant: function() {
        // Fonction pour determiner position d'appartion des méchants
        var position = Math.floor(Math.random() * 1080) + 20;

        // Départ de l'apparition des méchants sur la map
        var mechant = game.add.sprite(position,-50, 'mechant');

        // Activation lois physiques sur les méchants
        game.physics.arcade.enable(mechant);

        // Taux de gravité des méchants
        mechant.body.gravity.y = 800;   
        
        // Ajoute un mechant dans le groupe mechants (pluriel)
        this.mechants.add(mechant);

        // Score que rapporte chaque mechant
        this.score += 20;
        this.labelScore.text = this.score;

        // Laisse les mechants tant qu'ils sont dans la map
        mechant.checkWorldBounds = true ;

        // Supprime les méchants quand ils sont sorti de la map
        mechant.outOfBoundsKill = true ;
        
    }

};
//Demarer le jeu
game.state.add('JustStart', JustStart);
game.state.start('JustStart');