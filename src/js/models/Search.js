import axios from "axios";
import { baseUrl } from "../views/base";

export default class Search {
  constructor({
    search = "",
    page = 1,
    sort_field = "",
    sort_direction = ""
  } = {}) {
    this.page = page;
    this.search = search;
    this.sort_field = sort_field;
    this.sort_direction = sort_direction;
  }
  async getResults() {
    const resUrl = new URL(baseUrl);
    resUrl.searchParams.append("page", this.page);
    this.search && resUrl.searchParams.append("search", this.search);
    this.sort_field &&
      resUrl.searchParams.append("sort_field", this.sort_field);
    this.sort_direction &&
      resUrl.searchParams.append("sort_direction", this.sort_direction);

    // console.log(resUrl.href);
    try {
      const res = await axios(resUrl.href);
      this.result = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
