import DateField from "../fields/date/DateField";

const HeaderCard = () => {
  /**
   * TSX
   */
  return (
    <div
      className="rounded-md h-[8rem] pt-6 px-8 border-2 border-blue-400 shadow-md"
      style={{ width: "fit-content" }}
    >
      <div className="flex h-[100%] items-center gap-4">
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
