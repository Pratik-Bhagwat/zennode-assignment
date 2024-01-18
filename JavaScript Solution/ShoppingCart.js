class DiscountPair {
  constructor(discountAmount, discountName) {
    this.discountAmount = discountAmount;
    this.discountName = discountName;
  }
}

const productAPrice = 20;
const productBPrice = 40;
const productCPrice = 50;

function calculateDiscount(
  subtotalAmount,
  productAQuantity,
  productBQuantity,
  productCQuantity,
  totalQuantity
) {
  let flat_10_discount = 0;
  let bulk_5_discount = 0;
  let bulk_10_discount = 0;
  let tiered_50_discount = 0;

  let maxDiscount;

  // this is for flat_10_discount
  if (subtotalAmount > 200) {
    flat_10_discount = 10;
  }

  // this is for bulk_5_discount
  if (productAQuantity > 10) {
    const bulk_5_discount_productA =
      (productAPrice * productAQuantity * 5) / 100;
    bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productA);
  }
  if (productBQuantity > 10) {
    const bulk_5_discount_productB =
      (productBPrice * productBQuantity * 5) / 100;
    bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productB);
  }
  if (productCQuantity > 10) {
    const bulk_5_discount_productC =
      (productCPrice * productCQuantity * 5) / 100;
    bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productC);
  }

  // this is for bulk_10_discount
  if (totalQuantity > 20) {
    bulk_10_discount = (subtotalAmount * 10) / 100;
  }

  // this is for tiered_50_discount
  if (totalQuantity > 30 && productAQuantity > 15) {
    const discountQuantity = productAQuantity - 15;
    const totalAmountPerProduct = productAPrice * discountQuantity;
    const tiered_50_discount_prodcutA = (totalAmountPerProduct * 50) / 100;
    tiered_50_discount = Math.max(
      tiered_50_discount_prodcutA,
      tiered_50_discount
    );
  }
  if (totalQuantity > 30 && productBQuantity > 15) {
    const discountQuantity = productBQuantity - 15;
    const totalAmountPerProduct = productBPrice * discountQuantity;
    const tiered_50_discount_prodcutB = (totalAmountPerProduct * 50) / 100;
    tiered_50_discount = Math.max(
      tiered_50_discount_prodcutB,
      tiered_50_discount
    );
  }
  if (totalQuantity > 30 && productCQuantity > 15) {
    const discountQuantity = productCQuantity - 15;
    const totalAmountPerProduct = productCPrice * discountQuantity;
    const tiered_50_discount_prodcutC = (totalAmountPerProduct * 50) / 100;
    tiered_50_discount = Math.max(
      tiered_50_discount_prodcutC,
      tiered_50_discount
    );
  }

  maxDiscount = Math.max(
    Math.max(Math.max(flat_10_discount, bulk_5_discount), bulk_10_discount),
    tiered_50_discount
  );

  let discountName;
  if (maxDiscount == flat_10_discount) {
    discountName = "flat_10_discount";
  } else if (maxDiscount == bulk_5_discount) {
    discountName = "bulk_5_discount";
  } else if (maxDiscount == bulk_10_discount) {
    discountName = "bulk_10_discount";
  } else if (maxDiscount == tiered_50_discount) {
    discountName = "tiered_50_discount";
  } else {
    discountName = "Special Maximum Discount";
  }

  return new DiscountPair(maxDiscount, discountName);
}

function getTotalPricePerProduct(productPrice, productQuantity) {
  return productPrice * productQuantity;
}

function getShippingCost(totalQuantity) {
  return Math.ceil(totalQuantity / 10);
}

function getGiftWrapCost(giftWrapProduct, quantity) {
  let giftWrapCost = 0;
  if (giftWrapProduct) return giftWrapCost + quantity;
  return giftWrapCost;
}

function displayProductDeatils(
  productName,
  productQuantity,
  totalPriceOfTheProduct
) {
  console.log(
    `${productName} -> Quantity: ${productQuantity} -> Subtotal: ${totalPriceOfTheProduct}`
  );
}

function main() {
  const readlineSync = require("readline-sync");

  let totalAmount = 0;
  let subtotalAmount = 0;
  let discountAmount = 0;
  let totalQuantity = 0;

  let shippingCost = 0;
  let giftWrapCost = 0;

  let productAQuantity = 0;
  let productBQuantity = 0;
  let productCQuantity = 0;

  let giftWrapForProductA = false;
  let giftWrapForProductB = false;
  let giftWrapForProductC = false;

  productAQuantity = parseInt(
    readlineSync.question("Please Enter the Quantity for Product A: ")
  );
  const res1 = readlineSync.question(
    "Do you want to Wrap this Product as Gift? (yes/no): "
  );
  if (res1 === "yes") giftWrapForProductA = true;

  productBQuantity = parseInt(
    readlineSync.question("Please Enter the Quantity for Product B: ")
  );
  const res2 = readlineSync.question(
    "Do you want to Wrap this Product as Gift? (yes/no): "
  );
  if (res2 === "yes") giftWrapForProductB = true;

  productCQuantity = parseInt(
    readlineSync.question("Please Enter the Quantity for Product C: ")
  );
  const res3 = readlineSync.question(
    "Do you want to Wrap this Product as Gift? (yes/no): "
  );
  if (res3 === "yes") giftWrapForProductC = true;

  totalQuantity = productAQuantity + productBQuantity + productCQuantity;

  subtotalAmount +=
    getTotalPricePerProduct(productAPrice, productAQuantity) +
    getTotalPricePerProduct(productBPrice, productBQuantity) +
    getTotalPricePerProduct(productCPrice, productCQuantity);

  const pair = calculateDiscount(
    subtotalAmount,
    productAQuantity,
    productBQuantity,
    productCQuantity,
    totalQuantity
  );

  discountAmount = pair.discountAmount;

  giftWrapCost =
    getGiftWrapCost(giftWrapForProductA, productAQuantity) +
    getGiftWrapCost(giftWrapForProductB, productBQuantity) +
    getGiftWrapCost(giftWrapForProductC, productCQuantity);

  shippingCost = getShippingCost(totalQuantity);

  totalAmount = subtotalAmount - discountAmount + shippingCost + giftWrapCost;

  console.log(
    "----------------------------> Output <------------------------------"
  );
  displayProductDeatils(
    "Product A",
    productAQuantity,
    productAPrice * productAQuantity
  );
  displayProductDeatils(
    "Product B",
    productBQuantity,
    productBPrice * productBQuantity
  );
  displayProductDeatils(
    "Product C",
    productCQuantity,
    productCPrice * productCQuantity
  );

  console.log("The Subtotal is: " + subtotalAmount);
  console.log(
    "Discount Name: " +
      pair.discountName +
      " and " +
      "Discount Price: " +
      pair.discountAmount
  );
  console.log(
    "Shipping fee: " + shippingCost + " and Gift Wrap fee: " + giftWrapCost
  );
  console.log("Total Amount: " + totalAmount);
}
main();
