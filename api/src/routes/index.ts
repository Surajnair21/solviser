import { Router } from 'express';
import authRouter from './auth.routes';
import organizationRouter from './organization.routes';
import dashboardRouter from './dashboard.routes';
import subscriptionRouter from './subscription.routes';
import rbacRouter from './rbac.routes';
import adminRouter from './admin.routes';
import userRouter from './user.routes';
import verificationRoutes from './verification.routes';
import onboardingRoutes from './onboarding.routes';
import providerRoutes from './providers.routes';
import productRoutes from './productRoutes'; // <-- ADD THIS

const router = Router();

// Health check endpoint
router.get('/health', (_, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Mount the routes
router.use('/auth', authRouter);
router.use('/organization', organizationRouter);
router.use('/dashboard', dashboardRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/rbac', rbacRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/verification', verificationRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/providers', providerRoutes);
router.use('/products', productRoutes); // <-- ADD THIS LINE

export default router;
