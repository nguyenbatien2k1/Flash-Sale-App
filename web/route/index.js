import express from 'express';
import Campaign from '../models/Campaign.js';
import shopify from '../shopify.js';
import Product from '../models/Product.js';

let router = express.Router()

const initWebRoutes = (app) => {

    // get all campaigns
    router.get('/api/campaigns', async (req, res) => {
        let status = 200;
        let error = null;
        let campaigns = []
        try {
                campaigns = await Campaign.find({});   
                console.log(campaigns)        
            } catch (e) {
                console.log(`Failed to get campaigns: ${e.message}`);
                status = 500;
                error = e.message;
            }

        return res.status(status).send({ data: campaigns, success: status === 200, error})
    })

    // get campaign by id
    router.get('/api/campaign-by-id', async (req, res) => {
        let status = 200;
        let error = null;
        let campaign_id = req.query.campaign_id
        let campaign = {}
        try {
                campaign = await Campaign.findOne({_id: campaign_id});                       
            } catch (e) {
                console.log(`Failed to get campaigns: ${e.message}`);
                status = 500;
                error = e.message;
            }

        return res.status(status).send({ data: campaign, success: status === 200, error})
    })

    // add campaign
    router.post('/api/add-campaign', async (req, res) => {
        let status = 200;
        let error = null;

        try {
            if(!req.body.campaign_name) {
                status = 500;
                error = 'Invalid campaign_name...';
                return;
            }
            else {
                let newCampaign = new Campaign({
                    campaign_name: req.body.campaign_name,
                    start_time: req.body.start_time || '',
                    end_time: req.body.end_time || '',
                    products: req.body.products || [],
                    discount_rate: req.body.discount_rate || 0,
                    payment: req.body.payment || '',
                    active: req.body.active || ''
                })
                newCampaign.save()
            }
        } catch (e) {
            console.log(`Failed to get campaigns: ${e.message}`);
            status = 500;
            error = e.message;
        }
        return res.status(status).send({success: status === 200, error})
    })

    // update campaign
    router.put('/api/campaigns', async (req, res) => {
        let status = 200
        let error = null
        const campaign_id = req.query.campaign_id

        try {
            if(!campaign_id) {
                status = 500;
                error = 'Invalid campaign_id...';
                return;
            }
            else {
                let update = {
                    campaign_name: req.body.campaign_name,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                    products: req.body.products,
                    discount_rate: req.body.discount_rate,
                    payment: req.body.payment,
                    active: req.body.active
                }
                let doc = await Campaign.findOneAndUpdate(
                    {
                        _id: campaign_id
                    },
                    update,
                    {
                        new: true
                    }
                )
                console.log(doc)
                if(!doc) {
                    status = 500
                    error = 'Failed to update campain'
                }
            }
            
        } catch (e) {
            console.log(`Failed to update campain: ${e.message}`);
            status = 500
            error = e.message
        }

        return res.status(status).send({success: status === 200, error, data: doc})
    })

    // delete campaign
    router.delete('api/campaigns', async (req, res) => {
        let status = 200
        let error = null
        let campaign_id = req.query.campaign_id
        try {
            if(!campaign_id) {
                status = 500;
                error = 'Invalid campaign_id...';
                return;
            }
            else {
                let doc = await Campaign.findOneAndDelete({_id: campaign_id})
                if(!doc) {
                    status = 500
                    error = 'Failed to delete campaign'
                }
            }
            
        } catch (e) {
            console.log(`Failed to delete campaign: ${e.message}`)
            status = 500
            error = e.message
        }
        return res.status(status).send({success: status === 200, error})
    })

    // get all products
    router.get('/api/products', async (req, res) => {       
        let status = 200
        let error = null
        let products = []
        try {
            products = await shopify.api.rest.Product.all({
                session: res.locals.shopify.session,
                limit: 5
            }).then(res => res.data)
            console.log(products)
        } catch (e) {
            console.log(`Failed to get all products: ${e.message}`)
            status = 500
            error: e.message
        }
        return res.status(status).send({success: status === 200, error, data: products})
    })

    // get product by id
    router.get('/api/product-by-id', async (req, res) => {      
        let status = 200
        let error = null
        let product_id = req.query.product_id
        let product = {}
        try {
            if(!product_id) {
                status = 500
                error = 'Invalid product_id'
            }
            else {
                product = await shopify.api.rest.Product.find({
                    session: res.locals.shopify.session,
                    id: product_id
                }).then(res => res.data)
                console.log(product)
            }
        } catch (e) {
            console.log(`Failed to get all products: ${e.message}`)
            status = 500
            error = e.message
        }
        return res.status(status).send({success: status === 200, error, data: product})
    })

    // add product
    router.post('/api/product', async (req, res) => {
        let status = 200
        let error = null
        try {
            await Product.create(req.body)        
        } catch (e) {
            console.log(`Failed to add product: ${e.message}`)
            status = 500
            error = e.message
        }
        return res.status.apply(status).send({success: status === 200, error})
    })

    // update product
    router.put('/api/product', async (req, res) => {
        let status = 200
        let error = null
        let product_id = req.query.product_id

        try {
            if(!product_id) {
                status = 500
                error = 'Invalid product'
            }
            else {
                let update = req.body
                let doc = await Product.findOneAndUpdate({id: product_id}, update, {new: true})
                if(!doc) {
                    status = 500
                    error = 'Failed to update product'
                }
            }
        } catch (e) {
            console.log(`Failed to update product: ${e.message}`);
            status = 500
            error = e.message
        }
        return res.status(status).send({success: status === 200, error})
    })

    // delete product
    router.delete('/api/product', async (req, res) => {
        let status = 200
        let error = null
        let product_id = req.query.product_id
        try {
            if(!product_id) {
                status = 500
                error = 'Invalid product_id'
            }
            else {
                let doc = await Product.findOneAndDelete({id: product_id})
                if(!doc) {
                    status = 500
                    error = 'Failed to delete product'
                }
            }
        } catch (e) {
            console.log(`Failed to delete product: ${e.message}`)
            status = 500
            error = e.message
        }
        return res.status(status).send({success: status === 200, error})
    })

    return app.use('/', router)
}

export default initWebRoutes