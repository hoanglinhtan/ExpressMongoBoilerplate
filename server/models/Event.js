import Mongoose from 'mongoose';

const schema = new Mongoose.Schema(
    {
        userId: String,
        name: String,
        description: String,
        startDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Event = Mongoose.model('Event', schema);

export default Event;
