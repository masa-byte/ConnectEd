import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-background-canvas',
  template: ` <canvas #canvas></canvas> `,
  styles: [
    `
      canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: clip;
        background: radial-gradient(#e6dcd2, #cfd0d8);
        z-index: -1;
      }
    `,
  ],
})
export class BackgroundCanvasComponent {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particlesArray: Particle[] = [];

  ngOnInit() {
    this.addEventListeners();

    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;

    this.init();
    this.animate();
  }

  private init() {
    this.particlesArray = [];
    const numberofParticles =
      (this.canvasRef.nativeElement.height *
        this.canvasRef.nativeElement.width) /
      9000;
    for (let i = 0; i < numberofParticles; i++) {
      const size = Math.random() * 5 + 3;
      const x =
        Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
      const y =
        Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
      const directionX = Math.random() * 5 - 2.5;
      const directionY = Math.random() * 5 - 2.5;
      const color = '#5A3DDC';

      this.particlesArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].update(this.ctx);
    }
    this.connect();
  }

  private connect() {
    let opacityValue = 1;
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a; b < this.particlesArray.length; b++) {
        const distance =
          (this.particlesArray[a].x - this.particlesArray[b].x) *
          (this.particlesArray[a].x - this.particlesArray[b].x) +
          (this.particlesArray[a].y - this.particlesArray[b].y) *
          (this.particlesArray[a].y - this.particlesArray[b].y);
        if (
          distance <
          (this.canvasRef.nativeElement.width / 7) *
          (this.canvasRef.nativeElement.height / 7)
        ) {
          opacityValue = 1 - distance / 20000;
          this.ctx.strokeStyle = 'rgba(131,145,201,' + opacityValue + ')';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private addEventListeners() {
    window.addEventListener('resize', () => {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;
      this.init();
    });

    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
  }
}

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#5A3DDC';
    ctx.fill();
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.x > window.innerWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < window.innerWidth - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < window.innerHeight - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

const mouse = {
  x: null as any,
  y: null as any,
  //radius: (window.innerHeight / 80) * (window.innerHeight / 80)
  radius: (window.innerHeight / 135) * (window.innerHeight / 135),
};
