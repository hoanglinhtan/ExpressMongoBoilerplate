import { Schema, model } from 'mongoose';
import Bcrypt from 'bcrypt';

const schema = new Schema(
    {
        username: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

schema.indexes({ email: 1 }, { unique: true });

schema.pre('save', (next, user) => {
    user.password = Bcrypt.hash(password, 8);
    next();
});

const User = model('User', schema);

export default User;
