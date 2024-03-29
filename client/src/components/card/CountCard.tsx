const CountCard = () => {
  /**
   * TSX
   */
  return (
    <div className="relative h-[8rem] border-2 border-blue-400 px-4 py-2 rounded-md shadow-md">
      <div className="flex justify-between items-center w-[20rem] h-[100%]">
        <div>
          Total <br />
          Sales
        </div>
        <div>
          <p>
            <span>Rs</span>32000
          </p>
        </div>
        <span className="absolute bottom-2 right-2">details</span>
      </div>
    </div>
  );
};

export default CountCard;
