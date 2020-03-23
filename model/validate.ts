import Joi from 'joi';

export const schema = {
    body: {
        search: Joi.string().required()
    }
}
const songsvalidate = {
    body: {
        songsName: Joi.string().required(),
        artistName: Joi.string().required(),
        songsType: Joi.string().required()
    }
};

