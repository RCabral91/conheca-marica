/* eslint-disable camelcase */
import { WrapTip } from './styles';

interface ITipsProps {
  title: string;
  content: string;
}

const Tips: React.FC<ITipsProps> = ({ title, content }) => (
  <WrapTip>
    <div className="mt-5">
      <h2 className="fs-4 border-bottom pb-2 border-2 mb-4">{title}</h2>
      <span className="fs-5 pre-wrap">{content}</span>
    </div>
  </WrapTip>
);

export default Tips;
