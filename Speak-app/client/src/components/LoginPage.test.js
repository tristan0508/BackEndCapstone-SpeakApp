import React from 'react';
import { fireEvent, screen, act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';
import UserContext from '../providers/UserContext';


describe('Renders Login Page', () => {
    test('sanity', () => {
        render(
          <LoginPage />
        )
    })
})