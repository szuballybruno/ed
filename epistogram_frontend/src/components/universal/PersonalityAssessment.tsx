import { Flex, FlexProps } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { InfoOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { usePersonalityData } from "../../services/dataService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { PersonalityChart } from "./PersonalityChart";

export const PersonalityAssessment = (props: FlexProps) => {

    const { ...css } = props;

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    const descriptions = personalityData?.personalityDescriptions;

    return <LoadingFrame
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        wrap="wrap"
        className="whall"
        overflowY="scroll"
        {...css}>
        <Flex direction={"row"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"flex-start"} w={"100%"} h={"100%"}>
            <Flex justifyContent={"flex-start"}
                direction={"column"}
                minWidth={window.innerWidth < 600 ? "100%" : 450}
                w={"100%"}
                maxW={window.innerWidth < 600 ? "100%" : "50%"}
                mt={20}
                mx={20}
                mb={10}>
                <Flex>
                    <PersonalityChart data={personalityData?.chartData ?? null} />
                </Flex>
                <Flex flex={1} maxW={"100%"} mt={40}>
                    <Flex minW={40} pt={2} h={"100%"} direction={"column"} alignItems={"center"} justifyContent={"flex-start"}>
                        <InfoOutlined />
                    </Flex>
                    <Typography style={{ maxWidth: "100%" }}>A fenti grafikonon 5-5 tulajdonság párt láthatsz, melyek 0-7 között vehetnek fel értéket, attól függően, hogy az adott tulajdonság mennyire jellemző rád. Ezek általában ellentétben állnak egymással, így minél több pontod van az egyik oldalon, annál kevesebb lesz a másikon. </Typography>
                </Flex>
            </Flex>

            <Flex flex={1}
                minW={300}
                direction="column"
                p={10}
                overflow="scroll">
                <Typography fontWeight={"bold"} style={{
                    marginTop: 20
                }}>{"Egyedül vagy csoportosan tanulsz szívesebben?"}</Typography>
                <Divider w={"35%"} h={2} mb={15} mt={5} bgColor={"black"} />
                <Typography >{descriptions?.category1}</Typography>

                <Typography fontWeight={"bold"} style={{
                    marginTop: 20
                }}>{"Térben vizualizálsz, vagy inkább hangosan kimondod az információt?"}</Typography>
                <Divider w={"35%"} h={2} mb={15} mt={5} bgColor={"black"} />
                <Typography mt={1}>{descriptions?.category2}</Typography>

                <Typography fontWeight={"bold"} style={{
                    marginTop: 20
                }}>{"Gyakorlati vagy elméleti oldalról érdekel inkább egy-egy adott probléma?"}</Typography>
                <Divider w={"35%"} h={2} mb={15} mt={5} bgColor={"black"} />
                <Typography mt={1}>{descriptions?.category3}</Typography>

                <Typography fontWeight={"bold"} style={{
                    marginTop: 20
                }}>{"Hallás, vagy látás után jegyzel meg könnyebben valamit?"}</Typography>
                <Divider w={"35%"} h={2} mb={15} mt={5} bgColor={"black"} />
                <Typography mt={1}>{descriptions?.category4}</Typography>

                <Typography fontWeight={"bold"} style={{
                    marginTop: 20
                }}>{"Kreatív, vagy analitikus gondolkodst részesítesz előnyben?"}</Typography>
                <Divider w={"35%"} h={2} mb={15} mt={5} bgColor={"black"} />
                <Typography mt={1}>{descriptions?.category5}</Typography>
            </Flex>
        </Flex>



    </LoadingFrame>
}
