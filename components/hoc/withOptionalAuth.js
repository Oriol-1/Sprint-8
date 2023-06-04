import React from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const withOptionalAuth = (Component) => {
  return class WithOptionalAuth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        user: null,
      };
    }

    componentDidMount() {
      this.authListener = onAuthStateChanged(auth, (user) => {
        this.setState({ user, loading: false });
      });
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      const { user, loading } = this.state;

      if (loading) {
        return <div>Loading...</div>;
      }

      return <Component {...this.props} user={user} />;
    }
  };
};

export default withOptionalAuth;
