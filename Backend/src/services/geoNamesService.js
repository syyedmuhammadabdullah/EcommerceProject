import { apiResponse, apiError, asyncHandler } from "../index.js";
import axios from "axios";

// Fetch Countries
const geoNamesCountries = asyncHandler(async (_, res) => {
    try {
        const response = await axios.get("http://api.geonames.org/countryInfoJSON", {
            params: {
                username: process.env.GEONAMES_SERVICE_USERNAME
            }
        });
        res.status(200).json(new apiResponse(200, "Countries fetched successfully", response.data.geonames));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});

// Fetch States
const geoNamesStates = asyncHandler(async (req, res) => {
    const { countryId } = req.query;
    console.log(countryId);
    
    try {
        const response = await axios.get("http://api.geonames.org/childrenJSON", {
            params: {
                username: process.env.GEONAMES_SERVICE_USERNAME,
                geonameId: countryId 
            }
        });
        res.status(200).json(new apiResponse(200, "States fetched successfully", response.data.geonames));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});


// Fetch Cities
const geoNamesCities = asyncHandler(async (req, res) => {
    const { stateId } = req.query;
    
    try {
        const response = await axios.get("http://api.geonames.org/childrenJSON", {
            params: {
                username: process.env.GEONAMES_SERVICE_USERNAME,
                geonameId: stateId 
            }
        });
        res.status(200).json(new apiResponse(200, "Cities fetched successfully", response.data.geonames));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});

// Fetch Towns
const geoNamesTowns = asyncHandler(async (req, res) => {
    const { cityId } = req.query;
    
    try {
        const response = await axios.get("http://api.geonames.org/childrenJSON", {
            params: {
                username: process.env.GEONAMES_SERVICE_USERNAME,
                geonameId: cityId 
            }
        });
        res.status(200).json(new apiResponse(200, "Towns fetched successfully", response.data.geonames));
    } catch (error) {
        throw new apiError(400, error.message);
    }
});




export {
    geoNamesCountries,
    geoNamesStates,
    geoNamesCities,
    geoNamesTowns,
};
