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
    this.physics.world.gravity.y = 1000;

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('FD_Dungeon_Free', 'tiles');

    map.createLayer('walls', tileset!, 0, 0);
    const floorLayer = map.createLayer('floors', tileset!, 0, 0);
    floorLayer!.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 420, 'player');
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, floorLayer!);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  update() {
    this.player.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(250);
      this.player.setFlipX(false);
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-450);
    }
  }
}