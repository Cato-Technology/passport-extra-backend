import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateToken } from '../shared/src/middleware/authMiddleware';

const router = Router();

router.use('/auth', createProxyMiddleware({ target: 'http://auth-service:5001', changeOrigin: true }));
router.use('/users', authenticateToken, createProxyMiddleware({ target: 'http://user-service:5002', changeOrigin: true }));
router.use('/notifications', authenticateToken, createProxyMiddleware({ target: 'http://notification-service:5003', changeOrigin: true }));

export default router;
