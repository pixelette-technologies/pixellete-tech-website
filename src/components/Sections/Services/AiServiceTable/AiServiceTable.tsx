import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import React from 'react';
import './index.css';

type AiServiceTableProps = {
  // Define any props here if needed in the future
};
export const AiServiceTable: React.FC<AiServiceTableProps> = () => {
  return (
    <div>
      <Container className="main margins">
        <center style={{ marginTop: '10rem' }}>
          <Heading className="primary">
            Select a plan that aligns best with

            <br />

            your project development
            goals
          </Heading>
          <br />
          <Text className="titory--bold">
            Every project is unique, and so are our solutions. Our developer
            engagement models are crafted to provide the right level of

            <br />
            support for your development needs. All you’ve got to do is select
            whether you want complete outsourcing services, staff

            <br />
            augmentation services or dedicated development teams service and
            we’ll help bring your project to life.
          </Text>
          <div className="AiServiceTable">
            <table>
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Scale your team when you need it
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Get top talent in your area
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Bridge specific skill gaps
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Take charge of your team
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Work alongside a full team
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Ease your team’s workload
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      margin: '0 2rem',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    Succeed in your project
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ margin: '0 2rem', background: 'transparent' }}
                  >
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Complete outsourcing</th>
                </tr>
              </thead>
              <tbody style={{ position: 'relative' }}>
                <tr>
                  <td
                    style={{
                      borderTopRightRadius: '10px',
                      borderTopLeftRadius: '10px',
                    }}
                  >
                    ✔️
                  </td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottomRightRadius: '10px',
                      borderBottomLeftRadius: '10px',
                    }}
                  >
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="2400"
                    >
                      Book a free consultation
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Staff augmentation</th>
                </tr>
              </thead>
              <tbody style={{ position: 'relative' }}>
                <tr>
                  <td
                    style={{
                      borderTopRightRadius: '10px',
                      borderTopLeftRadius: '10px',
                    }}
                  >
                    ✔️
                  </td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottomRightRadius: '10px',
                      borderBottomLeftRadius: '10px',
                    }}
                  >
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="2400"
                    >
                      Book a free consultation
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Dedicated teams</th>
                </tr>
              </thead>
              <tbody style={{ position: 'relative' }}>
                <tr>
                  <td
                    style={{
                      borderTopRightRadius: '10px',
                      borderTopLeftRadius: '10px',
                    }}
                  >
                    ✔️
                  </td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>✔️</td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottomRightRadius: '10px',
                      borderBottomLeftRadius: '10px',
                    }}
                  >
                    <Button
                      className="primary"
                      animation="fade-up"
                      duration="2400"
                    >
                      Book a free consultation
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </center>
      </Container>
    </div>
  );
};
