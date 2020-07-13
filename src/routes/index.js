const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../configs/multerConfig");
const upload = multer(multerConfig);

const PortifolioController = require("../controllers/portifolioController");
const ProductController = require("../controllers/productController");
const DashboardController = require("../controllers/dashboarcdController");
const DepoimentsController = require("../controllers/depoimentsController");
const CategoryController = require("../controllers/categoryController");
const SiteController = require("../controllers/siteController");

//CADASTRO DE CATEGORIAS
router.post("/category", upload.single("thumbnail"), CategoryController.store);
router.get("/category", CategoryController.index);
router.put(
  "/categoryEdit/:id",
  upload.single("thumbnail"),
  CategoryController.edit
);
router.put("/category/:id", CategoryController.active);

//CADASTRO DE PRODUTOS
router.post("/products", upload.single("thumbnail"), ProductController.store);
router.get("/products", ProductController.index);
router.put("/products/:id", upload.single("thumbnail"), ProductController.edit);
router.put("/active/:id", ProductController.active);
router.get("/findByCategory/:category", ProductController.findByCategory);

//CADASTRO DOS PORTIFÓLIOS
router.post("/catalog", upload.single("catalog"), PortifolioController.create);
router.delete("/catalog/:id", PortifolioController.remove);
router.get("/catalog/:product", PortifolioController.show);
router.put("/catalog/:id", PortifolioController.active);

//DASHBOARD
router.get("/findCategories", DashboardController.findCategory);
router.get("/findProducts", DashboardController.findProduct);

//DEPOIMENTOS
router.post("/depoiments", upload.single("avatar"), DepoimentsController.store);
router.delete("/depoiments/:id", DepoimentsController.remove);
router.get("/depoiments", DepoimentsController.index);

//SITE
router.get("/home", SiteController.home);
router.post("/productPage", SiteController.productsPage);
router.post("/findProduct", SiteController.findProduct);
router.get("/category", SiteController.findCategory);

module.exports = router;
