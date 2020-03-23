
import elasticsearch from 'elasticsearch';
/// <reference path="../model/interface.ts" />
import { songsModel } from '../model/model'
import * as artist from '../model/songsFile'

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

//ANALYZER

export const analyzer = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.create({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "my_english_analyzer": {
                                "type": req.body.type,
                                "max_token_length": 5,
                                "stopwords": req.body.stopwords
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
}
export const analyze = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.analyze({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "analyzer": req.body.analyzer,
                "text": req.body.text
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


//TOKENIZER
export const tokenizer = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.create({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "my_analyzer": {
                                "tokenizer": req.body.tokenizer
                            }
                        },
                        "tokenizer": {
                            "my_tokenizer": {
                                "type": req.body.type,
                                "max_token_length": 5
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
}
export const tokenize = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.analyze({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "analyzer": req.body.analyzer,
                "text": req.body.text
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



//MAPPING OF DOCUMENT

export const prefixElement = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.create({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "custom": {
                                "type": "standard",
                                "max_token_length": 25,
                                "stopwords": "_english_"
                            }
                        }
                    }
                },
                "mappings": {
                    "properties": {
                        "name": {
                            "type": "completion",
                            "analyzer": "standard"
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
}


export const search = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: "songs",
            // from: 1,
            // size: 30,
            body:
            {
                "suggest": {
                    "class-suggest": {
                        "prefix": req.body.search,
                        "completion": {
                            "field": req.body.fieldName
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



//GEO-QUERIES


export const geoQuery = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.indices.create({
            index: req.body.indexName,
            // type: req.body.type,
            body: req.body.mapping
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

export const locationSearch = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "query": {
                    "bool": {
                        "must": {
                            "match_all": {}
                        },
                        "filter": {
                            "geo_distance": {
                                "distance": req.body.distance,
                                "location": {
                                    "lat": req.body.lat,
                                    "lon": req.body.lon
                                }
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
}

// FUZZY QUERY

export const fuzzySearch = async function (req: any, res: any) {

    return await new Promise(function (resolve, reject) {

        client.search({
            index: req.body.indexName,
            // type: req.body.type,
            body: {
                "query": {
                    "fuzzy": {
                        "songs": {
                            "value": req.body.songs,
                            "fuzziness": req.body.fuzziness,
                            "prefix_length": req.body.prefix_length
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
}

export const test = async (req: any, res: any) => {
    return await new Promise(function (resolve, reject) {
        resolve(global.io)
    }).then((msg: any) => {
        console.log("#########################", msg)
        return msg
    }).catch((err) => { return err });
}