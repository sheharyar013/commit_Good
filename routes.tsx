import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  About,
  CampaignVolunteers,
  Chat,
  CreateProject,
  GoodEconomy,
  Login,
  ProfileRoute,
  Projects,
  ProjectDetailsRoute,
  SignUp,
  VolunteerTaskRoute,
  ForgetPasswordRoute,
  ResetPasswordRoute,
} from "./routes/routes";

import {
  AboutUsView,
  AddNewProjectView,
  ArtCreateView,
  CampaignVolunteersView,
  ChatView,
  GoodEconomyView,
  LoginView,
  ProfileView,
  ProjectsView,
  ProjectDetailsView,
  SignUpView,
  VolunteerTasks,
  ForgetPasswordView,
  ResetPasswordView,
  ArtworksView,
} from "./views";

import { Providers } from "./providers";
import { Loader } from "./shared/Loader/Loader";
import Home from "./views/home-commit/home";

export function Routes() {
  return (
    <BrowserRouter basename={"/"}>
      <Providers>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={Login} component={() => <LoginView />} />
            <Route exact path={SignUp} component={() => <SignUpView />} />
            <Route
              exact
              path={ForgetPasswordRoute}
              component={() => <ForgetPasswordView />}
            />
            <Route
              exact
              path={ResetPasswordRoute}
              component={() => <ResetPasswordView />}
            />
            <Route
              exact
              path="/art/create/:project_id/:step_param?"
              component={() => <ArtCreateView />}
            />
            <Route
              exact
              path="/artworks/:id?"
              component={() => <ArtworksView />}
            />
            <Route path={About} component={() => <AboutUsView />} />
            <Route path={Projects} component={ProjectsView} />
            <Route path={ProjectDetailsRoute} component={ProjectDetailsView} />
            <Route
              path={CampaignVolunteers}
              component={CampaignVolunteersView}
            />
            <Route path={VolunteerTaskRoute} component={VolunteerTasks} />
            <Route path={CreateProject} component={AddNewProjectView} />
            <Route path={Chat} component={ChatView} />
            <Route path={GoodEconomy} component={GoodEconomyView} />
            <Route path={ProfileRoute} component={ProfileView} />
            <Route path="/" component={() => <Home />} />
          </Switch>
        </Suspense>
      </Providers>
    </BrowserRouter>
  );
}
