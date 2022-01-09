export const searchType = ["people", "planets"];

export const formatNumberInThousand = (num) => {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  } else {
    return;
  }
};
