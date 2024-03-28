import Dropdown from "../dropdown/Dropdown";

const HeaderCard = () => {
  return (
    <div className="w-full h-[7rem] rounded-md border">
      <div>
        <Dropdown
          options={[]}
          label="Select"
          onChange={() => {}}
          selectedValue={null}
        />
      </div>
    </div>
  );
};

export default HeaderCard;
