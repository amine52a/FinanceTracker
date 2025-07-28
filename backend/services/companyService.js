// services/companyService.js
const Company = require('../models/Company');

const getCompaniesFromDB = async () => {
    return await Company.find({});
}

const createCompanyInDB = async (companyData) => {
    const company = new Company(companyData);
    return await company.save();
}

const updateCompanyInDB = async (id, updateData) => {
    return await Company.findByIdAndUpdate(id, updateData, { new: true });
}

const deleteCompanyFromDB = async (id) => {
    return await Company.findByIdAndDelete(id);
}

module.exports = {
    getCompaniesFromDB,
    createCompanyInDB,
    updateCompanyInDB,
    deleteCompanyFromDB
};