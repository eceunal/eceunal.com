import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.text(400, 50, 'Initialized. You can move the box below left or right now. So much fun, right?', { 
      color: '#00ff00', 
      fontFamily: 'monospace' 
    }).setOrigin(0.5);

    this.player = this.physics.add.sprite(400, 300, '') as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    this.player.setDisplaySize(32, 32);
    this.player.setTint(0xff0000);
    this.player.setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250); // Negative X moves left
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);  // Positive X moves right
    }
  }
}