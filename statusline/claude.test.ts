#!/usr/bin/env -S node --experimental-strip-types

import { test } from "node:test";
import assert from "node:assert/strict";
import { fromJSON, type StatusLineInput } from "./claude.ts";

// Actual input sample captured from /tmp/statusline-debug.log
const SAMPLE_INPUT = JSON.stringify({
    session_id: "5a0d35d4-6809-4ee8-b422-dd8b3720e7de",
    transcript_path: "/home/rinse/.claude/projects/-home-rinse--claude-statusline/5a0d35d4-6809-4ee8-b422-dd8b3720e7de.jsonl",
    cwd: "/home/rinse/.claude/statusline",
    model: { id: "claude-sonnet-4-6", display_name: "Sonnet 4.6" },
    workspace: {
        current_dir: "/home/rinse/.claude/statusline",
        project_dir: "/home/rinse/.claude/statusline",
        added_dirs: [], // extra field from actual input, not in type
    },
    version: "2.1.80",
    output_style: { name: "default" },
    cost: {
        total_cost_usd: 0.09039660000000001,
        total_duration_ms: 239042,
        total_api_duration_ms: 10896,
        total_lines_added: 4,
        total_lines_removed: 0,
    },
    context_window: {
        total_input_tokens: 5,
        total_output_tokens: 654,
        context_window_size: 200000,
        current_usage: {
            input_tokens: 1,
            output_tokens: 416,
            cache_creation_input_tokens: 1402,
            cache_read_input_tokens: 17326,
        },
        used_percentage: 9,
        remaining_percentage: 91,
    },
    exceeds_200k_tokens: false,
    rate_limits: {
        five_hour: { used_percentage: 20, resets_at: 1774040400 }, // resets_at: extra field from actual input
        seven_day: { used_percentage: 8, resets_at: 1774195200 },
    },
    vim: { mode: "INSERT" },
});

test("fromJSON parses actual sample input", () => {
    const data = fromJSON(SAMPLE_INPUT);
    assert.equal(data.session_id, "5a0d35d4-6809-4ee8-b422-dd8b3720e7de");
    assert.equal(data.cwd, "/home/rinse/.claude/statusline");
    assert.equal(data.version, "2.1.80");
});

test("fromJSON: model fields", () => {
    const data = fromJSON(SAMPLE_INPUT);
    assert.equal(data.model.id, "claude-sonnet-4-6");
    assert.equal(data.model.display_name, "Sonnet 4.6");
});

test("fromJSON: context_window fields", () => {
    const data = fromJSON(SAMPLE_INPUT);
    assert.equal(data.context_window.used_percentage, 9);
    assert.equal(data.context_window.remaining_percentage, 91);
    assert.equal(data.context_window.context_window_size, 200000);
    assert.ok(data.context_window.current_usage != null);
    assert.equal(data.context_window.current_usage!.input_tokens, 1);
    assert.equal(data.context_window.current_usage!.cache_read_input_tokens, 17326);
});

test("fromJSON: rate_limits fields", () => {
    const data = fromJSON(SAMPLE_INPUT);
    assert.equal(data.rate_limits?.five_hour?.used_percentage, 20);
    assert.equal(data.rate_limits?.seven_day?.used_percentage, 8);
});

test("fromJSON: vim field (optional)", () => {
    const data = fromJSON(SAMPLE_INPUT);
    assert.equal(data.vim?.mode, "INSERT");
});

test("fromJSON: without optional fields", () => {
    const minimal = JSON.stringify({
        session_id: "abc",
        transcript_path: "/tmp/x.jsonl",
        cwd: "/tmp",
        model: { id: "claude-sonnet-4-6", display_name: "Sonnet 4.6" },
        workspace: { current_dir: "/tmp", project_dir: "/tmp" },
        version: "1.0.0",
        output_style: { name: "default" },
        cost: { total_cost_usd: 0, total_duration_ms: 0, total_api_duration_ms: 0, total_lines_added: 0, total_lines_removed: 0 },
        context_window: { total_input_tokens: 0, total_output_tokens: 0, context_window_size: 200000, used_percentage: null, remaining_percentage: null, current_usage: null },
        exceeds_200k_tokens: false,
    });
    const data = fromJSON(minimal);
    assert.equal(data.vim, undefined);
    assert.equal(data.agent, undefined);
    assert.equal(data.worktree, undefined);
    assert.equal(data.rate_limits, undefined);
    assert.equal(data.context_window.used_percentage, null);
});
