'use client';
import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { FormInput } from '@/components/Feature/Form/FormInput';
import FormTextArea from '@/components/Feature/Form/FormTextArea';
import { Heading } from '@/components/Feature/Heading/Heading';
import InputPhoneNo from '@/components/Feature/InputPhoneNo/InputPhoneNo';
import Text from '@/components/Feature/Text/Text';
import data from '@/data';
import emailjs from 'emailjs-com';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import './contactusform.css';

type ContactUsProps = {
  backgrounds?: boolean;
  header?: boolean;
  insideHeading?: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  refer: string;
  message: string;
};

export const ContactUsForm: React.FC<ContactUsProps> = (props) => {
  const [statusMessage, setStatusMessage] = useState<string>('');

  const dummyValues = [
    'Search Engine',
    'Clutch',
    'Social Media',
    'Referral',
    'Others',
  ];

  const initialValues: FormValues = {
    fullName: '',
    email: '',
    phone: '',
    refer: 'N/A',
    message: '',
  };

  return (
    <>
      {!props.backgrounds && (
        <Container className="main">
          <div className="contactUs-background">
            <Image
              src="/assets/contactUs.contactUsLeftBackground"
              alt="left background"
              width={100}
              height={100}
            />
            <Image
              src="/assets/contactUs.contactUsRightBackground"
              alt="right background"
              width={100}
              height={100}
            />
          </div>
        </Container>
      )}

      <div className="contactUs">
        {!props.header && (
          <center>
            <Heading
              className="secondry"
              id="h_ani"
              animation="fade-up"
              duration="500"
            >
              Contact Us
            </Heading>
            <Text
              className="secondry"
              animation="fade-up"
              duration="600"
            >
              Get in touch to let us know what you’re looking for, and one of
              our solutions architects will get back to you.
            </Text>
          </center>
        )}

        <section>
          <div>
            {props.insideHeading && (
              <Heading className="titory">
                {props.insideHeading}
              </Heading>
            )}

            <Formik
              initialValues={initialValues}
              validateOnMount
              validationSchema={data.validationContactUs}
              onSubmit={(values, { resetForm }) => {
                if (window.lintrk) {
                  window.lintrk('track', { conversion_id: 19141409 });
                  console.log('conversion');
                } else {
                  console.error('LinkedIn tracking not initialized.');
                }

                const templateParams = {
                  fullName: values.fullName,
                  email: values.email,
                  phone: `+ ${values.phone}`,
                  reference: values.refer,
                  message: values.message,
                };

                emailjs
                  .send(
                    'service_5y0itcg',
                    'template_4aiiawr',
                    templateParams,
                    'LYS_0H8byHSkeaSrz',
                  )
                  .then((response) => {
                    console.log(values);
                    console.log(response);

                    setStatusMessage('Email sent successfully!');
                  })
                  .catch((error) => {
                    console.error(error);
                    setStatusMessage('Failed to send email.');
                  });

                resetForm();
              }}
            >
              {formik => (
                <Form>
                  <div className="contactUs-form">
                    <div className="contactUs-form-flex">
                      <FormInput
                        name="fullName"
                        label="Full Name"
                        place="Enter your full name"
                      />
                      <FormInput
                        name="email"
                        label="Email"
                        place="Enter your email"
                      />
                    </div>
                    <InputPhoneNo
                      name="phone"
                      label="Phone Number"
                      place="+1 (555) 000-0000"
                    />
                    <FormTextArea
                      name="message"
                      label="Message"
                      place="Write your message..."
                      rows={7}
                      cols={30}
                    />
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="800"
                      type="submit"
                    >
                      Submit
                    </Button>
                    {statusMessage && (
                      <div className="status-message">{statusMessage}</div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
};
