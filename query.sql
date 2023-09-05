-- Active: 1693929640533@@147.139.210.135@5432@sandri01

CREATE TABLE
    custommer (
        id VARCHAR PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(255),
        gender VARCHAR(255),
        photo VARCHAR(255),
        role VARCHAR(255)
    )

CREATE TABLE
    seller (
        id VARCHAR PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        store_name VARCHAR(255),
        store_description TEXT,
        photo VARCHAR(255),
        role VARCHAR(255)
    )



CREATE TABLE
    product (
        id VARCHAR PRIMARY KEY,
        product_name VARCHAR(255),
        color VARCHAR(255),
        size VARCHAR(255),
        stock VARCHAR(255),
        price VARCHAR(255),
        condition VARCHAR(255),
        description TEXT,
        photo_product VARCHAR(255),
        users_id VARCHAR(255),
        category_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

CREATE TABLE
    category (
        id VARCHAR PRIMARY KEY,
        name VARCHAR(20),
        category_photo VARCHAR
    )

DROP TABLE users 

CREATE TABLE
    orders (
        id VARCHAR PRIMARY KEY,
        order_size VARCHAR(255),
        order_color VARCHAR(255),
        quantity INT,
        total_price INT,
        custommer_id VARCHAR(255),
        seller_id VARCHAR(255),
        product_id VARCHAR(255),
        address_id VARCHAR(255),
        status_orders VARCHAR DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    payment (
        id VARCHAR PRIMARY KEY,
        users_id VARCHAR(255),
        bank_id VARCHAR(255),
        total_payment VARCHAR(255),
        status_payment VARCHAR DEFAULT 'successful payment',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    bank (
        id VARCHAR PRIMARY KEY,
        bank_name VARCHAR(255),
        photo_bank VARCHAR(255) ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
    delivery (
        id VARCHAR PRIMARY KEY,
        delivery_price VARCHAR DEFAULT '10000'
    );

CREATE TABLE
    address (
        id VARCHAR PRIMARY KEY,
        recipient_name VARCHAR(50),
        address_as VARCHAR(250),
        address VARCHAR(250),
        phone VARCHAR(20),
        postal_code VARCHAR(10),
        city VARCHAR(50),
        users_id VARCHAR
    );