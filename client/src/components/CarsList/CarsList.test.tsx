import { render } from '@testing-library/react';
import React from 'react';
import CarsList, { CarsListProps } from './CarsList';

describe('CarsList', () => {
    const defaultProps: CarsListProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<CarsList {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('CarsList')).toBeTruthy();
    });
});
