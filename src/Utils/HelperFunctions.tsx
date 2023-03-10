import { setNewSidBar } from "../redux/reducers/SideBarSlice";
import { get_data_byID } from "./Backend";

export function sortObjectKeysByArrayLength(obj: any) {
  // Get an array of the object's keys
  const keys = Object.keys(obj);
  // Sort the keys by the length of their corresponding value arrays
  keys.sort((a, b) => obj[b].length - obj[a].length);
  if (keys.includes("title")) {
    // Find the index of the element to remove
    const index = keys.indexOf("title");
    // Use splice() to remove the element
    keys.splice(index, 1);
  }
  // Return the sorted keys
  return keys;
}

export const getNoOfDays = (dateOfCreation: string): number => {
	const creationDate = new Date(dateOfCreation);
	let today = new Date();
	let diff = Math.abs(today.getTime() - creationDate.getTime());

  let diffDays = Math.floor(diff / (1000 * 3600 * 24));

  return diffDays;
};

export const removeDuplicates = (arr: any) => {
  return arr.reduce((unique: any, item: any) => {
    // Check if the current item already exists in the new array
    const index = unique.findIndex(
      (obj: any) =>
        obj.columnName === item.columnName && obj.columnType === item.columnType
    );
    if (index === -1) {
      // If not, add it to the new array
      unique.push(item);
    }
    return unique;
  }, []);
};

export function generateRandomId() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const formatSchemaDataToTypeField = (data: any) => {
  let formattedData: TYPE_FIELD[] = [];
  for (let item of data) {
    formattedData.push(formatDataToTypeField(item));
  }
  return formattedData;
};

export const formatDataToTypeField = (data: any) => {
  let formattedData: TYPE_FIELD = {
    name: data["name"],
    list: data["list"],
    icon: data["icon"],
    linkage: data["linkage"],
    color: data["color"],
  };
  return formattedData;
};

//wrap this in useCallback
export const getLinkedData = async (orgId: string, dataId: string) => {
  let linkedData: TYPE_LINKED_DATA[] = [];
  let data = await get_data_byID(orgId, dataId);
  linkedData = data["linkedData"];
  return linkedData;
};

export const setLinkedData = (
  sideBarList: Type_SIDEBARSTATE[],
  dispatch: any,
  dataId: string,
  links: string[]
) => {
  let tempSidebarListString = JSON.stringify([...sideBarList]);
  let tempSidebarList = JSON.parse(tempSidebarListString);

  for (let sidebar of tempSidebarList) {
    if (sidebar.id === dataId) sidebar.linkedData = links;
  }
  dispatch(setNewSidBar(tempSidebarList));
};

export const get_current_time = () => {
  let date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
};

export const uniqueAbbreviations = (name: string) => {
  if (!name) return "";

  let currString = name.trim();
  currString = currString.toLowerCase();
  currString = currString.split(" ").join("");
  currString = currString.split("-").join("");
  currString = currString.split("_").join("");
  currString = currString.split(".").join("");
  currString = currString.split(",").join("");
  currString = currString.split(";").join("");
  currString = currString.split(":").join("");
  let abbr = "";
  if (currString.length > 4) {
    abbr += currString[0];

    if (currString.length % 2 === 0) {
      abbr += currString[Math.floor(currString.length / 2) - 1];
    }
    abbr += currString[Math.floor(currString.length / 2)];

    abbr += currString[currString.length - 1];
  } else {
    abbr = currString;
  }

  return abbr;
};

export const get_current_date = () => {
  const today: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate: string = today.toLocaleDateString("en-US", options);
  return formattedDate.replace(",", "");
};

export const formatDateToFullDate = (date: string) => {
  if (date && typeof date === "string") {
    const dateFormatted = new Date(date);

    // const shortDate = new Intl.DateTimeFormat("en-GB", {
    //   dateStyle: "long",
    // });
    // console.log(shortDate.format(dateFormatted)); // "5 March 2023"
    const suffixes: TYPE_SCHEMA = {
      one: "st",
      two: "nd",
      few: "rd",
      other: "th",
    };
    const pr = new Intl.PluralRules("en-US", {
      type: "ordinal",
    });
    const formatOrdinals = (n: number) => `${n}${suffixes[pr.select(n)]}`;
    var day = formatOrdinals(dateFormatted.getDate());
    var month = dateFormatted.toLocaleString("en-us", { month: "long" });
    return day + " " + month + " " + dateFormatted.getFullYear();
  } else {
    return "-";
  }
};
