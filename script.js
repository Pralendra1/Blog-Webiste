// Assuming you have the same HTML structure with .input-box and .list-container
const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");

function addBlog() {
  if (inputBox.value === "") {
    alert("Write Something");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    li.classList.add("blog-content");
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "&times;";
    li.appendChild(span);

    span.addEventListener("click", function () {
      li.remove();
      saveData();
    });

    saveData();
  }

  inputBox.value = "";
}

function saveData() {
  const listData = Array.from(listContainer.children).map((li) => ({
    text: li.textContent,
    completed: li.classList.contains("completed"),
  }));

  localStorage.setItem("data", JSON.stringify(listData));
}

function showTask() {
  const storedData = localStorage.getItem("data");

  if (storedData) {
    const listData = JSON.parse(storedData);

    listData.forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item.text;
      li.classList.add("blog-content");

      if (item.completed) {
        li.classList.add("completed");
      }

      let span = document.createElement("span");
      span.innerHTML = "&times;";

      span.addEventListener("click", function () {
        li.remove();
        saveData();
      });

      li.appendChild(span);
      listContainer.appendChild(li);
    });
  }
}

showTask();