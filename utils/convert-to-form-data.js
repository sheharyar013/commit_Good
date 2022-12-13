const convertToFormData = (data) => {
  const Form = new FormData();

  Object.entries(data).forEach((ele) => {
    if (ele[0] === "documents" && ele[1]?.length > 0) {
      [].map.call(ele[1], (item) => {
        Form.append(`${ele[0]}[]`, item);
      });
      return 0;
    }
    if (Array.isArray(ele[1])) {
      ele[1].map((item) => {
        if (typeof item === "object" && !item?.arrayBuffer) {
          for (let key in item) {
            Form.append(`${ele[0]}[]${key}`, item[key]);
          }
          return 0;
        }
        return Form.append(`${ele[0]}[]`, item);
      });
      return 0;
    }
    if (typeof ele[1] === "object" && !ele?.[1]?.arrayBuffer) {
      for (let key in data[ele[0]]) {
        Form.append(`${ele[0]}[${key}]`, data[ele[0]][key]);
      }
      return 0;
    }
    Form.append(ele[0], ele[1] ?? "");
  });
  return Form;
};

export { convertToFormData };
