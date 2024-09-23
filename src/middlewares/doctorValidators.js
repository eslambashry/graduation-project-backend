import { body, validationResult } from 'express-validator';

export const validateDoctor = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('specialization').isString().notEmpty().withMessage('Specialization is required'),
  body('userName').isString().notEmpty().withMessage('Username is required'),
  body('nationalID').isLength({ min: 14, max: 14 }).withMessage('National ID must be 14 characters long'),
  body('department').isMongoId().withMessage('Invalid department ID'),
  body('phone').isString().matches(/^\d{10,11}$/).withMessage('Invalid phone number'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('dateOfBirth').isISO8601().withMessage('Invalid date of birth'),
  body('experience').isNumeric().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
