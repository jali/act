import { renderHook, act } from '@testing-library/react-hooks'
import useAuth from './use';

const mockDispatch = jest.fn();
const mockSelector = jest.fn().mockImplementation(() => ({
    status: '',
    result: '',
}));

jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector(),
}));

describe('useAuth hook', () => {
    test('should render hook', () => {
        renderHook(() => useAuth());
    });

    it('should trigger login method', () => {
        const { result } = renderHook(() => useAuth());
        act(() => {
            result.current.handleLogin();
        });
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'auth/login',
            payload: undefined
        });
    });

    it('When selector return updated value, should get updated one', () => {
        mockSelector.mockImplementationOnce(() => true)
        const { result } = renderHook(() => useAuth())
        expect(result.current.loading).toEqual(true)
      })
});
