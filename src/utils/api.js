export async function fetchHitsApi() {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/top-sales`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
}

export async function fetchProductApi(id) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/items/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json(); 
}

export async function fetchCatalogApi() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/categories`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json(); 
}

export async function sendOrderApi(order) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/order`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
}

export async function fetchCatItemsApi(id,offset,filter) {
    const catId = id !== 0 ? `?categoryId=${id}` : "";
    const offsetId = offset ? `offset=${offset}` : "";
    let result = catId === "" ? `?${offsetId}` : `${catId}&${offsetId}`;
    if (filter) {
      if (id !== 0 || offset) {
        result = `${result}&q=${filter}`;
      } else {
        result = `?q=${filter}`;
      }
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/items${id || offset || filter ? result : ""}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
}