import { Sequelize } from "sequelize";

const db  = new Sequelize("postgresql://rest_api_node_typescript_hn5b_user:uu6XzmCpqmqKXK0hr6vP6Wec7mVZr6G6@dpg-d0lltrogjchc73f6v6rg-a.frankfurt-postgres.render.com/rest_api_node_typescript_hn5b?ssl=true", { logging: false });

export default db;