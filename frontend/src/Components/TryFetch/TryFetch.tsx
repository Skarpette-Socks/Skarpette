// import React, { useEffect, useState } from "react";
// import Item from "../Item/Item";
// import { fetchAllData } from "../../api/fetchAllData";

// interface DataItem {
//   _id: string;
//   name: string;
//   vendor_code: string;
//   images_urls: string[] | undefined;
//   type: string;
//   price: number;
//   price2?: number;
// }

// const DataFetchingComponent: React.FC = () => {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchAllData();
//       setData(result);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadData();
// }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Data</h1>
//       <div className="items">
//         {data.map((item) => (
//           <Item
//             key={item._id}
//             image={item.images_urls[1]}
//             category={item.type}
//             name={item.name}
//             new_price={item.price}
//             old_price={item.price2}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DataFetchingComponent;
