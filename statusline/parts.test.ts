#!/usr/bin/env -S node --experimental-strip-types

import { test } from "node:test";
import assert from "node:assert/strict";
import { modelPart, contextPart, rateLimitParts, separator } from "./parts.ts";

// separator
test("separator is a dimmed │", () => {
    assert.ok(separator.includes("│"));
});

// modelPart
test("modelPart returns display name as-is", () => {
    assert.equal(modelPart("Sonnet 4.6"), "Sonnet 4.6");
});

// contextPart
test("contextPart with 9%", () => {
    const result = contextPart(9);
    assert.ok(result.includes("ctx"));
    assert.ok(result.includes("9%"));
});

test("contextPart with 0%", () => {
    const result = contextPart(0);
    assert.ok(result.includes("0%"));
});

test("contextPart with 100%", () => {
    const result = contextPart(100);
    assert.ok(result.includes("100%"));
});

test("contextPart with null returns placeholder", () => {
    assert.equal(contextPart(null), "ctx --%");
});

test("contextPart with undefined returns placeholder", () => {
    assert.equal(contextPart(undefined), "ctx --%");
});

// rateLimitParts
test("rateLimitParts with both values returns 2 parts", () => {
    const parts = rateLimitParts(20, 8);
    assert.equal(parts.length, 2);
    assert.ok(parts[0].includes("5h"));
    assert.ok(parts[0].includes("20%"));
    assert.ok(parts[1].includes("7d"));
    assert.ok(parts[1].includes("8%"));
});

test("rateLimitParts with only fiveHour", () => {
    const parts = rateLimitParts(50, undefined);
    assert.equal(parts.length, 1);
    assert.ok(parts[0].includes("5h"));
});

test("rateLimitParts with only sevenDay", () => {
    const parts = rateLimitParts(undefined, 30);
    assert.equal(parts.length, 1);
    assert.ok(parts[0].includes("7d"));
});

test("rateLimitParts with neither returns empty array", () => {
    const parts = rateLimitParts(undefined, undefined);
    assert.equal(parts.length, 0);
});
