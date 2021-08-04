import React from 'react';
import classes from "./articles.module.scss";
import {Carousel} from "react-responsive-carousel";
import {config} from "../../../../../configuration/config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../Articles/components/carouselStyles.scss'
import zoom from '../../../../../assets/zoom.jpg'

const Articles = () => {
    return (
        <div className={classes.secondRowArticlesContainer}>
            <div className={classes.secondRowArticlesHeader}>
                <h1>Hasznos tippek, trükkök</h1>
            </div>
            <div className={classes.carouselWrapper}>
                <Carousel className={classes.carousel}
                          showThumbs={false}
                          showStatus={false}
                          showIndicators={false}
                          autoPlay={true}
                          infiniteLoop={true}
                          interval={4000}>
                    <a href={"https://computerworld.hu/tech/a-tanarok-orulhetnek-a-legujabb-zoom-funkcioknak-283403.html"} target="_blank">
                        <div className={classes.secondRowArticlesInnerContainer}>
                            <img alt="" src={zoom} />
                            <div className={classes.articleItem}>
                                <h1>A tanárok örülhetnek a legújabb Zoom funkcióknak</h1>
                                <p>Bár egyelőre itthon a tervek szerint hagyományos tanév indul, jó tudni, hogy a távoktatásban is egyre többet tud a népszerű videókonferencia-app.</p>
                            </div>
                        </div>
                    </a>

                    <a href={"https://computerworld.hu/uzlet/a-karanten-idoszak-utan-is-tobbet-koltunk-a-neten-283365.html"} target="_blank">
                        <div className={classes.secondRowArticlesInnerContainer}>
                            <img alt="" src={config.assetStorageUrl + '/themes/normaltheme/dashboardmain/dashboardsecondrow/articleimages/webshop.jpg'} />
                            <div className={classes.articleItem}>
                                <h1>A karantén-időszak után is többet költünk a neten</h1>
                                <p>Egy felmérés szerint rengeteg ember ismerte fel az elszigeteltség alatt az online vásárlás előnyeit, ennek azonban a hagyományos boltok isszák meg a levét.</p>
                            </div>
                        </div>
                    </a>
                    <a href={"https://pcworld.hu/pcwlite/torolte-a-felhasznalok-fotoit-az-adobe-lightroom-ios-frissitese-283305.html"} target="_blank">
                        <div className={classes.secondRowArticlesInnerContainer}>
                            <img alt="" src={config.assetStorageUrl + '/themes/normaltheme/dashboardmain/dashboardsecondrow/articleimages/lightroom.jpg'} />
                            <div className={classes.articleItem}>
                                <h1>Törölte a felhasználók fotóit az Adobe Lightroom iOS-frissítése</h1>
                                <p>Már megint egy kellemetlen fotó-törlő baki, ezúttal az Adobe háza tájáról. A hibát kijavították, de a törölt képek végleg elvesztek.</p>
                            </div>
                        </div>
                    </a>
                </Carousel>
            </div>

        </div>
    );
};

export default Articles;
