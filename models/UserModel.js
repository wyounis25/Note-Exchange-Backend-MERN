import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';
import userrouter from '../routes/usersroutes';
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		}
	},
	{
		timestamps: true
	}
);

userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bycrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);

export default User;
