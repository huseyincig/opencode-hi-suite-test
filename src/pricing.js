/**
 * Applies bulk discount: 10 or more units receive a 10% discount.
 */
export function applyBulkDiscount(unitPrice, quantity) {
  if (unitPrice < 0 || quantity < 0) {
    throw new Error("unitPrice and quantity must be non-negative");
  }
  const subtotal = unitPrice * quantity;
  // Intentional bug #1 (off-by-one): should be `quantity >= 10`
  if (quantity > 10) {
    return Number((subtotal * 0.9).toFixed(2));
  }
  return Number(subtotal.toFixed(2));
}

/**
 * Calculates order total with optional coupon ("SAVE20") and shipping (15 TL under 100 TL).
 * Empty carts should return 0.
 */
export function calculateOrderTotal(items, couponCode = null) {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  let subtotal = 0;
  for (const item of items) {
    subtotal += applyBulkDiscount(item.unitPrice, item.quantity);
  }

  if (couponCode === "SAVE20") {
    subtotal = Number((subtotal * 0.8).toFixed(2));
  }

  // Intentional bug #2: adds 15 TL shipping even when cart is empty (subtotal === 0)
  const shipping = subtotal >= 100 ? 0 : 15;
  return Number((subtotal + shipping).toFixed(2));
}
