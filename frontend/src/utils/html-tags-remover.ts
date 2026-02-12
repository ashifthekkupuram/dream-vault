import dompurify from "dompurify";

const HTMLTagsRemover = (value: string) => {
  return dompurify.sanitize(value).replaceAll(/<.*?>/g, " ");
};

export default HTMLTagsRemover
