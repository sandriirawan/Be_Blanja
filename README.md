<br />
<p align="center">
  <div align="center">
    <img height="150" src="https://cdn.discordapp.com/attachments/1118733891738554480/1146038619325349898/logo-removebg-preview.png" alt="blanja" border="0"/>
  </div>
  <h3 align="center">Blanja</h3>
  <p align="center">
    <a href="https://github.com/sandriirawan/Be_Blanja"><strong>Explore the docs »</strong></a>
    <br />
<!--     <a href="https://blanja-fe-khaki.vercel.app/">View Demo</a>
    ·
    <a href="https://blanja-be-alpha.vercel.app/">Api Demo</a> -->
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)
- [Contributors](#contributors)
  - [Meet The Team Members](#meet-the-team-members)

# About The Project

Blanja is an E-commerce website project that aims to provide an easy and convenient online shopping experience for users in Indonesia. The site offers a wide range of products, including fashion, beauty, electronics, and food and beverages.

To use Blanja's services, users only need to create an account and enter their payment details. After that, users can browse products, add them to their shopping cart, and choose their preferred payment method.

With all the features and security provided, Blanja is expected to provide a safe, easy, and convenient online shopping experience for users across Indonesia.

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/sandriirawan/Be_Blanja
```

2. Change directory to Be_Blanja

```sh
cd Blanja-BE
```

3. Install all of the required modules

```sh
yarn install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
yarn server
```

- Or run this command for running in development environment

```sh
yarn dev
```

- Run this command for debugging and finding errors

```sh
yarn lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)]()

## Related Project

:rocket: [`Backend Blanja`](https://github.com/sandriirawan/Fe_Blanja_React)

:rocket: [`Frontend Blanja`](https://github.com/sandriirawan/Be_Blanja)

:rocket: [`Demo Blanja`]()

Project link : [https://github.com/sandriirawan/Fe_Blanja_React](https://github.com/sandriirawan/Fe_Blanja_React)]