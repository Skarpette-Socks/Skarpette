import React, { useState } from "react";
import "./ReviewModal.scss";

import icon_close from "../assets/img/icons/close.svg";
import star_icon_active from "../assets/img/icons/star.svg";
import star_icon_inactive from "../assets/img/icons/star_unactive.svg";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(3);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Форма не отправляется
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal__top">
          <h2>Залишити відгук</h2>
          <button className="review-modal__close" onClick={onClose}>
            <img src={icon_close} alt="close icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="review-modal__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                <img
                  src={rating >= star ? star_icon_active : star_icon_inactive}
                  alt={`Star ${star}`}
                />
              </span>
            ))}
          </div>
          <div className="review-modal__input-group">
            <input
              type="text"
              placeholder="Ім'я"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="review-modal__input-group-name"
              maxLength={50}
            />
            <input
              type="text"
              placeholder="Прізвище"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="review-modal__input-group-surname"
              maxLength={50}
            />
          </div>
          <input
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={100}
          />
          <textarea
            placeholder="Текст відгуку"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={300}
          />
          <button
            type="submit"
            className="review-modal__submit"
            disabled={true}
          >
            Надіслати
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
