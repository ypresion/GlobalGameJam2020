class Player
{
    //Private Fields
    _player;
    _canDoubleJump;
    _isFloating;
    constructor (game)
    {
        this._player = game.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'urania');
        this._player.setScale(1.5);
        this._player.setBounce(0.1);
        this._player.setCollideWorldBounds(false);
        this._player.setDrag(30);
        this._player.setMaxVelocity(300, 1000);
        this._canDoubleJump = false;
        this._isFloating = false;
        game.anims.create({
            key: 'float left',
            frames: game.anims.generateFrameNumbers('urania float', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
         game.anims.create({
            key: 'float right',
            frames: game.anims.generateFrameNumbers('urania float', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'jump left',
            frames: game.anims.generateFrameNumbers('urania jump', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
         game.anims.create({
            key: 'jump right',
            frames: game.anims.generateFrameNumbers('urania jump', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('urania', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'turn left',
            frames: [ { key: 'urania', frame: 4}],
            frameRate: 20
        });
        game.anims.create({
            key: 'turn right',
            frames: [ { key: 'urania', frame: 5}],
            frameRate: 20
        });
        game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('urania', {start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this._player.anims.play('turn left');
    }

    Update = function(cursors)
    {
        if (cursors.left.isDown)
        {
            this.MoveLeft();
        }
        else if (cursors.right.isDown)
        {
            this.MoveRight();
        }
        else
        {
            if (this._player.body.touching.down)
            {
                this._player.setAccelerationX(0);
                
                if (this._player.body.velocity.x < 0){
                
                this._player.anims.play('turn left');
                
            }
            else if (this._player.anims.frameRate == 10)
            {
                
                this._player.anims.play('turn right');
                
            }
                
            }
        }
            
        if (this._isFloating)
        {
            if (cursors.left.isDown)
            {
                this._player.anims.play('float left', true);
            }
            else if (cursors.right.isDown)
            {
               this._player.anims.play('float right', true); 
            }
            else if (this._player.body.velocity.x < 0)
            {
                this._player.anims.play('float left', true);
            }
            else
            {
                this._player.anims.play('float right', true); 
            }            
        }
            
        
        
        if (this._player.body.touching.down)
        {
            // this._player.anims.play('turn');
            this._player.setDragX(1500);
            this._isFloating = false;
            this._canDoubleJump = true;
        } 
        else 
        {
            this._player.setDragX(1000);
        }

        if (!cursors.up.isDown && !cursors.down.isDown)
        {
            this._player.setGravityY(0);
        }
    }

    MoveLeft = function()
    {
        
        if (this._player.body.touching.down)
        {
            this._player.setAccelerationX(-500);
            if (this._player.body.velocity.x < 0){
                this._player.anims.play('left', true);
            }
            else
            {
                this._player.anims.play('turn left');
            }
            return;
        }

        this._player.setAccelerationX(-200);
    }

    MoveRight = function()
    {
        
        if (this._player.body.touching.down)
        {
            this._player.setAccelerationX(500);
            if (this._player.body.velocity.x > 0){
                this._player.anims.play('right', true);
            }
            else
            {
                this._player.anims.play('turn right');
            }
            return;
        } 

        this._player.setAccelerationX(200);
    }

    Jump = function()
    {
        if (this._player.body.touching.down)
        {
            this._player.setVelocityY(-330);
            if (this._player.body.velocity.x < 0)
            {
                this._player.anims.play('jump left', true);
            }
            else 
                {
                    this._player.anims.play('jump right', true);
                }
        } 
        else if (this._canDoubleJump) 
        {
            this._player.setVelocityY(-330);
            if (this._player.body.velocity.x < 0)
            {
                this._player.anims.play('jump left', true);
            }
            else 
                {
                    this._player.anims.play('jump right', true);
                }
            this._canDoubleJump = false;
        } 
        else 
        {
                this._player.setGravityY(-150);
                this._isFloating = true;
        }
    }

    Pound = function()
    {
        if (this._player.body.touching.down)
        {
            this._player.setDragX(2000);
        } 
        else 
        {
            this._player.setVelocityY(750);
        }
    }
    
   
    Hit = function(otherObject)
    {
        this._player.setVelocity(0,0);
        this._player.setX(50);
        this._player.setY(300);
    }

    Get = function()
    {
        return this._player;
    }
}