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

function fmt(label: string, pct: number, resetSuffix?: string): string {
    const p = Math.round(pct);
    const suffix = resetSuffix ? ` ${DIM}@${resetSuffix}${R}` : "";
    return `${label} ${gradient(pct)}${bar(pct)} ${p}%${R}${suffix}`;
}

export function formatResetTime(resetsAt: number): string {
    const d = new Date(resetsAt * 1000);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
}

export function formatResetDate(resetsAt: number): string {
    const d = new Date(resetsAt * 1000);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}-${dd}`;
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

export type RateLimitInfo = { used_percentage: number; resets_at?: number };

export function rateLimitParts(
    fiveHour: RateLimitInfo | undefined,
    sevenDay: RateLimitInfo | undefined,
): string[] {
    const parts: string[] = [];
    if (fiveHour != null) {
        const reset = fiveHour.resets_at != null ? formatResetTime(fiveHour.resets_at) : undefined;
        parts.push(fmt("5h", fiveHour.used_percentage, reset));
    }
    if (sevenDay != null) {
        const reset = sevenDay.resets_at != null ? formatResetDate(sevenDay.resets_at) : undefined;
        parts.push(fmt("7d", sevenDay.used_percentage, reset));
    }
    return parts;
}
