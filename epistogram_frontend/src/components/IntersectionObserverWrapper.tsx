import React from 'react';
import OverflowMenu from './OverflowMenu';
import classes from './css/stylesheet.module.css';
import { EpistoFlex2, EpistoFlex2Props } from './controls/EpistoFlex';

export default function IntersectionObserverWrap(props: { children: JSX.Element[] } & EpistoFlex2Props) {

  const navRef = React.useRef<HTMLDivElement>(null);
  const [visibilityMap, setVisibilityMap] = React.useState<any>({});

  const { children, ...css } = props;


  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries: any = {};

    entries.forEach((entry: IntersectionObserverEntry) => {
      updatedEntries[entry.target.getAttribute('name') as string] = entry.isIntersecting;
    });


    setVisibilityMap((prev: any) => ({
      ...prev,
      ...updatedEntries
    }));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });

    // We are addting observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute observerid on the child elemeent
    const elements: Element[] | null = (navRef && navRef.current && navRef.current.children) && Array.from(navRef.current.children);
    elements && elements.forEach((item: Element) => {
      if (item.getAttribute('name')) {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, []);


  return (<EpistoFlex2 overflow={'hidden'}>
    <EpistoFlex2 className={classes.toolbarWrapper}
      overflow={'hidden'}
      ref={navRef}
      {...css}>
      {React.Children.map(props.children, (child: JSX.Element) => {
        return React.cloneElement(child, {
          className: visibilityMap[child?.props['name']] ? classes.visible : classes.inVisible
        });
      })}

    </EpistoFlex2>
    <OverflowMenu
      visibilityMap={visibilityMap}
      className={classes.overflowStyle}>
      {props.children}
    </OverflowMenu>
  </EpistoFlex2>
  );
}
