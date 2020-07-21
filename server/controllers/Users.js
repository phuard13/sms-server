

import jwt from 'jsonwebtoken';
import userModel from '../model/users';

export const signup = async(req, res, next) => {
  try{
    const user = await userModel.findOne({ email: req.body.email });

    if(user){
      return res.json({
        message: 'This user already exists'
      })
    }

    const newUser = new userModel({ ...req.body });
    const savedUser = await newUser.save();

    const { email, firstName, lastName } = savedUser;
    const token = jwt.sign({ email, firstName, lastName }, process.env.JWT_TOKEN_SECRET, {expiresIn: '24hr' });

    return res.status(201).json({
      message: 'Signed up successfully',
      savedUser,
      token
    })


  }catch(error){
    next(error)
  }
}

export const login = async(req, res, next) => {
  try{
    const {
      email,
      password
    } = req.body;

    const user = await userModel.findOne({ email });
    if(!user){
      return res.status(404).json({
        message: 'Email does not exists'
      });
    }

    const result = await user.comparePassword(password);

    if(!result){
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    const { firstName, lastName } = user;
    const token = jwt.sign({ email, firstName, lastName }, process.env.JWT_TOKEN_SECRET, {expiresIn: '24hr' });

    return res.status(200).json({
      message: 'Login successfully',
      token
    })

  }catch(error){
    next(error)
  }
}
