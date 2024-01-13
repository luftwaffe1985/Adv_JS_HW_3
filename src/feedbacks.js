import { getDataFromLS } from "./localStorageMethods.js";

function renderInitialData() {
  let productsArray = getDataFromLS("feedbacksOfDifferentProducts");
  const divFeedbacks = document.querySelector(".feedbacks");
  divFeedbacks.innerHTML = "";

  productsArray.forEach((productItem) => {
    const detailsDiv = document.createElement("details");
    detailsDiv.classList.add("feedback_details");

    const summaryDiv = document.createElement("summary");
    summaryDiv.classList.add("feedback_summary");
    summaryDiv.textContent = `${productItem.product}`;

    detailsDiv.append(summaryDiv);

    productItem.feedbacks.forEach((feedbackItem) => {
      const feedbackContainer = document.createElement("div");
      feedbackContainer.classList.add("feedback_box");

      const feedbackText = document.createElement("p");
      feedbackText.classList.add("feedback_text");
      feedbackText.textContent = `${feedbackItem.text}`;

      const removeButton = document.createElement("button");
      removeButton.classList.add("feedback_remove-button");
      removeButton.type = "button";
      removeButton.textContent = "Delete";

      feedbackContainer.append(feedbackText);
      feedbackContainer.append(removeButton);

      detailsDiv.append(feedbackContainer);
      divFeedbacks.append(detailsDiv);
    });
  });
}
renderInitialData();

const feedbacksDiv = document.querySelector(".feedbacks");
feedbacksDiv.addEventListener("click", function (event) {
  if (event.target.className != "feedback_remove-button") return;
  let feedbackBox = event.target.closest(".feedback_box");
  feedbackBox.remove();

  removeFeedbackFromLS();
});

function removeFeedbackFromLS(productName, id) {
  const productsArrayWithFeedbacks = getDataFromLS(
    "feedbacksOfDifferentProducts"
  );
  const targetProductId = productsArrayWithFeedbacks.findIndex(
    (el) => el.product === productName
  );
  const targetFeedbackId = productsArrayWithFeedbacks[
    targetProductId
  ].feedbacks.findIndex((feedback) => feedback.id === id);
  data[targetProductId].feedbacks.splice(targetFeedbackId, 1);
  saveDataToLS("productFeedbacks", productsArrayWithFeedbacks);
  return productsArrayWithFeedbacks[targetProductId].feedbacks.length;
}
