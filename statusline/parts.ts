const BLOCKS = " ▏▎▍▌▋▊▉█";
const R = "\x1b[0m";
const DIM = "\x1b[2m";

function gradient(pct: number): string {
    if (pct < 50) {
        const r = Math.round(pct * 5.1);
        return `\x1b[38;2;${r};200;80m`;
    } else {
        const g = Math.max(Math.round(200 - (pct - 50) * 4), 0);
        return `\x1b[38;2;255;${g};60m`;
    }
}

function bar(pct: number, width: number = 10): string {
    pct = Math.min(Math.max(pct, 0), 100);
    const filled = (pct * width) / 100;
    const full = Math.floor(filled);
    const frac = Math.floor((filled - full) * 8);
    let b = "█".repeat(full);
    if (full < width) {
        b += BLOCKS[frac];
        b += "░".repeat(width - full - 1);
    }
    return b;
}

function fmt(label: string, pct: number): string {
    const p = Math.round(pct);
    return `${label} ${gradient(pct)}${bar(pct)} ${p}%${R}`;
}

export const separator = `${DIM}│${R}`;

export function modelPart(displayName: string): string {
    return displayName;
}

export function contextPart(usedPercentage: number | null | undefined): string {
    if (usedPercentage != null) {
        return fmt("ctx", usedPercentage);
    }
    return "ctx --%";
}

export function rateLimitParts(
    fiveHour: number | undefined,
    sevenDay: number | undefined,
): string[] {
    const parts: string[] = [];
    if (fiveHour != null) {
        parts.push(fmt("5h", fiveHour));
    }
    if (sevenDay != null) {
        parts.push(fmt("7d", sevenDay));
    }
    return parts;
}
