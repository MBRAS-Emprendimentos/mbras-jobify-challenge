import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    return res.status(200).json({ message: 'Login realizado com sucesso!', token: data.token });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}
