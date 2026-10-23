import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dayKey, assertValidTimeZone, DEFAULT_SAVE_TZ } from "./date-dir.js";

describe("dayKey", () => {
    it("defaults to Asia/Ho_Chi_Minh", () => {
        assert.equal(DEFAULT_SAVE_TZ, "Asia/Ho_Chi_Minh");
    });

    it("rolls over at midnight Vietnam time (UTC+7), not UTC", () => {
        // 16:59:59 UTC = 23:59:59 VN on Oct 22
        assert.equal(dayKey(new Date("2026-10-22T16:59:59Z")), "2026-10-22");
        // 17:00:00 UTC = 00:00:00 VN on Oct 23
        assert.equal(dayKey(new Date("2026-10-22T17:00:00Z")), "2026-10-23");
    });

    it("respects a custom timezone", () => {
        assert.equal(dayKey(new Date("2026-10-22T17:00:00Z"), "UTC"), "2026-10-22");
    });

    it("zero-pads month and day", () => {
        assert.equal(dayKey(new Date("2026-01-05T03:00:00Z")), "2026-01-05");
    });
});

describe("assertValidTimeZone", () => {
    it("accepts a valid zone", () => {
        assert.doesNotThrow(() => assertValidTimeZone("Asia/Ho_Chi_Minh"));
    });

    it("rejects an invalid zone", () => {
        assert.throws(() => assertValidTimeZone("Mars/Olympus"), RangeError);
    });
});
