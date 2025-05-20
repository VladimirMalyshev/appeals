import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../../database/prisma/prisma.service';

const JWT_SECRET = process.env.JWT_SECRET!;

export const authService = {
  async register(email: string, password: string, role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT', name: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, role, name },
    });
    return { token: generateToken(user) };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { token: generateToken(user) };
  },
};

function generateToken(user: { id: number; role: string, name: string }) {
  return jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
}
