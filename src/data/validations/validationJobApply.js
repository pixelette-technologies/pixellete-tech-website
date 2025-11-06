import * as Yup from 'yup';

export const validationJobApply = Yup.object({
  name: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  email: Yup.string().email('Email is invalid').required('Required'),
  phone: Yup.number()
    .typeError('That doesn\'t look like a phone number')
    .positive('A phone number can\'t start with a minus')
    .integer('A phone number can\'t include a decimal point')
    .min(20)
    .required('Required'),
  currentSalary: Yup.number()
    .required('Required')
    .positive('Current salary must be a positive number')
    .max(2000000, 'Current salary must not exceed 2,000,000'),
  desiredSalary: Yup.number()
    .required('Required')
    .positive('Desired salary must be a positive number')
    .max(2000000, 'Desired salary must not exceed 2,000,000')
    .moreThan(
      Yup.ref('currentSalary'),
      'Desired salary must be greater than current salary',
    ),
  totalYearsOfExperience: Yup.number()
    .required('Required')
    .positive('Total years of experience must be a positive number')
    .integer('Total years of experience must be an integer')
    .min(0, 'Total years of experience must be at least 1')
    .max(15, 'Total years of experience must not exceed 15'),
  description: Yup.string()
    .required('Required')
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must not exceed 500 characters'),
});
