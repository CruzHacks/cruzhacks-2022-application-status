const { db } = require("./admin");

const updateDocument = (collection, document, field) => {

};

const updateApplicationStatus = (collection, applicants) => {
    
};

const validate = (applicant) => {
    // keys are subject to change, as of now they are templates
    if (Object.keys(applicant).includes("applicant_id")) {
        const doc_id = applicant.applicant_id;
        if (Object.keys(applicant).includes("status")) {
            const status = applicant.status;
            if (["pending", "accepted", "rejected"].includes(status)) {
                return true;
            } else {
                throw JSON.stringify({
                    applicant: doc_id,
                    message: "application status is invalid!",
                });
            } 
        } else {
            throw JSON.stringify({
                applicant: doc_id,
                message: "application status is not provided!",
            });
        }
    } else {
        throw JSON.stringify({
            applicant: undefined,
            message: "Unable to process applicant, id not provided!",
        });
    }
};

module.exports = { updateApplicationStatus, validate };
