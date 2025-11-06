import * as Yup from 'yup';

export const validationResearchInquiry = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  email: Yup.string().email('Email is invalid').required('Required'),
  organization: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  timeLine: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  title: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  researchTopic: Yup.string()
    .min(2, 'Must be 2 character')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
  description: Yup.string()
    .min(6, 'Must be at least 6 charaters')
    .max(500, 'Must be 500 character or less.')
    .required('Required'),
  comments: Yup.string()
    .min(6, 'Must be at least 6 charaters')
    .max(500, 'Must be 500 character or less.')
    .required('Required'),
});
