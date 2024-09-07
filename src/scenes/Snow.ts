import { Scene } from "phaser";

export class Snow extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  flakes: Phaser.GameObjects.Group;

  constructor() {
    super("Snow");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x000000);

    this.flakes = this.physics.add.group();

    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xffffff);
    // Loop through the bitmap array and draw it
    graphics.fillPoint(0, 0, 2);

    graphics.generateTexture("flake", 2, 2);
    graphics.destroy(); // Clean up graphics object

    for (let i = 0; i < 100; i++) {
      const sprite = this.flakes.create(
        Phaser.Math.FloatBetween(0, this.scale.width),
        Phaser.Math.FloatBetween(0, this.scale.height),
        "flake"
      );

      sprite.setVelocity(0, Phaser.Math.FloatBetween(15, 25));
      sprite.setCollideWorldBounds(true);
      sprite.body.onWorldBounds = true;
    }

    this.physics.world.on("worldbounds", (body: any) => {
      console.log({ body });
      console.log(`${body} collided with the world bounds!`);
      body.position.x = Phaser.Math.FloatBetween(0, this.scale.width);
      body.position.y = 0;
      body.setVelocity(0, Phaser.Math.FloatBetween(15, 25));
    });
  }

  update(time: number, delta: number): void {}
}
