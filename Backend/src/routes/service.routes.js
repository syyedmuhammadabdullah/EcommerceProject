import { Router } from "express";
import { geoNamesCities, geoNamesCountries, geoNamesStates,geoNamesTowns,} from "../index.js";
const serviceRouter = Router();

serviceRouter.get("/location/countries", geoNamesCountries)
serviceRouter.get("/location/states", geoNamesStates)
serviceRouter.get("/location/cities", geoNamesCities)
serviceRouter.get("/location/towns", geoNamesTowns)

export { serviceRouter }