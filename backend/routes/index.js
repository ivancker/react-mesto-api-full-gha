const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validate');
const NotFoundError = require('../errors/notFoundError'); // 404

router.post('/api/signup', validateSignUp, usersController.createUser);
router.post('/api/signin', validateSignIn, usersController.loginUser);

router.use('/api/users', auth, userRouter);
router.use('/api/cards', auth, cardRouter);

router.use(auth, () => {
  throw new NotFoundError('Такая страница не существует');
});

module.exports = router;
