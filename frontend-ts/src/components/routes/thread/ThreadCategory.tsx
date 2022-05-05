import React, { FC } from "react";

interface ThreadCategoryProps {
  categoryName?: string;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({ categoryName }) => {
  const catOptions: Array<string | any > = [
    {
      value: "1",
      label: "Programming",
    },
    {
      value: "2",
      label: "Cooking",
    },
  ];
  const defaultOption = catOptions[0];
  const onChangeDropDown = (e: string) => {
    console.log(e);
  };

  return (
    <div className="thread-category-container">
      <strong>{categoryName}</strong>
      <select
        className="thread-category-dropdown"
        id="thread-category-dropdown"
        onChange={(e) => onChangeDropDown(e.target.value)}
        defaultValue={defaultOption}
      >
        {catOptions.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThreadCategory;
