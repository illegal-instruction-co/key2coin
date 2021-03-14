import { ScreenClassProvider } from 'react-grid-system';
import { withStore} from 'react-context-hook'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';


import './index.css'
import Header from './components/Header'
import BuyPage from './pages/BuyPage'
import RedeemPage from './pages/RedeemPage'
import Footer from './components/Footer'
import NotFound from './pages/NotFound/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  let location = useLocation();
  return (
    <ScreenClassProvider>
      <Switch location={location}>
        <Route path="/" exact><Redirect to="/en" /></Route>
        <Route
          path="/:lang"
          exact
        >
          <Header />
          <BuyPage />
          <Footer />
        </Route>
        <Route
          path="/:lang/buy"
          exact
        >
          <Header />
          <BuyPage />
          <Footer />
        </Route>
        <Route
          path="/:lang/redeem"
          exact
        >
          <Header />
          <RedeemPage />
          <Footer />
        </Route>
        <Route
          path="/:lang/terms-conditions"
          exact
        >
          <Header />
          <Terms />
          <Footer />
        </Route>
        <Route
          path="/:lang/cookies-policy"
          exact
        >
          <Header />
          <Privacy />
          <Footer />
        </Route>
        <Route>
          <Header />
          <NotFound />
          <Footer />
        </Route>
      </Switch>
    </ScreenClassProvider>
  );
}

const initialState = {
  currency: "",
  language: "",
  languages:[],
  currencies: [],
  langs: [],
  crypto_currencys: [],
  selectLang:[]
}

const storeConfig = {
 listener: (state, key, prevValue, nextValue) => {
console.log(`the key "${key}" changed in the store`)
console.log('the old value is', prevValue)
console.log('the current value is', nextValue)
console.log('the state is', state)
},
 logging: process.env.NODE_ENV !== 'production'
}

export default withStore(App, initialState, storeConfig)
