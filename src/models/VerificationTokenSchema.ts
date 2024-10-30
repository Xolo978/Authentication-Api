import mongoose, {Document,Schema} from "mongoose";
export interface VerificationToken extends Document {
    password:string;
    email:string;
    username:string;
}
const verificationTokenSchema : Schema = new Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    }
})
export const VerificationTokenSchema = mongoose.model<VerificationToken>('VerificationToken', verificationTokenSchema);
