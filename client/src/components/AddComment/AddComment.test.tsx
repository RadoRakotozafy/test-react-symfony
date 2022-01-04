import { render } from '@testing-library/react';
import React from 'react';
import AddComment, { AddCommentProps } from './AddComment';

describe('AddComment', () => {
    const defaultProps: AddCommentProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<AddComment {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('AddComment')).toBeTruthy();
    });
});
