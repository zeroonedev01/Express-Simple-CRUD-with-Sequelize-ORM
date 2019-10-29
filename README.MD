<h1 align="center">Simple REST API </h1>
<p align='center'>
  <img width=400 src='https://miro.medium.com/max/900/1*g42KjOnDF4ptB_8494FP5A.png' />
  </a>
</p>
<p align="center">
  Built with Express.js,Mysql, and Sequalize.
</p>
## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Built With](#built-with)
- [Requirements](#requirements)
- [Installation](#installation)
- [Setup .env file](#setup-env-file)
- [Plugins](#plugins)
- [API Route URL (Public)](#api-route-url-public)
  - [Companies](#companies)
  - [Employees](#employees)
- [Hosting](#hosting)
- [Contributor](#contributor)

## Introduction
Lorem Ipsum

## Features
> - CRUD Employees
> - CRUD Companies
> - Sequalize ORM

## Built With
[![Express](https://img.shields.io/badge/Express%20-v.4.17.1-green.svg?style=rounded-square)](https://expressjs.com/)
[![Sequalize](https://img.shields.io/badge/Sequalize-v.5.21.1-blue.svg?style=rounded-square)](https://sequelize.org/)
[![MySQL2](https://img.shields.io/badge/MySQL2-v.2.0.0-orange.svg?style=rounded-square)](https://www.npmjs.com/search?q=mysql) 
[![bcryptjs](https://img.shields.io/badge/bcryptjs-v.2.4.3-critical)](https://www.npmjs.com/package/bcryptjs)

## Requirements
> * Node.js - Download and Install Node.js - Simple bash script to manage multiple active node.js versions.
> * npm
> * Nodemon - Download and Install Nodemon - nodemon is a tool that automatically restarting the node application when file changes in the directory are detected.
> * postman (installer or chrome extension)
> * code editor (visual studio code recommend)
> * mysql (xampp)

## Installation
Install the dependencies, migrate, start the server.
```sh
$ git clone https://github.com/tejojr/Express-Simple-CRUD-with-Sequelize-ORM.git
$ cd Express-Simple-CRUD-with-Sequelize-ORM
$ npm install
$ npm start
```
**migrate durung


## Setup .env file
* In windows OS, you can open command prompt, change directory to your project directory.
Example,
My project directory 
  ```
  E:\my_project
  ```
* Then you can type,
  ```
  copy .env.example .env
  ```
* Then Setup .env   

## Plugins


| Plugin      | Version |
| ----------- | ------- |
| bcryptjs    | ^2.4.3  |
| body-parser | ^1.19.0 |
| cors        | ^2.8.5  |
| express     | ^4.17.1 |
| dotenv      | ^8.2.0  |
| morgan      | ^1.9.1  |
| mysql2      | ^2.0.0  |
| sequalize   | ^5.21.1 |

## API Route URL (Public)
### Companies
| Plugin                | Purpose            | Method |
| --------------------- | ------------------ | ------ |
| /api/v1/companies     | Insert Company     | POST   |
| /api/v1/companies/:id | Update Company     | PATCH  |
| /api/v1/companies/:id | Delete Company     | DELETE |
| /api/v1/companies/    | Select All Company | GET    |
| /api/v1/companies/:id | Select by ID       | GET    |

### Employees

| Plugin                | Purpose             | Method |
| --------------------- | ------------------- | ------ |
| /api/v1/employees     | Insert Employee     | POST   |
| /api/v1/employees/:id | Update Employee     | PATCH  |
| /api/v1/employees/:id | Delete Employee     | DELETE |
| /api/v1/employees/    | Select All Employee | GET    |
| /api/v1/employees/:id | Select by ID        | GET    |

## Hosting
url

## Contributor
<a href="https://github.com/tejojr">
          <img width="100" src="https://avatars2.githubusercontent.com/u/33275770?s=460&v=4" alt="Ammar Annajih Pasifiky">
          <br/>
          <sub>
          <b>Ammar Annajih Pasifiky
          </b>
          </sub>
</a>
