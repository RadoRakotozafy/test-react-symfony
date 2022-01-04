import { render } from '@testing-library/react';
import React from 'react';
import Game, { GameProps } from './Game';

describe('Game', () => {
    const defaultProps: GameProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<Game {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Game')).toBeTruthy();
    });
});
