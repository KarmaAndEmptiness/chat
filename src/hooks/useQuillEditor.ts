import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Quill, { type QuillOptions } from "quill";
import { Mention, MentionBlot } from "quill-mention";
import { BlockEmbed } from "quill/blots/block";
const { EmbedBlot } = Quill.import("parchment");

type EmojiBlotValue = {
  alt: string;
  src: string;
};
class EmojiBlot extends EmbedBlot {
  static blotName = "emoji";
  static tagName = "img";
  static className = "eb-emoji";

  static create(value: EmojiBlotValue) {
    const node = super.create() as HTMLImageElement;
    node.setAttribute("alt", value.alt);
    node.setAttribute("src", value.src);
    node.setAttribute("width", "20");
    node.setAttribute("height", "20");
    return node;
  }

  static value(node: HTMLImageElement): EmojiBlotValue {
    return {
      alt: node.getAttribute("alt") || "",
      src: node.getAttribute("src") || "",
    };
  }
}

type QuoteBlotValue = {
  id: string;
  title: string;
  describe: string;
  image: string;
};
class QuoteBlot extends BlockEmbed {
  static blotName = "quote";
  static tagName = "div";
  static className = "qb-quote";

  static create(value: QuoteBlotValue) {
    const node = super.create() as HTMLElement;
    const { id, title, describe, image } = value;

    node.dataset.id = id;
    node.dataset.title = title;
    node.dataset.describe = describe;
    node.dataset.image = image;

    node.setAttribute("contenteditable", "false");

    const quoteCardContent = document.createElement("span");
    quoteCardContent.classList.add("quote-card-content");

    const close = document.createElement("span");
    close.classList.add("quote-card-remove");
    close.textContent = "×";
    close.addEventListener("click", () => {
      node.remove();
    });

    const quoteCardTitle = document.createElement("span");
    quoteCardTitle.classList.add("quote-card-title");
    quoteCardTitle.textContent = title;
    quoteCardTitle.appendChild(close);

    quoteCardContent.appendChild(quoteCardTitle);

    if (!image) {
      const quoteCardMeta = document.createElement("span");
      quoteCardMeta.classList.add("quote-card-meta");
      quoteCardMeta.textContent = describe;
      quoteCardContent.appendChild(quoteCardMeta);
    } else {
      const iconImg = document.createElement("img");
      iconImg.setAttribute("src", image);
      iconImg.setAttribute(
        "style",
        "width:30px;height:30px;margin-right:10px;"
      );
      quoteCardContent.appendChild(iconImg);
    }

    node.ondblclick = () => {
      console.log("quote card ondblclick");
    };

    node.appendChild(quoteCardContent);
    return node;
  }

  static value(node: HTMLElement): QuoteBlotValue {
    return {
      id: node.dataset.id || "",
      title: node.dataset.title || "",
      describe: node.dataset.describe || "",
      image: node.dataset.image || "",
    };
  }
}

Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention });
Quill.register({ "blots/emoji": EmojiBlot });
Quill.register({ "blots/quote": QuoteBlot });

const defaultOptions = {
  theme: "snow",
  boundary: document.body,
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
  },
  // placeholder: 'Insert content here ...',
  readOnly: false,
};
export const useQuillEditor:(container:HTMLElement | string |null, options?:QuillOptions)=>Quill | undefined = (
  container: HTMLElement | string | null,
  options?: QuillOptions
) => {
  if (!container) {
    return;
  }
  const quill = new Quill(container, { ...defaultOptions, ...options });
  return quill;
};
