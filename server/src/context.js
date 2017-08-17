import Balance from './model';

const createContext = () => ({
  Balance: new Balance(),
});

export default createContext;
