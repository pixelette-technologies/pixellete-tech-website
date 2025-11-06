import * as Yup from 'yup';

export const validationContactUs = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  email: Yup.string().email('Email is invalid').required('Required'),
  refer: Yup.string().required('Required'),
  message: Yup.string()
    .min(6, 'Must be at least 6 charaters')
    .max(500, 'Must be 500 character or less.')
    .required('Required'),
  phone: Yup.number()
    .typeError('That doesn\'t look like a phone number')
    .positive('A phone number can\'t start with a minus')
    .integer('A phone number can\'t include a decimal point')
    .min(20)
    .required('Required'),
});
