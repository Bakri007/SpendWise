const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");
const catchError = require("../middlewares/catchError");
const generateOTP = require("../utils/generateOTP");
const transporter = require("../utils/transporterStore");



const register = catchError(async (req, res, next) => {
     const { name, email, password, currency } = req.body;



    const oldUser = await userModel.findOne({email});
    if(oldUser) {
       return next(new AppError("user is already exists", 400, statusText.FAIL));
       
    }

    const hashPassword = await bcrypt.hash(password, 10);

     const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
    currency: currency || "EGP",
  });

  newUser.password = undefined;
  
   res.status(201).json({
    status: statusText.SUCCESS,
    data: { user: newUser },
  });
});

const login = catchError(async(req, res, next) =>{
    const{email, password} = req.body;

    
    const user = await userModel.findOne({email:email});
    if(!user){
        return next(new AppError("user not found",404,statusText.FAIL));
    }
    const matchedPassword = await bcrypt.compare(password,user.password);

    if(!matchedPassword){
        return next(new AppError("password is wrong",400,statusText.FAIL));

    }

    const token = jwt.sign({
        email:user.email,
        id: user._id,
        role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "90d" }
);

res.status(200).json({
  status: statusText.SUCCESS,
  data: { token },
});

});

const forgotPassword = catchError(async(req, res, next) => {
    const { email } = req.body;
    
    const user = await userModel.findOne({ email });
    if(!user){
        return next(new AppError("User not found", 404, statusText.FAIL));

    }
    const code = generateOTP();
    await userModel.updateOne(
        { email },
        {
            $set: {
             resetCode: code,
             resetCodeExpires: Date.now() + 10 * 60 * 1000,
            },
        }
    );

   await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SpendWise - Reset Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
        <h2 style="text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; text-align: center;">Use the code below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #ee3e55; padding: 10px; border: 2px solid #ee3e55; border-radius: 5px;">
            ${code}
          </span>
        </div>
        <p style="font-size: 14px; text-align: center; color: #555;">
          This code expires in 10 minutes. If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });

  res.status(200).json({
    status: statusText.SUCCESS,
    message: "Reset code sent to your email",
    data: null,
  });
    
});


const verifyResetCode = catchError(async(req, res, next) => {
    const{ email , resetCode } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError("User not found",404,statusText.FAIL));

    }

    if (user.resetCode !== resetCode){
        return next(new AppError("Invalid reset code", 400, statusText.FAIL)); 
    }

    if (user.resetCodeExpires < Date.now()) {
    return next(new AppError("Reset code has expired", 400, statusText.FAIL));
  }
   res.status(200).json({
    status: statusText.SUCCESS,
    message: "Code verified successfully",
    data: null,
  });
});



const resetPassword = catchError(async (req, res, next) => {
  const { email, resetCode, newPassword } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404, statusText.FAIL));
  }

  if (user.resetCode !== resetCode) {
    return next(new AppError("Invalid reset code", 400, statusText.FAIL));
  }

  if (user.resetCodeExpires < Date.now()) {
    return next(new AppError("Reset code has expired", 400, statusText.FAIL));
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await userModel.updateOne(
    { email },
    {
      $set: {
        password: hashPassword,
        resetCode: null,
        resetCodeExpires: null,
      },
    }
  );

  res.status(200).json({
    status: statusText.SUCCESS,
    message: "Password reset successfully",
    data: null,
  });
});



const getAllUsers = catchError(async (req, res, next) => {
  const users = await userModel.find({}, { password: false });
  res.status(200).json({
    status: statusText.SUCCESS,
    data: { users },
  });
});

const deleteUser = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404, statusText.FAIL));
  }
  res.status(200).json({
    status: statusText.SUCCESS,
    data: null,
  });
});


module.exports = { register, login, forgotPassword, verifyResetCode, resetPassword, getAllUsers, deleteUser };