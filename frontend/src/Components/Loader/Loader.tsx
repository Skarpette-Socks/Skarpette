import './Loader.scss';
import sock from '../../assets/img/icons/AnimationSocks.svg';


const Loader = () => {
  return (
    <div className="loader">
      <img src={sock} alt="sock" className="loader__first-sock" />
      <img src={sock} alt="sock" className="loader__second-sock" />
      <img src={sock} alt="sock" className="loader__third-sock" />
    </div>
  );
}

export default Loader