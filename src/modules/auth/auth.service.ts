import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../../database/prisma/prisma.service';
import redis from '../../database/redis/redis';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const authService = {
  async register(
    email: string,
    password: string,
    role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT',
    name: string
  ) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, role, name },
    });
    return { token: generateTokens(user) };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { token: generateTokens(user) };
  },

  async logout(userId: number) {
    await redis.del(`refresh:${userId}`);
  },

  async refresh(oldToken: string) {
    const decoded = jwt.verify(oldToken, REFRESH_SECRET) as { id: number };

    const stored = await redis.get(`refresh:${decoded.id}`);
    if (stored !== oldToken) {
      throw new Error('Token mismatch or already used');
    }

    await redis.del(`refresh:${decoded.id}`);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) throw new Error('User not found');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };
  },
};

function generateTokens(user: { id: number; role: string; name: string }) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

function generateAccessToken(user: { id: number; role: string; name: string }) {
  return jwt.sign(user, ACCESS_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(user: { id: number }) {
  const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
    expiresIn: '7d',
  });
  redis.set(`refresh:${user.id}`, refreshToken);
  return refreshToken;
}
