import { render, screen } from '@testing-library/react';
import NotFound from './index';

const mockDispatch = jest.fn();
const mockSelector = jest.fn().mockImplementation(() => ({
    status: '',
    result: '',
}));

jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector(),
}));

test('should render', () => {
    render(<NotFound />)
    expect(screen.getByTestId('not-found-element')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeTruthy();
    expect(screen.getByText('There\'s nothing here.')).toBeTruthy();
});
