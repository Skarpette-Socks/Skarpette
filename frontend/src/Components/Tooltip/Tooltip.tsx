import "./Tooltip.scss";
import tooltip from '../../assets/img/icons/tooltip.svg'
import tooltipShape from '../../assets/img/icons/tooltip-shape.svg'

interface TooltipProps {
  text: string,
}

const Tooltip: React.FC<TooltipProps> = ({text}) => {
  return (
    <div className="tooltip">
      <img src={tooltip} alt="tooltip icon" className="tooltip__icon" />
      <div className="tooltip__container">
        <div className="tooltip__item">
          <div className="tooltip__item-main">
            <div className="tooltip__item-text">{text}</div>
          </div>
          <div className="tooltip__item-shape">
            <img
              src={tooltipShape}
              alt="tooltip shape"
              className="tooltip__iten-shape-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
