import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    homeAddress: {
        type: String,
    },
    deliveryAddress: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "FREE",
        enum: ["FREE", "PREMIUM", "PRO"]
    }
},{
    timestamps: true
});

const Account = mongoose.models.Account || mongoose.model("Account", AccountSchema);
export default Account;