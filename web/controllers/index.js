import Campaign from "../models/Campaign";

let handleGetAllCampaign = async (req, res) => {
    let status = 200;
    let error = null;

    try {
        let campaigns = await Campaign.find({});
        console.log(campaigns)
    } catch (e) {
        console.log(`Failed to get campaigns: ${e.message}`);
        status = 500;
        error = e.message;
    }

    return res.status(status).send('hi')
}

export default {
    handleGetAllCampaign
}