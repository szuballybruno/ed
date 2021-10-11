import React from "react"
import OverflowMenu from "./overflow-menu";
import classes from "./stylesheet.module.css"

export default function IntersectionObserverWrap(props: {children: JSX.Element[]}) {

  const navRef = React.useRef<HTMLDivElement>(null);
  const [visibilityMap, setVisibilityMap] = React.useState<any>({});


  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries: any = {};

    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log("THIS" + entry.target.getAttribute("name"))
      console.log("THISS" + entry.isIntersecting + "    " + entry.intersectionRatio)
      updatedEntries[entry.target.getAttribute("name") as string] = entry.isIntersecting;
    });

    setVisibilityMap((prev: any) => ({
      ...prev,
      ...updatedEntries
    }));
    console.log(visibilityMap)
  };
  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1
    });

    // We are addting observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute observerid on the child elemeent
    const elements: Element[] | null = (navRef && navRef.current && navRef.current.children) && Array.from(navRef.current.children)
    elements && elements.forEach((item: Element) => {
      console.log(item.getAttribute("name"))
      if (item.getAttribute("name")) {
        observer.observe(item);
      }
    })
    return () => observer.disconnect();
  }, []);


  return (
      <div className={classes.toolbarWrapper} ref={navRef}>
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child, {
            className: visibilityMap[child?.props["name"]] ? classes.visible : classes.inVisible
          });
        })}
        <OverflowMenu
            visibilityMap={visibilityMap}
            className={classes.overflowStyle}
        >
          {props.children}
        </OverflowMenu>
      </div>
  );
}
