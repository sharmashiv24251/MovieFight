const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
<label><b>Search !</b><label>
<input class = "input"/>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results">
s</div>
</div>
</div>
`;
  const input = root.querySelector(`input`);
  const dropdown = root.querySelector(`.dropdown`);
  const resultsWrapper = root.querySelector(`.results`);

  const onInput = async (e) => {
    resultsWrapper.innerHTML = ``;
    const Items = await fetchData(e.target.value);
    if (!Items.length) {
      dropdown.classList.remove(`is-active`);
      return;
    }
    dropdown.classList.add(`is-active`);
    for (let Item of Items) {
      const option = document.createElement(`a`);
      option.classList.add(`dropdown-item`);
      option.innerHTML = renderOption(Item);
      option.addEventListener(`click`, () => {
        dropdown.classList.remove(`is-active`);
        input.value = inputValue(Item);
        onOptionSelect(Item);
      });
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener(`input`, debounce(onInput));

  document.addEventListener(`click`, (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove(`is-active`);
    }
  });
};
