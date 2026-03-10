const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.NEXT_PUBLIC__POSTGRES_URL_NON_POOLING, { ssl: 'require' });

async function seed() {
    try {
        console.log('Seeding database...');

        // Create tables
        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        await sql`CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`;

        await sql`CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    )`;

        await sql`CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    )`;

        await sql`CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    )`;

        console.log('Tables created successfully');
        sql.end();
    } catch (error) {
        console.error('Seeding failed:', error);
        sql.end();
    }
}

seed();