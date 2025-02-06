import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import React from 'react';
import './selectplan.css';

const PlanTable: React.FC = () => {
  return (
    <div className="PlanSelect">
      <table>
        <thead>
          <tr>
            <th rowSpan={2} colSpan={2}></th>
            <th>Complete Outsourcing</th>
            <th>Staff Augmentation</th>
            <th>Dedicated Teams</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Scale your team when you need it
            </td>
            <td>✔️</td>
            <td>✔️</td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Get top talent in your area
            </td>
            <td>✔️</td>
            <td>✔️</td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Bridge specific skill gaps
            </td>
            <td></td>
            <td>✔️</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Take charge of your team
            </td>
            <td></td>
            <td>✔️</td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Work alongside a full team
            </td>
            <td>✔️</td>
            <td></td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Ease your team's workload
            </td>
            <td>✔️</td>
            <td></td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'left' }}>
              Succeed in your project
            </td>
            <td>✔️</td>
            <td>✔️</td>
            <td>✔️</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td>
              <Button className="primary--light">Schedule a call</Button>
            </td>
            <td>
              <Button className="primary--light">Schedule a call</Button>
            </td>
            <td>
              <Button className="primary--light">Schedule a call</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const SelectPlan: React.FC = () => {
  return (
    <div className="SelectPlan">
      <Container className="main">
        <center // data-aos-duration="700" data-aos="fade-up"
        >
          <h2 id="h_ani">
            Select a Plan That Aligns Best with
            {' '}
            <br />
            {' '}
            Your Project Goals
          </h2>
        </center>
        <div // data-aos-duration="500" data-aos="fade-up"
        >
          <PlanTable />
        </div>
      </Container>
    </div>
  );
};

export default SelectPlan;
