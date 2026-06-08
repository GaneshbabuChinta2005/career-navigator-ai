import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../core/errors';
import { authService } from './auth.service';

export const signup = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);
    res.status(201).json({ status: 'success', data: result });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json({ status: 'success', data: result });
});

export const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = await authService.getMe(req.user._id.toString());
    res.status(200).json({ status: 'success', data: { user } });
});
