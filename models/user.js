import {Schema, model, models} from 'mongoose';
const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,"Email already Exists"],
        required:[true,"Email Required"],
        // match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email invalid"]
    },
    username:{
        type:String,
        required:[true,"Username Required"],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String,
    },
    desc:{
        type:String,
        default:"Hey there! I am using Prompt-Creator developed by Prashant0664(Github)!!"
    }
});

const User=models.User || model("User", UserSchema);
export default User;