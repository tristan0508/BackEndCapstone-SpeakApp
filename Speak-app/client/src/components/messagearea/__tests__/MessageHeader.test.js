import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import MessageHeader from '../MessageHeader';



describe('Message Header', () => {
    test('renders Message Header component', () => {
        const tree = renderer
        .create(<MessageHeader/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('handleOpen true or false', () => {
        const {getByTestId} = render(<MessageHeader />)
        expect(fireEvent.click(getByTestId('handleOpen'))).toBeCalled
    })

});

