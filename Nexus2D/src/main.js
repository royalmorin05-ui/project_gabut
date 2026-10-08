import { Logger, LogLevel } from './utils/Logger.js';
import { Game } from './core/Game.js';
import { Scene } from './core/Scene.js';
import { Renderer } from './render/Renderer.js';
import { Camera } from './render/Camera.js';
import { InputManager } from './input/InputManager.js';
import { AssetManager } from './assets/AssetManager.js';
import { MovementSystem } from './systems/MovementSystem.js';
import { PlayerControlSystem } from './systems/PlayerControlSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { TransformComponent } from './ecs/components/TransformComponent.js';
import { VelocityComponent } from './ecs/components/VelocityComponent.js';
import { SpriteComponent } from './ecs/components/SpriteComponent.js';
import { ColliderComponent } from './ecs/components/ColliderComponent.js';
import { PlayerControlComponent } from './ecs/components/PlayerControlComponent.js';

Logger.setLevel(LogLevel.DEBUG);

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

async function bootstrap() {
    const canvas = document.getElementById('game-canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const camera = new Camera(CANVAS_WIDTH, CANVAS_HEIGHT);
    const renderer = new Renderer(canvas, camera);
    const input = new InputManager();
    input.attach(window);

    const assets = new AssetManager();
    // Stage 2: manifest kosong — demo pakai colored rect.
    // Asset textured siap dipakai kapan saja dengan menambahkan entry:
    // await assets.loadAll({ player: './assets/player.png' });
    await assets.loadAll({});

    const game = new Game({ canvas, renderer, input, camera });

    const mainScene = new Scene('MainScene');
    mainScene.addSystem(new PlayerControlSystem(input));   // priority 5
    mainScene.addSystem(new MovementSystem());             // priority 10
    mainScene.addSystem(new CollisionSystem());            // priority 50
    mainScene.addSystem(new RenderSystem(renderer, assets)); // priority 100

    // --- Player ---
    const player = mainScene.entityManager.createEntity('Player');
    player.addComponent(new TransformComponent(0, 0));
    player.addComponent(new VelocityComponent(0, 0));
    player.addComponent(new PlayerControlComponent({ speed: 220 }));
    player.addComponent(new SpriteComponent({ width: 48, height: 48, color: '#4ade80' }));
    player.addComponent(new ColliderComponent({ width: 48, height: 48, layer: 'player' }));
    player.addTag('player');

    // --- Target (trigger zone) ---
    const target = mainScene.entityManager.createEntity('Target');
    target.addComponent(new TransformComponent(200, 0));
    target.addComponent(new SpriteComponent({ width: 24, height: 24, color: '#f87171' }));
    target.addComponent(new ColliderComponent({ width: 24, height: 24, isTrigger: true, layer: 'target' }));

    // --- NPC (drifting, solid) ---
    const npc = mainScene.entityManager.createEntity('NPC');
    npc.addComponent(new TransformComponent(-150, 100));
    npc.addComponent(new VelocityComponent(60, -40));
    npc.addComponent(new SpriteComponent({ width: 32, height: 32, color: '#60a5fa' }));
    npc.addComponent(new ColliderComponent({ width: 32, height: 32, layer: 'npc' }));

    // --- Collision hook demo ---
    const collisionSystem = mainScene.systems.find(s => s instanceof CollisionSystem);
    collisionSystem.onCollision = (a, b) => {
        // Demo: player ↔ target → log
        if (a.hasTag('player') || b.hasTag('player')) {
            Logger.debug(`Player collision with ${a.hasTag('player') ? b.name : a.name}`);
        }
    };

    game.registerScene(mainScene);
    game.setActiveScene('MainScene');
    game.start();

    window.__NEXUS__ = { game, mainScene, player, camera, renderer, input, assets };
    Logger.info('Nexus2D Stage 2 bootstrapped');
}

window.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch(err => Logger.error('Bootstrap failed', err));
});