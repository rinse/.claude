#!/usr/bin/env -S node --experimental-strip-types

import { test } from "node:test";
import assert from "node:assert/strict";
import { modelPart, contextPart, rateLimitParts, separator, formatResetTime, formatResetDate } from "./parts.ts";

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

// formatResetTime
test("formatResetTime formats unix timestamp to HH:MM", () => {
    // 2026-03-24 14:30:00 local time
    const d = new Date(2026, 2, 24, 14, 30, 0);
    const ts = Math.floor(d.getTime() / 1000);
    assert.equal(formatResetTime(ts), "14:30");
});

test("formatResetTime pads single digits", () => {
    const d = new Date(2026, 0, 1, 3, 5, 0);
    const ts = Math.floor(d.getTime() / 1000);
    assert.equal(formatResetTime(ts), "03:05");
});

// formatResetDate
test("formatResetDate formats unix timestamp to MM/DD", () => {
    const d = new Date(2026, 2, 28, 12, 0, 0);
    const ts = Math.floor(d.getTime() / 1000);
    assert.equal(formatResetDate(ts), "03-28");
});

test("formatResetDate pads single digits", () => {
    const d = new Date(2026, 0, 5, 12, 0, 0);
    const ts = Math.floor(d.getTime() / 1000);
    assert.equal(formatResetDate(ts), "01-05");
});

// rateLimitParts
test("rateLimitParts with both values returns 2 parts", () => {
    const parts = rateLimitParts(
        { used_percentage: 20, resets_at: Math.floor(new Date(2026, 2, 24, 14, 30).getTime() / 1000) },
        { used_percentage: 8, resets_at: Math.floor(new Date(2026, 2, 28, 12, 0).getTime() / 1000) },
    );
    assert.equal(parts.length, 2);
    assert.ok(parts[0].includes("5h"));
    assert.ok(parts[0].includes("20%"));
    assert.ok(parts[0].includes("@14:30"));
    assert.ok(parts[1].includes("7d"));
    assert.ok(parts[1].includes("8%"));
    assert.ok(parts[1].includes("@03-28"));
});

test("rateLimitParts with only fiveHour", () => {
    const parts = rateLimitParts({ used_percentage: 50 }, undefined);
    assert.equal(parts.length, 1);
    assert.ok(parts[0].includes("5h"));
});

test("rateLimitParts with only sevenDay", () => {
    const parts = rateLimitParts(undefined, { used_percentage: 30 });
    assert.equal(parts.length, 1);
    assert.ok(parts[0].includes("7d"));
});

test("rateLimitParts with neither returns empty array", () => {
    const parts = rateLimitParts(undefined, undefined);
    assert.equal(parts.length, 0);
});

test("rateLimitParts without resets_at omits time suffix", () => {
    const parts = rateLimitParts({ used_percentage: 20 }, { used_percentage: 8 });
    assert.equal(parts.length, 2);
    assert.ok(!parts[0].includes("@"));
    assert.ok(!parts[1].includes("@"));
});
