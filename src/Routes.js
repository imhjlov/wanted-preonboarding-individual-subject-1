import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "Components/common/Header/Header";
import AuthorityControl from "Utils/auth";
import { AUTH_LEVEL, IS_LOGGED_IN, ROUTES } from "Utils/constants";
import { Admin, Login, Main, SignUp, FindTeacher, Kids, MatchUp, Students } from "Pages";
import Section from "Components/Section/Section";

function Routes() {
  const { accessible, inaccessible, allAllow } = IS_LOGGED_IN;
  const { parent, unknown, admin, teacher } = AUTH_LEVEL;
  const { HOME, LOGIN, LOGOUT, SIGNUP, ADMIN, STUDENTS, MATCHUP, TEACHER, KIDS } = ROUTES;

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={LOGIN} component={AuthorityControl(Login, inaccessible, unknown)} />
        <Route exact path={SIGNUP} component={AuthorityControl(SignUp, inaccessible, unknown)} />
        <Route exact path={LOGOUT} render={() => <Redirect to="/" />} />
        <Section>
          <Switch>
            <Route exact path={HOME} component={AuthorityControl(Main, allAllow, unknown)} />
            <Route exact path={ADMIN} component={AuthorityControl(Admin, accessible, admin)} />
            <Route
              exact
              path={MATCHUP}
              component={AuthorityControl(MatchUp, accessible, teacher)}
            />
            <Route
              exact
              path={STUDENTS}
              component={AuthorityControl(Students, accessible, teacher)}
            />
            <Route
              exact
              path={TEACHER}
              component={AuthorityControl(FindTeacher, accessible, parent)}
            />
            <Route exact path={KIDS} component={AuthorityControl(Kids, accessible, parent)} />
          </Switch>
        </Section>
      </Switch>
    </Router>
  );
}
export default Routes;
