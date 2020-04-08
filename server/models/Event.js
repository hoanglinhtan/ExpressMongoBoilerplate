import Mongoose from 'mongoose';

const schema = new Mongoose.Schema(
    {
        userId: String,
        name: String,
        description: String,
        startDate: {
            type: Date,
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Event = Mongoose.model('Event', schema);

export default Event;
