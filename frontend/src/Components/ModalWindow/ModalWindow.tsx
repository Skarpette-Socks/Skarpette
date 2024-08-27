// import React, { useEffect, useState } from "react";
// import "./ModalWindow.scss";
// import { useCartItems } from "../../Context/CartContext";

// const DEFAULT_WIDTH = 375;

// const ModalWindow: React.FC = () => {
//   const { cartItems } = useCartItems();

//   const [modalPosition, setModalPosition] = useState({
//     width: `${DEFAULT_WIDTH}px`,
//     right: `-${DEFAULT_WIDTH}px`,
//     transition: "right .4s ease-in-out",
//   });

//   const [isFirstRender, setIsFirstRender] = useState(true);

//   useEffect(() => {
//     if (isFirstRender === true) {
//       setIsFirstRender(false);
//       return;
//     } else {
//       setModalPosition((prevState) => ({
//         ...prevState,
//         right: "78px",
//       }));

//       setTimeout(() => {
//         setModalPosition((prevState) => ({
//           ...prevState,
//           right: `-${DEFAULT_WIDTH}px`,
//         }));
//       }, 3000);
//     }
//   }, [cartItems])

//   return (
//     <div 
//       className="modal-window"
//       style={modalPosition}
//     >
//       <p>Модальне вікно</p>
//     </div>
//   );
// };

// export default ModalWindow;
