import { Flex, FlexProps } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { InfoOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { usePersonalityData } from "../../services/dataService";
import { LoadingFrame } from "../HOC/LoadingFrame";
import { PersonalityChart } from "./PersonalityChart";

export const PersonalityAssessment = (props: FlexProps) => {

    const {...css} = props;

    const {
        personalityData,
        personalityDataError,
        personalityDataState
    } = usePersonalityData();

    const descriptions = personalityData?.personalityDescriptions;

    const PersonalityAssesmentDescriptionItem = (props: { title: string, description?: string }) => {
        return <Flex
            direction={"column"}
        >
            <Typography
                fontWeight={"bold"}
                fontSize={"0.9em"}
                style={{
                    marginTop: 20
                }}
            >
                {props.title}
            </Typography>
            <Divider
                w={"35%"}
                h={1}
                mb={15}
                mt={5}
                bgColor={"black"}
            />
            <Typography
                fontSize={"0.9em"}
            >
                {props.description}
            </Typography>
        </Flex>
    }

    return <LoadingFrame
        loadingState={personalityDataState}
        onlyRenderIfLoaded
        error={personalityDataError}
        wrap="wrap"
        className="whall"
        overflowY="scroll"
        {...css}>
        <Flex
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={"flex-start"}
            w={"100%"}
            h={"100%"}
        >
            <Flex
                justifyContent={"flex-start"}
                direction={"column"}
                minWidth={window.innerWidth < 600 ? "100%" : 450}
                w={"100%"}
                maxW={window.innerWidth < 600 ? "100%" : "50%"}
                mt={20}
                mx={20}
                mb={10}
            >
                <Flex>
                    <PersonalityChart data={personalityData?.chartData ?? null}/>
                </Flex>
                <Flex
                    flex={1}
                    maxW={"100%"}
                    mt={40}
                >
                    <Flex
                        minW={40}
                        pt={2}
                        h={"100%"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                    >
                        <InfoOutlined/>
                    </Flex>
                    <Typography style={{maxWidth: "100%", fontSize: "0.9em"}}>
                        A fenti grafikonon 5-5 tulajdonság párt láthatsz, melyek 0-7
                        között vehetnek fel értéket, attól függően, hogy az adott tulajdonság mennyire jellemző rád.
                        Ezek általában ellentétben állnak egymással, így minél több pontod van az egyik oldalon, annál
                        kevesebb lesz a másikon.
                    </Typography>
                </Flex>
            </Flex>

            <Flex
                flex={1}
                minW={300}
                direction="column"
                p={10}
                overflow="scroll"
            >
                <PersonalityAssesmentDescriptionItem
                    title={"Egyedül, vagy csoportosan tanulsz szívesebben?"}
                    description={descriptions?.category1}
                />
                <PersonalityAssesmentDescriptionItem
                    title={"Térben vizualizálsz, vagy inkább hangosan kimondod az információt?"}
                    description={descriptions?.category2}
                />
                <PersonalityAssesmentDescriptionItem
                    title={"Gyakorlati vagy elméleti oldalról érdekel inkább egy-egy adott probléma?"}
                    description={descriptions?.category3}
                />
                <PersonalityAssesmentDescriptionItem
                    title={"Hallás, vagy látás után jegyzel meg könnyebben valamit?"}
                    description={descriptions?.category4}
                />
                <PersonalityAssesmentDescriptionItem
                    title={"Kreatív, vagy analitikus gondolkodst részesítesz előnyben?"}
                    description={descriptions?.category5}
                />
            </Flex>
        </Flex>


    </LoadingFrame>
}
