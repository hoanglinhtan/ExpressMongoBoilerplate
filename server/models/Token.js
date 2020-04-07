import { Schema, model } from 'mongoose';

const schema = new Schema({
    accessToken: String,
    userId: String,
    username: String,
    expireAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

schema.indexes({ userId: 1 });
schema.indexes({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Token = model('Token', schema);

export default Token;
