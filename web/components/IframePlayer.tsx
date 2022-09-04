import { Player, PlayerRef, PlayerProps } from '@remotion/player';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

const className = '__player';
const borderNone: React.CSSProperties = {
  border: 'none',
};

const IframePlayerWithoutRef = <T,>(
  props: PlayerProps<T>,
  ref: MutableRefObject<PlayerRef>
) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const mountNode = contentRef?.contentDocument?.body;

  useEffect(() => {
    if (!contentRef || !contentRef.contentDocument) return;

    // Remove margin and padding so player fits snugly
    contentRef.contentDocument.body.style.margin = '0';
    contentRef.contentDocument.body.style.padding = '0';

    // When player div is resized also resize iframe
    resizeObserverRef.current = new ResizeObserver(([playerEntry]) => {
      const playerRect = playerEntry.contentRect;
      contentRef.width = String(playerRect.width);
      contentRef.height = String(playerRect.height);
    });

    // The remotion player element
    const playerElement = contentRef.contentDocument.querySelector(
      '.' + className
    );
    if (!playerElement) {
      throw new Error(
        'Player element not found. Add a "' +
          className +
          '" class to the <Player>.'
      );
    }
    // Watch the player element for size changes
    resizeObserverRef.current.observe(playerElement as Element);
    return () => {
      // ContentRef changed: unobserve!
      (resizeObserverRef.current as ResizeObserver).unobserve(
        playerElement as Element
      );
    };
  }, [contentRef]);

  const combinedClassName = `${className} ${props.className ?? ''}`.trim();

  return (
    // eslint-disable-next-line @remotion/warn-native-media-tag
    <iframe ref={setContentRef} style={borderNone}>
      {mountNode &&
        ReactDOM.createPortal(
          // @ts-expect-error PlayerProps are incorrectly typed
          <Player<T> {...props} ref={ref} className={combinedClassName} />,
          mountNode
        )}
    </iframe>
  );
};

export const IframePlayer = forwardRef(IframePlayerWithoutRef);
