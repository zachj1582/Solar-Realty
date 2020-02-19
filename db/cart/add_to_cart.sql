insert into order_items (
    customer_order_id,
    product_id,
    qty,
    price
) values (
    ${customer_order_id},
    ${product_id},
    1,
    ${price}
);