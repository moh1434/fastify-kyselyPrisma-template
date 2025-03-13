import { PasswordService } from "../../service/password.service.js";
import { APP_ERROR } from "../../../../utils/error/appErrors.js";
import { configSchema } from "../../../../core/plugin/env.plugin.js";
import { registerDto } from "../../dto/register.dto.js";
import GetUserIdIfExistsQuery from "../queries/getUserIdIfExists.query.js";
import type {
  InsertExpression,
  KyselyDB,
} from "../../../../utils/type/kysely.js";

export default class RegisterUserCommand {
  constructor(
    private db: KyselyDB,
    private config: configSchema,
    private passwordService: PasswordService,
    private getUserIdIfExistsQuery: GetUserIdIfExistsQuery,
  ) {}

  async execute(dto: registerDto, customId?: string) {
    const user = await this.getUserIdIfExistsQuery.execute(dto.phone);
    if (user) {
      throw APP_ERROR.CONFLICT();
    }

    const hashedPassword = await this.passwordService.hash(dto.password);

    const now = new Date();
    const userPayload: InsertExpression<"User"> = {
      id: customId || undefined,
      role: "MEMBER",
      password: hashedPassword,
      fullName: `${dto.firstName} ${dto.secondName}`,
      phone: dto.phone,
      email: dto.email,
      verifiedPhone: false,
      image: null,
      createdAt: now,
      updatedAt: now,
    };

    const createResult = await this.db
      .insertInto("User")
      .values(userPayload)
      .returning("id")
      .executeTakeFirstOrThrow();
    return { id: createResult?.id };
  }
}
