import test from "node:test";
import assert from "node:assert/strict";
import { applyBulkDiscount, calculateOrderTotal } from "../src/pricing.js";

test("applyBulkDiscount applies 10% discount for more than 10 units", () => {
  assert.equal(applyBulkDiscount(50, 12), 540);
});

test("applyBulkDiscount applies 10% discount at exactly 10 units (regression)", () => {
  assert.equal(applyBulkDiscount(50, 10), 450);
});

test("calculateOrderTotal adds shipping under 100 and waives shipping at 100+", () => {
  assert.equal(calculateOrderTotal([{ unitPrice: 40, quantity: 2 }]), 95);
  assert.equal(calculateOrderTotal([{ unitPrice: 60, quantity: 2 }]), 120);
});

test("calculateOrderTotal applies SAVE20 coupon", () => {
  assert.equal(calculateOrderTotal([{ unitPrice: 100, quantity: 1 }], "SAVE20"), 95);
});
