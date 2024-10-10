const express = require("express");
const cors = require("cors");
const app = express()
const fs = require("fs")
const path = require("path")
const productsRoutes = require("./src/routes/productsRoutes")

const PORT = process.env.PORT || 3000;  


app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }))




app.use("/api/products", productsRoutes)