import { render } from '@testing-library/react';
import React from 'react';
import PlayerConfig, { PlayerConfigProps } from './PlayerConfig';

describe('PlayerConfig', () => {
    const defaultProps: PlayerConfigProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<PlayerConfig {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('PlayerConfig')).toBeTruthy();
    });
});
