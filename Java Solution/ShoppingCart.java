import java.util.*;

public class ShoppingCart{

    final static int productAPrice = 20;
    final static int productBPrice = 40;
    final static int productCPrice = 50;

    private static DiscountPair calculateDiscount(int subtotalAmount,int productAQuantity,int productBQuantity, int productCQuantity,int totalQuantity) {
        int flat_10_discount = 0;
        int bulk_5_discount = 0;
        int bulk_10_discount = 0;
        int tiered_50_discount = 0;

        int maxDiscount;

        // this is for flat_10_discount
        if(subtotalAmount > 200) {
            flat_10_discount = 10;
        }

        // this is for bulk_5_discount
        if(productAQuantity > 10) {
            int bulk_5_discount_productA = (productAPrice * productAQuantity) * 5 / 100;
            bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productA);
        }
        if(productBQuantity > 10) {
            int bulk_5_discount_productB = (productBPrice * productBQuantity) * 5 / 100;
            bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productB);
        }
        if(productCQuantity > 10) {
            int bulk_5_discount_productC = (productCPrice * productCQuantity) * 5 / 100;
            bulk_5_discount = Math.max(bulk_5_discount, bulk_5_discount_productC);
        }

        // this is for bulk_10_discount
        if(totalQuantity > 20) {
            bulk_10_discount = subtotalAmount * 10 / 100;
        }

        // this is for tiered_50_discount
        if(totalQuantity > 30 && productAQuantity > 15) {
            int discountQuantity = productAQuantity - 15;
            int totalAmountPerProduct = productAPrice * discountQuantity;
            int tiered_50_discount_prodcutA = totalAmountPerProduct * 50 / 100;
            tiered_50_discount = Math.max(tiered_50_discount_prodcutA, tiered_50_discount);
        }
        if(totalQuantity > 30 && productBQuantity > 15) {
            int discountQuantity = productBQuantity - 15;
            int totalAmountPerProduct = productBPrice * discountQuantity;
            int tiered_50_discount_prodcutB = totalAmountPerProduct * 50 / 100;
            tiered_50_discount = Math.max(tiered_50_discount_prodcutB, tiered_50_discount);
        }
        if(totalQuantity > 30 && productCQuantity > 15) {
            int discountQuantity = productCQuantity - 15;
            int totalAmountPerProduct = productCPrice * discountQuantity;
            int tiered_50_discount_prodcutC = totalAmountPerProduct * 50 / 100;
            tiered_50_discount = Math.max(tiered_50_discount_prodcutC, tiered_50_discount);
        }

        maxDiscount = Math.max(Math.max(Math.max(flat_10_discount,bulk_5_discount),bulk_10_discount),tiered_50_discount);

        String discountName;
        if(maxDiscount == flat_10_discount) {
            discountName = "flat_10_discount";
        }
        else if(maxDiscount == bulk_5_discount) {
            discountName = "bulk_5_discount";
        }
        else if(maxDiscount == bulk_10_discount) {
            discountName = "bulk_10_discount";
        }
        else if(maxDiscount == tiered_50_discount) {
            discountName = "tiered_50_discount";
        }
        else {
            discountName = "Special Maximum Discount";
        }

        return new DiscountPair(maxDiscount, discountName);

    }

    private static int getTotalPricePerProduct(int productPrice, int productQuantity) {
        return productPrice * productQuantity;
    }

    private static int getShippingCost(int totalQuantity) {
        return (int)Math.ceil(((double) totalQuantity / 10));
    }

    private static int getGiftWrapCost(boolean giftWrapProduct, int quantity) {
        int giftWrapCost = 0;
        if(giftWrapProduct) return giftWrapCost + quantity;
        return giftWrapCost;
    }

    private static void displayProductDeatils(String productName,int productQuantity,int totalPriceOfTheProduct) {
        System.out.println(productName + " -> Quantity: " + productQuantity + " -> Subtotal: "+totalPriceOfTheProduct);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int totalAmount = 0;
        int subtotalAmount = 0;
        int discountAmount = 0;
        int totalQuantity = 0;

        int shippingCost = 0;
        int giftWrapCost = 0;

        int productAQuantity = 0;
        int productBQuantity = 0;
        int productCQuantity = 0;

        boolean giftWrapForProductA = false;
        boolean giftWrapForProductB = false;
        boolean giftWrapForProductC = false;

        System.out.print("Please Enter the Quantity for Product A: ");
        productAQuantity = sc.nextInt();
        System.out.print("Do you want to Wrap this Product as Gift? (yes/no): ");
        String res = sc.next();
        if(Objects.equals(res, "yes")) giftWrapForProductA = true;


        System.out.print("Please Enter the Quantity for Product B: ");
        productBQuantity = sc.nextInt();
        System.out.print("Do you want to Wrap this Product as Gift? (yes/no): ");
        String res2 = sc.next();
        if(Objects.equals(res2, "yes")) giftWrapForProductB = true;


        System.out.print("Please Enter the Quantity for Product C: ");
        productCQuantity = sc.nextInt();
        System.out.print("Do you want to Wrap this Product as Gift? (yes/no): ");
        String res3 = sc.next();
        if(Objects.equals(res3, "yes")) giftWrapForProductC = true;

        totalQuantity = productAQuantity + productBQuantity + productCQuantity;

        subtotalAmount += getTotalPricePerProduct(productAPrice,productAQuantity) + getTotalPricePerProduct(productBPrice,productBQuantity) + getTotalPricePerProduct(productCPrice,productCQuantity);

        DiscountPair pair = calculateDiscount(subtotalAmount,productAQuantity,productBQuantity,productCQuantity,totalQuantity);

        discountAmount = pair.discountAmount;

        giftWrapCost = getGiftWrapCost(giftWrapForProductA, productAQuantity) + getGiftWrapCost(giftWrapForProductB, productBQuantity) + getGiftWrapCost(giftWrapForProductC, productCQuantity);

        shippingCost = getShippingCost(totalQuantity);
                            

        totalAmount = (subtotalAmount - discountAmount) + shippingCost + giftWrapCost;

        System.out.println("----------------------------> Output <------------------------------");
        displayProductDeatils("Product A", productAQuantity, productAPrice * productAQuantity);
        displayProductDeatils("Product B", productBQuantity, productBPrice * productBQuantity);
        displayProductDeatils("Product C", productCQuantity, productCPrice * productCQuantity);

        System.out.println("The Subtotal is: " + subtotalAmount);
        System.out.println("Discount Name: " + pair.discountName + " and " + "Discount Price: "+ pair.discountAmount);
        System.out.println("Shipping fee: " + shippingCost + " and Gift Wrap fee: " + giftWrapCost);
        System.out.println("Total Amount: " + totalAmount);

        sc.close();
    }
}