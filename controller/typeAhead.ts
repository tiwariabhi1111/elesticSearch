import elasticsearch from 'elasticsearch';
/// <reference path="../model/interface.ts" />
import { songsModel } from '../model/model'
import * as artist from '../model/songsFile'

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

export const typeAhed = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            type: "_doc",
            from: 0,
            size: 3,
            body: {

                "query": {
                    "match_phrase_prefix": {
                        "firstName": {
                            "query": req.body.search
                        }
                    }
                },
                // "sort": [
                //     {
                //         "firstName.keyword": {
                //             "order": "asc"
                //         }
                //     }
                // ],
                "_source": ["firstName"]

            }

        }, (err: any, resp: any) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resp)

            }
        })
    }).then((msg: any) => {
        return msg
    }).catch((err) => { return err });

};