// Auto-generated DI type

import BlockTokenService from "../../module/auth/service/blockToken.service.js";
import { GenerateTokensService } from "../../module/auth/service/generateTokens.service.js";
import { PasswordService } from "../../module/auth/service/password.service.js";
import LoginCommand from "../../module/auth/usecase/commands/login.command.js";
import RefreshTokenCommand from "../../module/auth/usecase/commands/refreshToken.command.js";
import ResetPasswordCommand from "../../module/auth/usecase/commands/resetPassword.command.js";
import VerifyEmailCommand from "../../module/auth/usecase/commands/verifyEmail.command.js";
import GetUserById from "../../module/auth/usecase/queries/getUserById.query.js";
import GetUserByPhone from "../../module/auth/usecase/queries/getUserByPhone.query.js";
import { ExampleService } from "../../module/example/service/example.service.js";
import ExampleCommand from "../../module/example/usecase/commands/example.command.js";
import getAllExampleQuery from "../../module/example/usecase/queries/getAllExample.query.js";
import getByIdExampleQuery from "../../module/example/usecase/queries/getByIdExample.query.js";
import { LocalUploadService } from "../../module/uploadFile/service/localUpload.service.js";
import { S3UploadService } from "../../module/uploadFile/service/s3Upload.service.js";
import UploadFileCommand from "../../module/uploadFile/usecase/commands/uploadFile.command.js";
import UploadFileQuery from "../../module/uploadFile/usecase/queries/uploadFile.query.js";

export interface DiCradle {
  blockTokenService: BlockTokenService;
  generateTokensService: GenerateTokensService;
  passwordService: PasswordService;
  loginCommand: LoginCommand;
  refreshTokenCommand: RefreshTokenCommand;
  resetPasswordCommand: ResetPasswordCommand;
  verifyEmailCommand: VerifyEmailCommand;
  getUserById: GetUserById;
  getUserByPhone: GetUserByPhone;
  exampleService: ExampleService;
  exampleCommand: ExampleCommand;
  getAllExampleQuery: getAllExampleQuery;
  getByIdExampleQuery: getByIdExampleQuery;
  localUploadService: LocalUploadService;
  s3UploadService: S3UploadService;
  uploadFileCommand: UploadFileCommand;
  uploadFileQuery: UploadFileQuery;
  uploadFileService: LocalUploadService;
}

export const diList = {
  blockTokenService: BlockTokenService,
  generateTokensService: GenerateTokensService,
  passwordService: PasswordService,
  loginCommand: LoginCommand,
  refreshTokenCommand: RefreshTokenCommand,
  resetPasswordCommand: ResetPasswordCommand,
  verifyEmailCommand: VerifyEmailCommand,
  getUserById: GetUserById,
  getUserByPhone: GetUserByPhone,
  exampleService: ExampleService,
  exampleCommand: ExampleCommand,
  getAllExampleQuery: getAllExampleQuery,
  getByIdExampleQuery: getByIdExampleQuery,
  localUploadService: LocalUploadService,
  s3UploadService: S3UploadService,
  uploadFileCommand: UploadFileCommand,
  uploadFileQuery: UploadFileQuery,
  uploadFileService: LocalUploadService,
};
