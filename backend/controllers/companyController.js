// controllers/companyController.js
const companyService = require('./companyService');

const getCompaniesController = async (req, res) => {
    try {
        const companies = await companyService.getCompaniesFromDB();
        res.send({ status: true, data: companies });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const createCompanyController = async (req, res) => {
    try {
        const result = await companyService.createCompanyInDB(req.body);
        res.status(201).send({ 
            status: true, 
            message: "Company created successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({ 
            status: false, 
            message: error.message 
        });
    }
}

const updateCompanyController = async (req, res) => {
    try {
        const result = await companyService.updateCompanyInDB(
            req.params.id, 
            req.body
        );
        res.send({ 
            status: true, 
            message: "Company updated successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({ 
            status: false, 
            message: error.message 
        });
    }
}

const deleteCompanyController = async (req, res) => {
    try {
        await companyService.deleteCompanyFromDB(req.params.id);
        res.send({ 
            status: true, 
            message: "Company deleted successfully" 
        });
    } catch (error) {
        res.status(400).send({ 
            status: false, 
            message: error.message 
        });
    }
}

module.exports = { 
    getCompaniesController,
    createCompanyController,
    updateCompanyController,
    deleteCompanyController
};