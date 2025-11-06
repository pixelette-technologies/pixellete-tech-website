import * as Yup from 'yup';

export const validationStartUps = Yup.object({
  companyName: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  personName: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .matches(
      /^[a-z\s]*$/i,
      'Person name must contain only letters and spaces',
    )
    .required('Required'),
  email: Yup.string().email('Email is invalid').required('Required'),
  linkedInURL: Yup.string()
    .matches(
      /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
      'Invalid LinkedIn profile URL',
    )
    .required('Required'),
  phone: Yup.number()
    .typeError('That doesn\'t look like a phone number')
    .positive('A phone number can\'t start with a minus')
    .integer('A phone number can\'t include a decimal point')
    .min(20)
    .required('Required'),
  industry: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  websiteUrl: Yup.string().url('Invalid URL').required('Required'),
  enterFigure: Yup.number()
    .min(0, 'Price must be greater than 0')
    .required('Required'),
  competitors: Yup.string()
    .required('Required')
    .test('uniqueUrls', 'URLs must be different', (value) => {
      const urls = value.split(',').map(url => url.trim());
      return new Set(urls).size === urls.length;
    }),
  uniqueSellingProposition: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  targetAudience: Yup.string()
    .required('Required')
    .matches(
      /^[a-z\s]*$/i,
      'Target audience must contain only letters and spaces',
    )
    .min(2, 'Target audience must be at least 2 characters')
    .max(50, 'Target audience must not exceed 50 characters'),
  allocationOfFunds: Yup.number()
    .required('Required')
    .positive('Allocation of funds must be a positive number')
    .integer('Allocation of funds must be an integer')
    .min(0, 'Allocation of funds must be at least 0')
    .max(1000000, 'Allocation of funds must not exceed 1,000,000'),
  marketingStrategy: Yup.string()
    .required('Required')
    .min(10, 'Marketing strategy must be at least 10 characters')
    .max(500, 'Marketing strategy must not exceed 500 characters'),
  projectDescription: Yup.string()
    .required('Required')
    .min(20, 'Project description must be at least 20 characters')
    .max(1000, 'Project description must not exceed 1000 characters'),
  additionalComments: Yup.string()
    .min(5, 'Additional comments must be at least 5 characters')
    .max(500, 'Additional comments must not exceed 500 characters'),
});
