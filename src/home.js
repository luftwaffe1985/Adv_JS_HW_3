import {
  saveDataToLS,
  getDataFromLS,
} from "./src/modules/localStorageMethods.js";
import { globalId } from "./src/modules/globalId.js";

const initialData = [
  {
    id: "Apple iPhone 13",
    product: "Apple iPhone 13",
    feedbacks: [
      {
        id: 1,
        text: "Nice phone! Durable battery.",
      },
      {
        id: 2,
        text: "Great camera, photos look amazing.",
      },
    ],
  },
  {
    id: "Samsung Galaxy Z Fold 3",
    product: "Samsung Galaxy Z Fold 3",
    feedbacks: [
      {
        id: 3,
        text: "Cool design, but the price is pretty high.",
      },
    ],
  },
  {
    id: "Sony PlayStation 5",
    product: "Sony PlayStation 5",
    feedbacks: [
      {
        id: 4,
        text: "I like the offered games, the graphics are of high quality.",
      },
    ],
  },
  {
    id: "Nokia 110",
    product: "Nokia 110",
    feedbacks: [
      {
        id: 5,
        text: "Expensive, but not interesting.",
      },
    ],
  },
];

saveDataToLS("feedbacksOfDifferentProducts", initialData);

const makeFeedbackButton = document.querySelector(".addButton");
makeFeedbackButton.addEventListener("click", (event) => {
  event.preventDefault();

  let textOfFeedback = getFeedbackText();

  createNewFeedback(textOfFeedback);
  resetForm();
});

function resetForm() {
  const nameInput = document.querySelector(`[name="productname"]`);
  nameInput.value = "";

  const textArea = document.querySelector(".textarea");
  textArea.value = "";
}

function getProductName() {
  const productName = document.querySelector('input[name="productname"]');
  try {
    if (productName) {
      return productName.value;
    } else {
      throw new Error("Choose a product!");
    }
  } catch (error) {
    console.log(error);
  }
}

function getFeedbackText() {
  const textArea = document.querySelector(".textarea").value.trim();
  try {
    if (textArea.length < 50) {
      throw new Error("The comment is too short");
    } else if (textArea.length > 500) {
      throw new Error("The comment is too long");
    } else {
      return textArea;
    }
  } catch (error) {
    console.log(error);
  }
}

let globalId = 6;
function createNewFeedback(text) {
  if (text) {
    let newFeedback = {
      id: ++globalId,
      text: text,
    };
    saveNewFeedback(newFeedback);
  }
}

function saveNewFeedback(feedback) {
  let nameOfProduct = getProductName();
  console.log(nameOfProduct);
  const feedbackForSaving = feedback;
  console.log(feedbackForSaving);

  const productsArrayWithFeedbacks = getDataFromLS(
    "feedbacksOfDifferentProducts"
  );
  const targetProductIndex = productsArrayWithFeedbacks.findIndex(
    (product) => product.product === nameOfProduct
  );
  console.log(targetProductIndex);
  if (targetProductIndex >= 0) {
    productsArrayWithFeedbacks[targetProductIndex].feedbacks.push(
      feedbackForSaving
    );
    saveDataToLS("feedbacksOfDifferentProducts", productsArrayWithFeedbacks);
  } else {
    const fullFeedback = {
      id: nameOfProduct,
      product: nameOfProduct,
      feedbacks: [feedbackForSaving],
    };
    console.log(fullFeedback);
    productsArrayWithFeedbacks.push(fullFeedback);
    saveDataToLS("feedbacksOfDifferentProducts", productsArrayWithFeedbacks);
  }
}
