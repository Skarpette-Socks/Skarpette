import "./Questions.scss";

const Questions: React.FC = () => {
  return (
    <div className="questions">
      <p className="questions__title">Є питання або хочете щось сказати нам?</p>
      <p className="questions__text">
        Ми будемо раді поспілкуватися! Залиште свій коментар за кнопкою нижче.
      </p>
      <button className="questions__button">Написати</button>
    </div>
  );
};

export default Questions;
