#!/usr/bin/env -S node --experimental-strip-types

import { createInterface } from "readline";
import { fromJSON } from "./claude.ts";
import { separator, modelPart, contextPart, rateLimitParts } from "./parts.ts";

async function main() {
    const rawInput = await readStdIn();
    const data = fromJSON(rawInput);

    const parts: string[] = [
        modelPart(data.model?.display_name ?? "Unknown"),
        contextPart(data.context_window?.used_percentage),
        ...rateLimitParts(
            data.rate_limits?.five_hour?.used_percentage,
            data.rate_limits?.seven_day?.used_percentage,
        ),
    ];

    process.stdout.write(parts.map((p) => ` ${p} `).join(separator));
}

function readStdIn(): Promise<string> {
    return new Promise((resolve) => {
        const lines: string[] = [];
        const reader = createInterface({
            input: process.stdin,
        });
        reader.on("line", (line: string) => {
            lines.push(line);
        });
        reader.on("close", () => {
            resolve(lines.join(""));
        });
    });
}

main();
