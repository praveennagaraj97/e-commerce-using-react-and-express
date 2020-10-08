import React from "react";

const MoreFeatures = ({ inputList, setProductDetails }) => {
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setProductDetails(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setProductDetails(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setProductDetails([...inputList, { key: "", value: "" }]);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div key={i} className='features-key-value-box'>
            <input
              style={{ marginRight: "3px" }}
              name='key'
              placeholder='Enter title of feature'
              value={x.key}
              onChange={(e) => handleInputChange(e, i)}
            />
            <textarea
              className='feature-text-area'
              name='value'
              placeholder={x.key ? `Enter detail for ${x.key}` : ""}
              value={x.value}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 ? (
                <img
                  className='features-key-value-box__plus'
                  onClick={() => handleRemoveClick(i)}
                  alt='remove'
                  src='https://img.icons8.com/flat_round/64/000000/minus.png'
                />
              ) : (
                ""
              )}
              {inputList.length - 1 === i &&
              inputList[inputList.length - 1].key &&
              inputList[inputList.length - 1].value ? (
                <img
                  className='features-key-value-box__plus'
                  onClick={handleAddClick}
                  src='https://img.icons8.com/plasticine/100/000000/plus.png'
                  alt='plus'
                />
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MoreFeatures;
