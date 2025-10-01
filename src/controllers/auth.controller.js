import logger from '#config/logger.js';
import { authUser, createUser } from '#services/auth.service.js';
import { cookies } from '#utils/cookies.js';
import { formatValidateError } from '#utils/format.js';
import { jwttoken } from '#utils/jwt.js';
import { signInSchema, signupSchema } from '#validations/auth.validation.js';
import { authUsers } from 'drizzle-orm/supabase';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidateError(validationResult.error),
      });
    }
    const { name, email, password, role } = validationResult.data;

    //AUTH SERVICE
    const user = await createUser({
      name,
      email,
      password,
      role,
    });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    logger.info(`User registerd successfully: ${email}`);
    res.status(201).json({
      message: 'User registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('Signup error', e);

    if (e.message === 'User with this email already exists') {
      return res.status(409).json({ error: 'Email already exist ' });
    }

    next(e);
  }
};

export const signin = async (req, res, next) => {
  try {
    const validationResult = signInSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidateError(validationResult.error),
      });
    }

    const { email, password } = validationResult.data;

    // AUTH SERVICE - validate user credentials
    const user = await authUser({ email, password });

    if (!user) {
      logger.warn(`Signin failed for: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    logger.info(`User signed in successfully: ${email}`);
    res.status(200).json({
      message: 'User signed in',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    logger.error('Signin error', e);
    next(e);
  }
};

export const signout = async (req, res, next) => {
  try {
    // Clear the token cookie
    cookies.clear(res, 'token');

    logger.info(`User signed out successfully`);

    res.status(200).json({
      message: 'User signed out successfully',
    });
  } catch (e) {
    logger.error('Signout error', e);
    next(e);
  }
};