import Search from "./models/Search";

import * as searchView from "./views/searchView";

import { elements, renderLoader, clearLoader } from "./views/base";

const state = {};

const controller = (() => {
  let loadData = async () => {
    state.query = new Search(state);

    console.log(state);

    searchView.clearResults();

    renderLoader(elements.searchRes);

    try {
      await state.query.getResults();
      clearLoader();

      searchView.renderResults(state.query.result);

      eventListeners();
    } catch (err) {
      alert("Error...");
      clearLoader();
    }
  };

  //поиск
  elements.searchForm.addEventListener(
    "keyup",
    e => {
      state.search = e.target.value;
      loadData();
    },
    false
  );

  //пагинация
  let eventListeners = () => {
    let btns = document.querySelectorAll(".page-link");

    btns.forEach(btn => {
      btn.addEventListener("click", eventClick);
    });
  };

  //сортировка
  elements.sortsLink.forEach(elem => {
    elem.addEventListener("click", elem => handleSort(elem));
  });

  const handleSort = event => {
    event.preventDefault();
    let sortBy = event.target.classList[1];
    let method = sortBy.slice(7);
    if (method === "asc" || method === "desc") {
      state.sort_direction = method;
    } else {
      state.sort_field = method;
    }
    console.log(method);
    loadData();
  };

  //Вид

  elements.viewsLink.forEach(elem => {
    elem.addEventListener("click", elem => handleView(elem));
  });

  const handleView = event => {
    event.preventDefault();
    let viewBy = event.target.classList[1];
    let view = viewBy.slice(7);

    document
      .querySelector(".views")
      .querySelector(".active")
      .classList.remove("active");
    event.target.classList.add("active");

    switch (view) {
      case "list":
        state.view = "list";
        break;
      case "grid":
        state.view = "grides";
        break;
      case "table":
        state.view = "table";
        break;
      default:
        break;
    }

    elements.searchRes.classList.remove(
      elements.searchRes.classList.value.slice(14)
    );

    elements.searchRes.classList.toggle(state.view);
  };

  //предыдущая / следующая
  const eventClick = e => {
    e.preventDefault();
    let page;

    let classListBtn = e.target.className;

    if (/next/i.test(classListBtn)) {
      page = Number(state.query.result.current_page) + 1;
    } else {
      page = Number(state.query.result.current_page) - 1;
    }

    state.page = page;

    loadData();
  };

  return {
    init: function() {
      console.log("Start app");
      loadData();
    }
  };
})();

controller.init();
