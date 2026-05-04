module.exports = {
  BrowserRouter: ({ children }) => children,
  MemoryRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Navigate: ({ to }) => null,
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
};
