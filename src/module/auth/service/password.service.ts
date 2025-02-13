import argon2 from "argon2";

export class PasswordService {
  async hash(password: string) {
    return await argon2.hash(password);
  }
  async verify(password: string, hash: string) {
    return await argon2.verify(hash, password);
  }
}

// new PasswordService().hash("testTest").then((a) => console.log(a));
