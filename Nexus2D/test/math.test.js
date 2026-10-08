import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Vector2 } from '../src/math/Vector2.js';
import { MathUtils } from '../src/math/MathUtils.js';

test('Vector2 add', () => {
    const v = new Vector2(1, 2).add(new Vector2(3, 4));
    assert.equal(v.x, 4);
    assert.equal(v.y, 6);
});

test('Vector2 length', () => {
    const v = new Vector2(3, 4);
    assert.equal(v.length(), 5);
});

test('Vector2 normalize', () => {
    const v  = new Vector2(3, 4).normalize();
    assert.ok(Math.abs(v.length() - 1) < 1e-9);
});

test('MathUtils clamp', () => {
    assert.equal(MathUtils.clamp(5, 0, 16), 5);
    assert.equal(MathUtils.clamp(-5, 0, 10), 0);
    assert.equal(MathUtils.clamp(15, 0, 10), 10);
});

test('MathUtils lerp', () => {
    assert.equal(MathUtils.lerp(0, 10, 0.5), 5);
    assert.equal(MathUtils.lerp(0, 10, 0), 0);
    assert.equal(MathUtils.lerp(0, 10, 1), 10);
});