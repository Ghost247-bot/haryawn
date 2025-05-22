import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'lawyer' | 'client';
}

interface LoginBody {
  email: string;
  password: string;
}

// Temporary in-memory storage
const users: any[] = [];

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-super-secret-jwt-key', {
    expiresIn: '30d'
  });
};

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, this should be hashed
      role: role || 'client'
    };

    users.push(user);

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password (in a real app, this would use proper password comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    // In a real app, this would use the user ID from the JWT token
    const userId = (req as any).user?.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}; 