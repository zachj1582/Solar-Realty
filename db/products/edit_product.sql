update products
set product_name = $2,
    product_image = $3,
    product_description = $4,
    price = $5
where product_id = $1;