const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../configs/multerConfig");
const upload = multer(multerConfig);

const ContactController = require("../controllers/contactController");
const PartnerController = require("../controllers/partnerController");
const PortifolioController = require("../controllers/portifolioController");
const ProductController = require("../controllers/productController");
const PagesController = require("../controllers/pagesController");
const DashboardController = require("../controllers/dashboardController");

//CADASTRO DE PRODUTOS
router.post("/products", upload.single("image"), ProductController.store);
router.get("/products", ProductController.index);
router.delete("/products/:id", ProductController.remove);
router.get("/productsFind/:id", ProductController.find);
router.put("/products/:id", ProductController.update);
router.put(
  "/banner/:id",
  upload.single("banner"),
  ProductController.saveBanner
);

//CADASTRO DAS PÁGINAS
router.put("/pagesConfig/:id", PagesController.storePageConfig);
router.put(
  "/saveCards/:id",
  upload.single("cardImage"),
  PagesController.saveCards
);
router.put(
  "/saveLists/:id",
  upload.single("listImage"),
  PagesController.saveLists
);
router.put(
  "/saveDetailsImage/:id",
  upload.single("detailsImage"),
  PagesController.saveDetailsImages
);
router.put("/saveDetailsList/:id", PagesController.saveDetailsList);

//CADASTRO DOS PORTIFÓLIOS
router.post(
  "/portifolio",
  upload.single("portifolio"),
  PortifolioController.store
);
router.delete("/portifolio/:id", PortifolioController.remove);
router.get("/portifolio/:id", PortifolioController.index);

//CADASTRO DE PROFISSIONAIS
router.post("/professional", upload.single("avatar"), PartnerController.store);
router.put(
  "/professional/:id",
  upload.single("avatar"),
  PartnerController.update
);
router.delete("/professional/:id", PartnerController.remove);
router.get("/professional", PartnerController.index);

//DASHBOARD
router.get("/dashboard", DashboardController.dashboard);
router.get("/listProducts", DashboardController.findProducts);

module.exports = router;
