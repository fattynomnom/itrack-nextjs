const useRouterMock = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouterMock.mockImplementation(() => ({ push }))

const mocks = {
    useRouterMock: {
        push
    }
}

export default mocks
