import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AABB } from '../src/math/AABB.js';

test('AABB intersects — overlapping', () => {
    const a = new AABB(0, 0, 10, 10);
    const b = new AABB(5, 5, 10, 10);
    assert.equal(AABB.intersects(a, b), true);
});

test('AABB intersects — separated', () => {
    const a = new AABB(0, 0, 10, 10);
    const b = new AABB(20, 20, 10, 10);
    assert.equal(AABB.intersects(a, b), false);
});

test('AABB intersects — touching edge (no overlap)', () => {
    const a = new AABB(0, 0, 10, 10);
    const b = new AABB(10, 0, 10, 10);
    assert.equal(AABB.intersects(a, b), false);
});

test('AABB contains', () => {
    const outer = new AABB(0, 0, 100, 100);
    const inner = new AABB(10, 10, 20, 20);
    assert.equal(AABB.contains(outer, inner), true);
});