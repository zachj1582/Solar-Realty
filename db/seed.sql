create table customers (
    customer_id serial primary key,
    email varchar(100) not null,
    password varchar(250) not null
);

create table if not exists products (
    product_id serial primary key,
    product_name varchar(50) not null,
    product_image varchar(250),
    product_description text,
    price decimal not null
);

create table customer_order (
    customer_order_id serial primary key,
    customer_id int references customers(customer_id),
    paid boolean
);

create table order_items (
    order_item_id serial primary key,
    customer_order_id int references customer_order(customer_order_id),
    product_id int references products(product_id),
    qty int,
    price decimal
);

create table site_admins(
    admin_id serial primary key,
    full_name varchar(250) not null,
    email varchar(250) not null,
    password varchar(250) not null
);