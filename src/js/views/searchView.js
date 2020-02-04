import { elements } from "./base";

export const clearResults = () => {
  elements.searchRes.innerHTML = "";
  elements.pagination.innerHTML = "";
};

const renderList = product => {
  const markup = `
    <li>
        <figure class="results__fig">
            <img src="${product.image}" alt="${product.name}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${product.name}</h4>
            <p class="results__price">${product.price}</p>
        </div>
    </li>
`;
  elements.searchRes.insertAdjacentHTML("beforeend", markup);
};

const createButton = type => `
    <li class="page-item"><a class="page-link results__btn--${type}" href="#">${type}</a></li>
`;

const renderPagination = pagination => {
  let button;

  if (pagination.current_page === 1 && !pagination.previous_page_url) {
    button = createButton("next");
  } else if (pagination.current_page && pagination.next_page_url) {
    button = `
        ${createButton("prev")}
        ${createButton("next")}
    `;
  } else if (!pagination.next_page_url) {
    button = `${createButton("prev")}`;
  }

  // console.log("render");

  elements.pagination.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = result => {
  result.products.forEach(renderList);

  renderPagination(result);
};
