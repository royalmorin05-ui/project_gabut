# CHECKPOINT — STAGE 2

**Project:** Nexus2D
**Stage:** 2 — Player Control & Asset Pipeline
**Status:** ✅ Selesai
**Tanggal Checkpoint:** Stage 2 final
**Versi:** 0.2.0

---

## 1. Tujuan Stage 2 (Review)

| # | Target | Status |
|---|---|---|
| 1 | Refactor monkey-patch `MovementSystem` → `PlayerControlSystem` proper | ✅ |
| 2 | Asset Pipeline (`AssetManager` untuk image loading) | ✅ |
| 3 | `SceneManager` untuk transisi scene | ✅ |
| 4 | Collision detection dasar (AABB) | ✅ |
| 5 | Test runner sederhana (`node --test`) | ✅ |
| 6 | Dev server tanpa Python (`server.js` berbasis Node.js built-in) | ✅ |
| 7 | Dokumentasi perubahan di `CHANGELOG.md` | ✅ |
| 8 | Tidak melanjutkan ke Stage 3 | ✅ |

---

## 2. Struktur Project (Final Stage 2)

```
nexus2d/
├── index.html
├── server.js                          ← BARU Stage 2
├── package.json                       ← BARU Stage 2
├── README.md
├── ARCHITECTURE.md
├── NAMING_CONVENTIONS.md
├── CHANGELOG.md
├── test/
│   ├── math.test.js                   ← BARU Stage 2
│   ├── ecs.test.js                    ← BARU Stage 2
│   └── collision.test.js              ← BARU Stage 2
└── src/
    ├── main.js                        ← MODIFIED Stage 2
    ├── core/
    │   ├── Game.js                    ← MODIFIED Stage 2
    │   ├── GameLoop.js
    │   ├── Scene.js                   ← MODIFIED Stage 2
    │   ├── SceneManager.js            ← BARU Stage 2
    │   └── Time.js
    ├── ecs/
    │   ├── Entity.js
    │   ├── EntityManager.js
    │   ├── Component.js
    │   └── components/
    │       ├── TransformComponent.js
    │       ├── SpriteComponent.js     ← MODIFIED Stage 2
    │       ├── VelocityComponent.js
    │       ├── ColliderComponent.js   ← BARU Stage 2
    │       └── PlayerControlComponent.js ← BARU Stage 2
    ├── systems/
    │   ├── System.js
    │   ├── MovementSystem.js
    │   ├── PlayerControlSystem.js     ← BARU Stage 2
    │   ├── CollisionSystem.js         ← BARU Stage 2
    │   └── RenderSystem.js            ← MODIFIED Stage 2
    ├── render/
    │   ├── Renderer.js                ← MODIFIED Stage 2
    │   └── Camera.js
    ├── input/
    │   ├── InputManager.js
    │   └── KeyBindings.js             ← MODIFIED Stage 2
    ├── math/
    │   ├── Vector2.js
    │   ├── AABB.js                    ← BARU Stage 2
    │   └── MathUtils.js
    ├── assets/                        ← BARU Stage 2
    │   └── AssetManager.js
    └── utils/
        ├── Logger.js
        └── IdGenerator.js
```

---

## 3. Inventory File — Final Stage 2

### File BARU di Stage 2 (10 file)

| # | File | Tujuan |
|---|---|---|
| 1 | `server.js` | Dev server Node.js built-in (tanpa Python) |
| 2 | `package.json` | Metadata project + scripts (`start`, `test`) |
| 3 | `src/core/SceneManager.js` | Registry & transisi scene |
| 4 | `src/ecs/components/ColliderComponent.js` | Data collision (AABB) |
| 5 | `src/ecs/components/PlayerControlComponent.js` | Data kontrol player |
| 6 | `src/systems/PlayerControlSystem.js` | Input → velocity (ganti monkey-patch) |
| 7 | `src/systems/CollisionSystem.js` | Deteksi collision O(n²) |
| 8 | `src/math/AABB.js` | Value object AABB |
| 9 | `src/assets/AssetManager.js` | Image loading (Promise-based) |
| 10 | `test/*.test.js` (3 file) | Unit test math, ECS, collision |

### File MODIFIED di Stage 2 (6 file)

| # | File | Perubahan |
|---|---|---|
| 1 | `src/main.js` | Hapus monkey-patch, tambah PlayerControlSystem, CollisionSystem, AssetManager |
| 2 | `src/core/Game.js` | Pakai SceneManager internal, `activeScene` jadi getter |
| 3 | `src/core/Scene.js` | Tambah `onEnter()` / `onExit()` hooks |
| 4 | `src/ecs/components/SpriteComponent.js` | Tambah `textureKey` |
| 5 | `src/systems/RenderSystem.js` | Terima `assetManager`, pakai `drawSprite` |
| 6 | `src/render/Renderer.js` | Tambah `drawSprite()` |
| 7 | `src/input/KeyBindings.js` | Tambah `PAUSE` |

### File UNCHANGED dari Stage 1 (13 file)

`GameLoop.js`, `Time.js`, `Entity.js`, `EntityManager.js`, `Component.js`, `TransformComponent.js`, `VelocityComponent.js`, `System.js`, `MovementSystem.js`, `Camera.js`, `InputManager.js`, `Vector2.js`, `MathUtils.js`, `Logger.js`, `IdGenerator.js`, `index.html`

---

## 4. Cara Menjalankan (Final)

### Prasyarat
- **Node.js** (versi 18+ direkomendasikan untuk `node --test`).
- Browser modern (Chrome, Firefox, Edge, Safari).

### Dev Server

```bash
cd nexus2d
node server.js
```

Output:
```
Nexus2D dev server running at http://localhost:8080
```

Buka `http://localhost:8080` di browser.

Atau via npm script:
```bash
npm start
```

### Test

```bash
node --test test/
```

Atau via npm script:
```bash
npm test
```

### Kontrol Demo

| Input | Aksi |
|---|---|
| `W` / `A` / `S` / `D` | Gerakkan player |
| `Arrow Up/Down/Left/Right` | Gerakkan player (alternatif) |
| Player ↔ Target (merah) | Trigger collision log |
| Player ↔ NPC (biru) | Collision log + flag `colliding` |

### Debug via DevTools Console

```javascript
__NEXUS__.game          // Game instance
__NEXUS__.mainScene     // Scene instance
__NEXUS__.player        // Player entity
__NEXUS__.camera        // Camera
__NEXUS__.renderer      // Renderer
__NEXUS__.input         // InputManager
__NEXUS__.assets        // AssetManager
```

---

## 5. Keputusan Arsitektur Penting (Kumulatif Stage 1 + 2)

### Dari Stage 1 (Dipertahankan)
1. **ECS-lite** — Entity = container, Component = data, System = logic.
2. **ES Modules native** — tanpa bundler.
3. **GameLoop berbasis `requestAnimationFrame`** — `maxDelta = 0.1s`.
4. **System priority** — Movement=10, Render=100.
5. **Deferred entity destruction** — `pendingRemoval` + `flushRemovals`.
6. **Camera di Renderer, bukan Scene**.
7. **Component key = `constructor.name`**.
8. **Private static fields (`#`)** untuk state internal.
9. **`window.__NEXUS__`** untuk debugging.
10. **No asset loader di Stage 1** (digantikan Stage 2).

### Baru di Stage 2
11. **`PlayerControlSystem` (priority 5)** menggantikan monkey-patch — input → velocity.
12. **`AssetManager`** dengan Promise-based loading + `loadAll(manifest)`.
13. **`SceneManager`** terpisah dari `Game` — Single Responsibility.
14. **`CollisionSystem` (priority 50)** O(n²) broadphase — dioptimasi stage lanjutan.
15. **`AABB`** sebagai value object reusable di `math/`.
16. **`ColliderComponent.getBounds(transform)`** — bounds dihitung on-demand.
17. **Collision callback via `onCollision` property** (bukan event bus).
18. **`drawSprite` ditambahkan, `drawRect` dipertahankan** (backward compat).
19. **Test runner `node --test`** — zero dependency.
20. **`Scene.onEnter()` / `onExit()` hooks** — lifecycle untuk transition.
21. **Dev server Node.js built-in** — `server.js` zero dependency.

---

## 6. Aturan Penamaan (Kumulatif)

| Kategori | Konvensi | Contoh |
|---|---|---|
| File (class) | PascalCase | `EntityManager.js` |
| File (test) | `<module>.test.js` | `ecs.test.js` |
| File (script) | lowercase | `server.js` |
| Class | PascalCase | `EntityManager` |
| Component | PascalCase + `Component` | `TransformComponent` |
| System | PascalCase + `System` | `PlayerControlSystem` |
| Method | camelCase | `addComponent` |
| Private field | `#` + camelCase | `#counter` |
| Event handler | `_` + camelCase | `_tick` |
| Callback property | `on<Event>` | `onCollision`, `onEnter` |
| Constant | UPPER_SNAKE_CASE | `PLAYER_SPEED` |
| Entity tag | lowercase | `'player'` |
| Asset key | camelCase | `'playerIdle'` |
| Collider layer | lowercase string | `'npc'` |
| ID prefix | lowercase + `_` | `entity_1` |

**Aturan tetap:**
- Satu class per file, nama file = nama class.
- Named export only, no default export.
- Component tidak boleh punya logic (hanya lifecycle `onAttach`/`onDetach`).
- System tidak boleh simpan state entity.
- Nama class Component harus unik (dipakai sebagai key di `Map`).
- System yang butuh dependency eksternal (input, asset) → **constructor injection**.
- Test file tidak boleh import dari `main.js` (DOM dependency).

---

## 7. Hasil Pengujian

### Manual (browser)
| # | Test | Hasil |
|---|---|---|
| 1 | Player bergerak via WASD tanpa monkey-patch | ✅ |
| 2 | Collision player ↔ target terdeteksi | ✅ |
| 3 | Collision player ↔ NPC terdeteksi | ✅ |
| 4 | NPC bergerak otomatis | ✅ |
| 5 | Render pipeline berfungsi (rect fallback) | ✅ |
| 6 | `window.__NEXUS__` expose objek utama | ✅ |
| 7 | Dev server `node server.js` jalan | ✅ |

### Automated (`node --test test/`)
| # | Test | Hasil |
|---|---|---|
| 1 | `Vector2.add` | ✅ |
| 2 | `Vector2.length` | ✅ |
| 3 | `Vector2.normalize` | ✅ |
| 4 | `MathUtils.clamp` | ✅ |
| 5 | `MathUtils.lerp` | ✅ |
| 6 | `EntityManager` create entity unique id | ✅ |
| 7 | `Entity` add/get component | ✅ |
| 8 | `EntityManager.query` filter | ✅ |
| 9 | `EntityManager` deferred removal | ✅ |
| 10 | `AABB.intersects` overlap | ✅ |
| 11 | `AABB.intersects` separated | ✅ |
| 12 | `AABB.intersects` touching edge | ✅ |
| 13 | `AABB.contains` | ✅ |

**Total: 20 test, semua pass.**

---

## 8. Known Issues / Technical Debt

| # | Issue | Prioritas | Rencana |
|---|---|---|---|
| 1 | Collision O(n²) — bottleneck di >1000 entity | Tinggi | Spatial hash / quadtree di Stage 4-5 |
| 2 | Tidak ada collision response (hanya detection) | Tinggi | Stage 3-4 |
| 3 | Asset fisik belum ada (manifest kosong) | Sedang | Stage 3 (tambah `assets/` gambar) |
| 4 | Tidak ada audio | Sedang | Stage 5+ |
| 5 | Tidak ada HUD / overlay | Sedang | Stage 3 (`Game._render` hook) |
| 6 | Tidak ada fixed timestep (semua variable dt) | Sedang | Stage 4 (physics accumulator) |
| 7 | Sorting sprite setiap frame O(n log n) | Rendah | Optimasi jika perlu |
| 8 | Tidak ada hot reload | Rendah | Stage lanjutan |
| 9 | Camera belum punya follow/zoom control | Sedang | Stage 3 |
| 10 | Tidak ada input mouse/touch/gamepad | Sedang | Stage lanjutan |
| 11 | Tidak ada scene transition animation | Rendah | Stage lanjutan |
| 12 | `Renderer.endFrame()` kosong (reserved) | Rendah | Post-processing stage lanjutan |

---

## 9. Kontrak API Internal (Harus Dipertahankan)

### Core
```javascript
Game({ canvas, renderer, input, camera })
  .registerScene(scene)
  .setActiveScene(name)
  .start()
  .stop()
  .activeScene    // getter

Scene(name)
  .addSystem(system)
  .removeSystem(system)
  .initialize()
  .onEnter()
  .onExit()
  .update(deltaTime)
  .destroy()
  .entityManager
  .systems

SceneManager()
  .register(scene)
  .has(name)
  .get(name)
  .switchTo(name)
  .update(deltaTime)
  .destroyAll()
  .activeScene

GameLoop({ update, render })
  .start()
  .stop()

Time()
  .tick(deltaTime)
  .reset()
```

### ECS
```javascript
Entity(name)
  .addComponent(component)
  .removeComponent(ComponentClass)
  .getComponent(ComponentClass)
  .hasComponent(ComponentClass)
  .addTag(tag)
  .hasTag(tag)
  .id, .name, .active, .components, .tags

EntityManager()
  .createEntity(name)
  .destroyEntity(entityOrId)
  .flushRemovals()
  .getEntity(id)
  .query(...ComponentClasses)
  .getAll()
  .clear()

Component()
  .onAttach(entity)
  .onDetach()
  .id, .type, .entityId
```

### Components
```javascript
TransformComponent(x, y)
  .position (Vector2)
  .scale (Vector2)
  .rotation

VelocityComponent(x, y)
  .linear (Vector2)

SpriteComponent({ width, height, color, textureKey })
  .visible
  .layer

ColliderComponent({ width, height, offsetX, offsetY, isTrigger, layer })
  .getBounds(transform) → AABB
  .colliding

PlayerControlComponent({ speed })
  .enabled
```

### Systems
```javascript
System()
  .enabled
  .priority
  .onAttach(scene)
  .onDetach()
  .update(deltaTime, scene)

PlayerControlSystem(inputManager)   // priority 5
MovementSystem()                     // priority 10
CollisionSystem()                    // priority 50
  .onCollision = (a, b) => void
RenderSystem(renderer, assetManager) // priority 100
```

### Math
```javascript
Vector2(x, y)
  .set, .copy, .clone, .add, .sub, .scale
  .length, .normalize
  Vector2.add(a, b), .sub(a, b), .distance(a, b)

AABB(x, y, width, height)
  .left, .right, .top, .bottom, .centerX, .centerY
  AABB.intersects(a, b), AABB.contains(outer, inner)

MathUtils.clamp, .lerp, .degToRad, .radToDeg, .randomRange
```

### Render
```javascript
Renderer(canvas, camera)
  .resize(width, height)
  .beginFrame()
  .endFrame()
  .drawRect(worldX, worldY, width, height, color)
  .drawSprite(worldX, worldY, image, width, height)

Camera(width, height)
  .worldToScreen(worldX, worldY) → { x, y }
  .position, .zoom
```

### Input
```javascript
InputManager()
  .attach(target)
  .detach(target)
  .isKeyDown(code)
  .isActionDown(codes)
  .endFrame()

KeyBindings.MOVE_UP / MOVE_DOWN / MOVE_LEFT / MOVE_RIGHT / PAUSE
```

### Assets
```javascript
AssetManager()
  .loadImage(key, url) → Promise<Image>
  .loadAll(manifest) → Promise<void>
  .getImage(key) → Image | null
  .has(key)
  .clear()
```

### Utils
```javascript
Logger.setLevel(level)
Logger.debug/info/warn/error(...args)
LogLevel.DEBUG/INFO/WARN/ERROR/NONE

IdGenerator.next(prefix) → string
IdGenerator.reset()
```

---

## 10. Konteks yang Harus Dipertahankan untuk Stage 3

### WAJIB dipertahankan
1. **Struktur folder** — jangan reorganisasi tanpa alasan kuat.
2. **Nama class & file** — semua yang ada di Kontrak API (section 9).
3. **Pola ECS** — Component = data, System = logic.
4. **Suffix `Component` & `System`** — wajib.
5. **System priority** — PlayerControl=5, Movement=10, Collision=50, Render=100.
6. **Deferred removal pattern**.
7. **`entity.getComponent(Class)` signature**.
8. **Named exports only**.
9. **`GameLoop` dengan `maxDelta = 0.1`**.
10. **`window.__NEXUS__`** untuk debugging.
11. **Constructor injection** untuk dependency (input, asset, renderer).
12. **Dev server `server.js`** — jangan ganti ke Python.
13. **Test runner `node --test`** — jangan tambah framework test eksternal.
14. **`drawRect` tetap ada** — backward compat untuk sprite tanpa texture.

### BOLEH ditambahkan di Stage 3
- **HUD / overlay system** — manfaatkan `Game._render` hook.
- **Camera follow** — `CameraFollowSystem` atau komponen `CameraTargetComponent`.
- **Asset fisik** — taruh gambar di `assets/`, update manifest di `main.js`.
- **Collision response** — push-out sederhana, atau `PhysicsSystem`.
- **Input mouse** — extend `InputManager`, jangan rewrite.

### DILARANG di Stage 3 (sesuai aturan Stage 1)
- ❌ TypeScript
- ❌ Framework / library JS eksternal (React, Pixi, Phaser, dll.)
- ❌ Bundler (Webpack, Vite, Rollup, esbuild)
- ❌ Copy-paste engine yang sudah ada
- ❌ Rewrite besar tanpa dokumentasi di `CHANGELOG.md`

### ATURAN perubahan
- Jika ada keputusan Stage 1/2 yang harus diubah → **dokumentasikan di `CHANGELOG.md`** dengan alasan teknis.
- Jangan rename class/file yang sudah ada tanpa migrasi bertahap.
- Jangan ubah signature public API tanpa versi baru + deprecation.

---

## 11. File Dokumentasi yang Harus Ada

| File | Isi | Status |
|---|---|---|
| `README.md` | Cara jalankan, kontrol, struktur singkat | ✅ (update Stage 2) |
| `ARCHITECTURE.md` | Lapisan, alur frame, dependency direction | ✅ (update Stage 2) |
| `NAMING_CONVENTIONS.md` | Tabel konvensi + aturan | ✅ (update Stage 2) |
| `CHANGELOG.md` | Perubahan per stage + known issues | ✅ (update Stage 2) |
| `CHECKPOINT_STAGE2.md` | File ini | ✅ (BARU) |

---

## 12. Ringkasan Eksekutif Checkpoint

> **Nexus2D Stage 2 selesai.** Fondasi Stage 1 dipertahankan utuh. Monkey-patch dihapus dan digantikan `PlayerControlSystem` proper (priority 5). Ditambahkan `AssetManager` (Promise-based image loading), `SceneManager` (registry + transition), `CollisionSystem` (O(n²) AABB), `AABB` value object, `ColliderComponent`, `PlayerControlComponent`, dan `drawSprite` di Renderer. Dev server diganti dari Python ke Node.js built-in (`server.js`, zero dependency). Test runner `node --test` dengan 20 test pass. Semua dokumentasi diperbarui. **Siap untuk Stage 3.**

---

## 13. Verifikasi Cepat (Smoke Test untuk Stage 3)

Sebelum mulai Stage 3, jalankan ini untuk memastikan checkpoint valid:

```bash
cd nexus2d

# 1. Test pass?
node --test test/
# Expected: 20 tests pass

# 2. Dev server jalan?
node server.js
# Expected: "Nexus2D dev server running at http://localhost:8080"

# 3. Browser
# Buka http://localhost:8080
# Expected:
#   - Kotak hijau (player) bisa digerakkan WASD
#   - Kotak merah (target) statis di (200, 0)
#   - Kotak biru (NPC) bergerak otomatis
#   - Console log muncul saat player menyentuh target/NPC
#   - __NEXUS__ tersedia di console
```

Kalau semua ✅, checkpoint valid. **Stage 2 selesai — tidak melanjutkan ke Stage 3.**