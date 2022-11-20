import throttle from "lodash.throttle";

const formLink = document.querySelector('.feedback-form');

const KEY_STORAGE = 'feedback-form-state';

formLink.addEventListener('submit', onFormSubmit);
formLink.addEventListener('input', throttle(onTextInput, 500));

operatedData();

function onFormSubmit(e) {
  e.preventDefault();
  const formField = e.currentTarget;
  const formData = new FormData(formField);
  const completeData = {};
  for(const [key, value] of formData.entries()){
  if (!value) {
    alert("All fields must be filled up!");
    return;
  }
    completeData[key] = value;
  }
  console.log(completeData);
  formField.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function onTextInput(e) {
  const { name, value } = e.target;
  const convertedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (convertedData) {
    const formData = {
    ...convertedData,
    [name] : value,    
    };
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
  } else {
    const formData = {[name] : value, 
    };
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
  }
}

function operatedData() {
  const convertedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (convertedData) {
    const inputNames = Object.keys(convertedData);
  inputNames.forEach(inputName => {
    const input = formLink.elements[inputName];
    input.value = convertedData[inputName];
  });
  }

}

