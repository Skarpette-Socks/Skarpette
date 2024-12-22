import React from 'react';
import '../Promotions.scss';

import noPromImage from '../../../assets/img/no-promotions.png';

const NoPromotions = () => {
  return (
    <div className='no-promotions'>
      <div className="no-promotions__container">
        <div className="no-promotions__text">
          <h2 className='no-promotions__title'>Акційні пропозиції відсутні</h2>
          <p className='no-promotions__details'>Слідкуйте за сторінкою “Акції”, щоб не пропустити вигідні пропозиції</p>
        </div>
        <div className="no-promotions__image">
          <img src={noPromImage} alt="noPromImg" />
        </div>
      </div>
    </div>
  )
}

export default NoPromotions