import { useCurrentFrame } from 'remotion';

export const MyComposition: React.FC<{ message: string }> = ({ message }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0.5em',
        textAlign: 'center',
        fontSize: '7em',
      }}
    >
      <div>The current frame is {frame}.</div>
      <div>
        The message is:
        <br /> {message}
      </div>
    </div>
  );
};
