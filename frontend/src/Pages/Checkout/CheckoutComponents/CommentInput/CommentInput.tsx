import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './CommentInput.scss';
import plus from '../../../../assets/img/icons/plus.svg';
import minus from '../../../../assets/img/icons/minus.svg';

interface CommentRef {
  isValid: () => boolean;
  getComment: () => string;
}

const CommentInput = forwardRef<CommentRef>(( _ ,ref) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const maxLength = 500;

  useImperativeHandle(ref, () => ({
    isValid() {
      return isOpen;
    },
    getComment() {
      return value;
    }
  }));

  const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > maxLength) {
      setError('Перевищено максимальну кількість символів');
    } else {
      setError('');
      setValue(value);
    }
  }

  return (
    <div className="comment">
      <div 
        className="comment__toggle" 
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3 className="comment__title">Коментар</h3>
        <button 
          className="comment__button"
        >
          <img src={`${isOpen ? minus : plus}`} alt="comment button" />
        </button>
      </div>
      {isOpen && (
        <>
          <textarea 
            className="comment__input" 
            value={value}
            onChange={handleValue}
            placeholder='Коментар до замовлення'
            maxLength={maxLength + 1}
          />
        
          {error && (
          <p className="comment__error-message">
            {error}
          </p>
      )}
        </>
      )}
    </div>
  )
});

export default CommentInput