import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { Typography } from '@mui/material';
import React, { ReactNode, useContext } from 'react';
import { Route, Switch } from 'react-router';
import { applicationRoutes } from '../../configuration/applicationRoutes';
import { CurrentUserContext } from "../HOC/AuthenticationFrame";
import { ContentWrapper, LeftPanel, MainWrapper, RightPanel } from '../HOC/MainPanels';
import Navbar from '../navbar/Navbar';
import { NavigationLinkList } from '../NavigationLinkList';

const EditField = (props: { children: ReactNode, label: string }) => {

    return <Flex
        className="dividerBorderBottom"
        justify="space-between">

        <Typography>
            {props.label}
        </Typography>
        {props.children}
    </Flex>
}

export const UserSettingsPage = () => {

    const user = useContext(CurrentUserContext);

    const Preferences = () => {

        return <>
            <Flex direction="column" className="whall">

                <Image
                    src={user?.avatarUrl!}
                    borderRadius="50%"
                    width="200px"
                    height="200px"
                    border="2px solid var(--epistoTeal)"
                    margin="auto" />

                <Flex
                    direction="column"
                    flex="5"
                    maxWidth="500px"
                    margin="auto"
                    mt="50px">

                    <EditField label="Vezeték név">
                        <Input></Input>
                    </EditField>

                    <EditField label="Kereszt név">
                    </EditField>

                    <EditField label="Telefonszám">
                    </EditField>

                    <EditField label="Jelszó">
                    </EditField>
                </Flex>
            </Flex>
        </>
    }

    return <MainWrapper>

        <Navbar />

        <ContentWrapper>

            <LeftPanel p="20px">
                <NavigationLinkList items={[
                    applicationRoutes.settingsRoute.preferencesRoute
                ]}></NavigationLinkList>
            </LeftPanel>

            <RightPanel>

                <Switch>
                    <Route path={applicationRoutes.settingsRoute.preferencesRoute.route}>
                        <Preferences></Preferences>
                    </Route>
                </Switch>
            </RightPanel>
        </ContentWrapper>
    </MainWrapper>
}
