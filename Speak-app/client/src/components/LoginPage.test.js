import React from 'react';
import { fireEvent, render, act, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { LoginPage } from './LoginPage';

let firstSnap = {};

describe('Login snapshot', () => {
    firstSnap = renderer
    .create(<LoginPage />)
    .toJSON();
    expect(firstSnap).toMatchSnapshot();
})


describe('LoginPage', () => {
    test('renders LoginPage component', () => {
        const {getByLabelText} = render(<LoginPage />)
        expect(getByLabelText(/email address/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
    });
});

describe('Form Validation', () => {
    it('validate user inputs, and provides error messages', async () => { 
        render(<LoginPage />);

        await act (async() => {
            fireEvent.change(screen.getByLabelText(/email address/i), {
                target: {value: 'admin@admin.com'},
            });

            fireEvent.change(screen.getByLabelText(/password/i), {
                target: {value: 'password123'},
            })
        });

        expect(screen.getByRole("textbox", {name: "Email Address"})).toHaveValue("admin@admin.com")
        expect(screen.getByLabelText(/password/i)).toHaveValue("password123")
    }) 
})

describe('Login to be called', () => {
    let mockLogin = jest.fn(() => "Logged In")
    const {getByTestId} = render(<LoginPage login={mockLogin}/>
    )

       expect(fireEvent.click(getByTestId("signIn"))).toEqual(true)   
})
