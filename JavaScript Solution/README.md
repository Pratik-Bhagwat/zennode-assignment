---

# Shopping Cart Calculator

This is a simple shopping cart calculator script written in JavaScript. The script calculates the total amount for a set of products, taking into account various discounts, shipping costs, and optional gift wrapping.

## How to Run

1. Ensure you have Node.js installed on your machine. If not, you can download it from [https://nodejs.org/](https://nodejs.org/).

2. Clone or download the repository to your local machine.

3. Open a terminal and navigate to the project directory.

4. Run the following command to install the required dependencies:

    ```bash
    npm install readline-sync
    ```

5. Execute the script by running:

    ```bash
    node script.js
    ```

6. Follow the prompts to enter the quantity for each product and choose whether to wrap them as gifts.

7. The script will display the details of each product, subtotal, discounts, shipping costs, gift wrap fees, and the total amount.

## Usage Instructions

- Enter the quantity for each product when prompted.

- Choose whether to wrap each product as a gift (answer "yes" or "no").

- Review the output, including the subtotal, discounts, shipping fees, gift wrap fees, and the total amount.

## Discounts Logic

The script applies the following types of discounts:

- **Flat 10% discount:** Applied if the subtotal amount is greater than $200.

- **Bulk 5% discount:** Applied individually for each product if the quantity is greater than 10.

- **Bulk 10% discount:** Applied if the total quantity of all products is greater than 20.

- **Tiered 50% discount:** Applied individually for each product if the total quantity is greater than 30 and the quantity for a specific product is greater than 15.

---
