# Changelog

## [Stage 1] — Project Foundation
- Inisialisasi project Nexus2D.
- Implementasi ECS-lite: Entity, EntityManager, Component, System.
- Implementasi core: Game, GameLoop, Scene, Time.
- Implementasi render: Renderer, Camera.
- Implementasi input: InputManager, KeyBindings.
- Implementasi math: Vector2, MathUtils.
- Implementasi utils: Logger, IdGenerator.
- Demo: player terkontrol WASD, NPC bergerak otomatis, target statis.
- **Known issue:** Player movement di-inject via monkey-patch di `main.js`, harus di-refactor di Stage 2.