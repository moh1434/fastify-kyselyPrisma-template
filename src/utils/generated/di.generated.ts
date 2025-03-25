// Auto-generated DI type

import { PasswordService } from "../../module/auth/service/password.service.js";
import { TokenService } from "../../module/auth/service/token.service.js";
import LoginCommand from "../../module/auth/usecase/commands/login.command.js";
import RefreshTokenCommand from "../../module/auth/usecase/commands/refreshToken.command.js";
import RegisterUserCommand from "../../module/auth/usecase/commands/registerUser.command.js";
import ResetPasswordCommand from "../../module/auth/usecase/commands/resetPassword.command.js";
import VerifyEmailCommand from "../../module/auth/usecase/commands/verifyEmail.command.js";
import GetUserByIdQuery from "../../module/auth/usecase/queries/getUserById.query.js";
import GetUserByPhoneQuery from "../../module/auth/usecase/queries/getUserByPhone.query.js";
import GetUserIdIfExistsQuery from "../../module/auth/usecase/queries/getUserIdIfExists.query.js";
import { ExampleService } from "../../module/example/service/example.service.js";
import ExampleCommand from "../../module/example/usecase/commands/example.command.js";
import getAllExampleQuery from "../../module/example/usecase/queries/getAllExample.query.js";
import getByIdExampleQuery from "../../module/example/usecase/queries/getByIdExample.query.js";
import { LocalUploadService } from "../../module/uploadFile/service/localUpload.service.js";
import { S3UploadService } from "../../module/uploadFile/service/s3Upload.service.js";
import GetFileCommand from "../../module/uploadFile/usecase/commands/getFile.command.js";
import UploadFileCommand from "../../module/uploadFile/usecase/commands/uploadFile.command.js";
import UploadFileQuery from "../../module/uploadFile/usecase/queries/uploadFile.query.js";
import UpdateProfileCommand from "../../module/user/usecase/commands/updateProfile.command.js";

export interface DiCradle {
  passwordService: PasswordService;
  tokenService: TokenService;
  loginCommand: LoginCommand;
  refreshTokenCommand: RefreshTokenCommand;
  registerUserCommand: RegisterUserCommand;
  resetPasswordCommand: ResetPasswordCommand;
  verifyEmailCommand: VerifyEmailCommand;
  getUserByIdQuery: GetUserByIdQuery;
  getUserByPhoneQuery: GetUserByPhoneQuery;
  getUserIdIfExistsQuery: GetUserIdIfExistsQuery;
  exampleService: ExampleService;
  exampleCommand: ExampleCommand;
  getAllExampleQuery: getAllExampleQuery;
  getByIdExampleQuery: getByIdExampleQuery;
  localUploadService: LocalUploadService;
  s3UploadService: S3UploadService;
  getFileCommand: GetFileCommand;
  uploadFileCommand: UploadFileCommand;
  uploadFileQuery: UploadFileQuery;
  updateProfileCommand: UpdateProfileCommand;
  uploadFileService: LocalUploadService;
}

export const diList = {
  passwordService: PasswordService,
  tokenService: TokenService,
  loginCommand: LoginCommand,
  refreshTokenCommand: RefreshTokenCommand,
  registerUserCommand: RegisterUserCommand,
  resetPasswordCommand: ResetPasswordCommand,
  verifyEmailCommand: VerifyEmailCommand,
  getUserByIdQuery: GetUserByIdQuery,
  getUserByPhoneQuery: GetUserByPhoneQuery,
  getUserIdIfExistsQuery: GetUserIdIfExistsQuery,
  exampleService: ExampleService,
  exampleCommand: ExampleCommand,
  getAllExampleQuery: getAllExampleQuery,
  getByIdExampleQuery: getByIdExampleQuery,
  localUploadService: LocalUploadService,
  s3UploadService: S3UploadService,
  getFileCommand: GetFileCommand,
  uploadFileCommand: UploadFileCommand,
  uploadFileQuery: UploadFileQuery,
  updateProfileCommand: UpdateProfileCommand,
  uploadFileService: LocalUploadService,
};
