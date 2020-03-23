import elasticsearch from 'elasticsearch';
/// <reference path="../model/interface.ts" />
import { songsModel } from '../model/model'
import * as artist from '../model/songsFile'
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

//CREATE INDEX****************************************************************


export const createIndex = async (req: any, res: any) => {

    return await new Promise(function (resolve, reject) {
        console.log("index", req.body.indexName);

        client.indices.create({
            index: req.body.indexName
        }, function (err, resp, status) {

            if (err) {
                reject(err);
            }
            else {
                resolve(resp)

            }
        })
    }).then((msg) => {
        return msg
    }).catch((err) => { return err });

}

//DELETE INDEX ******************************************************************

export const deleteIndex = async (req: any, res: any) => {

    return await new Promise(function (resolve, reject) {

        client.indices.delete({
            index: req.body.indexName
        }, (err: any, resp: any) => {

            if (err) {
                reject(err);
            }
            else {
                resolve(resp)

            }
        })
    }).then((msg) => {
        return msg
    }).catch((err) => { return err });

}

//REINDEX

export const reindex = async (req: any, res: any) => {

    return await new Promise(function (resolve, reject) {

        client.reindex(
            {
                body: {
                    "source": {
                        "index": req.body.sourceIndex,
                        // "slice": {
                        //     "id": 1,
                        //     "max": 2
                        // }
                    },
                    "dest": {
                        "index": req.body.destIndex
                    }

                    // "source": {
                    //     "index": req.body.sourceIndex,
                    //     "query": {
                    //         "match": {
                    //             "songs": "dil"
                    //         }
                    //     }
                    // },
                    // "dest": {
                    //     "index": req.body.destIndex,
                    //     // "routing": "=cat"
                    // }

                }
            }, (err: any, resp: any) => {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(resp)

                }
            })
    }).then((msg) => {
        return msg
    }).catch((err) => { return err });

}

//INSERT DOCUMENT INTO MONGO AS WELL AS ELASTIC**********************************
// it can also  update the data on the given id
export const addDocument = async (req: any, res: any) => {

    // let mongoStatus = await songsModel.create(req.body.data)
    // if (mongoStatus) {
    console.log("*********************DATA SUCCESSFULLY INSERTED INTO MONGO****************************")
    return await new Promise(function (resolve, reject) {
        client.create({
            index: req.body.indexName,
            type: "_doc",
            id: req.body.id,
            body: req.body.data
        }, (err: any, resp: any) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resp)
            }
        })
    }).then((msg) => {
        return msg
    }).catch((err) => { return err });
    // }
    // else return "*******ERROR FROM MONGO RESPONCE, DATA NOT INSERTED INTO ELASTIC***************"

}

//INSERT BULK DATA*************************************************** 

export const bulkData = async (req: any, res: any) => {
    let count = 1;
    const a = async function () {
        for (const element of artist.alka_yagnik) {
            let mongoStatus = await songsModel.create(element)
            client.create({
                index: "myplaylist",
                type: "songs",
                id: count,
                body: element
            })
            count++;
        }
    };
    const b = async function () {
        for (const element of artist.kumar_sanu) {
            let mongoStatus = await songsModel.create(element)
            client.create({
                index: "myplaylist",
                type: "songs",
                id: count,
                body: element
            })
            count++;
        }
    }
    const c = async function () {
        for (const element of artist.neha_kakkad) {
            let mongoStatus = await songsModel.create(element)
            client.create({
                index: "myplaylist",
                type: "songs",
                id: count,
                body: element
            })
            count++;
        }
    }
    a();
    b();
    c();
}

// NORMAL SEARCH FROM ELASTIC(with specified field)
//match data with the exact word and return document
//search indivisual world from the index 


export const search = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: "songs",
            from: 0,
            size: 20,
            body: {
                // query: {
                //     match: {
                //         songs: req.body.data
                //     },
                // }

                // "query": {
                //     "bool": {
                //         "must": [
                //             { "match": { "songs": req.body.data } },
                // { "match": { "artist": "alka Yagnik" } }
                // ],
                // "must_not": [
                //     { "match": { "songs": "Dhadkan" } },
                //     { "match": { "artist": "kumar sanu" } }

                // ],
                // "filter": [{ "term": { "songsType": "hindi" } }]
                // }
                // }


                // "query": {
                //     "common": {
                //         "songs": {
                //             "query": req.body.data,
                //             "cutoff_frequency": 0.001
                //         }
                //     }
                // }
                //TERM LEVEL QUERY

                "query": {
                    // "match": {
                    //     "songsType": req.body.data
                    // }
                    //   EXIST QUERY
                    // "exists": {
                    //     "field": "artist1"
                    // },
                    // "term": {
                    //     "songsType": req.body.data
                    // }
                    //PREFIX QUERY

                    // "prefix": { "songs": "mil" }
                    //WILDCARD QUERY

                    // "wildcard": {
                    //     "songs": {
                    //         "value": "m*e",
                    //         "boost": 1.0,
                    //         "rewrite": "constant_score"
                    //     }
                    // }
                    //FUZZY QUERY
                    // "fuzzy": {
                    //     "songs": {
                    //         "value": "shi",
                    //         "boost": 1.0,
                    //         "fuzziness": 2,
                    //         "prefix_length": 0,
                    //         "max_expansions": 40
                    //     }
                    // }
                    //IDS BASED QUERY
                    // "ids": {
                    //     "type": "songs",
                    //     "values": ["1", "4", "30"]
                    // }


                }
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

export const deleteData = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.deleteByQuery({
            index: req.body.indexName,
            // type: "songs"
            body: {
                "query": {
                    "match": {
                        // "songs": req.body.data
                        "_id": "55"
                    }
                }

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

//  UPDATE DATA FROM ELASTIC
// the update query work only on the given id
export const update = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.update({
            index: req.body.indexName,
            type: "songs",
            id: req.body.id,
            body: {
                "script": {
                    "source": "ctx._source.type= params.type",
                    "params": {
                        "type": req.body.data
                    }
                }
                // we can add sone new field at the place of songs
                //   "script": {
                //             "source": "ctx._source.createdBy= params.name",
                //             "lang": "painless",
                //             "params": {
                //                 "name": "abhishek tiwari"
                //             }
                //         }

                // update data in the single field of given document             
                // doc: {
                //     "songs": req.body.data
                // }

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


}

export const updateByQuery = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.updateByQuery({
            index: req.body.indexName,
            type: "songs",
            body: {
                "query": {
                    "match_all": {
                        // "_id": req.body.id
                    }
                },
                "script": {
                    "source": "ctx._source.author= params.author",
                    "params": {
                        "author": req.body.data
                    }
                }

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


}
// NOTE:-
//match_all return all document from the specified type
//match_phrase return document when whole word matches the document 
//bool query is used to make complex query
//data inside simple array will match easily but the object of array data need mapping to search tha correct data



//INTERVAL QWERIES:-*******************************************************

export const interval = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: "songs",
            // from: 1,
            // size: 30,
            body:
            {
                "query": {
                    "intervals": {
                        "songs": {
                            "all_of": {
                                "ordered": true,
                                "intervals": [
                                    {
                                        "match": {
                                            "query": req.body.query1,
                                            "max_gaps": req.body.max_gaps,
                                            "ordered": true
                                        }
                                    },
                                    {
                                        "any_of": {
                                            "intervals": [
                                                {
                                                    "match": {
                                                        "query": req.body.query2,
                                                        "max_gaps": 10,
                                                        "ordered": true
                                                    }
                                                }
                                            ]
                                        }
                                    }

                                    // {
                                    //     "match": {
                                    //         "query": "Mera Dil Bhi",
                                    //         "max_gaps": 10,
                                    //         "filter": {
                                    //             "not_containing": {
                                    //                 "match": {
                                    //                     "query": "Pagal"
                                    //                 }
                                    //             }
                                    //         }
                                    //     },
                                    // }
                                ]
                            }
                        }
                    }
                }
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

//MAX_GAPS:-
// (Optional, integer) Maximum number of positions between the matching terms. Terms further apart than this are not considered matches. Defaults to -1.If unspecified or set to -1, there is no width restriction on the match. If set to 0, the terms must appear next to each other.

//Match query****************************************************


export const match = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: "songs",
            // from: 1,
            // size: 30,
            body: {
                "query": {
                    "match": {
                        "songs": {
                            "query": req.body.data,
                            "operator": "and",
                            "zero_terms_query": "all"
                        }
                    }
                }
            },
            //MULTI MATCH QUERY
            // {
            // "query": {
            //     "multi_match": {
            //         "query": req.body.data,
            //         "fields": ["songs", "artist", "*pe"]
            //     }
            // }
            //QUERY STRING PROCEDURE

            // "query": {
            //     "query_string": {
            //         "fields": ["songs"],
            //         "query": req.body.data
            //     }
            // }
            // MUST,SHOULD,FILTER...

            // "query": {
            //     "bool": {
            //         "must": {
            //             "term": { "type": "songs" }
            //         },
            //         "filter": {
            //             "term": { "tag": "tech" }
            //         },
            //         "must_not": {
            //             "range": {
            //                 "age": { "gte": 10, "lte": 20 }
            //             }
            //         },
            //         "should": [
            //             { "term": { "tag": "wow" } },
            //             { "term": { "tag": "elasticsearch" } }
            //         ],
            //         "minimum_should_match": 1,
            //         "boost": 1.0
            //     }
            // }

            // }

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



//NESTED QUERY
// PUT /my_index
// {
//     "mappings": {
//         "_doc" : {
//             "properties" : {
//                 "obj1" : {
//                     "type" : "nested"
//                 }
//             }
//         }
//     }
// }

// SEARCH FROM INDEZ

// GET /my_index/_search
// {
//     "query": {
//         "nested" : {
//             "path" : "obj1",
//             "query" : {
//                 "bool" : {
//                     "must" : [
//                     { "match" : {"obj1.name" : "blue"} },
//                     { "range" : {"obj1.count" : {"gt" : 5}} }
//                     ]
//                 }
//             },
//             "score_mode" : "avg"
//         }
//     }
// }


// mapping

export const mapping = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.create({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "mappings": {
                    "properties": req.body.data
                }
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
}



export const bulkOperation = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.bulk({
            body: req.body.bulkData
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
}

