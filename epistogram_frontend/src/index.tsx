import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route, Switch, withRouter } from "react-router-dom";
import './index.css';
import LoginScreen from "./components/universal/authentication/login/LoginScreen";
import NotFound from "./components/universal/notFound/NotFound";
import PlayerMain from "./components/player/PlayerMain";
import ProfileMain from "./components/profile/ProfileMain";
import CourseSearch from "./components/course_search/CourseSearch";
import UserDashBoard from "./components/dashboard/UserDashBoard";
import Administration from "./components/administration/Administration";
import CoursePage from "./components/course_search/CoursePage";

import { DataManagerFrame } from "./HOC/data_manager_frame/DataManagerFrame";
import ProtectedRoute from "./components/universal/authentication/protectedRoute/ProtectedRoute";
import { PopupsWrapper } from "./HOC/popups_wrapper/PopupsWrapper";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./configuration/defaultMUITheme";
import { StylesProvider } from "@material-ui/core";
import { Signup } from "./components/universal/authentication/signup/Signup";
import { MobileDemo } from "./components/universal/MobileDemo";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import RegistrationPage from "./components/RegistrationPage";

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <DataManagerFrame>
                        <Router>
                            <PopupsWrapper>
                                <Switch>

                                    {/* unprotected paths  */}
                                    <Route path="/login" component={withRouter(LoginScreen)} />
                                    <Route path="/register" component={RegistrationPage} />

                                    {/* protected paths */}
                                    <ProtectedRoute path="/kezdolap" render={() => <UserDashBoard />} />
                                    <ProtectedRoute path="/kurzusok" render={() => <CourseSearch />} />
                                    <ProtectedRoute path="/watch/:courseId/:id" render={() => withRouter(PlayerMain)} />
                                    <ProtectedRoute path="/profilom" render={() => <ProfileMain />} />
                                    <ProtectedRoute path="/signup" render={() => withRouter(Signup)} />
                                    <ProtectedRoute path="/admin" render={() => withRouter(Administration)} />
                                    <ProtectedRoute path="/regisztracio" render={() => <CoursePage pageUrl={"https://brunosteppenwolf.wixsite.com/mysite"} />} />
                                    <ProtectedRoute path="/excel-kurzus" render={() => <CoursePage pageUrl={"https://epistogram.com/?page_id=7147"} />} />
                                    <ProtectedRoute path="/mobiledemo" render={() => <MobileDemo />} />
                                    
                                    {/* index path */}
                                    <ProtectedRoute path="/" render={() => <UserDashBoard />} exact />

                                    {/* wrong path */}
                                    <Route path="*">
                                        <NotFound />
                                    </Route>
                                </Switch>
                            </PopupsWrapper>
                        </Router>
                    </DataManagerFrame>
                </ThemeProvider>
            </StylesProvider>
        </BrowserRouter>
    </QueryClientProvider>,
    document.getElementById('root')
);
