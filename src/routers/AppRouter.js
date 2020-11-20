import { Router, Route, Switch } from 'react-router-dom'
import React from 'react';
import LandingPage from '../components/Pages/LandingPage'
import HomePage from '../components/Home/HomePage'
import ThreeHomePage from '../components/Home/MoreThanThreeHome'
import NotFound from '../components/Pages/NotFound'
import LoginEmailForm from '../components/Login/LoginEmailForm'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import ChooseSymbolPage from '../components/Pages/ChooseSymbolPage'
import LowRoute from '../components/Routes/LowRoute'
import MediumLowRoute from '../components/Routes/MediumLowRoute'
import VeryLowRoute from '../components/Routes/VeryLowRoute'
import LowButWithEnergyRoute from '../components/Routes/LowButWithEnergy'
import NothingRoute from '../components/Routes/NothingRoute'
import OkRoute from '../components/Routes/OkRoute'
import HighRoute from '../components/Routes/HighRoute'
import SuicidalRoute from '../components/Routes/SuicidalRoute'
import TooHighRoute from '../components/Routes/TooHigh'
import Onboarding from '../components/Onboarding/onboarding'
import SymbolDescription from '../components/Pages/SymbolDescription'
import SymbolDetailedDescription from '../components/Pages/SymbolDetailedDescription'
import IntroPage from '../components/Pages/IntroPage'
import BreathingExercise from '../components/Pages/BreathingExercise'
import GroundingExercise from '../components/Pages/GroundingExercise'
import Exercises from '../components/Routes/Exercises'
import ProjectLandingPage from '../components/Pages/ProjectPage'


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={ ProjectLandingPage } exact={true} />
-               <PublicRoute path="/login" component={ LoginEmailForm }/>
                <PrivateRoute path="/project" component={ ProjectLandingPage} />
                <PrivateRoute path="/intro" component={ IntroPage }/>
                <PrivateRoute path="/home" component={ HomePage }/>
                <PrivateRoute path="/3-home" component={ ThreeHomePage }/>
                <PrivateRoute path="/choosesymbol" component={ChooseSymbolPage}/>
                <PrivateRoute path="/symbol-description" component={SymbolDescription}/>
                <PrivateRoute path="/symbol-more-detail" component={SymbolDetailedDescription}/>
                <PrivateRoute path="/onboarding" component={ Onboarding } />
                <PrivateRoute path="/1" component={ TooHighRoute } />
                <PrivateRoute path="/2" component={ HighRoute } />
                <PrivateRoute path="/3" component={ OkRoute } />
                <PrivateRoute path="/4" component={ NothingRoute } />
                <PrivateRoute path="/5" component={ LowRoute } />
                <PrivateRoute path="/6" component={ MediumLowRoute } />
                <PrivateRoute path="/7" component={ VeryLowRoute } />
                <PrivateRoute path="/8" component={ LowButWithEnergyRoute } />
                <PrivateRoute path="/9" component={ SuicidalRoute } />
                <PrivateRoute path="/landing" component={ LandingPage }/>
                <PrivateRoute path="/breathing-exercise" component={ BreathingExercise } />
                <PrivateRoute path="/grounding-exercise" component={ GroundingExercise } />
                <PrivateRoute path="/test" component={ Exercises }/>
                <Route component={ NotFound } />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;