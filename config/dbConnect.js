import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import * as nodeDns from "node:dns/promises"
nodeDns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Conectado con éxito a la BBDD");
    } catch (error) {
        console.log("Error en la conexión de la BBDD", error);
    }
}
export { connectDB };