// import React from 'React';
// import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../client/App';
// import { DemoContainer, FeatureContainer, IntroContainer, MainContainer, TeamContainer, ToolContainer, ToolDisplayContainer } from '../client/containers';
import {
  DustParticles,
  NavBar,
  Particle,
  PortInputForm,
  ToolBar,
  ToolMetric,
  ToolTree,
} from '../client/components';

// jest.mock('@tsparticles/react');
// jest.mock('tsparticles');

describe('React Component Testing', () => {
  beforeAll(() => {});

  afterAll(() => {
    // ...
  });

  describe('NavBar', () => {
    test('Has "Podz" and the navTab', () => {
      let text = render(<NavBar {...props} />);
      expect(text).toHaveTextContent('Podz');
    });
  });
});
