import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EntityManager } from '../src/ecs/EntityManager.js';
import { TransformComponent } from '../src/ecs/components/TransformComponent.js';
import { VelocityComponent } from '../src/ecs/components/VelocityComponent.js';

test('EntityManager creates entity with unique id', () => {
    const em = new EntityManager();
    const a = em.createEntity('A');
    const b = em.createEntity('B');
    assert.notEqual(a.id, b.id);
});

test('Entity add/get component', () => {
    const em = new EntityManager();
    const e = em.createEntity('E');
    e.addComponent(new TransformComponent(10, 20));
    const t = e.getComponent(TransformComponent);
    assert.equal(t.position.x, 10);
    assert.equal(t.position.y, 20);
});

test('EntityManager query filters correctly', () => {
    const em = new EntityManager();
    const a = em.createEntity('A');
    a.addComponent(new TransformComponent());
    a.addComponent(new VelocityComponent());

    const b = em.createEntity('B');
    b.addComponent(new TransformComponent());

    const result = em.query(TransformComponent, VelocityComponent);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, a.id);
});

test('EntityManager deferred removal', () => {
    const em = new EntityManager();
    const e = em.createEntity('E');
    em.destroyEntity(e);
    assert.equal(em.getEntity(e.id).id, e.id); // masih ada sebelum flush
    em.flushRemovals();
    assert.equal(em.getEntity(e.id), null);
});