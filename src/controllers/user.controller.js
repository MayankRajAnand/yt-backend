import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  //  if (fullName === "") {
  //    throw new ApiError(400, "Full name is required");
  //  }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(
      400,
      "Please enter required fields : fullName, email, username, password"
    );
  }

  const isUserExists = await User.findOne({
    $or: [email, username],
  });
  if (isUserExists) {
    throw new ApiError(409, "Username or email already exists");
  }

  //console.log*(req.files)
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //Check if files are there  --> Avatar is mandatory
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //Upload files to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  //We can check if(!user) to check whether db entry is successful or not, but fullproof soln is to check from DB
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong : User not registered");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
