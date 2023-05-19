import React from "react";

const Form = ({ updateMainCat }) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    console.log(includesHangul(userValue));
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("You can only enter English.");
    }
    setValue(userValue.toUpperCase());
  }

  function handelFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("Cannot be empty.");
      return;
    }
    updateMainCat(value);
  }
  return (
    <form onSubmit={handelFormSubmit} class="row g-3">
      <div class="row justify-content-center mt-5">
        <div class="col-auto">
          <input
            type="text"
            name="name"
            placeholder="Please enter your lines"
            value={value}
            onChange={handleInputChange}
            class="form-control"
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
            MAKE
          </button>
        </div>
      </div>
      <div class="row">
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </form>
  );
};

export default Form;
