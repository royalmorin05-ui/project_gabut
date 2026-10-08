# Naming Conventions Nexus2D

| Kategori | Konvensi | Contoh |
|---|---|---|
| File (class) | PascalCase | `EntityManager.js` |
| Class | PascalCase | `EntityManager` |
| Component | PascalCase + `Component` | `TransformComponent` |
| System | PascalCase + `System` | `MovementSystem` |
| Method | camelCase | `addComponent` |
| Private field | `#` + camelCase | `#counter` |
| Event handler | `_` + camelCase | `_tick` |
| Constant | UPPER_SNAKE_CASE | `PLAYER_SPEED` |
| Entity tag | lowercase | `'player'` |
| ID prefix | lowercase + `_` | `entity_1` |

## Aturan
- Satu class per file, nama file = nama class.
- Named export only, no default export.
- Component tidak boleh punya logic (hanya lifecycle).
- System tidak boleh simpan state entity.
- Nama class Component harus unik (dipakai sebagai key di `Map`).