import { supabase } from "../config/db"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface User {
  id: string;
  email: string;
  password_hash: string;
}

export async function registerUser(email: string, password: string) {
  const { data: existingUser } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single() as { data: User | null; error: any };


  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Usuário não encontrado');
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    throw new Error('Senha incorreta');
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, email: user.email };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch {
    throw new Error('Token inválido');
  }
}
