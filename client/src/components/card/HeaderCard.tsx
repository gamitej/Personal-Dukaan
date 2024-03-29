import Dropdown from "../dropdown/Dropdown";
import DateField from "../fields/date/DateField";

const HeaderCard = () => {
  /**
   * TSX
   */
  return (
    <div
      className="rounded-md border shadow-md border-slate-200"
      style={{ width: "fit-content" }}
    >
      <div className="flex px-8 pt-12 pb-8 items-center gap-4">
        <Dropdown
          width="12rem"
          options={[]}
          label="Periodicity"
          onChange={() => {}}
          selectedValue={null}
        />

        <div className="flex gap-2 justify-center items-center">
          <p className="text-xl">Select Date :-</p>
          <div className="flex gap-4">
            <DateField
              id="dateFrom"
              label="From"
              onChange={() => {}}
              value={null}
            />
            <DateField
              label="to"
              id="dateTo"
              onChange={() => {}}
              value={null}
            />
          </div>
        </div>
        <div>
          <button
            className={`w-[5rem] ${
              true ? "" : "bg-slate-300 hover:bg-slate-300 cursor-not-allowed"
            } `}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
