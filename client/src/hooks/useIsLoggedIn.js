import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const useIsLoggedIn = query => {
  const history = useHistory();
  const { data: { isLoggedIn } } = useQuery(query);

  return [
    isLoggedIn,
    {
      login: () => history.push('/login'),
    },
  ];
};

export default useIsLoggedIn;
