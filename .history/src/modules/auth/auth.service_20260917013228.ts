import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "../../generated/prisma/client.js";


const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export class AuthService {
  async register(name: string, email: string, password: string, role: Role = "USER") {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const { password: _pw, ...safeUser } = user;
    return safeUser;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.deletedAt) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );

    const { password: _pw, ...safeUser } = user;
    return { token, user: safeUser };
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: number; role: Role };
  }
}

export const authService = new AuthService();