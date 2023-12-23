// import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../client/App';
import { DemoContainer, FeatureContainer, IntroContainer, MainContainer, TeamContainer, ToolContainer, ToolDisplayContainer } from '../client/containers';
import { DustParticles, NavBar, Particle, PortInputForm, ToolBar, ToolMetric, ToolTree } from '../client/components';

describe('React Tests', () => {
  beforeAll(done => {
    // ...
    done();
  });

  afterAll(done => {
    // ...
    done();
  });

  describe('w.e component', () => {

  });
});
