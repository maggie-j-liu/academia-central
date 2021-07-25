const Tags = ({ tags, removeable, onRemove }) => {
  return (
    <div className={"flex flex-wrap gap-2"}>
      {tags.map((tag, idx) => (
        <div
          className={
            "bg-primary-100 hover:bg-primary-200 focus:bg-primary-200 px-3 py-0.5 flex items-center rounded-full"
          }
        >
          <span>{tag}</span>
          {removeable && (
            <button
              className={"inline focus-ring rounded-sm ml-1"}
              type="button"
              onClick={() => onRemove(idx)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tags;
