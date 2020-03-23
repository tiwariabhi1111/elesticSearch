declare namespace namesps {
    export interface searchInterface {
        search: any
    }
    export interface insertBody {
        songsName: { type: String },
        artistName: { type: String },
        songsType: { type: String }
    }
    export interface insertData {
        index: String,
        type?: String,
        id: number,
        body: insertBody
    }
}
