
### `ARCHITECTURE.md`

```markdown
# Arsitektur Nexus2D

## Lapisan
1. **core/** — Game, GameLoop, Scene, Time
2. **ecs/** — Entity, EntityManager, Component, components/
3. **systems/** — System base + implementasi
4. **render/** — Renderer, Camera
5. **input/** — InputManager, KeyBindings
6. **math/** — Vector2, MathUtils
7. **utils/** — Logger, IdGenerator

## Alur Frame
1. `GameLoop._tick(now)` → hitung deltaTime
2. `Game._update(dt)` → `Time.tick` → `activeScene.update(dt)`
3. `Scene.update(dt)` → iterasi systems by priority → `flushRemovals`
4. `Game._render(dt)` → hook (RenderSystem sudah render di update)
5. `InputManager.endFrame()` → clear per-frame key states

## Dependency Direction