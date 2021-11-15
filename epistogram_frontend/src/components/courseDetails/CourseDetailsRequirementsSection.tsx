import {Flex} from "@chakra-ui/react";
import {EpistoHeader} from "../EpistoHeader";
import {Typography} from "@mui/material";
import {Radar} from "react-chartjs-2";
import React from "react";

export const CourseDetailsRequirementsSection = () => <Flex mt={10} w={"100%"} h={500} direction={"column"} alignItems={"flex-start"}>
    <EpistoHeader text={"Mikor való neked a kurzus?"} my={10} />
    <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique suscipit tempor. Pellentesque dictum, augue a egestas faucibus, augue ipsum vehicula dui, faucibus eleifend risus orci quis ante. Curabitur porttitor fringilla blandit. Suspendisse placerat tempus vehicula. In dignissim tellus magna. Donec non tincidunt risus. Morbi sit amet turpis dolor. Proin vulputate leo eu leo bibendum, in condimentum ex efficitur.

        Maecenas risus sem, pharetra eu magna vel, gravida luctus urna. Sed diam urna, blandit id justo a, consectetur lacinia risus. Donec porttitor, sem vitae posuere lacinia, mauris libero sagittis dui, non viverra purus lectus ut urna. Pellentesque semper, eros ac maximus vehicula, orci odio tempor magna, vel rutrum nisi nisl id mauris. Cras ullamcorper lacus elementum venenatis feugiat. Donec magna dui, vulputate ac massa ut, placerat imperdiet mauris. Fusce pellentesque ipsum nunc, eu lobortis libero porttitor id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tempor euismod erat, finibus commodo felis mollis a. Ut rhoncus convallis sem, in varius tortor dapibus et. Donec ultricies accumsan neque, eget bibendum ante fringilla sed.
    </Typography>

    <EpistoHeader text={"Mennyire illik hozzád ez a kurzus"} my={10} mt={40} />
    <Flex w={"100%"} mb={100}>
        <Flex direction={"column"} minW={"50%"} >
            Dinamikus szöveg*
        </Flex>
        <Flex direction={"column"} minW={"50%"}>
            <Radar
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false,
                            text: 'Felhasználók átlagos tanulási stílusa'
                        },
                        legend: {
                            display: false
                        }
                    },
                }}
                data={{
                    labels: [
                        'Egyedüli',
                        'Hangos kimondás',
                        'Elméleti',
                        'Vizuális alapú',
                        'Analitikus',
                        'Szociális',
                        'Térbeli elhelyezés',
                        'Gyakorlati',
                        'Audió alapú',
                        'Kreatív'
                    ],
                    datasets: [
                        {
                            data: [5, 4, 5, 5, 3, 5, 5, 5, 4, 5],
                            backgroundColor: ["rgba(125,232,178,0.46)", "rgba(125,232,178,0.46)", "#7dabe8", "#a47de8", "#d4e87d", "#dd7de8"]
                        }
                    ]
                }} />
        </Flex>
    </Flex>

    <EpistoHeader text={"Milyen technikai követelményei vannak a kurzusnak?"} my={10} mt={40} />
    <Flex w={"100%"}>
        <Flex direction={"column"} minW={"50%"}>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} ></Flex>
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>Lorem ipsum dolor sit amet</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} ></Flex>
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>Lorem ipsum dolor sit amet</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} ></Flex>
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>Lorem ipsum dolor sit amet</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} ></Flex>
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>Lorem ipsum dolor sit amet</Typography>
                </Flex>
            </Flex>
            <Flex w={"100%"} h={30} px={15} mt={10}>
                <Flex w={30} h={30} p={5} ></Flex>
                <Flex direction={"row"} flex={1} ml={10} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography>Lorem ipsum dolor sit amet</Typography>
                </Flex>
            </Flex>
        </Flex>
    </Flex>

</Flex>
