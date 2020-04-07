import { Schema, model } from 'mongoose';
import Bcrypt from 'bcrypt';

const schema = new Schema(
    {
        username: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

schema.indexes({ email: 1 }, { unique: true });

schema.pre('save', function (next) {
    const user = this;
    Bcrypt.hash(user.password, 8, (err, result) => {
        if (err) {
            return next(err);
        }
        user.password = result;
        return next();
    });
});

const User = model('User', schema);

export default User;
