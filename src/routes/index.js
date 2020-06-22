const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../configs/multerConfig");
const upload = multer(multerConfig);

const PortifolioController = require("../controllers/portifolioController");
const ProductController = require("../controllers/productController");
const DashboardController = require("../controllers/dashboardController");
const DepoimentsController = require("../controllers/depoimentsController");
const CategoryController = require("../controllers/categoryController");

//CADASTRO DE CATEGORIAS
router.post("/category", upload.single("thumbnail"), CategoryController.store);
router.get("/category", CategoryController.index);
router.put("/category", upload.single("thumbnail"), CategoryController.edit);
router.put("/category/:id", CategoryController.active);

//CADASTRO DE PRODUTOS
router.post("/products", upload.single("thumbnail"), ProductController.store);
router.get("/products", ProductController.index);
router.put("/products", upload.single("thumbnail"), ProductController.edit);

//CADASTRO DOS PORTIFÓLIOS
router.post("/catalog", upload.single("catalog"), PortifolioController.store);
router.delete("/catalog/:id", PortifolioController.remove);
router.get("/catalog/:product", PortifolioController.show);

//DASHBOARD
router.get("/dashboard", DashboardController.dashboard);
router.get("/listProducts", DashboardController.findProducts);

//DEPOIMENTOS
router.post("/depoiments", upload.single("avatar"), DepoimentsController.store);
router.delete("/depoiments/:id", DepoimentsController.remove);
router.get("/depoiments", DepoimentsController.index);

module.exports = router;
