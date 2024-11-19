import HeaderBlock from "./Header/Header";
import HitItemsBlock from "./HitItems/HitItems";
import NewItemsBlock from "./NewItems/NewItemsBlock";

const NewAndHits = () => {
  return (
    <>
      <HeaderBlock />
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <NewItemsBlock />
        <HitItemsBlock />
      </div>
    </>
  );
};

export default NewAndHits;
