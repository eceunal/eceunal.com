import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('tiles', '/assets/FD_Dungeon_Free.png');
    this.load.tilemapTiledJSON('map', '/assets/second.tmj');
    
    this.load.spritesheet('player', '/assets/custom/dude.png', {
      frameWidth: 128,
      frameHeight: 128
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('FD_Dungeon_Free', 'tiles');

    map.createLayer('walls', tileset!, 0, 0);
    map.createLayer('floors', tileset!, 0, 0);

    this.player = this.physics.add.sprite(50, 420, 'player');
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