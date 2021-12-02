const compose = require('docker-compose');
const path = require('path');
const urljoin = require('url-join');
const axios = require('axios');
const buildContext = path.resolve(__dirname, '../../docker');
const { googlePubSubChaos } = require('./config/chaos');

describe('App Request E2E', function () {
    
    jest.setTimeout(300 * 1000);

    let gwUrl = 'http://localhost:9090';
    const testOrderInfo = {
        id: '619e3c02829fdee25f0268d0',
        basket: {
            products: [
                {
                    product: '619e322beb27f27d156c30ba',
                    count : 2
                },
                {
                    product: '619e322beb27f27d156c31ba',
                    count : 3
                }
            ], 
        }  
    };

    const testStockInfo = [
        {
            product: '619e322beb27f27d156c30ba',
            count: 100,
        }, {
            product: '619e322beb27f27d156c31ba',
            count: 50,
        }
    ];

    beforeAll(async () => {
         await compose.upAll({ 
            cwd: buildContext, 
            log: true,
            env: {
                ...process.env,
                THUNDRA_GOOGLE_PUBSUB_CHAOS: JSON.stringify(googlePubSubChaos),
            },
        });

        await expect().eventually(async () => {

            try {
                const getRequestResult = await axios.get(gwUrl + '/order/health');
                expect(getRequestResult.status).toBe(200);
            } catch (error) {
                console.log('Verifying test stack ...')
                throw error;   
            }
        }, 
        60,
        2);
    });

    afterAll(async () => {
        try {
            await compose.down({
                cwd: buildContext, 
                log: true
            });
        } catch (error) {
            console.error(error);
        }
    });

    it('Cancel Order E2E', async () => {
        
        const cancelOrderUrl = urljoin(gwUrl, `/order/cancel/${testOrderInfo.id}`);
        
        const cancelOrderResult = await axios.delete(cancelOrderUrl, {});

        expect(cancelOrderResult).toBeTruthy();
        expect(cancelOrderResult.status).toBe(200);
        expect(cancelOrderResult.data).toBeTruthy();
        expect(cancelOrderResult.data.result).toBeTruthy();

        const {
            orderId,
            status,
        } = cancelOrderResult.data.result;

        expect(orderId).toBeTruthy();
        expect(status).toBe(true);

        const product1 = testOrderInfo.basket.products[0];
        const productId = product1.product;
        const getStockMovementUrl = urljoin(gwUrl, `/stockmovement/${productId}`);

        await expect().eventually(async () => {

            const getStockMovementUrlResult = await axios.get(getStockMovementUrl);

            expect(getStockMovementUrlResult).toBeTruthy();
            expect(getStockMovementUrlResult.status).toBe(200);
            expect(getStockMovementUrlResult.data).toBeTruthy();

            console.log(getStockMovementUrlResult.data);

            const stockMovements = getStockMovementUrlResult.data.result;
            expect(stockMovements.length).toBe(1);

            const stockMovement = stockMovements[0];

            expect(stockMovement.product).toBe(productId);
            expect(stockMovement.count).toBe(102);       
        }, 
        30,
        5);
    }); 
});