import Users from '../model/userModel.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res, next) => {
    try {
      const { Username, email, password } = req.body;
      const usernameCheck = await Users.findOne({ Username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await Users.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        Username,
        email,
        
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };

  export const login = async (req, res, next) => {

    try {
      const { Username, password } = req.body;
      const user = await Users.findOne({ Username });
      if (!user)
        return res.json({ msg: "Incorrect username or password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect username or password", status: false });
  
      delete user.password;

      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    } 
  };
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await Users.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true } 
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async(req,res,next)=>{
  try{
    const users = await Users.find({_id:{$ne :req.params.id }}).select([
      "Username",
      "email",
      "avatarImage",
      "_id",
    ])
    return res.json(users);
  }catch(ex){
    next(ex);
  }
}
