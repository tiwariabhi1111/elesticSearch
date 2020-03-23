import express from 'express';
import * as controller from '../controller/search'
import * as mapping from '../controller/mapping'
import * as typeAhead from '../controller/typeAhead'
export const router = express.Router({ caseSensitive: false });
try {
    router.post('/createIndex', async (req: any, res: any) => {
        let data: any = await controller.createIndex(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/deleteIndex', async (req: any, res: any) => {
        let data: any = await controller.deleteIndex(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/deleteData', async (req: any, res: any) => {
        let data: any = await controller.deleteData(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/update', async (req: any, res: any) => {
        let data: any = await controller.update(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/updateByQuery', async (req: any, res: any) => {
        let data: any = await controller.updateByQuery(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/reindex', async (req: any, res: any) => {
        let data: any = await controller.reindex(req, res)
        console.log(data)
        res.send(data);
    });
    router.post('/addDocument', async (req: any, res: any) => {
        let data: any = await controller.addDocument(req, res)
        res.send(data);
    })
    router.post('/bulkData', async (req: any, res: any) => {
        let data: any = await controller.bulkData(req, res)
        res.send("success");
    })
    router.post('/search', async (req: any, res: any) => {
        let data: any = await controller.search(req, res)
        res.send(data);
    })
    router.post('/interval', async (req: any, res: any) => {
        let data: any = await controller.interval(req, res)
        res.send(data);
    })
    router.post('/match', async (req: any, res: any) => {
        let data: any = await controller.match(req, res)
        res.send(data);
    })
    router.post('/mapping', async (req: any, res: any) => {
        let data: any = await controller.mapping(req, res)
        res.send(data);
    })
    router.post('/prefixElement', async (req: any, res: any) => {
        let data: any = await mapping.prefixElement(req, res)
        res.send(data);
    })
    router.post('/searchPrefix', async (req: any, res: any) => {
        let data: any = await mapping.search(req, res)
        res.send(data);
    })
    router.post('/typeAhed', async (req: any, res: any) => {
        let data: any = await typeAhead.typeAhed(req, res)
        res.send(data);
    })
    router.post('/analyzer', async (req: any, res: any) => {
        let data: any = await mapping.analyzer(req, res)
        res.send(data);
    })
    router.post('/analyze', async (req: any, res: any) => {
        let data: any = await mapping.analyze(req, res)
        res.send(data);
    })
    router.post('/tokenizer', async (req: any, res: any) => {
        let data: any = await mapping.tokenizer(req, res)
        res.send(data);
    })
    router.post('/tokenize', async (req: any, res: any) => {
        let data: any = await mapping.tokenize(req, res)
        res.send(data);
    })
    router.post('/geoQuery', async (req: any, res: any) => {
        let data: any = await mapping.geoQuery(req, res)
        res.send(data);
    })
    router.post('/location', async (req: any, res: any) => {
        let data: any = await mapping.locationSearch(req, res)
        res.send(data);
    })
    router.post('/bulk', async (req: any, res: any) => {
        let data: any = await controller.bulkOperation(req, res)
        res.send(data);
    })
    router.post('/fuzzySearch', async (req: any, res: any) => {
        let data: any = await mapping.fuzzySearch(req, res)
        res.send(data);
    })
    router.post('/test', async (req: any, res: any) => {
        let data: any = await mapping.test(req, res)
        console.log("data=========", typeof (data))
        res.send(data)
        // let data1 = { key: data };
        // let data = 111;
        // res.send(data1);
    })

}
catch (err) { console.log("******************************************", err) }

