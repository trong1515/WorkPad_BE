const accountSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
});

accountSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
    const hashesPassword = await bcrypt.hash(this.password, 10);
    this.password = hashesPassword;
    next();
    } catch (error) {
        next(error);
    }
});

const Account = mongoose.model('Account', accountSchema);
const newAccount = new Account({
    email: 'd@gmail.com',
    name: 'Nguyen Van D',
    password:'nguyenvand',
});
newAccount.save((err) => {
    if(err){
        console.log('Cannot save to database');
    }
    else{
        console.log('Save to database');
    }
});