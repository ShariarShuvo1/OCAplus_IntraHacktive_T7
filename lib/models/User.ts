import { profile } from "console";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	clerkID: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		required: true,
	},
	clubID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Club",
		required: false,
	},
	joinedAt: {
		type: Date,
		required: false,
		default: Date.now,
	},
	leavedAt: {
		type: Date,
		required: false,
	},
	profilePicture: {
		type: String,
		required: false,
		default: "",
	},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
